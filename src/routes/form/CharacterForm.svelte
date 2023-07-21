<script>
	import CharacterName from "./CharacterName.svelte";
	import CharacterRegion from "./CharacterRegion.svelte";
    import CharacterRealm from "./CharacterRealm.svelte";

    export let data;
    const { realms } = data;

    let error = false;

    let characterName = "";
    let region = "";
    let realm = "";

    function submitForm() {
        if (characterName.length === 0 && !error) {
            error = true;
            return;
        }

        error = false;
        console.log("Form submitted!");
    }

</script>

<div class="card w-fit bg-base-100 shadow-xl mx-auto mb-6 mt-6">
    <!-- Character Name -->
    <div class="card-body form-control max-w-xs">
        <CharacterName bind:value={characterName} bind:error={error} />
        <CharacterRegion bind:value={region} />
        <CharacterRealm bind:value={realm} {realms} bind:region={region} />

        <button class="btn btn-primary mt-4" on:click={submitForm} disabled={realm.length === 0}>Submit</button>
    </div>
</div>