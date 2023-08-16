const raids = [];

function buildURL(zoneID) {
	return `https://assets.rpglogs.com/img/warcraft/zones/zone-${zoneID}.png`
}

function createRaid(id, zoneID, name, slug) {
	raids.push({
		id,
		zoneID,
		slug,
		name,
		image: buildURL(zoneID)
	})
}

// dragonflight
createRaid(1208, 33, 'Aberrus, the Shadowed Crucible', 'aberrus');
createRaid(1200, 31, 'Vault of the Incarnates', 'vault');

// shadowlands
createRaid(1195, 29, 'Sepulcher of the First Ones', 'sepulcher');
createRaid(1193, 28, 'Sanctum of Domination', 'sanctum');
createRaid(1190, 26, 'Castle Nathria', 'nathria');

// battle for azeroth
createRaid(1180, 24, "Ny'alotha, the Waking City", 'nyalotha');
createRaid(1179, 23, 'The Eternal Palace', 'palace');
createRaid(1177, 22, 'Crucible of Storms', 'crucible');
createRaid(1176, 21, 'Battle of Dazar\'alor', 'dazaralor');
createRaid(1031, 19, 'Uldir', 'uldir');

// legion
createRaid(946, 17, 'Antorus, the Burning Throne', 'antorus');
createRaid(875, 13, 'Tomb of Sargeras', 'tomb');
createRaid(861, 12, 'Trial of Valor', 'trial');
createRaid(786, 11, 'The Nighthold', 'nighthold');
createRaid(768, 10, 'The Emerald Nightmare', 'emerald');

// wod
createRaid(669, 8, 'Hellfire Citadel', 'hellfire');
createRaid(457, 7, 'Blackrock Foundry', 'blackrock');
createRaid(477, 6, 'Highmaul', 'highmaul');

export function getRaidFromId(id) {
	return raids.find(raid => raid.id === id);
}

export function getImage(id) {
	const raid = getRaidFromId(id);
	return raid ? raid.image : null;
}

export function getRaidFromSlug(slug) {
	return raids.find(raid => raid.slug === slug);
}

export function getZoneID(id) {
	const raid = getRaidFromId(id);
	return raid ? raid.zoneID : null;
}

export function getRaids(ids) {
	return ids ? raids.filter(raid => ids.includes(raid.id)) : raids;
}
