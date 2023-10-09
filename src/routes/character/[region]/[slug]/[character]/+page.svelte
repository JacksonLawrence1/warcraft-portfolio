<script>
	import ProgressCard from '$lib/components/ProgressCard.svelte';
	import RankingCard from '$lib/components/RankingCard.svelte';
	import CharacterHeader from '$lib/components/CharacterHeader.svelte';

	export let data;
</script>

<div class="flex flex-col mt-4">
	<CharacterHeader character={data.character} />


	<div class="flex justify-evenly gap-4 mt-4">
	
		{#if data.raids}
			<ProgressCard raids={data.raids} />
		{/if}
	
		<RankingCard logs={data.logs} character={data.character}/>
	</div>
	
</div>
