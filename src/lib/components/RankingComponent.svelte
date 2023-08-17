<script>
	import IoIosArrowDroprightCircle from 'svelte-icons/io/IoIosArrowDroprightCircle.svelte';

	export let log;
	export let character;

	function buildWCLLink() {
		let link = 'https://www.warcraftlogs.com/character/';
		link += `${character.region}/`; // region
		link += `${character.slug}/`; // realm
		link += `${character.name}?`; // character name
		link += `zone=${log.raid.zoneID}#`; // zone
		link += `difficulty=${log.difficulty}`; // difficulty
		return link;
	}

	function buildClass(params, rank) {
		if (rank <= 1) {
			return `${params} text-amber-100`;
		} else if (rank <= 100) {
			return `${params} text-pink-400`;
		} else if (rank <= 200) {
			return `${params} text-orange-400`;
		} else {
			return `${params} text-purple-800`;
		}
	}
</script>

{#if log}
	<div class="stats shadow">
		<div class="stat">
			<div class={buildClass("stat-value -mt-2 font-semibold", log.rank)}>Rank {log.rank}</div>
			{#if log.type === 'parse'}
				<div class="stat-title">{log.encounter.name}, Mythic</div>
				<div class="stat-desc text-secondary">
					↗︎ {log.rankPercent.toFixed(0)}th percentile ({log.spec}
					{character.class}s)
				</div>
			{:else if log.type === 'allStar'}
				<div class="stat-title">{log.raid.name}, Mythic</div>
				<div class="stat-desc text-secondary">
					↗︎ All Stars {log.points.toFixed(0)} ({log.spec} {character.class}s)
				</div>
			{/if}
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
