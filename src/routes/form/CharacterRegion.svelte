<script>	
	let id = 'region';
	let text = 'Region';

	export let value;

	const regions = ["EU", "US"];

	function verifyInput(e) {
		//error = !regions.includes(value.toLowerCase());
		value = e.target.value;
		selectedRegion.set(e.target.value);
	}

</script>

<div>
	<label class="label" for={id}>
		<span class="label-text">{text}</span>
	</label>
	
	<select class="select select-bordered w-full max-w-xs" on:change={verifyInput} bind:value={value}>
		<option disabled selected>Select your region</option>
		{#each regions as region}
			<option>{region.toUpperCase()}</option>
		{/each}
	</select>
</div>
