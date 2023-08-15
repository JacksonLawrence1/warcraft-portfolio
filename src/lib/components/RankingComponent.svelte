<script>
	import IoIosArrowDroprightCircle from 'svelte-icons/io/IoIosArrowDroprightCircle.svelte';

	export let rank;
	export let character;

	function buildWCLLink() {
		// todo: make these dynamic
		let zoneID = 28;
		let difficulty = 5; // mythic for time being

		let link = 'https://www.warcraftlogs.com/character/';
		link += `${character.region}/`; // region
		link += `${character.slug}/`; // realm
		link += `${character.name}?`; // character name
		link += `zone=${zoneID}#`; // zone
		link += `difficulty=${difficulty}&`; // difficulty
		link += `boss=${rank.encounter.id}`; // boss id
		return link;
	}
</script>

{#if rank}
	<div class="stats shadow">
		<div class="stat">
			<div class="stat-value">Rank {rank.allStars.rank}</div>
			<div class="stat-title">{rank.encounter.name}</div>
			<div class="stat-desc text-secondary">{rank.bestSpec} {character.class}</div>
			<div class="stat-figure">
				<button class="btn btn-square btn-ghost">
					<a href={buildWCLLink()} target="_blank">
						<IoIosArrowDroprightCircle />
					</a>
				</button>
			</div>
		</div>
	</div>
{/if}
