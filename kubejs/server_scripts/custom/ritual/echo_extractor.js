// =============================================================================
// ECHO EXTRACTOR — EVENT CHANCE REFERENCE
// =============================================================================
//
// [ EXTRACTION RITUAL — MASTERY-SCALED TIMINGS ]
//   Both timings scale linearly from mastery 0 → 150, then hold at minimum.
//
//   Cooldown after use:
//     Mastery   0  ............ 20s (400 ticks)
//     Mastery  75  ............ 12.5s (250 ticks)
//     Mastery 150+ ............ 5s  (100 ticks, minimum)
//
//   Cast time (slowness + schedule delay):
//     Mastery   0  ............ 6s  (120 ticks)
//     Mastery  75  ............ 4s  (80 ticks)
//     Mastery 150+ ............ 2s  (40 ticks, minimum)
//
// [ FAILURE CHECKS — applied in order after cast completes ]
//
//   1. Stability Check (ALWAYS, cannot be reduced by mastery)
//      Total chance ................. 5%
//      └─ Critical Failure (block destroyed + recoil) ... 30% of 5% = 1.5%
//      └─ Soft Failure (block saved, ritual fizzles)  ... 70% of 5% = 3.5%
//
//   2. Temporal Remnant (Vex spawns, blindness, no tome)
//      Base chance .................. 30%  (at mastery 0)
//      Scales down .................. -0.1% per mastery point
//      Minimum floor ................ 5%   (reached at mastery 250)
//
// [ SUCCESS — if both failure checks pass ]
//   Theme rolled .................... uniform random from 30 THEMES
//   Mastery gained .................. +1.0 per success
//   Bonus Tier ...................... Math.floor(mastery / 10)
//
// [ SEALED TOME — opened on right-click ]
//   Rarity thresholds (base → floor as tier grows):
//     Rare    (pool[3], Tier 3+) .... roll > max(0.50, 0.90 - tier*0.01)
//     Uncommon(pool[2], Tier 1+) .... roll > max(0.30, 0.70 - tier*0.01)
//     Common  (pool[0-1]) ........... fallback
//   Gold bonus (Tier 1+) ............ 70% chance per tome open
//     └─ Gold Ingot vs Nugget ........ ingot if bonusTier >= 50, else nugget
//   Jackpot: Nether Star (Tier 50+) . 1% chance
//
// =============================================================================	
function syncExtractorStats(player) {
    let masteryVal = player.persistentData.ritual_mastery || 0.0;
    let cooldownVal = player.persistentData.extractor_cooldown || 0;
    let discoveriesVal = player.persistentData.echo_discoveries || "";

    player.sendData('sync_extractor_stats', {
        mastery: masteryVal,
        cooldown: Number(cooldownVal),
        discoveries: String(discoveriesVal),
        castTicks: getExtractorCastTicks(masteryVal),
        cooldownTicks: getExtractorCooldown(masteryVal)													   
    });
}

PlayerEvents.loggedIn(event => {
    syncExtractorStats(event.player);
});

// Returns cooldown ticks scaled by mastery (20s → 5s over 150 levels, linear)
function getExtractorCooldown(mastery) {
    return Math.max(100, 400 - Math.floor(Math.min(mastery, 150) / 150 * 300));
}

