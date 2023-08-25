<script>
	import ProgressCard from '$lib/components/ProgressCard.svelte';
	import RankingCard from '$lib/components/RankingCard.svelte';
	import GuildHistoryCard from '$lib/components/GuildHistoryCard.svelte';
	import CharacterHeader from '$lib/components/CharacterHeader.svelte';

	export let data;
</script>

<CharacterHeader character={data.character} />

<div class="flex justify-center">
	<div class="card w-fit h-fit bg-base-200 shadow-xl">
		<div class="card-body">
			<div class="card-header">
				<h1 class="card-title">Bio</h1>
			</div>
			<p>
				Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
				Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
				sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
				Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed,
				commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros
				ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar
				facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue,
				eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan
				porttitor, facilisis luctus, metus
			</p>
		</div>
	</div>
</div>

<div class="flex justify-center gap-4 mt-4">

	{#if data.raids}
		<ProgressCard raids={data.raids} />
	{/if}

	<RankingCard logs={data.logs} character={data.character}/>

	<GuildHistoryCard />
</div>
