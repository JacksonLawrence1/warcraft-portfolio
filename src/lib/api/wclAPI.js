import axios from 'axios';
import { getRaids, getRaidFromSlug } from '$lib/raidStore.js';

// build query for a zone
const buildZone = (raid) => {
	return `${raid.slug}: zoneRankings(zoneID: ${raid.zoneID}, difficulty: 5),
    `;
};

// only get raids which have mythic progress
const getMythicRaids = (progress) => {
	let raidsIDs = [];

	progress.forEach((raid) => {
		if (raid.progress.find((difficulty) => difficulty.type === 'MYTHIC')) {
			raidsIDs.push(raid.id);
		}
	});

	return getRaids(raidsIDs);
};

// build query for all raids
const buildAllRaids = (character, progress) => {
	// only get raids with mythic progress
	let raids = getMythicRaids(progress);
	let zones = '';

	// build query for each raid
	raids.forEach((raid) => {
		zones += buildZone(raid);
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

export const findParses = async (character, progress) => {
	const url = `https://www.warcraftlogs.com/api/v2/client`;

	// capitalize first letter of name
	character.name = character.name.charAt(0).toUpperCase() + character.name.slice(1);

	const response = await axios.post(url, { query: buildAllRaids(character, progress) });
	
	if (response.data.errors) {
		return [];
	}

	return unpackParses(response.data.data.characterData.character);

	// TODO:: Error handling
};