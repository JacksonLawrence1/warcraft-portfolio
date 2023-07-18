<script>
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';
	import GoThreeBars from 'svelte-icons/go/GoThreeBars.svelte';
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<label for="navmenu" tabindex="0" class="btn btn-ghost btn-square">
                <GoThreeBars class="flex" fill="none" />
			</label>
			<ul id="navmenu" tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
				<li><a>Test 1</a></li>
				<li><a>Test 2</a></li>
			</ul>
		</div>
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl" href="./">WoWPortfolio</a>
		</div>
	</div>
	<div class="navbar-end">
		<button class="btn btn-ghost btn-square">
			<GoMarkGithub class="flex" fill="none" />
		</button>
	</div>
</div>
