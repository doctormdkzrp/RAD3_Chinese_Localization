ItemEvents.rightClicked('kubejs:d6',  e => rollDice(e, 6))
ItemEvents.rightClicked('kubejs:d10', e => rollDice(e, 10))
ItemEvents.rightClicked('kubejs:d12', e => rollDice(e, 12))
ItemEvents.rightClicked('kubejs:d20', e => rollDice(e, 20))

// --- COOLDOWN SYSTEM ---
// Shared across all dice. Keyed by player UUID string → game tick when they may roll again.
const DICE_COOLDOWN_TICKS = 600 // 30 seconds

/** @type {Map<string, number>} */
const diceCooldowns = new Map()

/**
 * Returns how many ticks remain on this player's cooldown, or 0 if they are free to roll.
 * @param {string} uuid
 * @param {number} currentTick
 */
const getCooldownRemaining = (uuid, currentTick) => {
    if (!diceCooldowns.has(uuid)) return 0
    const remaining = diceCooldowns.get(uuid) - currentTick
    return remaining > 0 ? remaining : 0
}

/**
 * Stamps a fresh cooldown for the player from the current tick.
 * @param {string} uuid
 * @param {number} currentTick
 */
const stampCooldown = (uuid, currentTick) => {
    diceCooldowns.set(uuid, currentTick + DICE_COOLDOWN_TICKS)
}
const playEffect = (level, player, type) => {
    const { x, y, z } = player
    switch (type) {
        case 'fail':
            level.spawnParticles('minecraft:large_smoke', true, x, y + 1, z, 0.5, 0.5, 0.5, 15, 0.05)
            player.playSound('minecraft:entity.warden.tendril_clicks', 1.0, 0.5)
            break
        case 'standard':
            level.spawnParticles('minecraft:electric_spark', true, x, y + 1, z, 0.3, 0.3, 0.3, 10, 0.1)
            player.playSound('minecraft:block.amethyst_block.step', 0.8, 1.2)
            break
        case 'magic':
            level.spawnParticles('minecraft:enchant', true, x, y + 1, z, 0.5, 0.5, 0.5, 30, 0.2)
            player.playSound('minecraft:block.enchantment_table.use', 1.0, 1.0)
            break
        case 'legendary':
            level.spawnParticles('minecraft:totem_of_undying', true, x, y + 1, z, 1.0, 1.0, 1.0, 100, 0.3)
            player.playSound('minecraft:ui.toast.challenge_complete', 1.0, 1.0)
            break
    }
}

const rollDice = (event, maxFaces) => {
    const { player, level, server, item } = event

    // Cooldown Check (shared across all dice)
    const uuid = player.uuid.toString()
    const currentTick = level.time
    const remaining = getCooldownRemaining(uuid, currentTick)
    if (remaining > 0) {
        const seconds = Math.ceil(remaining / 20)
        player.setStatusMessage(Text.translate("kubejs.script.server.scripts.custom.dices.0001", seconds))
        return
    }

    // Cost Check
    if (player.xpLevel < 5) {
        player.setStatusMessage(Text.translate('kubejs.script.server.scripts.custom.dices.0002'))
        return
    }
    player.addXPLevels(-5)

    // Stamp cooldown — placed after XP check so failed/blocked rolls don't consume it
    stampCooldown(uuid, currentTick)

    // 1. Calculate the "Die Roll" (Visual Message)
    let dieResult = Math.floor(Math.random() * maxFaces) + 1

    // 2. Pick the random outcome from the list of 100
    let randomOutcome = Math.floor(Math.random() * 100) + 1

    server.tell([Text.white(Text.translate('kubejs.script.server.scripts.custom.dices.0003')), Text.gold(dieResult.toString())])
    player.tell(Text.translate("kubejs.script.server.scripts.custom.dices.0004", randomOutcome))

    // 3. Trigger the outcome
    level.spawnParticles('minecraft:witch', true, player.x, player.y + 1, player.z, 0.5, 0.5, 0.5, 20, 0.1)
    player.playSound('minecraft:block.enchantment_table.use', 1.0, 1.0)
    triggerOutcome(randomOutcome, player, level, server, item)

    // 4. Durability Logic
    item.damageValue++
    if (item.damageValue >= item.maxDamage) {
        item.count--
        player.playSound('minecraft:entity.item.break')
        player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0005'))
    }

    player.swing()
}

