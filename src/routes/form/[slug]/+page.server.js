import { error } from '@sveltejs/kit';
import { getImage, getRaids, getRaidFromSlug } from '$lib/raidStore.js';

import axios from 'axios';
import { supabase } from '$lib/supabaseClient';

const buildZone = (character, raid) => {
	return `${raid.slug}: zoneRankings(zoneID: ${raid.zoneID}, difficulty: 5),
    `;
};

// get all raids by the character which have mythic progress
const getMythicRaids = (progress) => {
	let raidsIDs = [];

	progress.forEach((raid) => {
		if (raid.progress.find((difficulty) => difficulty.type === 'MYTHIC')) {
			raidsIDs.push(raid.id);
		}
	});

	return getRaids(raidsIDs);
};

const buildAllRaids = (character, progress) => {
	// only get raids with mythic progress
	let raids = getMythicRaids(progress);
	let zones = '';

	// build query for each raid
	raids.forEach((raid) => {
		zones += buildZone(character, raid);
	});

	return `query {
        characterData 
        {
            character(name: "${character.name}", serverRegion: "${character.region}", serverSlug: "${character.slug}")
            {
                ${zones}
            }
        }
    }`;
};

const findParses = async (character, progress) => {
	const url = `https://www.warcraftlogs.com/api/v2/client`;

	try {
		const response = await axios.post(url, { query: buildAllRaids(character, progress) });
		return unpackParses(response.data.data.characterData.character);
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

const unpackParses = (data) => {
	let raids = [];
	for (const [key, value] of Object.entries(data)) {
		raids.push({
			raid: getRaidFromSlug(key),
			avg: value.bestPerformanceAverage,
			difficulty: value.difficulty,
			metric: value.metric,
			allStars: value.allStars[0], // get latest partition
			rankings: value.rankings
		});
	}
	return raids;
};

const findProgress = async (character) => {
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

const updateCharacterInfo = async (character) => {
	const url = `https://${character.region}.api.blizzard.com/profile/wow/character/${
		character.slug
	}/${character.name.toLowerCase()} `;
	const headers = {
		'Battlenet-Namespace': `profile-${character.region}`
	};

	try {
		const response = await axios.get(url, { headers });
		return {
			...character,
			id: response.data.id,
			faction: response.data.faction.type,
			class: response.data.character_class.name.en_US,
			guild: response.data.guild.name
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

const addToDatabase = async (character) => {
	// check if character already exists

	let { data, error } = await supabase
		.from('characters')
		.upsert({ name: character.name, slug: character.slug, region: character.region }, { onConflict: 'name, slug, region' })
		.select();
	console.log(data, error);
};

export async function load({ cookies }) {
	let character = cookies.get('character');

	if (!character) {
		throw error(404);
	}

	character = JSON.parse(character);
	character.name = character.name.charAt(0).toUpperCase() + character.name.slice(1);

	// add additional character info including id, faction, class, guild
	character = await updateCharacterInfo(character);

	// get raid progress
	const characterData = await findProgress(character);

	// get raid parses
	const logs = await findParses(character, characterData);

	// add character to db
	await addToDatabase(character);

	return {
		character: character,
		raids: characterData,
		logs: logs
	};
}
