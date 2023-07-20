<script>
	let id = 'CharacterName';
	let text = 'Character Name';
	export let error = false;
	export let value;

	function isValidWowName(name) {
		// Check the length of the name
		if (name.length < 2 || name.length > 12) {
			return false;
		}

		// Regular expression to check for valid characters
		const validCharacters = /^[a-zA-Z' ]+$/;

		// Check if the name contains valid characters
		if (!validCharacters.test(name)) {
			return false;
		}

		// Check if the name starts with a letter or apostrophe
		const firstChar = name.charAt(0);
		if (!/^[a-zA-Z']$/.test(firstChar)) {
			return false;
		}

		return true;
	}

	function verifyInput() {
		error = !isValidWowName(value);
	}

</script>

<div>
	<label class="label" for={id}>
		<span class="label-text">{text}</span>
	</label>
	{#if error}
		<p class="text-error">Please enter a valid name</p>
	{/if}
	<input
		{id}
		bind:value
		on:change={verifyInput}
		type="text"
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
		class:input-error={error}
	/>
</div>
