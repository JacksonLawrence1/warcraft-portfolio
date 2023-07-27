<script>
	import { enhance } from '$app/forms';

	import CharacterName from './CharacterName.svelte';
	import CharacterRegion from './CharacterRegion.svelte';
	import CharacterRealm from './CharacterRealm.svelte';

  let isDataLoaded = false;
  let validName = false;

	let characterName = '';
	let region = '';
	let realm = '';
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
			<CharacterName bind:value={characterName} bind:validName />
			<CharacterRegion bind:value={region} />
			<CharacterRealm bind:value={realm} bind:region bind:isDataLoaded />

			<button class="btn btn-primary mt-4" disabled={!isDataLoaded || !validName}>Submit</button>
		</form>
	</div>
</div>
