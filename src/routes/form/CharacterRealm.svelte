<script>
	import { realms } from '$lib/stores.js';

	let id = 'realm';
	let text = 'Realm';

	let data;
	export let isDataLoaded;

	export let region;
	export let value;

	let loadedRealms;

	realms.subscribe((realm) => {
		loadedRealms = realm[region.toLowerCase()];
	});

	async function getRealm() {
		// check we have a region
		if (!region) return;

		// check we don't already have realm stored in local memory
		if (loadedRealms && loadedRealms.length > 0) {
			console.log("a")
			value = loadedRealms[0];
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
				realms[region.toLowerCase()] = realmJSON.realms
					.map((realm) => realm.name.en_US)
					.sort((a, b) => a.localeCompare(b));
				value = realms[region.toLowerCase()][0];
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

	<select class="select select-bordered w-full max-w-xs" bind:value disabled={!isDataLoaded}>
		{#if data}
			{#if !isDataLoaded}
				<option disabled selected>Fetching realm list...</option>
			{:else}
				{#each loadedRealms as realm}
					<option value={realm}>{realm}</option>
				{/each}
			{/if}
		{:else}
			<option disabled selected>Select your realm</option>
		{/if}
	</select>
</div>
