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
</script>

{#if log}
	<div class="stats shadow">
		<div class="stat">
			<div class="stat-value">Rank {log.rank}</div>
			<div class="stat-title">{log.encounter.name}, Mythic</div>
			<div class="stat-desc text-secondary">↗︎ {log.rankPercent.toFixed(0)}th percentile ({log.spec} {character.class}s)</div>
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
