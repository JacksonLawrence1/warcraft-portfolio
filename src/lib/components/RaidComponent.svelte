<script>
    export let raid;

    function getProgress(raid, difficulty) {
		let count = 0;

		// Find the progress for the specified difficulty
		const completed = raid.progress.find(prog => prog.type === difficulty);

		if (completed) count = completed.completed_count;
		
		return count + '/' + raid.total_count;
	}
</script>

<div class="flex flex-row bg-base-200 rounded-xl p-2">
    <img alt={raid.name} src={raid.image} class="w-14 h-14 rounded" />
    <div class="flex flex-col w-60 justify-center ml-3 mr-1">
        <h1 class=" text-left text-base font-semibold">{raid.name}</h1>
        <div class="flex flex-row font-semibold">
            <p class="text-blue-500 w-16 text-left">N: {getProgress(raid, 'NORMAL')}</p>
            <p class="text-purple-500 w-16 text-left">H: {getProgress(raid, 'HEROIC')}</p>
            <p class="text-orange-500 w-16 text-left">M: {getProgress(raid, 'MYTHIC')}</p>
        </div>
    </div>
</div>