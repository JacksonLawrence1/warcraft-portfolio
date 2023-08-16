<script>
	import { onMount } from 'svelte';
	import RankingComponent from './RankingComponent.svelte';

	export let logs;
	export let character;

	let achievements = [];

	onMount(() => {
		// multiple rankings in future, for now only shows single highest rank
		achievements = getHighestRank();
	});

	// gets single highest rank from all logs in mythic difficulty
	function getHighestRank() {
		let highestRank = [];
		logs.forEach((logs) => {
			logs.rankings.forEach((log) => {
				// only show highest logs in the top 100, also limit to 5
				if (log.allStars?.rank <= 100 && highestRank.length < 5) {
					highestRank.push({
						rank: log.allStars.rank,
						rankPercent: log.allStars.rankPercent,
						spec: log.spec,
						encounter: log.encounter,
						difficulty: logs.difficulty,
						raid: logs.raid,
						metric: logs.metric,
					});
				}
			});
		});
		return highestRank;
	}
</script>

{#if achievements.length > 0}
	<div class="card w-fit h-fit bg-base-200 shadow-xl">
		<div class="card-body">
			<div class="card-header flex flex-row justify-between">
				<h1 class="card-title">Notable Achievements</h1>
			</div>
			{#each achievements as achievement}
				<RankingComponent log={achievement} character={character} />
			{/each}
		</div>
	</div>
{/if}
