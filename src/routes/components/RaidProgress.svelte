<script>

	// to be replaced with API call
	export const raids = [
		{
			name: 'Aberrus, the Shadowed Crucible',
			image: 'https://assets.rpglogs.com/img/warcraft/zones/zone-33.png',
			bosses: 9,
			progress: {
				normal: 9,
				heroic: 9,
				mythic: 9
			}
		},
		{
			name: 'Vault of the Incarnates',
			image: 'https://assets.rpglogs.com/img/warcraft/zones/zone-31.png',
			bosses: 8,
			progress: {
				normal: 8,
				heroic: 8,
				mythic: 8
			}
		},
		{
			name: 'Sepulcher of the First Ones',
			image: 'https://assets.rpglogs.com/img/warcraft/zones/zone-29.png',
			bosses: 11,
			progress: {
				normal: 11,
				heroic: 11,
				mythic: 8
			}
		},
		{
			name: 'Sanctum of Domination',
			image: 'https://assets.rpglogs.com/img/warcraft/zones/zone-28.png',
			bosses: 10,
			progress: {
				normal: 10,
				heroic: 10,
				mythic: 10
			}
		}
	];

	let maxTitleWidth = 0;

	function updateMaxTitleWidth() {
		const titleElements = document.querySelectorAll('.raid-title');
		titleElements.forEach((element) => {
			const width = element.clientWidth;
			if (width > maxTitleWidth) {
				maxTitleWidth = width;
			}
		});
	}
</script>

<div class="card w-fit h-fit bg-base-100 shadow-xl">
	<div class="card-body">
		<div class="card-header">
			<h1 class="card-title">Raid Progress</h1>
		</div>
		<div class="flex flex-col gap-y-2">
			{#each raids as raid}
			<div class="flex flex-row bg-base-200 rounded-xl p-2">
				<img alt={raid.name} src={raid.image} class="w-14 h-14 rounded" />
				<div class="flex flex-col w-60 justify-center ml-3 mr-1">
					<h1 class=" text-left text-base font-semibold">{raid.name}</h1>
					<div class="flex flex-row font-semibold">
						<p class="text-blue-500 w-16 text-left">N: {raid.progress.normal}/{raid.bosses}</p>
						<p class="text-purple-500 w-16 text-center">HC: {raid.progress.heroic}/{raid.bosses}</p>
						<p class="text-orange-500 w-16 text-right">M: {raid.progress.mythic}/{raid.bosses}</p>
					</div>
				</div>
			</div>
		{/each}
		</div>
	</div>
</div>
