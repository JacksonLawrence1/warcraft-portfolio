import axios from 'axios';

const fetchRealms = async (regionName) => {
	const testURL = `https://${regionName}.api.blizzard.com/data/wow/realm/index`;
	const headers = {
		'Battlenet-Namespace': `dynamic-${regionName}`
	};

	try {
		const response = await axios.get(testURL, { headers });
		return response.data.realms.map((realm) => realm.name.en_US).sort((a, b) => a.localeCompare(b));
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

const findCharacter = async (regionName, realmSlug, characterName) => {
    const testURL = `https://${regionName}.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName} `;
	const headers = {
		'Battlenet-Namespace': `profile-${regionName}`
	};

	try {
		const response = await axios.get(testURL, { headers });
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
}

export const actions = {
	search: async ({ request }) => {
        const data = await request.formData();

        const region = data.get('region').toLowerCase();
        const slug = data.get('realm').toLowerCase();
        const characterName = data.get('characterName').toLowerCase();

        findCharacter(region, slug, characterName);
    }
};
