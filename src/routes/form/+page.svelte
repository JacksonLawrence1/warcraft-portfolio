<script>
    // import character form from components
    import CharacterForm from './CharacterForm.svelte';

    export let data;

  </script>
    
  <div>
    <CharacterForm {data} />
  </div>