import axios from 'axios';
import { fail } from '@sveltejs/kit';
import { getImage } from '$lib/raidStore.js';


export const fetchRealms = async (regionName) => {
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

export const findCharacter = async (regionName, realmSlug, characterName) => {
    const url = `https://${regionName}.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()} `;
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

// simplifies data structure, only containing essential data
function unpackProgress(data) {
	const difficulties = ['NORMAL', 'HEROIC', 'MYTHIC'];

	// only include dragonflight, shadowlands, battle for azeroth, legion
	// perhaps more in future
	const expansions = [503, 499, 396, 395];

	const raids = [];
	data.expansions.forEach((expansion) => {
		// skip current season as duplicates
		if (expansions.includes(expansion.expansion.id)) {
			expansion.instances.forEach((instance) => {
				// raid object with name and id
				let raid = {
					name: instance.instance.name,
					id: instance.instance.id,
					// placeholder
					total_count: instance.modes[0].progress.total_count,
					image: getImage(instance.instance.id),
					progress: []
				};

				// add progress for each difficulty
				instance.modes.forEach((mode) => {
					// skip LFR
					if (difficulties.includes(mode.difficulty.type)) {
						raid.progress.push({
							type: mode.difficulty.type,
							completed_count: mode.progress.completed_count
						});
					}
				});

				// only add raids with progress (as LFR is skipped)
				if (raid.progress.length > 0) {
					raids.push(raid);
				}
			});
		}
	});
	return raids.reverse();
}

export const findProgress = async (character) => {
	const url = `https://${character.region}.api.blizzard.com/profile/wow/character/${
		character.slug
	}/${character.name.toLowerCase()}/encounters/raids`;
	const headers = {
		'Battlenet-Namespace': `profile-${character.region}`
	};

	try {
		const response = await axios.get(url, { headers });
		return unpackProgress(response.data);
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};