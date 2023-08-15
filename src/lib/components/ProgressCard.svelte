<script>
	import IoIosInformationCircleOutline from 'svelte-icons/io/IoIosInformationCircleOutline.svelte';
	import RaidComponent from './RaidComponent.svelte';

	export let raids;
</script>

{#if raids}
	<div class="card w-fit h-fit bg-base-200 shadow-xl">
		<div class="card-body">
			<div class="card-header flex flex-row justify-between">
				<h1 class="card-title">Raid Progress</h1>
				<button
					class="btn btn-ghost btn-square btn-sm -mt-2 -mr-2"
					on:click={() => window.wcl_info.showModal()}
				>
					<IoIosInformationCircleOutline />
				</button>
				<dialog id="wcl_info" class="modal">
					<form method="dialog" class="modal-box">
						<h3 class="font-bold text-lg">Character Information</h3>
						<p class="py-4">
							Data is obtained from the public WoW API. If the information does not appear to
							be correct, there may have been an error fetching the data.
						</p>
					</form>
					<form method="dialog" class="modal-backdrop">
						<button>close</button>
					</form>
				</dialog>
			</div>
			<div class="flex flex-col gap-y-2">
				{#each raids as raid}
					<RaidComponent {raid} />
				{/each}
			</div>
		</div>
	</div>
{/if}
