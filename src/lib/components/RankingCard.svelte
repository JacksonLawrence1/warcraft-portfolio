<script>
	import { onMount } from 'svelte';
	import RankingComponent from './RankingComponent.svelte';

	export let logs;
	export let character;

	let achievements = [];

	onMount(() => {
		let rankings = logs.sanctum.mythic.rankings;
		achievements = [...achievements, getHighestRank(rankings)];
	});

	function getHighestRank(rankings) {
		let highestRank = null;
		for (let i = 0; i < rankings.length; i++) {
			if (
				rankings[i].allStars &&
				(highestRank == null || rankings[i].allStars.rank < highestRank.allStars.rank)
			) {
				highestRank = rankings[i];
			}
		}
		return highestRank;
	}
</script>

{#if achievements.length > 0}
	<div class="card w-fit h-fit bg-base-200 shadow-xl">
		<div class="card-body">
			<div class="card-header flex flex-row justify-between">
				<h1 class="card-title">Notable Achievements</h1>
			</div>

			<RankingComponent rank={achievements[0]} character={character} />
		</div>
	</div>
{/if}
