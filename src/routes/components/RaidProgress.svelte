<script>
	import IoIosInformationCircleOutline from 'svelte-icons/io/IoIosInformationCircleOutline.svelte';

	export let aberrusProgress;

	// to be replaced with API call
	let raids = [
		{
			name: 'Aberrus, the Shadowed Crucible',
			image: 'https://assets.rpglogs.com/img/warcraft/zones/zone-33.png',
			bosses: 9,
			progress: {
				normal: aberrusProgress.normal,
				heroic: aberrusProgress.heroic,
				mythic: aberrusProgress.mythic
			}
		}
	];
</script>

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
						Data is obtained live from <a href="https://www.warcraftlogs.com/" class="link link-secondary">WarcraftLogs</a>. If information does not appear to be
						correct, there may have been an error fetching the data, or that the
						information has not been fully updated yet.
					</p>
				</form>
				<form method="dialog" class="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
		<div class="flex flex-col gap-y-2">
			{#each raids as raid}
				<div class="flex flex-row bg-base-200 rounded-xl p-2">
					<img alt={raid.name} src={raid.image} class="w-14 h-14 rounded" />
					<div class="flex flex-col w-60 justify-center ml-3 mr-1">
						<h1 class=" text-left text-base font-semibold">{raid.name}</h1>
						<div class="flex flex-row font-semibold">
							<p class="text-blue-500 w-16 text-left">N: {raid.progress.normal}/{raid.bosses}</p>
							<p class="text-purple-500 w-16 text-center">
								HC: {raid.progress.heroic}/{raid.bosses}
							</p>
							<p class="text-orange-500 w-16 text-right">M: {raid.progress.mythic}/{raid.bosses}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
