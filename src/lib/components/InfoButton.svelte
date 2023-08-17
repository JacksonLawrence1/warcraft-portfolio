<script>
    import IoIosInformationCircleOutline from 'svelte-icons/io/IoIosInformationCircleOutline.svelte';

    export let title;
    export let id;
    export let info;
</script>

<button
	class="btn btn-ghost btn-square btn-sm -mt-2 -mr-2"
	on:click={() => window[id].showModal()}
>
	<IoIosInformationCircleOutline />
</button>
<dialog id={id} class="modal">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">{title}</h3>
		<p class="py-4">
			{info}
		</p>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