const playBrokenEffect = (level, player, type) => {
    const { x, y, z } = player

    switch (type) {
        case 'fail':
            level.spawnParticles('minecraft:large_smoke', true, x, y + 1, z, 0.5, 0.5, 0.5, 15, 0.05)
            player.playSound('minecraft:entity.warden.tendril_clicks', 1.0, 0.5)
            break
        case 'standard':
            level.spawnParticles('minecraft:electric_spark', true, x, y + 1, z, 0.3, 0.3, 0.3, 10, 0.1)
            player.playSound('minecraft:block.amethyst_block.step', 0.8, 1.2)
            break
        case 'magic':
            level.spawnParticles('minecraft:enchant', true, x, y + 1, z, 0.5, 0.5, 0.5, 30, 0.2)
            player.playSound('minecraft:block.enchantment_table.use', 1.0, 1.0)
            break
        case 'legendary':
            level.spawnParticles('minecraft:totem_of_undying', true, x, y + 1, z, 1.0, 1.0, 1.0, 100, 0.3)
            player.playSound('minecraft:ui.toast.challenge_complete', 1.0, 1.0)
            break
        case 'glitch':
            level.spawnParticles('minecraft:crit', true, x, y + 1, z, 0.1, 0.1, 0.1, 3, 0.05)
            player.playSound('minecraft:block.iron_trapdoor.close', 0.2, 1.8)
            break
    }
}