// Returns cast ticks scaled by mastery (6s → 2s over 150 levels, linear)
function getExtractorCastTicks(mastery) {
    return Math.max(40, 120 - Math.floor(Math.min(mastery, 150) / 150 * 80));
}
const THEMES = [
    { id: "eldritch", name: "Eldritch", color: "dark_purple" },
    { id: "warbound", name: "Warbound", color: "red" },
    { id: "overgrown", name: "Overgrown", color: "green" },
    { id: "scorched", name: "Scorched", color: "gold" },
    { id: "sunken", name: "Sunken", color: "blue" },
    { id: "volcanic", name: "Volcanic", color: "dark_red" },
    { id: "abyssal", name: "Abyssal", color: "dark_blue" },
    { id: "mechanical", name: "Mechanical", color: "gray" },
    { id: "celestial", name: "Celestial", color: "aqua" },
    { id: "fungal", name: "Fungal", color: "light_purple" },
	{ id: 'glacial', name: 'Glacial', color: 'white' },
    { id: 'gilded', name: 'Gilded', color: 'gold' },
    { id: 'electrified', name: 'Electrified', color: 'yellow' },
    { id: 'aetheric', name: 'Aetheric', color: 'light_purple' },
    { id: 'cavernous', name: 'Cavernous', color: 'dark_gray' },
    { id: 'bastion', name: 'Bastion', color: 'dark_red' },
    { id: 'stronghold', name: 'Stronghold', color: 'dark_green' },
    { id: 'monumental', name: 'Monumental', color: 'dark_aqua' },
    { id: 'dilapidated', name: 'Dilapidated', color: 'gold' },
    { id: 'industrial', name: 'Industrial', color: 'gray' },
    { id: 'skeletal', name: 'Skeletal', color: 'white' },
    { id: 'insectoid', name: 'Insectoid', color: 'green' },
    { id: 'reptilian', name: 'Reptilian', color: 'dark_green' },
    { id: 'ichorous', name: 'Ichorous', color: 'red' },
    { id: 'draconic', name: 'Draconic', color: 'dark_purple' },
    { id: 'void', name: 'Void', color: 'black' },
    { id: 'crystalline', name: 'Crystalline', color: 'aqua' },
    { id: 'radiant', name: 'Radiant', color: 'yellow' },
    { id: 'forbidden', name: 'Forbidden', color: 'dark_red' },
    { id: 'echoing', name: 'Echoing', color: 'dark_aqua' }
];

