import { error } from '@sveltejs/kit';
import { images } from '$lib/raidStore.js'

import axios from 'axios';

const buildZone = (id) => {
    return `normal: zoneRankings(zoneID: ${id}, difficulty: 3),
            heroic: zoneRankings(zoneID: ${id}, difficulty: 4),
            mythic: zoneRankings(zoneID: ${id}, difficulty: 5)`
}

const buildQuery = (character, zone) => {
    return `query {
        characterData 
        {
            aberrus: character(name: "${character.name}", serverRegion: "${character.region}", serverSlug: "${character.slug}")
            {
                ${buildZone(zone)}
            }
        }
    }`;
}

const findParses = async (character) => {
	const url = `https://www.warcraftlogs.com/api/v2/client`;

	try {
		const response = await axios.post(url, { query: buildQuery(character, 33) });
		return response.data.data.characterData;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

const findProgress = async (character) => {
    const url = `https://${character.region}.api.blizzard.com/profile/wow/character/${character.slug}/${character.name.toLowerCase()}/encounters/raids`
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
}

// simplifies data structure, only containing essential data
function unpackProgress(data) {
    const difficulties = ['NORMAL', 'HEROIC', 'MYTHIC'];

    // only include dragonflight, shadowlands, battle for azeroth, legion
    // perhaps more in future
    const expansions = [503, 499, 396, 395]

    const raids = [];
    data.expansions.forEach(expansion => {
        // skip current season as duplicates
        if (expansions.includes(expansion.expansion.id)) {
            expansion.instances.forEach(instance => {
                // raid object with name and id
                let raid = {
                    name: instance.instance.name,
                    id: instance.instance.id,
                    // placeholder
                    total_count: instance.modes[0].progress.total_count,
                    image: images[instance.instance.id] || images.default,
                    progress: [],
                };

                // add progress for each difficulty
                instance.modes.forEach(mode => {
                    // skip LFR
                    if (difficulties.includes(mode.difficulty.type)) {
                        raid.progress.push({
                            type: mode.difficulty.type,
                            completed_count: mode.progress.completed_count,
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

export async function load({ cookies }) {
	let character = cookies.get('character');

	if (!character) {
		throw error(404);
	}

    character = JSON.parse(character);
    character.name = character.name.charAt(0).toUpperCase() + character.name.slice(1);

    const characterData = await findProgress(character);

	return {
        character: character,
		raids: characterData,
	};
}
