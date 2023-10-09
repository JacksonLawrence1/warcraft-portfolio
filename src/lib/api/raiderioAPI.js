import axios from 'axios';

const BASE_URL = 'https://raider.io/api/v1/';

export const findProgress = async (regionName, realmSlug, characterName) => {

    // build url for character string
	const url = BASE_URL + `characters/profile?region=${regionName}&realm=${realmSlug}&name=${characterName}&fields=raid_progression:vault-of-the-incarnates`;
	const response = await axios.get(url);
	return response.data;
};
