<script>
	let id = 'characterName';
	let text = 'Character Name';
	export let value;
	export let validName = false;

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
</script>

<div>
	<label class="label" for={id}>
		<span class="label-text">{text}</span>
	</label>

	<input
		{id}
		bind:value
		type="text"
		name={id}
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
		on:input={() => {
			validName = isValidWowName(value);
		}}
	/>
</div>
