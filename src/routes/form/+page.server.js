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
        console.error('Error fetching data:', error);
        return [];
    }
}


export const actions = {
    search: async (request) => {
        console.log("requested")
    }
}