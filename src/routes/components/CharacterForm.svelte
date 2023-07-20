<script>
	import CharacterName from "./CharacterName.svelte";

    let formAmount = 3;

    let validInputs = Array(3).fill(formAmount, true);

    let characterName = "";
    let realm = "";

</script>

<div class="card w-fit bg-base-100 shadow-xl mx-auto mb-6 mt-6">
    <!-- Character Name -->
    <div class="card-body form-control max-w-xs">
        <CharacterName bind:value={characterName} bind:error={validInputs[0]} />
        <button class="btn btn-primary mt-4">Submit</button>
    </div>
</div>