const TOME_LOOT_POOLS = {
    eldritch: ["minecraft:sculk", "minecraft:echo_shard", "ars_nouveau:source_gem", "apotheosis:gem_dust", "apotheosis:rare_material"],
    warbound: ["minecraft:iron_ingot", "minecraft:arrow", "apotheosis:common_material", "apotheosis:gem_dust", "apotheosis:epic_material"],
    overgrown: ["minecraft:moss_block", "ars_nouveau:blue_archwood_sapling", "ars_nouveau:source_berry", "naturesaura:gold_leaf", "apotheosis:mythic_material"],
    scorched: ["minecraft:magma_cream", "minecraft:blaze_rod", "hmag:necrofiber", "nethers_delight:hoglin_hide", "kubejs:coin_nether"],
    sunken: ["minecraft:prismarine_shard", "aquaculture:box", "aquaculture:lockbox", "aquaculture:treasure_chest", "aquaculture:neptunium_ingot"],
    volcanic: ["minecraft:crying_obsidian", "hmag:evil_crystal", "hmag:burning_core", "minecraft:wither_rose", "minecraft:netherite_scrap"],
    abyssal: ["minecraft:glow_ink_sac", "aquaculture:neptunium_nugget", "ars_nouveau:wilden_tribute", "simplyswords:runic_tablet", "apotheosis:sigil_of_socketing"],
    mechanical: ["embers:raw_silver", "embers:raw_lead", "embers:archaic_brick", "embers:winding_gears", "embers:dawnstone_ingot"],
    celestial: ["minecraft:ender_pearl", "hmag:soul_powder", "kubejs:gem_shard_great", "apotheosis:infused_coin", "minecraft:shulker_shell"],
    fungal: ["minecraft:mycelium", "ars_nouveau:magebloom", "minecraft:mooshroom_spawn_egg", "aether_redux:blighted_spores", "relics:spore_sack"],
    forgotten: ["minecraft:book", "minecraft:experience_bottle", "ars_nouveau:blank_parchment", "ars_nouveau:spell_parchment", "kubejs:scroll_exp_great"],
    glacial: ["minecraft:packed_ice", "minecraft:blue_ice", "ars_nouveau:water_essence", "apotheosis:common_material", "celestial_core:treasure_fragment"],
    gilded: ["minecraft:raw_gold", "minecraft:gold_block", "ars_nouveau:abjuration_essence", "celestial_core:broken_totem", "l2complements:life_essence"],
    electrified: ["minecraft:lightning_rod", "minecraft:redstone_block", "ars_nouveau:air_essence", "hmag:lightning_particle", "apotheosis:gem_dust"],
    aetheric: ["aether:ambrosium_shard", "aether:zanite_gemstone", "aether:golden_amber", "deep_aether:skyjade", "aether_redux:refined_sentrite"],
    cavernous: ["minecraft:pointed_dripstone", "minecraft:raw_iron_block", "spelunkery:rough_diamond", "hmag:lich_cloth", "celestial_core:earth_core"],
    bastion: ["minecraft:gilded_blackstone", "minecraft:ancient_debris", "celestial_core:fire_essence", "apotheosis:rare_material", "apotheosis:mythic_material"],
    stronghold: ["minecraft:mossy_stone_bricks", "minecraft:ender_eye", "l2complements:storm_core", "l2complements:heirophant_green", "celestial_core:reforging_table"],
    monumental: ["minecraft:sea_lantern", "hmag:ancient_stone", "l2complements:explosion_shard", "celestial_core:guardian_spike", "simplyswords:runic_tablet"],
    dilapidated: ["minecraft:cobweb", "minecraft:chain", "graveyard:corruption", "hmag:reinforcing_chain", "celestial_core:death_essence"],
    industrial: ["minecraft:hopper", "apotheosis:gem_dust", "embers:ash", "aether_redux:refined_sentrite", "aether_redux:sentry_chip"],
    skeletal: ["minecraft:bone_block", "graveyard:corruption", "l2hostility:hostility_essence", "minecraft:skeleton_skull", "l2complements:warden_bone_shard"],
    insectoid: ["minecraft:bee_nest", "the_bumblezone:glistering_honey_crystal", "the_bumblezone:honey_crystal_shards", "the_bumblezone:pollen_puff", "the_bumblezone:royal_jelly_bottle"],
    reptilian: ["minecraft:scute", "hmag:kobold_leather", "hmag:ogre_horn", "hmag:sharp_fang", "celestial_core:treasure_fragment"],
    ichorous: ["minecraft:redstone", "bloodmagic:life_essence_bucket", "celestial_core:heart_fragment", "l2complements:cursed_droplet", "bosses_of_mass_destruction:brimstone_nectar"],
    draconic: ["minecraft:obsidian", "minecraft:end_crystal", "minecraft:dragon_breath", "quark:dragon_scale", "hmag:ender_plasm"],
    void: ["minecraft:chorus_fruit", "minecraft:shulker_shell", "kubejs:reagent_box", "apotheosis:apotheotic_coin", "l2complements:void_eye"],
    crystalline: ["minecraft:amethyst_cluster", "minecraft:budding_amethyst", "ars_nouveau:source_gem_block", "ars_nouveau:conjuration_essence", "apotheosis:gem_dust"],
    radiant: ["minecraft:glow_berries", "minecraft:glowstone", "ars_nouveau:abjuration_essence", "kubejs:gem_shard_great", "celestial_artifacts:purified_powder"],
    forbidden: ["minecraft:soul_sand", "graveyard:corruption", "undergarden:blood_globule", "graveyard:dark_iron_ingot", "bloodmagic:weakbloodshard"],
    echoing: ["minecraft:sculk_sensor", "minecraft:sculk_catalyst", "minecraft:echo_shard", "kubejs:reagent_box", "apotheosis:mythic_material"]
};

const TOME_MESSAGES = {
    eldritch: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0001",
    warbound: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0002",
    overgrown: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0003",
    scorched: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0004",
    sunken: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0005",
    volcanic: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0006",
    abyssal: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0007",
    mechanical: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0008",
    celestial: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0009",
    fungal: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0010",
	glacial: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0011",
    gilded: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0012",
    electrified: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0013",
    aetheric: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0014",
    cavernous: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0015",
    bastion: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0016",
    stronghold: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0017",
    monumental: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0018",
    dilapidated: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0019",
    industrial: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0020",
    skeletal: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0021",
    insectoid: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0022",
    reptilian: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0023",
    ichorous: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0024",
    draconic: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0025",
    void: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0026",
    crystalline: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0027",
    radiant: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0028",
    forbidden: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0029",
    echoing: "kubejs.script.server.scripts.custom.ritual.echo.extractor.0030"
};