// --- THE FULL 100 OUTCOMES ---
function triggerOutcome(num, player, level, server, item) {
    const applyEffect = (id, duration, amp) => {
        let modId = id.split(':')[0]
        if (Platform.isLoaded(modId) || modId === 'minecraft') {
            player.potionEffects.add(id, duration, amp)
        } else {
            console.warn(`Skipping effect ${id} because mod ${modId} is not installed.`)
        }
    }

    switch (num) {
        // --- 1-20: BASE WORLD ---
        case 1:
            playEffect(level, player, 'fail')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0006'))
            applyEffect('minecraft:glowing', 100, 0)
            server.scheduleInTicks(100, c => { level.explode(player, player.x, player.y, player.z, 2, false, "none") }); break
        case 2: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0007')); applyEffect('minecraft:blindness', 200, 0); break
        case 3: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0008')); applyEffect('minecraft:levitation', 100, 1); break
        case 4: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0009')); level.spawnLightning(player.x, player.y, player.z, true); break
        case 5:
            playEffect(level, player, 'fail')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0010')); player.give(Item.of('minecraft:rotten_flesh')); break
        case 6: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0011')); applyEffect('minecraft:hunger', 400, 1); break
        case 7: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0012')); applyEffect('minecraft:slowness', 200, 2); break
        case 8: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0013')); applyEffect('minecraft:water_breathing', 1200, 0); break
        case 9: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0014')); applyEffect('minecraft:fire_resistance', 1200, 0); break
        case 10: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0015')); player.give(Item.of('minecraft:gold_ingot')); break
        case 11: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0016')); applyEffect('minecraft:jump_boost', 600, 2); break
        case 12: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0017')); applyEffect('minecraft:regeneration', 400, 1); break
        case 13:
            playEffect(level, player, 'standard')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0018'))
            applyEffect('minecraft:glowing', 200, 0)
            server.scheduleInTicks(200, c => { player.give(Item.of('minecraft:diamond')) }); break
        case 14: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0019')); applyEffect('minecraft:night_vision', 2400, 0); break
        case 15: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0020')); applyEffect('minecraft:haste', 1200, 1); break
        case 16: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0021')); player.give(Item.of('minecraft:emerald_block')); break
        case 17: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0022')); applyEffect('minecraft:resistance', 600, 2); break
        case 18: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0023')); applyEffect('minecraft:absorption', 600, 4); break
        case 19:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0024'))
            applyEffect('minecraft:glowing', 300, 0)
            level.spawn('minecraft:bee', b => {
                b.setPosition(player.x, player.y + 1, player.z)
                b.addPotionEffect({type: 'minecraft:glowing', duration: 300, amplifier: 0})
                server.scheduleInTicks(300, c => { b.discard() })
            }); break
        case 20: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0025')); player.give(Item.of('minecraft:netherite_scrap')); break

        // --- 21-40: UTILITY & CHAOS ---
        case 21: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0026')); applyEffect('minecraft:invisibility', 600, 0); break
        case 22: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0027')); applyEffect('minecraft:levitation', 40, 20); break
        case 23:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0028'))
            level.spawn('minecraft:iron_golem', g => { g.setPosition(player.x, player.y, player.z) }); break
        case 24: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0029')); player.give(Item.of('minecraft:golden_apple')); break
        case 25: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0030')); applyEffect('minecraft:mining_fatigue', 600, 2); break
        case 26: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0031')); player.setRemainingFireTicks(200); break
        case 27:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0032'))
            applyEffect('minecraft:glowing', 100, 0)
            server.scheduleInTicks(100, c => { player.teleportTo(level.spawnLocation.x, level.spawnLocation.y, level.spawnLocation.z) }); break
        case 28: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0033')); player.give(Item.of('minecraft:ender_pearl', 4)); break
        case 29:
            playEffect(level, player, 'magic')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0034'))
            applyEffect('minecraft:conduit_power', 1200, 0); break
        case 30: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0035')); player.give(Item.of('minecraft:oak_sapling', 64)); break
        case 31: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0036')); applyEffect('minecraft:bad_omen', 1200, 0); break
        case 32:
            playEffect(level, player, 'fail')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0037'))
            level.spawn('minecraft:tnt', tnt => { tnt.setPosition(player.x, player.y, player.z) }); break
        case 33:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0038'))
            applyEffect('minecraft:glowing', 200, 0)
            server.scheduleInTicks(200, c => { player.addItemCooldown(item, 1000) }); break
        case 34: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0039')); player.give(Item.of('minecraft:totem_of_undying')); break
        case 35: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0040')); applyEffect('minecraft:hero_of_the_village', 1200, 0); break
        case 36: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0041')); applyEffect('minecraft:slowness', 400, 5); break
        case 37: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0042')); player.give(Item.of('minecraft:experience_bottle', 16)); break
        case 38:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0043'))
            applyEffect('minecraft:glowing', 100, 0)
            server.scheduleInTicks(100, c => { player.give(Item.of('minecraft:raw_gold_block')) }); break
        case 39: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0044')); player.give(Item.of('minecraft:experience_bottle', 16)); break
        case 40: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0045')); player.give(Item.of('apotheosis:gem', '{gem:"apotheosis:core/guardian"}')); break

        // --- 41-50: ARS NOUVEAU ---
        case 41: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0046')); player.give(Item.of('ars_nouveau:source_berry', 16)); break
        case 42: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0047')); applyEffect('ars_nouveau:mana_regen', 600, 1); break
        case 43:
            playEffect(level, player, 'magic')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0048'))
            level.spawn('ars_nouveau:starbuncle', s => {
                s.setPosition(player.x, player.y, player.z)
                server.scheduleInTicks(400, c => { s.discard() })
            }); break
        case 44: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0049')); player.give(Item.of('ars_nouveau:experience_gem', 8)); break
        case 45: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0050')); applyEffect('ars_nouveau:spell_damage', 600, 0); break
        case 46: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0051')); player.give(Item.of('ars_nouveau:source_gem')); break
        case 47: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0052')); applyEffect('ars_nouveau:recovery', 400, 0); break
        case 48:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0053'))
            level.spawn('ars_nouveau:wilden_stalker', w => { w.setPosition(player.x + 5, player.y, player.z) }); break
        case 49: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0054')); player.give(Item.of('ars_nouveau:blank_parchment', 4)); break
        case 50:
            playEffect(level, player, 'magic')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0055'))
            player.give(Item.of('ars_nouveau:greater_experience_gem')); break

        // --- 51-60: UNDERGARDEN ---
        case 51:
            playEffect(level, player, 'fail')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0056'))
            applyEffect('graveyard:corruption', 300, 1); break
        case 52: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0057')); player.give(Item.of('undergarden:underbeans', 12)); break
        case 53:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0058'))
            level.spawn('undergarden:rotwalker', r => { r.setPosition(player.x + 2, player.y, player.z) }); break
        case 54: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0059')); player.give(Item.of('undergarden:cloggrum_ingot', 2)); break
        case 55: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0060')); applyEffect('undergarden:featherweight', 600, 0); break
        case 56: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0061')); player.give(Item.of('undergarden:froststeel_ingot')); break
        case 57:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0062'))
            applyEffect('minecraft:glowing', 100, 0)
            server.scheduleInTicks(100, c => { applyEffect('minecraft:jump_boost', 400, 4) }); break
        case 58: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0063')); player.give(Item.of('undergarden:utheric_shard', 4)); break
        case 59: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0064')); applyEffect('minecraft:glowing', 600, 0); break
        case 60:
            playEffect(level, player, 'magic')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0065'))
            player.give(Item.of('undergarden:forgotten_ingot')); break

        // --- 61-70: BUMBLEZONE ---
        case 61: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0066')); player.give(Item.of('the_bumblezone:glistering_honey_crystal', 2)); break
        case 62: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0067')); applyEffect('the_bumblezone:wrath_of_the_hive', 400, 0); break
        case 63:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0068'))
            applyEffect('minecraft:glowing', 200, 0)
            server.scheduleInTicks(200, c => { player.teleportTo('the_bumblezone:the_bumblezone', player.x, 100, player.z) }); break
        case 64: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0069')); player.give(Item.of('the_bumblezone:honey_bucket')); break
        case 65: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0070')); player.give(Item.of('the_bumblezone:pollen_puff', 8)); break
        case 66:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0071'))
            level.spawn('minecraft:bee', b => {
                b.setPosition(player.x, player.y + 1, player.z)
                b.addPotionEffect({type: 'minecraft:glowing', duration: 600, amplifier: 0})
                server.scheduleInTicks(600, c => { b.discard() })
            }); break
        case 67: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0072')); player.give(Item.of('the_bumblezone:royal_jelly_bottle')); break
        case 68: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0073')); applyEffect('minecraft:absorption', 1200, 2); break
        case 69: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0074')); player.give(Item.of('the_bumblezone:bee_stinger', 4)); break
        case 70: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0075')); player.give(Item.of('the_bumblezone:honey_crystal_shards', 16)); break

        // --- 71-80: ICARIA & AETHER ---
        case 71: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0076')); player.give(Item.of('aether:ambrosium_shard', 8)); break
        case 72: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0077')); applyEffect('aether:inebriation', 200, 0); break
        case 73: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0078')); applyEffect('minecraft:slow_falling', 600, 1); break
        case 74: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0079')); player.give(Item.of('aether:zanite_gemstone')); break
        case 75: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0080')); player.give(Item.of('icaria:laurel_wreath')); break
        case 76: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0081')); player.give(Item.of('immersive_aircraft:fuel', 8)); break
        case 77: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0082')); applyEffect('minecraft:levitation', 60, 0); break
        case 78:
            playEffect(level, player, 'standard')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0083'))
            level.spawn('goblintraders:goblin_trader', g => { g.setPosition(player.x + 1, player.y, player.z + 1) }); break
        case 79:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0084'))
            level.spawn('minecraft:tnt', tnt => { tnt.setPosition(player.x, player.y + 5, player.z) }); break
        case 80: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0085')); player.give(Item.of('immersive_aircraft:hull')); break

        // --- 81-90: TECH & CATACLYSM ---
        case 81: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0086')); applyEffect('minecraft:haste', 2400, 1); break
        case 82:
            playEffect(level, player, 'standard')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0087'))
            player.give(Item.of('dungeonsdelight:bloated_baked_potato'))
            player.give(Item.of('dungeonsdelight:spider_bubble_tea')); break
        case 83: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0088')); applyEffect('minecraft:slow_falling', 600, 0); break
        case 84:
            playEffect(level, player, 'magic')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0089'))
            player.give(Item.of('kubejs:scroll_exp_great')); break
        case 85: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0090')); player.give(Item.of('minecraft:chest')); player.give(Item.of('minecraft:iron_ingot', 8)); break
        case 86: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0091')); applyEffect('minecraft:wither', 100, 0); break
        case 87: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0092')); player.give(Item.of('dungeonsdelight:stained_scrap', 4)); break
        case 88: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0093')); player.setRemainingFireTicks(400); break
        case 89: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0094')); player.give(Item.of('embers:ember_crystal')); break
        case 90:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0095'))
            applyEffect('minecraft:glowing', 150, 0)
            server.scheduleInTicks(150, c => { applyEffect('minecraft:blindness', 200, 0); player.attack(6) }); break

        // --- 91-100: LEGENDARY ---
        case 91: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0096')); player.give(Item.of('dungeonsdelight:cleaved_ancient_egg')); break
        case 92: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0097')); applyEffect('minecraft:strength', 600, 3); break
        case 93:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0098'))
            level.spawn('cataclysm:deepling', d => { d.setPosition(player.x + 3, player.y, player.z) }); break
        case 94: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0099')); player.give(Item.of('celestial_core:ocean_essence', 2)); break
        case 95: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0100')); applyEffect('minecraft:resistance', 1200, 2); break
        case 96:
            playEffect(level, player, 'magic')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0101'))
            player.give(Item.of('kubejs:essence_monster')); break
        case 97:
            playEffect(level, player, 'legendary')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0102'))
            player.give(Item.of('dawnoftimebuilder:feathered_serpent_sculpture')); break
        case 98:
            playEffect(level, player, 'legendary')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0103'))
            player.give(Item.of('armoroftheages:quetzalcoatl_armor_feet')); break
        case 99: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0104')); player.give(Item.of('ars_nouveau:source_gem_block')); break
        case 100:
            playEffect(level, player, 'legendary')
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0105'))
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0106'))
            applyEffect('minecraft:regeneration', 2400, 4)
            applyEffect('minecraft:strength', 2400, 3)
            player.give(Item.of('kubejs:scroll_exp_great'))
            player.give(Item.of('kubejs:essence_monster'))
            player.give(Item.of('armoroftheages:quetzalcoatl_armor_feet')); break

        default:
            player.tell(Text.translate("kubejs.script.server.scripts.custom.dices.0107", num))
            applyEffect('minecraft:speed', 200, 0); break
    }
}

