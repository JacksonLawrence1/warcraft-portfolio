<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	//import { CLIENT_SECRET, CLIENT_ID } from '$env/static/private';

	const tokenEndpoint = 'https://www.warcraftlogs.com/oauth/token';
	const apiUrl = 'https://www.warcraftlogs.com/api/v2/client';

    let apiResponse;
	let accessToken;

	const getAccessToken = async () => {
		const auth = btoa(`${clientId}:${clientSecret}`);
		const headers = {
			Authorization: `Basic ${auth}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		};
		const data = new URLSearchParams();
		data.append('grant_type', 'client_credentials');

		try {
			const response = await axios.post(tokenEndpoint, data, { headers });
			accessToken = response.data.access_token;
			makeApiRequest();
		} catch (error) {
			console.error('Error getting access token:', error);
		}
	};

	const makeApiRequest = async () => {
		const apiHeaders = {
			Authorization: `Bearer ${accessToken}`
		};

		// GraphQL query
		const graphqlQuery = `
        query {
            characterData 
            {
                character(name: "Jgobby", serverRegion:"EU", serverSlug:"Draenor")
                {
                    zoneRankings
                }
            }
        }`;

		try {
			apiResponse = await axios.post(apiUrl, { query: graphqlQuery }, { headers: apiHeaders } );
			console.log('API Response:', apiResponse.data.data);
			// Process the API response as needed
		} catch (error) {
			console.error('Error making API request:', error);
		}
	};

	onMount(getAccessToken);
</script>

{#if apiResponse}
	<p>{apiResponse.data.data.characterData.character.zoneRankings.bestPerformanceAverage}</p>
	<!-- Use the access token to make API requests to the GraphQL API -->
{:else}
	<p>Loading...</p>
{/if}