<script>
	import { onMount } from 'svelte';
	import RaidProgress from '../../components/RaidProgress.svelte';

	export let data;


</script>

<div class="card w-fit h-fit bg-base-100 shadow-xl">
	<div class="card-body">
		<div class="card-header">
			<h1 class="card-title">{data.character.name}'s Profile</h1>
		</div>
	</div>
</div>


{#if data.raids}
    <RaidProgress raids={data.raids} />
{/if}