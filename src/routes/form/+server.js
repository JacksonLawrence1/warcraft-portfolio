import { json } from '@sveltejs/kit';
import axios from 'axios';

const fetchRealms = async (regionName) => {
    const testURL = `https://${regionName}.api.blizzard.com/data/wow/realm/index`;
    const headers = {
        "Battlenet-Namespace": `dynamic-${regionName}`,
    };

    try {
        const response = await axios.get(testURL, { headers });
        return response.data.realms.map(realm => realm.name.en_US).sort((a, b) => a.localeCompare(b));
    } catch (error) {
        throw error; // Rethrow the error to handle it in the calling function if needed
    }
}

export async function GET() {
    return json({realms: await fetchRealms('us')});
}