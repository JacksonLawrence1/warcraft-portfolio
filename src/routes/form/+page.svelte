<script>
	import { enhance } from '$app/forms';

	import CharacterName from './CharacterName.svelte';
	import CharacterRegion from './CharacterRegion.svelte';
	import CharacterRealm from './CharacterRealm.svelte';

	export let form;

	let validRealm = false;
	let validName = false;
	let submitted = false;

	let characterName = '';
	let region = '';
	let realm = '';

	const submit = () => {
		submitted = true;
	};
</script>

<div class="card w-fit bg-base-100 shadow-xl mx-auto mb-6 mt-6">
	<div class="card-body form-control max-w-xs">
		<form
			method="POST"
			action="?/search"
			use:enhance={() => {
				return async ({ update }) => {
					update({ reset: false });
				};
			}}
		>
			{#if form?.error}
				<CharacterName bind:value={characterName} bind:submitted bind:validName submittedError={true} />
			{:else}
				<CharacterName bind:value={characterName} bind:submitted bind:validName submittedError={false} />
			{/if}
			<CharacterRegion bind:value={region} />
			<CharacterRealm bind:value={realm} bind:region bind:validRealm />

			<button
				class="btn btn-primary mt-4"
				disabled={!validRealm || !validName || submitted}
				on:click={submit}>Submit</button
			>
		</form>
	</div>
</div>
