<script>
	import { onMount } from 'svelte';
	import RaidProgress from '../../components/RaidProgress.svelte';

	export let data;

    let highestRank;
    let progress = {};

	const getHighestRank = () => {
		const rankings = data.aberrus.heroic.rankings;

		rankings.forEach((ranking) => {
			if (ranking.allStars && (!highestRank || ranking.allStars.rank < highestRank.allStars.rank)) {
				highestRank = ranking;
                highestRank.difficulty = "Heroic";
			}
		});
	};

    const getProgress = (difficulty) => {
        progress[difficulty] = 0;
        data.aberrus[difficulty].rankings.forEach((encounter) => {
            if (encounter.allStars) {
                progress[difficulty]++;
            }
        });
    }

    onMount(() => {
        //getHighestRank();

        getProgress("normal");
        getProgress("heroic");
        getProgress("mythic");

        // trigger reactivity
        progress = progress;
    });

</script>

<div class="card w-fit h-fit bg-base-100 shadow-xl">
	<div class="card-body">
		<div class="card-header">
			<h1 class="card-title">{data.character.name}'s Profile</h1>
		</div>
		
	</div>
</div>

{#if progress.normal || progress.heroic || progress.mythic}
    <RaidProgress bind:aberrusProgress={progress} />
{/if}
