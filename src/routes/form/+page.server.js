import axios from 'axios';
import { fail, redirect } from '@sveltejs/kit';



const fetchRealms = async (regionName) => {
	const url = `https://${regionName}.api.blizzard.com/data/wow/realm/index`;
	const headers = {
		'Battlenet-Namespace': `dynamic-${regionName}`
	};

	try {
		const response = await axios.get(url, { headers });
		return response.data.realms.map((realm) => realm.name.en_US).sort((a, b) => a.localeCompare(b));
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

const findCharacter = async (regionName, realmSlug, characterName) => {
    const url = `https://${regionName}.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName} `;
	const headers = {
		'Battlenet-Namespace': `profile-${regionName}`
	};

	try {
		const response = await axios.get(url, { headers });
		return response.data;
	} catch (error) {
		return fail(422, {
			description: characterName + ' not found',
			error: error.message
		});
	}

}

export const actions = {
	search: async ({ request }) => {
        const data = await request.formData();

        const region = data.get('region').toLowerCase();
        const slug = data.get('realm').toLowerCase();
        const characterName = data.get('characterName').toLowerCase();

		let res = await findCharacter(region, slug, characterName);

		if (res.status !== 422) {
			throw redirect(302, '/showcase');
		}
		
		return res;
    }
};
