import { error } from '@sveltejs/kit';
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

export async function load({ cookies }) {
	let character = cookies.get('character');

	if (!character) {
		throw error(404);
	}

    character = JSON.parse(character);
    character.name = character.name.charAt(0).toUpperCase() + character.name.slice(1);

    const characterData = await findParses(character);

	return {
        character: character,
		aberrus: characterData.aberrus,
	};
}
