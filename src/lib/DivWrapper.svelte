<script>
	export let wrap = false;
    export let text;
    export let classAttributes;

</script>

{#if wrap}
	<div {...$$restProps} class={classAttributes} data-tip={text}>
		<slot />
	</div>
{:else}
	<slot />
{/if}
