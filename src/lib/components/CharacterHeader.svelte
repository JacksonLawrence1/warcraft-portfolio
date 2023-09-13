<script>
	export let character;

    function defineLink(prefix) {
        let link = prefix;
        link += `${character.region}/`; // region
        link += `${character.slug}/`; // realm
        link += `${character.name}`; // character name
        return link;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let armoryLink = defineLink('https://worldofwarcraft.com/en-gb/character/');
    let warcraftLogsLink = defineLink('https://www.warcraftlogs.com/character/');
    let raiderIOLink = defineLink('https://raider.io/characters/');
    let wowProgressLink = defineLink('https://www.wowprogress.com/character/');
</script>

<div class="flex justify-center">
    <div class="card w-full bg-base-200 shadow-xl">
        <div class="card-header flex justify-between items-center">
            <h1 class="card-title ml-8">{capitalizeFirstLetter(character.name)}'s Profile</h1>
            <div class="mr-8 flex flex-row">
                <!--armory-->
                <button class="btn btn-circle btn-ghost" title="Armory">
					<a href={armoryLink} target="_blank">
						<img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/WoW_icon.svg" class="h-8 w-8" alt="armory" />
					</a>
				</button>

                <!--warcraft logs-->
                <button class="btn btn-circle btn-ghost" title="Warcraft Logs">
                    <a href={warcraftLogsLink} target="_blank">
                        <img src="https://assets.rpglogs.com/cms/WCL_Icon_57fc009f4e.png" class="h-8 w-8" alt="warcraft logs" />
                    </a>
                </button>

                <!--raider.io-->
                <button class="btn btn-circle btn-ghost" title="Raider.io">
					<a href={raiderIOLink} target="_blank">
						<img src="https://cdn.raiderio.net/images/brand/Mark_2ColorWhite.svg" class="h-8 w-8" alt="raider.io" />
					</a>
				</button>

                <!--wowprogress-->
                <button class="btn btn-circle btn-ghost" title="Wow Progress">
					<a href={wowProgressLink} target="_blank">
						<img src="https://addonswow.com/wp-content/themes/addonswow.com/addons/wowprogresslink/screenshots/wowprogresslink-scr-1.png" class="h-8 w-8" alt="wowprogress" />
					</a>
				</button>
            </div>
        </div>
    </div>
</div>

