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


const fetchRegions = async () => {
    const testURL = `https://us.api.blizzard.com/data/wow/region/index`;
    const headers = {
        "Battlenet-Namespace": "dynamic-us",
    };

    try {
        const response = await axios.get(testURL, { headers });
        return response.data.regions;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export const load = async () => {

    return {
        realms: {
            eu: await fetchRealms('eu'),
            us: await fetchRealms('us'),
        },
    }
}