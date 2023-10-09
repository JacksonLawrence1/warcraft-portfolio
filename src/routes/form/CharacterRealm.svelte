<script>
	import { realms } from '$lib/stores.js';
	import { get } from 'svelte/store';

	let id = 'realm';
	let text = 'Realm';

	let data;

	export let region;
	export let value = '';
	export let validRealm = false;

	let isDataLoaded;
	let realm;

	let typing = false;
	let loadedRealms;

	realms.subscribe((realm) => {
		if (!realm[region.toLowerCase()]) return;

		// sort by name alphabetically in english
		loadedRealms = realm[region.toLowerCase()].sort((a, b) => {
			return a.name.en_US.localeCompare(b.name.en_US);
		});
		value = '';
	});

	async function getRealm() {
		// check we have a region
		if (!region) return;

		// check we don't already have realm stored in local memory
		if (get(realms)[region.toLowerCase()]) {
			isDataLoaded = true;
			value = '';
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
		validRealm = false;

		getRealm();
	}

	// Use a reactive statement to trigger data loading when the 'region' parameter changes
	$: {
		if (region) {
			loadData();
		}
	}

	function selectRealm(e) {
		e.preventDefault();

		realm = e.target.value;
		value = e.target.name;

		checkInput(value);
	}

	function checkInput(e) {
		validRealm = false;

		if (!realms || !region) {
			return;
		}

		let input;
		if (e.target) {
			input = e.target.value.toLowerCase();
		} else {
			input = e.toLowerCase();
		}
		
		// filter loadedRealms by input and make sure they are not already selected
		loadedRealms = get(realms)[region.toLowerCase()].filter((realm) => {
			if (realm.name.en_US.toLowerCase() === input) {
				validRealm = true;
				return false;
			}
			return realm.name.en_US.toLowerCase().includes(input);
		});
	}
</script>

<style>
	input:disabled {
		background-color: #393e46;
	}
</style>

<div>
	<label class="label" for={id}>
		<span class="label-text">{text}</span>
	</label>

	<div class="dropdown">
		<input
			{id}
			bind:value
			type="text"
			name={id}
			placeholder={!isDataLoaded ? '' : 'Type here'}
			class="input input-bordered w-full max-w-xs"
			disabled={!isDataLoaded}
			on:input={checkInput}
			on:change={checkInput}
			on:focus={() => typing = true}
			on:blur={() => typing = false}
		/>
		{#if isDataLoaded && loadedRealms.length > 0}
		<div class="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col w-full">
			<ul class="menu menu-compact bg-opacity-100">
				{#each loadedRealms as realm}
				<li>
					<button name={realm.name.en_US} value={realm.slug} on:click={selectRealm}  >
						{realm.name.en_US}
					</button>
				</li>
				{/each}
			</ul>
		</div>
		{/if}
	</div>
</div>
