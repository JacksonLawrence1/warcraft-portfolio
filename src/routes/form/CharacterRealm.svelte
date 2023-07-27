<script>
	import { realms } from '$lib/stores.js';
	import { get } from 'svelte/store'

	let id = 'realm';
	let text = 'Realm';

	let data;
	export let isDataLoaded;

	export let region;
	export let value;

	let loadedRealms;

	realms.subscribe((realm) => {
		if (!realm[region.toLowerCase()]) return;
		
		// sort by name alphabetically in english
		loadedRealms = realm[region.toLowerCase()].sort((a, b) => {
			return a.name.en_US.localeCompare(b.name.en_US);
		})

		// set the value to the first realm in the list
		value = loadedRealms[0].slug;
	});

	async function getRealm() {
		// check we have a region
		if (!region) return;

		// check we don't already have realm stored in local memory
		if (get(realms)[region.toLowerCase()]) {
			value = loadedRealms[0].slug;
			isDataLoaded = true;
			return;
		}

		// Build the query string using URLSearchParams
		const params = new URLSearchParams();
		params.append('region', region.toLowerCase());
		const queryString = params.toString();

		const response = await fetch(`form?${queryString}`, {
			method: 'GET'
		});
		data = response.json().then((realmJSON) => {
			// store realms in local memory alphabetically in english
			realms.update((realms) => {
				realms[region.toLowerCase()] = realmJSON.realms;
				return realms;
			});
			isDataLoaded = true; // Set the flag to indicate data is loaded
		});
	}

	// Load data when the component is mounted or when the region parameter changes
	function loadData() {
		value = 'Fetching realm list...';
		isDataLoaded = false; // Reset the flag to indicate data is loading

		getRealm();
	}
	
	// Use a reactive statement to trigger data loading when the 'region' parameter changes
	$: {
		if (region) {
			loadData();
		}
	}
</script>

<div>
	<label class="label" for={id}>
		<span class="label-text">{text}</span>
	</label>

	<select name={id} class="select select-bordered w-full max-w-xs" bind:value disabled={!isDataLoaded}>
		{#if data}
			{#if !isDataLoaded}
				<option disabled selected>Fetching realm list...</option>
			{:else}
				{#each loadedRealms as realm}
					<option value={realm.slug}>{realm.name.en_US}</option>
				{/each}
			{/if}
		{:else}
			<option disabled selected>Select your realm</option>
		{/if}
	</select>
</div>
