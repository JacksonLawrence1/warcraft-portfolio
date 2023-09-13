import { error } from '@sveltejs/kit';
import { fetchRealms, findCharacter, findProgress } from '$lib/api/warcraftAPI.js';
import { findParses } from '$lib/api/wclAPI.js';

const regions = ['eu', 'us'];

const wipRegions = ['kr', 'tw', 'cn'];

const getCharacterInfo = async (region, slug, name) => {
	const res = await findCharacter(region, slug, name);

	// check character is found
	if (res.status === 422) {
		throw error(406, `Character '${name}' not found.`);
	}

	// return detailed information about character
	return {
		name,
		region,
		slug,
		id: res.id,
		faction: res.faction.type,
		class: res.character_class.name.en_US,
		guild: res.guild.name
	};
};

export async function load({ params }) {
	// check if region is valid
	if (wipRegions.includes(params.region)) {
		throw error(406, `Region '${params.region}' is not yet supported`);
	} else if (!regions.includes(params.region)) {
		throw error(406, `Unknown region '${params.region}'`);
	}

	// get realm list using region, from wow api
	const realmList = await fetchRealms(params.region);

	// check if realm is valid
	if (!realmList.find((r) => r.slug === params.slug)) {
		throw error(406, `Unknown realm '${params.slug}'`);
	}

	// get character info, also checks if character is valid
	const character = await getCharacterInfo(params.region, params.slug, params.character);

	// gets raid progress
	const characterData = await findProgress(character);

	// gets raid parses
	const logs = await findParses(character, characterData);

	return {
		character: character,
		raids: characterData,
		logs: logs
	};
}
