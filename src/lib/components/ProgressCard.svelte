<script>
	import RaidComponent from './RaidComponent.svelte';
	import InfoButton from './InfoButton.svelte';

	export let raids;
</script>

{#if raids}
	<div class="card w-fit h-fit bg-base-200 shadow-xl">
		<div class="card-body">
			<div class="card-header flex flex-row justify-between">
				<h1 class="card-title">Raid Progress</h1>
				<InfoButton
					id="rankings"
					title="Character Information"
					info="Data is obtained from the public WoW API. If the information does not appear to be correct,
				there may have been an error fetching the data."
				/>
			</div>
			<div class="flex flex-col gap-y-2">
				{#each raids as raid}
					<RaidComponent {raid} />
				{/each}
			</div>
		</div>
	</div>
{/if}
