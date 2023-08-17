<script>
	import { onMount } from 'svelte';
	import RankingComponent from './RankingComponent.svelte';
	import InfoButton from './InfoButton.svelte';

	export let logs;
	export let character;

	let achievements = [];

	onMount(() => {
		// multiple rankings in future, for now only shows single highest rank
		achievements = getBestAchievements();
	});

	function getBestAchievements() {
		let rankings = getHighestRanks();
		let allStars = getAllStars();

		if (allStars.length >= 5) {
			achievements = [...allStars.slice(0, 3)];
		}

		// if not enough allstars, fill with best parses until 5
		let parseCount = 5 - achievements.length;
		let parseIndex = 0;
		while (parseCount > 0) {
			achievements.push(rankings[parseIndex]);
			parseIndex++;
			parseCount--;
		}
		console.log(achievements);
		return achievements;
	}

	function getAllStars() {
		let allStars = [];
		logs.forEach((log) => {
			if (log.allStars && log.allStars.rank <= 500) {
				allStars.push({
					type: 'allStar',
					rank: log.allStars.rank,
					points: log.allStars.points,
					spec: log.allStars.spec,
					difficulty: log.difficulty,
					raid: log.raid,
					metric: log.metric
				});
			}
		});
		// sort by rank
		return allStars.sort((a, b) => a.rank - b.rank);
	}

	// gets single highest rank from all logs in mythic difficulty
	function getHighestRanks() {
		let highestRankings = [];
		logs.forEach((logs) => {
			logs.rankings.forEach((log) => {
				// get rankings for top 500
				if (log.allStars?.rank <= 500) {
					highestRankings.push({
						type: 'parse',
						rank: log.allStars.rank,
						rankPercent: log.allStars.rankPercent,
						spec: log.spec,
						encounter: log.encounter,
						difficulty: logs.difficulty,
						raid: logs.raid,
						metric: logs.metric
					});
				}
			});
		});
		return highestRankings.sort((a, b) => a.rank - b.rank);
	}
</script>

{#if achievements.length > 0}
	<div class="card w-fit h-fit bg-base-200 shadow-xl">
		<div class="card-body">
			<div class="card-header flex flex-row justify-between">
				<h1 class="card-title">Notable Achievements</h1>
				<InfoButton
					id="achievements"
					title="Ranking Integrity"
					info="Data is obtained from the WarcraftLogs API. If the information appears to be incorrect, it may be due to how WarcraftLogs partitions rankings (see here)."
				/>
			</div>
			{#each achievements as achievement}
				<RankingComponent log={achievement} {character} />
			{/each}
		</div>
	</div>
{/if}
