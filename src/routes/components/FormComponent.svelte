<script>
    import { onMount } from 'svelte';

    export let id;
    export let text = "Missing label";
    export let value;

    export let submitted = false;
    let changed = false;

    // check if the input field is empty
    function isEmpty(value) {
        return value === '';
    }

    function handleChange(e) {
        if (!isEmpty) {
            changed = true;
        }
    }

</script>

<div>
    <label class="label" for={id}>
        <span class="label-text">{text}</span>
    </label>
    <input 
        id={id} 
        bind:value={value}
        on:input={handleChange}
        type="text" 
        placeholder="Type here" 
        class="input input-bordered w-full max-w-xs" 
        class:input-error={!changed && submitted && isEmpty(value)}
    />
</div>