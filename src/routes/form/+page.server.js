import { redirect } from '@sveltejs/kit';
import { findCharacter } from '$lib/api/warcraftAPI.js';


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
			// fill in route parameters automatically
			throw redirect(302, `/character/${character.region}/${character.slug}/${character.name}`);
		}
		
		return res;
    }
};
