<script>
	import { onMount } from 'svelte';

	let id = 'realm';
	let text = 'Realm';

	let data;
	let isDataLoaded = false; // Flag to indicate whether data is loaded or not

	export let region;
	export let value;
	export let realms = {
		eu: [],
		us: []
	};

	async function getRealm() {
		// check we have a region
		if (!region) return;

		// check we don't already have realm stored in local memory
		if (realms[region.toLowerCase()].length > 0) return;

		// Build the query string using URLSearchParams
		const params = new URLSearchParams();
		params.append('region', region.toLowerCase());
		const queryString = params.toString();

		const response = await fetch(`form?${queryString}`, {
			method: 'GET'
		});
		data = response.json().then((realmJSON) => {
			// store realms in local memory alphabetically in english
			realms[region.toLowerCase()] = realmJSON.realms
				.map((realm) => realm.name.en_US)
				.sort((a, b) => a.localeCompare(b));
			isDataLoaded = true; // Set the flag to indicate data is loaded
		});
	}

	// Load data when the component is mounted or when the region parameter changes
	function loadData() {
		isDataLoaded = false; // Reset the flag to indicate data is loading
		getRealm();
	}

	onMount(() => {
		loadData(); // Load data when the component is mounted
	});

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

	<select class="select select-bordered w-full max-w-xs" bind:value disabled={!region}>
		<option disabled selected>Select your realm</option>
		{#if data}
			{#await data}
				<option disabled selected>Fetching realm list...</option>
			{:then _}
				{#each realms[region.toLowerCase()] as realm}
					<option value={realm}>{realm}</option>
				{/each}
			{/await}
		{/if}
	</select>
</div>
