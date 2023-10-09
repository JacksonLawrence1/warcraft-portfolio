import {
	WOW_CLIENT_ID,
	WOW_CLIENT_SECRET,
	WCL_CLIENT_ID,
	WCL_CLIENT_SECRET
} from '$env/static/private';
import axios from 'axios';

import { findProgress } from '$lib/api/raiderioAPI';

// make this dyanmic based on user location
const wowTokenEndpoint = 'https://oauth.battle.net/token';
const wclTokenEndpoint = 'https://www.warcraftlogs.com/oauth/token';

let wowToken;
let wclToken;

const getToken = async (headers, uri) => {
	const data = new URLSearchParams();
	data.append('grant_type', 'client_credentials');

	try {
		const response = await axios.post(uri, data, { headers });
		return response.data.access_token;
	} catch (error) {
		console.error('Error getting access token:', error);
	}
};

// Official Wow api token
const getWowAccessToken = async () => {
	if (!wowToken) {
		const auth = btoa(`${WOW_CLIENT_ID}:${WOW_CLIENT_SECRET}`);
		const headers = {
			Authorization: `Basic ${auth}`
		};
		wowToken = await getToken(headers, wowTokenEndpoint);
	}

	return wowToken;
};

// Warcraft logs access token
const getWclAccessToken = async () => {
	if (!wclToken) {
		const auth = btoa(`${WCL_CLIENT_ID}:${WCL_CLIENT_SECRET}`);
		const headers = {
			Authorization: `Basic ${auth}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		};
		wclToken = await getToken(headers, wclTokenEndpoint);
	}

	return wclToken;
};

export const load = async () => {
	// get access tokens
	wowToken = await getWowAccessToken();
	wclToken = await getWclAccessToken();

	axios.interceptors.request.use(
		(config) => {
			if (config.url.includes('api.blizzard')) {
				config.headers.Authorization = `Bearer ${wowToken}`;
			} else if (config.url.includes('warcraftlogs')) {
				config.headers.Authorization = `Bearer ${wclToken}`;
			}
			return config;
		},
		(error) => {
			// Handle request error
			return Promise.reject(error);
		}
	);
};
