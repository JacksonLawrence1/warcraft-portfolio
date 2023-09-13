<script>
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';
	import GoThreeBars from 'svelte-icons/go/GoThreeBars.svelte';
</script>

<div class="navbar bg-base-200">
	<div class="navbar-start">
		<div class="dropdown">
			<label for="navmenu" tabindex="-1" class="btn btn-ghost btn-square">
				<GoThreeBars />
			</label>
			<ul
				id="navmenu"
				tabindex="-1"
				class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a href="/">Home</a></li>
				<li><a href="/form" data-sveltekit-preload-data>Search</a></li>
				<li><a href="/about" data-sveltekit-preload-data>About</a></li>
			</ul>
		</div>
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl" href="/" target="_self">Warcraft Portfolio</a>
		</div>
	</div>
	<div class="navbar-end">
		<a href="https://github.com/JacksonLawrence1/warcraft-portfolio" target="_blank">
			<button class="btn btn-ghost btn-square">
				<GoMarkGithub />
			</button>
		</a>
	</div>
</div>