/////////////////////////
///////////////////////// UNFINISHED DICE ///
/////////////////////////

function triggerUnfinishedOutcome(num, player, level, server) {

    playBrokenEffect(level, player, 'glitch')

    switch (num) {
        // --- 1-20: BASE WORLD GLITCHES ---
        case 1: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0108')); playBrokenEffect(level, player, 'fail'); break
        case 2: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0109')); playBrokenEffect(level, player, 'fail'); break
        case 3: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0110')); playBrokenEffect(level, player, 'standard'); break
        case 4: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0111')); playBrokenEffect(level, player, 'standard'); break
        case 5: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0112')); playBrokenEffect(level, player, 'fail'); break
        case 6: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0113')); playBrokenEffect(level, player, 'fail'); break
        case 7: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0114')); playBrokenEffect(level, player, 'standard'); break
        case 8: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0115')); playBrokenEffect(level, player, 'standard'); break
        case 9: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0116')); playBrokenEffect(level, player, 'fail'); break
        case 10: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0117')); playBrokenEffect(level, player, 'standard'); break
        case 11: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0118')); playBrokenEffect(level, player, 'standard'); break
        case 12: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0119')); playBrokenEffect(level, player, 'magic'); break
        case 13: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0120')); playBrokenEffect(level, player, 'standard'); break
        case 14: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0121')); playBrokenEffect(level, player, 'standard'); break
        case 15: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0122')); playBrokenEffect(level, player, 'fail'); break
        case 16: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0123')); playBrokenEffect(level, player, 'standard'); break
        case 17: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0124')); playBrokenEffect(level, player, 'fail'); break
        case 18: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0125')); playBrokenEffect(level, player, 'magic'); break
        case 19: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0126')); playBrokenEffect(level, player, 'standard'); break
        case 20: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0127')); playBrokenEffect(level, player, 'magic'); break

        // --- 21-40: UTILITY & CHAOS TEASES ---
        case 21: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0128')); playBrokenEffect(level, player, 'standard'); break
        case 22: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0129')); playBrokenEffect(level, player, 'fail'); break
        case 23: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0130')); playBrokenEffect(level, player, 'standard'); break
        case 24: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0131')); playBrokenEffect(level, player, 'standard'); break
        case 25: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0132')); playBrokenEffect(level, player, 'fail'); break
        case 26: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0133')); playBrokenEffect(level, player, 'fail'); break
        case 27: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0134')); playBrokenEffect(level, player, 'magic'); break
        case 28: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0135')); playBrokenEffect(level, player, 'magic'); break
        case 29: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0136')); playBrokenEffect(level, player, 'standard'); break
        case 30: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0137')); playBrokenEffect(level, player, 'standard'); break
        case 31: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0138')); playBrokenEffect(level, player, 'fail'); break
        case 32: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0139')); playBrokenEffect(level, player, 'fail'); break
        case 33: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0140')); playBrokenEffect(level, player, 'magic'); break
        case 34: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0141')); playBrokenEffect(level, player, 'standard'); break
        case 35: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0142')); playBrokenEffect(level, player, 'standard'); break
        case 36: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0143')); playBrokenEffect(level, player, 'fail'); break
        case 37: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0144')); playBrokenEffect(level, player, 'magic'); break
        case 38: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0145')); playBrokenEffect(level, player, 'standard'); break
        case 39: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0146')); playBrokenEffect(level, player, 'standard'); break
        case 40: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0147')); playBrokenEffect(level, player, 'magic'); break

        // --- 41-50: ARS NOUVEAU ECHOES ---
        case 41: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0148')); playBrokenEffect(level, player, 'standard'); break
        case 42: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0149')); playBrokenEffect(level, player, 'magic'); break
        case 43: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0150')); playBrokenEffect(level, player, 'standard'); break
        case 44: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0151')); playBrokenEffect(level, player, 'standard'); break
        case 45: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0152')); playBrokenEffect(level, player, 'magic'); break
        case 46: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0153')); playBrokenEffect(level, player, 'magic'); break
        case 47: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0154')); playBrokenEffect(level, player, 'standard'); break
        case 48: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0155')); playBrokenEffect(level, player, 'fail'); break
        case 49: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0156')); playBrokenEffect(level, player, 'standard'); break
        case 50: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0157')); playBrokenEffect(level, player, 'magic'); break

        // --- 51-60: UNDERGARDEN ECHOES ---
        case 51: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0158')); playBrokenEffect(level, player, 'fail'); break
        case 52: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0159')); playBrokenEffect(level, player, 'standard'); break
        case 53: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0160')); playBrokenEffect(level, player, 'fail'); break
        case 54: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0161')); playBrokenEffect(level, player, 'fail'); break
        case 55: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0162')); playBrokenEffect(level, player, 'standard'); break
        case 56: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0163')); playBrokenEffect(level, player, 'standard'); break
        case 57: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0164')); playBrokenEffect(level, player, 'fail'); break
        case 58: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0165')); playBrokenEffect(level, player, 'magic'); break
        case 59: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0166')); playBrokenEffect(level, player, 'standard'); break
        case 60: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0167')); playBrokenEffect(level, player, 'magic'); break

        // --- 61-70: BUMBLEZONE ECHOES ---
        case 61: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0168')); playBrokenEffect(level, player, 'standard'); break
        case 62: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0169')); playBrokenEffect(level, player, 'fail'); break
        case 63: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0170')); playBrokenEffect(level, player, 'magic'); break
        case 64: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0171')); playBrokenEffect(level, player, 'standard'); break
        case 65: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0172')); playBrokenEffect(level, player, 'standard'); break
        case 66: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0173')); playBrokenEffect(level, player, 'standard'); break
        case 67: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0174')); playBrokenEffect(level, player, 'magic'); break
        case 68: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0175')); playBrokenEffect(level, player, 'standard'); break
        case 69: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0176')); playBrokenEffect(level, player, 'fail'); break
        case 70: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0177')); playBrokenEffect(level, player, 'standard'); break

        // --- 71-80: ICARIA & AETHER ECHOES ---
        case 71: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0178')); playBrokenEffect(level, player, 'standard'); break
        case 72: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0179')); playBrokenEffect(level, player, 'fail'); break
        case 73: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0180')); playBrokenEffect(level, player, 'standard'); break
        case 74: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0181')); playBrokenEffect(level, player, 'magic'); break
        case 75: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0182')); playBrokenEffect(level, player, 'standard'); break
        case 76: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0183')); playBrokenEffect(level, player, 'fail'); break
        case 77: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0184')); playBrokenEffect(level, player, 'standard'); break
        case 78: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0185')); playBrokenEffect(level, player, 'standard'); break
        case 79: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0186')); playBrokenEffect(level, player, 'fail'); break
        case 80: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0187')); playBrokenEffect(level, player, 'standard'); break

        // --- 81-90: TECH & CATACLYSM ECHOES ---
        case 81: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0188')); playBrokenEffect(level, player, 'standard'); break
        case 82: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0189')); playBrokenEffect(level, player, 'fail'); break
        case 83: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0190')); playBrokenEffect(level, player, 'standard'); break
        case 84: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0191')); playBrokenEffect(level, player, 'fail'); break
        case 85: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0192')); playBrokenEffect(level, player, 'standard'); break
        case 86: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0193')); playBrokenEffect(level, player, 'magic'); break
        case 87: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0194')); playBrokenEffect(level, player, 'fail'); break
        case 88: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0195')); playBrokenEffect(level, player, 'fail'); break
        case 89: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0196')); playBrokenEffect(level, player, 'fail'); break
        case 90: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0197')); playBrokenEffect(level, player, 'magic'); break

        // --- 91-100: LEGENDARY TEASES ---
        case 91: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0198')); playBrokenEffect(level, player, 'magic'); break
        case 92: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0199')); playBrokenEffect(level, player, 'magic'); break
        case 93: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0200')); playBrokenEffect(level, player, 'standard'); break
        case 94: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0201')); playBrokenEffect(level, player, 'standard'); break
        case 95: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0202')); playBrokenEffect(level, player, 'magic'); break
        case 96: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0203')); playBrokenEffect(level, player, 'standard'); break
        case 97: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0204')); playBrokenEffect(level, player, 'legendary'); break
        case 98: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0205')); playBrokenEffect(level, player, 'legendary'); break
        case 99: player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0206')); playBrokenEffect(level, player, 'legendary'); break
        case 100:
            player.tell(Text.translate('kubejs.script.server.scripts.custom.dices.0207'))
            playBrokenEffect(level, player, 'legendary'); break

        default:
            player.tell(Text.translate("kubejs.script.server.scripts.custom.dices.0208", num * 444, num))
            playBrokenEffect(level, player, 'glitch'); break
    }
}

ItemEvents.rightClicked('kubejs:unfinished_dice', event => {
    const { item, player, level, server } = event

    let roll = Math.floor(Math.random() * 20) + 1
    triggerUnfinishedOutcome(roll, player, level, server)
    player.addItemCooldown('kubejs:unfinished_dice', 40) // 2-second cooldown
})