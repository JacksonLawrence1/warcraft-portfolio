<script>
	import { onMount } from "svelte";

	let id = 'realm';
	let text = 'Realm';

	export let region;
	export let value;
	export let realms;

	async function getRealm() {
		const response = await fetch('form', {
            method: 'GET',
        })
        const resJSON = await response.json()
        console.log(resJSON)
	}

	onMount	(async () => {
		await getRealm();
	});
</script>

<div>
	<label class="label" for={id}>
		<span class="label-text">{text}</span>
	</label>

	<select class="select select-bordered w-full max-w-xs" bind:value disabled={!region}>
		<option disabled selected>Select your realm</option>
		{#if region}
			{#each realms[region.toLowerCase()] as realm}
				<option value={realm}>{realm}</option>
			{/each}
		{/if}
	</select>
</div>
