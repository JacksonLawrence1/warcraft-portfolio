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
			<ul id="navmenu" tabindex="-1" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
				<li><a href="/">Home</a></li>
				<li><a href="/form" data-sveltekit-preload-data>Form</a></li>
				<li><a href="/showcase">Showcase</a></li>
			</ul>
		</div>
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl" href="./" target="_self">WoWPortfolio</a>
		</div>
	</div>
	<div class="navbar-end">
		<button class="btn btn-ghost btn-square">
			<GoMarkGithub />
		</button>
	</div>
</div>
