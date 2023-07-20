<script>
	let id = 'CharacterName';
	let text = 'Character Name';
	export let error = false;
	export let value;

</script>

<div>
	<label class="label" for={id}>
		<span class="label-text">{text}</span>
	</label>
	{#if error}
		<p class="text-error">Please choose a valid region</p>
	{/if}
	<input
		{id}
		bind:value
		type="text"
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
		class:input-error={error}
	/>
</div>
