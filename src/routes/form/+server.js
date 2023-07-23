import { json } from '@sveltejs/kit';
import axios from 'axios';

const fetchRealms = async (regionName) => {
    const testURL = `https://${regionName}.api.blizzard.com/data/wow/realm/index`;
    const headers = {
        "Battlenet-Namespace": `dynamic-${regionName}`,
    };

    try {
        const response = await axios.get(testURL, { headers });
        return response.data.realms;
    } catch (error) {
        throw error; // Rethrow the error to handle it in the calling function if needed
    }
}

export async function GET( { url }) {

    try {
        const region = url.searchParams.get("region");
        return json({realms: await fetchRealms(region)});
    } catch (error) {
        console.error('Error fetching data:', error);
        return json({realms: []});
    }
}