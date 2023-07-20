<script>
    // import character form from components
    import CharacterForm from '../components/CharacterForm.svelte';
    import NavBar from '../components/NavBar.svelte';  

    export let data;
    $: ( { products } = data ) 

  </script>
    
  <div>
    <CharacterForm />
    
  </div>