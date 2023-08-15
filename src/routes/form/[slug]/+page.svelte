<script>
	import ProgressCard from '$lib/components/ProgressCard.svelte';
	import RankingCard from '$lib/components/RankingCard.svelte';

	export let data;
</script>

<div class="flex justify-center">
	<div class="card w-fit h-fit bg-base-100 shadow-xl">
		<div class="card-body">
			<div class="card-header">
				<h1 class="card-title">{data.character.name}'s Profile</h1>
			</div>
		</div>
	</div>
</div>

<div class="flex justify-center gap-4">
	{#if data.raids}
		<ProgressCard raids={data.raids} />
	{/if}

	<RankingCard logs={data.logs} character={data.character}/>
</div>
