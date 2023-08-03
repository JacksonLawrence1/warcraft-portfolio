import axios from 'axios';
import { fail, redirect } from '@sveltejs/kit';


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
	search: async ({ request, cookies }) => {
        const data = await request.formData();

		const character = {
			region: data.get('region').toLowerCase(),
			slug: data.get('realm').toLowerCase(),
			name: data.get('characterName').toLowerCase()
		}

		let res = await findCharacter(character.region, character.slug, character.name);

		if (res.status !== 422) {
			cookies.set('character', JSON.stringify(character), { path: '/' });
			throw redirect(302, '/form/showcase');
		}
		
		return res;
    }
};