const RESONANCE_MAP = {
    'minecraft:spawner': 'minecraft:obsidian'
};

ItemEvents.rightClicked(event => {
    const { player, item, level, server, target } = event;
    const pName = player.username;

// --- 1. ECHO EXTRACTOR ---
    if (item.id == 'kubejs:echo_extractor') {
        let currentTime = level.time;
        let targetBlock = target.block;
        let mastery = player.persistentData.getDouble('ritual_mastery') || 0.0;
        let cooldownTicks = getExtractorCooldown(mastery);
        let castTicks     = getExtractorCastTicks(mastery);       												   
        // Cooldown Check
        if (player.persistentData.contains('extractor_cooldown')) {
            let elapsed = currentTime - player.persistentData.getLong('extractor_cooldown');
            if (elapsed < cooldownTicks) {
                let remaining = Math.ceil((cooldownTicks - elapsed) / 20);
                player.setStatusMessage(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0032", remaining).red());
                return;
            }
        }

        // Busy Check (Combined)
        if (player.persistentData.getBoolean('extractor_busy')) {
            player.setStatusMessage(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0033").red());
            return;
        }

        // Resonance Check
        if (!targetBlock || !RESONANCE_MAP[targetBlock.id]) {
            player.setStatusMessage(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0034").gray());
            return;
        }

        // Fuel Check (Blessed Incense)
        let clearResult = server.runCommandSilent(`clear ${pName} kubejs:blessed_incense 1`);
        if (clearResult <= 0) {
            player.setStatusMessage(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0035").italic());
            return;
        }

		// 3. Define unique coordinate variables ONLY when we are sure the ritual starts
			let echoX = targetBlock.x;
			let echoY = targetBlock.y;
			let echoZ = targetBlock.z;

	

        // Start Ritual
        player.persistentData.putBoolean('extractor_busy', true);
        player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0036").darkPurple());
        
        server.runCommandSilent(`effect give ${pName} minecraft:slowness ${castTicks / 20} 10 true`);
        server.runCommandSilent(`playsound minecraft:block.respawn_anchor.charge player ${pName} ${player.x} ${player.y} ${player.z} 1 0.8`);

        server.scheduleInTicks(castTicks, () => {
            let p = server.getPlayer(pName);
			let replacement = RESONANCE_MAP[targetBlock.id] || 'minecraft:obsidian';
            if (!p) return;

            p.persistentData.remove('extractor_busy');
            p.persistentData.putLong('extractor_cooldown', level.time);

            let mastery = p.persistentData.getDouble('ritual_mastery') || 0.0;
            let currentRisk = Math.max(0.05, 0.30 - (mastery * 0.001));
			
			// --- FAILURE LOGIC - THE PERMANENT 5% STABILITY CHECK ---
			if (Math.random() < 0.05) {

				// Roll to see if the spawner is destroyed (30% of the 5%)
				let isDestroyed = Math.random() < 0.30;

				if (isDestroyed) {
					// CRITICAL FAILURE: Spawner is lost
					server.runCommandSilent(`setblock ${echoX} ${echoY} ${echoZ} ${replacement}`);
					player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0037").red().bold());
					server.runCommandSilent(`execute at ${pName} run playsound minecraft:entity.generic.explode player @s ~ ~ ~ 1 0.5`);
				} else {
					// SOFT FAILURE: Spawner remains, but ritual fails
					player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0038").yellow());
					
					// Visual "Fizzle" effect
					server.runCommandSilent(`execute at ${pName} run particle minecraft:smoke ~ ~1 ~ 0.2 0.2 0.2 0.05 10`);
					server.runCommandSilent(`execute at ${pName} run playsound minecraft:block.fire.extinguish player @s ~ ~ ~ 1 1.5`);
				}

				// Consumables and cooldowns
				player.attack(2.0); // 1 heart of recoil damage
				syncExtractorStats(p);																 
				return; // EXIT the script so no Sealed Tome is given
			}

            // --- FAILURE LOGIC - Temporal Remnant---
            if (Math.random() < currentRisk) {
                server.runCommandSilent(`execute at ${pName} run summon minecraft:vex ~ ~1 ~ {LifeTicks:600,CustomName:'"Temporal Remnant"'}`);
                server.runCommandSilent(`effect give ${pName} minecraft:blindness 3 1 true`);
                server.runCommandSilent(`execute at ${pName} run tp ${pName} ~ ~0.2 ~`); 
                server.runCommandSilent(`playsound minecraft:entity.generic.explode player ${pName} ~ ~ ~ 1 0.5`);
                server.runCommandSilent(`particle minecraft:explosion_emitter ${p.x} ${p.y + 1} ${p.z} 0.5 0.5 0.5 0.1 1`);
                p.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0039").red().italic());
				syncExtractorStats(p);																			 
                return; 
            }

            // --- SUCCESS LOGIC ---
            let roll = THEMES[Math.floor(Math.random() * THEMES.length)];
                     
            // Block Swap & Visuals
            server.runCommandSilent(`setblock ${echoX} ${echoY} ${echoZ} ${replacement}`);
            server.runCommandSilent(`particle minecraft:sculk_soul ${echoX} ${echoY + 1} ${echoZ} 0.5 0.5 0.5 0.05 50`);
            server.runCommandSilent(`playsound minecraft:block.respawn_anchor.set_spawn block @a ${echoX} ${echoY} ${echoZ} 1 1.2`);
            
			p.persistentData.putDouble('ritual_mastery', mastery + 1.0);
			
            // Rewards
            let giveCmd = `give ${pName} kubejs:sealed_tome{theme:"${roll.id}",display:{Name:'{"text":"Sealed ${roll.name} Tome","color":"${roll.color}","italic":false}'}} 1`;
            server.runCommandSilent(giveCmd);
					                       
			p.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0040").aqua().bold()
							.append(Text.of(" - ").gray())
							.append(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0042", roll.name).color(roll.color))
						);

            // Discovery Tracking (The Sticky String Fix)
            let discoveredStr = p.persistentData.getString('echo_discoveries') || "";
            if (discoveredStr.indexOf(roll.id) === -1) {
                let newStr = discoveredStr + roll.id + ",";
                p.persistentData.putString('echo_discoveries', newStr);
                server.runCommandSilent(`kubejs persistent_data ${pName} merge {echo_discoveries:"${newStr}"}`);

                p.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0043", roll.name).gold().italic());
                server.runCommandSilent(`execute at ${pName} run playsound minecraft:ui.toast.challenge_complete player @s 1 1`);
            }
			syncExtractorStats(player)
        });
    }

// --- 2. CHRONICLE OF ECHOES (STRING-REGISTRY VERSION) ---
    if (item.id == 'kubejs:chronicle_of_echoes') {
        let mastery = player.persistentData.getDouble('ritual_mastery') || 0.0;
        let lastCooldown = player.persistentData.getLong('extractor_cooldown') || 0;
        let discoveredStr = player.persistentData.getString('echo_discoveries') || "";

        let currentRisk = Math.max(5.0, 30.0 - (mastery * 0.1));
        let bonusTier = Math.floor(mastery / 10);
        let effectiveCooldown = getExtractorCooldown(mastery);
        let effectiveCast     = getExtractorCastTicks(mastery);        
		let remainingSeconds = Math.ceil(Math.max(0, effectiveCooldown - (level.time - lastCooldown)) / 20);

        player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0044").darkPurple().bold());
        player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0045").gray().append(Text.of(mastery.toFixed(1)).yellow()));
        
        let riskColor = currentRisk > 20 ? "red" : (currentRisk > 10 ? "yellow" : "green");
        player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0046").gray().append(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0047", currentRisk.toFixed(1)).color(riskColor)));
        player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0048").gray().append(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0049", bonusTier).aqua()));
        player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0050").gray()
			.append(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0051", (effectiveCast / 20).toFixed(1)).yellow())
            .append(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0052").gray())
            .append(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0053", (effectiveCooldown / 20).toFixed(1)).yellow()));																			  

        // --- DISCOVERY DISPLAY ---
        let themeList = Text.of("");
        let foundAny = false;

        // Loop through the THEMES constant and check if their ID is in our discovery string
        THEMES.forEach(tObj => {
            if (discoveredStr.indexOf(tObj.id) !== -1) {
                if (foundAny) themeList.append(Text.of(", ").gray());
                themeList.append(Text.of(tObj.name).color(tObj.color));
                foundAny = true;
            }
        });

        if (!foundAny) {
            player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0056").gray().append(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0057").darkGray().italic()));
        } else {
            player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0058").gray().append(themeList));
        }

        player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0059").gray().append(remainingSeconds > 0 ? Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0060", remainingSeconds).red() : Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0061").green().italic()));
        player.tell(Text.of("-----------------------").darkPurple().bold());
        player.playSound('minecraft:item.book.page_turn');
    }

    // --- SEALED TOME ---
	if (item.id == 'kubejs:sealed_tome') {
        if (!item.nbt || !item.nbt.theme) return;

        let theme = item.nbt.theme;
        let mastery = player.persistentData.getDouble('ritual_mastery') || 0.0;
        let bonusTier = Math.floor(mastery / 10); 
        let pool = TOME_LOOT_POOLS[theme] || TOME_LOOT_POOLS.forgotten;

        // 1. DYNAMIC RARITY THRESHOLDS
        // Every tier lowers the requirement for Rare loot by 0.01 (min 0.50)
        let rareThreshold = Math.max(0.50, 0.90 - (bonusTier * 0.01));
        let uncommonThreshold = Math.max(0.30, 0.70 - (bonusTier * 0.01));

        let roll = Math.random();
        let itemToGive;
        let qty = 1;

        // 2. SCALED ROLL
        if (roll > rareThreshold && bonusTier >= 3) {
            // RARE (Tier 3+)
            itemToGive = pool[3] || pool[2];
            qty = (itemToGive.includes("end") || itemToGive.includes("dragon") || itemToGive.includes("void") || itemToGive.includes("shulker") || itemToGive.includes("epic") || itemToGive.includes("mythic") || itemToGive.includes("neptunium") || itemToGive.includes("totem") || itemToGive.includes("netherite")) ? 1 : 1 + Math.floor(bonusTier / 25);
        } 
        else if (roll > uncommonThreshold && bonusTier >= 1) {
            // UNCOMMON (Tier 1+)
            itemToGive = pool[2] || pool[1];
            qty = 1 + Math.floor(bonusTier / 20);
        } 
        else {
            // COMMON
            itemToGive = pool[Math.floor(Math.random() * 2)];
            qty = Math.floor(Math.random() * 3) + 1 + Math.floor(bonusTier / 25);
        }

        // 3. EXECUTION & SPAWNING
        item.count--; 
        
		// Summon the main reward
        // We use nbt format for the item entity to ensure quantity and ID are correct
        let mainItemNBT = `{Item:{id:"${itemToGive}",Count:${qty}b}}`;
        server.runCommandSilent(`execute at ${pName} run summon minecraft:item ~ ~1 ~ ${mainItemNBT}`);

        // Grandmaster - Scaled Gold Bonus
        if (bonusTier > 0 && Math.random() < 0.70) {
            let goldItem = bonusTier >= 50 ? "minecraft:gold_ingot" : "minecraft:gold_nugget";
            let goldQty = Math.min(32, Math.floor(Math.random() * (bonusTier / 10)) + 1);
            let goldNBT = `{Item:{id:"${goldItem}",Count:${goldQty}b}}`;
            
            server.runCommandSilent(`execute at ${pName} run summon minecraft:item ~ ~1.2 ~ ${goldNBT}`);
        }

		// 4. THE JACKPOT (Tier 50+)
        if (bonusTier >= 50 && Math.random() < 0.01) { // 1% chance at Tier 50
            server.runCommandSilent(`execute at ${pName} run summon minecraft:item ~ ~1.5 ~ {Item:{id:"minecraft:nether_star",Count:1b}}`);
            player.tell(Text.translate("kubejs.script.server.scripts.custom.ritual.echo.extractor.0063").gold().bold());
            server.runCommandSilent(`execute at ${pName} run playsound minecraft:ui.toast.challenge_complete player @s ~ ~ ~ 1 0.5`);
        }

        // 4. Visuals & Audio
        // Sound: Paper tearing + Magic sparkle
        server.runCommandSilent(`playsound minecraft:item.book.page_turn player ${pName} ~ ~ ~ 1 1.5`);
        server.runCommandSilent(`playsound minecraft:entity.experience_orb.pickup player ${pName} ~ ~ ~ 0.5 1.2`);

        // Theme-Specific Particles
        let selectedParticle = "minecraft:enchanted_hit";
		
        if (theme == 'eldritch') selectedParticle = "minecraft:dragon_breath";
        if (theme == 'scorched' || theme == 'volcanic') selectedParticle = "minecraft:flame";
        if (theme == 'sunken' || theme == 'abyssal') selectedParticle = "minecraft:bubble";
        if (theme == 'celestial') selectedParticle = "minecraft:end_rod";
        if (theme == 'overgrown' || theme == 'fungal') selectedParticle = "minecraft:happy_villager";
        if (theme == 'glacial') selectedParticle = "minecraft:snowflake";
        if (theme == 'electrified') selectedParticle = "minecraft:electric_spark";
        if (theme == 'gilded' || theme == 'radiant') selectedParticle = "minecraft:wax_off"; // Sparkling gold/light
        if (theme == 'aetheric' || theme == 'celestial') selectedParticle = "minecraft:end_rod";
        if (theme == 'eldritch' || theme == 'void' || theme == 'echoing') selectedParticle = "minecraft:dragon_breath";
        if (theme == 'scorched' || theme == 'volcanic' || theme == 'bastion') selectedParticle = "minecraft:flame";
        if (theme == 'forbidden' || theme == 'draconic') selectedParticle = "minecraft:large_smoke";
        if (theme == 'ichorous') selectedParticle = "minecraft:angry_villager"; // Dark red 'hit' particles
        if (theme == 'overgrown' || theme == 'fungal' || theme == 'insectoid') selectedParticle = "minecraft:happy_villager";
        if (theme == 'reptilian') selectedParticle = "minecraft:item_slime";
        if (theme == 'skeletal') selectedParticle = "minecraft:white_ash";
        if (theme == 'sunken' || theme == 'abyssal' || theme == 'monumental') selectedParticle = "minecraft:bubble";
        if (theme == 'cavernous' || theme == 'stronghold') selectedParticle = "minecraft:ash";
        if (theme == 'crystalline') selectedParticle = "minecraft:crit";
        if (theme == 'industrial' || theme == 'mechanical') selectedParticle = "minecraft:composter"; // Looks like flying bits of metal/wood
        if (theme == 'dilapidated') selectedParticle = "minecraft:campfire_cosy_smoke";
		
		// BURST 1: Immediate (Fast and outward)
        server.runCommandSilent(`particle ${selectedParticle} ${player.x} ${player.y + 1.2} ${player.z} 0.6 0.6 0.6 0.15 30`);

        // BURST 2: Lingering (Scheduled 10 ticks later, slow-rising)
        server.scheduleInTicks(10, () => {
            // We use a smaller speed (0.02) so they drift slowly upward like a cloud
            server.runCommandSilent(`particle ${selectedParticle} ${player.x} ${player.y + 1.2} ${player.z} 0.4 0.5 0.4 0.02 15`);
        });

        // BURST 3: High-Mastery "Afterglow" (Only at Tier 3+)
        if (bonusTier >= 3) {
            server.scheduleInTicks(20, () => {
                server.runCommandSilent(`particle minecraft:glow ${player.x} ${player.y + 1.2} ${player.z} 0.3 0.3 0.3 0.01 10`);
            });
        }

        // 5. Flavor Text (with Theme color)
		player.tell(Text.translate(TOME_MESSAGES[theme] || "kubejs.script.server.scripts.custom.ritual.echo.extractor.0064").italic());
		
		console.log(`Tome Opened: Theme=${theme}, Roll=${roll.toFixed(2)}, Tier=${bonusTier}, Item=${itemToGive}`);
    }
});