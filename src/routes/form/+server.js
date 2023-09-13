import { json } from '@sveltejs/kit';
import { fetchRealms } from '$lib/api/warcraftAPI.js';

export async function GET( { url }) {

    try {
        const region = url.searchParams.get("region");
        return json({realms: await fetchRealms(region)});
    } catch (error) {
        console.error('Error fetching data:', error);
        return json({realms: []});
    }
}