<script>
  import GiBlackKnightHelm from 'svelte-icons/gi/GiBlackKnightHelm.svelte'
</script>

<div class="hero min-h-screen bg-base-100">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="w-96 h-96">
      <GiBlackKnightHelm />
    </div>
    <div>
      <h1 class="text-5xl font-bold">Warcraft Portfolio</h1>
      <p class="text-base-content/60 font-title py-4 font-light md:text-lg xl:text-2xl w-96">
        {@html "Warcraft Portfolio makes it <span class='border-base-content/20 border-b-2'>easier than ever</span> to showcase your achievements in WoW, across multiple sources."}
      </p>
      <div class="flex flex-row justify-center gap-4">
        <a href="/form"><button class="btn btn-primary">Get Started</button></a>
      </div>
    </div>
  </div>
</div>