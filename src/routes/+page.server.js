import { WOW_CLIENT_ID, WOW_CLIENT_SECRET, WCL_CLIENT_ID, WCL_CLIENT_SECRET } from '$env/static/private';
import axios from 'axios';

// make this dyanmic based on user location
const region = "eu";
const wowTokenEndpoint = "https://oauth.battle.net/token";
const wclTokenEndpoint = "https://www.warcraftlogs.com/oauth/token";


const getToken = async (headers, uri) => {
	const data = new URLSearchParams();
	data.append('grant_type', 'client_credentials');

	try {
		const response = await axios.post(uri, data, { headers });
		return response.data.access_token;
	} catch (error) {
		console.error('Error getting access token:', error);
	}
}

// Official Wow api token
const getWowAccessToken = async () => {
	const auth = btoa(`${WOW_CLIENT_ID}:${WOW_CLIENT_SECRET}`);
	const headers = {
		Authorization: `Basic ${auth}`,
    };
	const token = await getToken(headers, wowTokenEndpoint);
    const test = await fetchWowRealms(token, "eu");
    
    return test;
};

const fetchWowRealms = async (token, regionName) => {
    const testURL = `https://${regionName}.api.blizzard.com/data/wow/realm/index`;
    const headers = {
        Authorization: `Bearer ${token}`,
        "Battlenet-Namespace": `dynamic-${regionName}`,
    };

    try {
        const response = await axios.get(testURL, { headers });
        return response.data.realms.map(realm => realm.slug);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Warcraft logs access token
const getWclAccessToken = async () => {
    const auth = btoa(`${WCL_CLIENT_ID}:${WCL_CLIENT_SECRET}`);
	const headers = {
		Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    };
	const token = await getToken(headers, wclTokenEndpoint);
    return token;
}

export const load = async ({ fetch }) => {
    return {
        wowToken: getWowAccessToken(),
        //wclToken: getWclAccessToken(),
    }
}