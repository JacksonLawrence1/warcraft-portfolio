<script>
  export let data;

  const { wowToken } = data;

</script>


<div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Realm Name</th>
      </tr>
    </thead>
    <tbody>
      {#each wowToken as realm, i}
        <tr>
          <td>{i + 1}</td>
          <td>{realm}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>