<script>
  // import character form from components
  import CharacterForm from './components/CharacterForm.svelte';
  import NavBar from './components/NavBar.svelte';
  import LogData from './components/LogData.svelte';

</script>

<NavBar />

<div>
  <CharacterForm class="flex flex-col justify-center" />
  <LogData />
</div>