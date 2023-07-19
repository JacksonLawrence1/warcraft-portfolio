<script>
    import FormComponent from "./FormComponent.svelte";

    let characterName = "";
    let realm = "";

    let submitted = false;

    function submitForm() {
        if (characterName !== "" && realm !== "") {
            console.log("Character Name: " + characterName);
            console.log("Realm: " + realm);
        }
        submitted = true;
    }

</script>

<div class="card w-fit bg-base-100 shadow-xl mx-auto mb-6 mt-6">
    <!-- Character Name -->
    <div class="card-body form-control max-w-xs">
        <FormComponent id="characterName" text="Character Name" bind:value={characterName} bind:submitted={submitted} />
        <FormComponent id="realm" text="Realm" bind:value={realm} bind:submitted={submitted} />
        <button class="btn btn-primary mt-4" on:click={submitForm} >Submit</button>
    </div>
</div>