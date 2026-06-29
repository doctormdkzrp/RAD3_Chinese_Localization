// priority: 0

console.info('Hello, World! (You will only see this line once in console, during startup)')
// ============================================================
const TOOLTIP_XP_COST      = 25;           
const TOOLTIP_OFFHAND_ITEM = "Gold Ingot"; 
const TOOLTIP_COOLDOWN_SEC = 5;            
// ============================================================

StartupEvents.registry('item', event => {
	// Register new items here
	// event.create('example_item').displayName('Example Item')
	
//event.create('roguelite_ring').displayName('Ring of Rebirth').unstackable().glow(true).tag('curios:ring')
	
//processing
//event.create('hammer_iron', 'pickaxe').tier('iron').maxDamage(250)
event.create('wooden_form').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0001')).maxDamage(64)
event.create('stone_mortar').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0002')).maxDamage(64)
event.create('iron_mortar').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0003')).maxDamage(220)
event.create('sifter').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0004')).maxDamage(1550)

event.create('rick').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0006')).unstackable().burnTime(60000).rarity('epic').tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0005'))	

//apoth
event.create('socketweaver').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0007'))
event.create('gem_shard').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0008'))
event.create('gem_shard_great').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0009')).rarity('Uncommon')
event.create('gem_shard_geode').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0010')).rarity('Rare')

//coins
//quest coins
event.create('copper_coin').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0011')).rarity('Uncommon')
event.create('iron_coin').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0012')).rarity('Uncommon')
event.create('gold_coin').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0013')).rarity('Rare')
event.create('diamond_coin').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0014')).rarity('Epic')
//dimensional coins
event.create('coin_aether').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0015')).rarity('Rare')
event.create('coin_undergarden').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0016')).rarity('Rare')
event.create('coin_twilight').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0017')).rarity('Rare')
event.create('coin_bumblezone').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0018')).rarity('Rare')
event.create('coin_icaria').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0019')).rarity('Rare')
event.create('coin_end').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0020')).rarity('Uncommon')
event.create('coin_nether').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0021')).rarity('Uncommon')

//dungeon raid related
	event.create('coin_raid').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0022'))
	event.create('boss_killer').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0024')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0023'))
	event.create('miniboss_killer').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0026')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0025'))
	event.create('dungeon_recall').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0027'))
	event.create('ice_shard').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0028'))
	event.create('kill_multiplier').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0029'))
	event.create('kubejs:turret_item')
		.displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0030'))
		.maxStackSize(1)
		.maxDamage(10) // 5 uses
    event.create('lootbox_common')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0035'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0034'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0033'))
        .tooltip('')
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0031'))
        .maxStackSize(16);
 
    event.create('lootbox_rare')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0040'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0039'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0038'))
        .tooltip('')
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0036'))
        .maxStackSize(16);
 
    event.create('lootbox_epic')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0045'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0044'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0043'))
        .tooltip('')
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0041'))
        .maxStackSize(16);
 
    event.create('lootbox_legendary')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0050'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0049'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0048'))
        .tooltip('')
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0046'))
        .maxStackSize(16);
 
    // ── KEYS ──────────────────────────────────────────────────
    event.create('key_common')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0053'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0052'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0051'))
        .maxStackSize(16);
 
    event.create('key_rare')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0056'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0055'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0054'))
        .maxStackSize(16);
 
    event.create('key_epic')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0059'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0058'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0057'))
        .maxStackSize(16);
 
    event.create('key_legendary')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0062'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0061'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0060'))
        .maxStackSize(16);

    event.create('guard_summon')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0066'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0065'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0064'))
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0063'))
        .maxStackSize(3);

//task coins
//event.create('coin_food').displayName('Food Coin')
//event.create('coin_gathering').displayName('Gathering Coin')
//event.create('coin_exploration').displayName('Exploration Coin')
event.create('coin_task').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0067'))
//event.create('coin_magic').displayName('Magic Coin')
//event.create('coin_monster').displayName('Monster Coin')
//loot coin
event.create('coin_dungeon').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0068'))
//??? coin
event.create('coin_black').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0069'))
//minecolony coin
event.create('proofofwork').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0070')).rarity('Rare')
//vouchers
event.create('voucher_weapon').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0071')).rarity('Rare')
event.create('voucher_weapon_fragment').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0072')).rarity('Uncommon')
event.create('voucher_resource').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0073')).rarity('Uncommon')
event.create('voucher_relic').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0074')).rarity('Rare')
event.create('map_fragment').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0075')).rarity('Uncommon')
event.create('map_scroll_biome').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0076')).rarity('Uncommon')
event.create('map_scroll_structure').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0077')).rarity('Rare')
//essences
event.create('essence_monster').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0078')).rarity('Uncommon')
event.create('essence_monster_raw').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0079')).rarity('Uncommon')
event.create('essence_earth').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0080')).rarity('Uncommon')

event.create('key_magic').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0081')).rarity('Rare')

event.create('salvage').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0082'))
event.create('alchemy').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0083'))
event.create('enchantery').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0084'))

event.create('dust_experience').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0086')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0085'))
event.create('dust_alchemical').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0088')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0087'))
event.create('scraps').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0089'))

event.create('portable_dissolver').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0090')).maxDamage(480).rarity('Rare')
event.create('portable_transmutator').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0091')).maxDamage(480).rarity('Rare')
event.create('portable_salvager').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0092')).maxDamage(480).rarity('Rare')
event.create('junk').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0093'))
event.create('sifted_dust').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0094'))

event.create('artifact_fragment').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0095'))

event.create('scroll_exp').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0096'))
event.create('scroll_exp_great').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0097')).rarity('Uncommon')

event.create('spawnercore').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0098')).rarity('Uncommon')

event.create('contraband').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0099')).rarity('Uncommon')

event.create('mending').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0100')).texture('minecraft:item/enchanted_book').glow(true)

//interactables
	event.create('mage_bag').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0101'))
	event.create('gemcutters_pouch').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0102'))
	event.create('gemcutters_pouch_greater').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0103')).texture('kubejs:item/gemcutters_pouch')

	event.create('unidentified_glyph_scroll').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0104'))
	event.create('unidentified_glyph_scroll_2').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0105')).texture('kubejs:item/unidentified_glyph_scroll')
	event.create('unidentified_glyph_scroll_3').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0106')).texture('kubejs:item/unidentified_glyph_scroll')

	event.create('fortune_cookie').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0107')).food(f => { f.hunger(2).saturation(0.1) })
	event.create('book_old').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0108'))
	event.create('book_ancient').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0109'))
	event.create('canned_food').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0110'))
	event.create('lost_bag').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0111'))
	event.create('ore_bag').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0112'))
	event.create('reagent_box').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0113'))
	event.create('detonator').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0114')).unstackable()
	event.create('rusty_key').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0115'))
	event.create('unstable_battery').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0116')).unstackable()
	event.create('emergency_flare').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0117'))
	event.create('bee_jar').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0118')).unstackable()
	event.create('data_slate').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0119'))
	event.create('sentry_remote').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0120'))
	event.create('bioscan_syringe').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0121'))
	event.create('charged_stinger').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0122')).food(food => {food.hunger(6).saturation(1.2)})
	event.create('magnetic_grapple').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0123')).maxDamage(32)
	event.create('thermal_paste').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0124'))
	event.create('echo_locator').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0125')).maxDamage(4)
	event.create('kinetic_dampener').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0126')).maxDamage(32).unstackable();
    event.create('scavenger_magnet').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0127')).maxDamage(100).unstackable();
    event.create('translocation_coil').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0128')).maxDamage(25).unstackable();
	event.create('void_core').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0129')).unstackable();
	
	event.create('berserk_draught').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0130'))
	event.create('bottled_ice').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0131'))

    event.create('ancient_crate').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0133')).glow(true).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0132'))
    // The Skeleton Key
    event.create('skeleton_key').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0135')).glow(true).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0134'))
    // The Mimic Heart (Drop)
    event.create('mimic_heart').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0137')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0136'))
	// The Ritual Crate (Element-themed)
    event.create('ritual_crate').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0139')).glow(true).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0138'));
    // The Chaos Crate (Challenge-themed)
    event.create('chaos_crate').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0141')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0140'));
    // The Wishing Well (Enchant-themed)
    event.create('wishing_crate').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0143')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0142'));
	event.create('echo_crate').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0144'))	
	event.create('botanical_crate').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0145')).maxStackSize(1)
	//Astrolabe
    event.create('echo_extractor')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0146'))
         .unstackable()
         .glow(true)

    // The Consumable "Fuel"
    event.create('blessed_incense')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0148'))
         .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0147'));
	event.create('spam_voucher')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0149'))
        .texture('minecraft:item/paper') // Standard paper texture
        .unstackable()
    // The Reward Item (Generic until decrypted)
    event.create('sealed_tome')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0150'))
         .glow(true)
		 .unstackable()
	event.create('chronicle_of_echoes')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0152'))
         .unstackable()
         .texture('minecraft:item/writable_book')
         .glow(true)
         .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0151'));
	event.create('living_branch')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0153'))
		 .maxDamage(64)
         .unstackable()
         .rarity('rare')
         .glow(true)
    event.create('entropic_cent')
         .displayName(Text.translate("kubejs.script.startup.scripts.itemregistry.0154"))
		 .maxDamage(8)
         .unstackable()
         .rarity('epic')	
	event.create('living_branch_bridging')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0155'))
         .maxStackSize(1)
         .unstackable()
         .maxDamage(128);

    event.create('buzzing_living_branch')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0156'))
         .maxStackSize(1)
         .unstackable()
         .maxDamage(32);	 
		 
	event.create('d6')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0157'))
         .maxStackSize(1)
         .unstackable()
         .maxDamage(32)
		 .texture('kubejs:item/dice')
	event.create('d10')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0158'))
         .maxStackSize(1)
         .unstackable()
         .maxDamage(32)
		 .texture('kubejs:item/dice')
	event.create('d12')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0159'))
         .maxStackSize(1)
         .unstackable()
         .maxDamage(32)
		 .texture('kubejs:item/dice')
	event.create('d20')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0160'))
         .maxStackSize(1)
         .unstackable()
         .maxDamage(32)
		 .texture('kubejs:item/dice')
	event.create('unfinished_dice')
         .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0161'))
         .maxStackSize(1)
         .unstackable()
         .maxDamage(32)
		 .texture('kubejs:item/dice')	

	event.create('item_recycler')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0162'))
        .unstackable()
		
	event.create('recycling_journal')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0163'))
        .unstackable()
		.texture('minecraft:item/writable_book')
        .glow(true)

    event.create("gamble_coin")
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0164'))
		.maxDamage(32)
        .maxStackSize(1)
        .rarity("EPIC")

//exchange coins
event.create('coin_01').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0166')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0165'))
event.create('coin_02').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0168')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0167'))
event.create('coin_03').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0170')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0169'))
event.create('coin_04').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0172')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0171'))
event.create('coin_05').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0174')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0173'))
event.create('coin_06').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0176')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0175'))

event.create('quest_bundle').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0178')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0177'))
event.create('quest_note').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0180')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0179'))
event.create('quest_crate').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0182')).tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0181'))

event.create('great_soul').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0183')).rarity('Epic')

//gear upgrades
event.create('scroll_proficiency').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0184')).rarity('Epic').texture('kubejs:item/manuscript')

event.create('upgrade_blank').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0185')).texture('kubejs:item/upgrades/gear_upgrade_blank')
event.create('upgrade_swift').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0186')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/upgrade')
event.create('upgrade_swift2').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0187')).rarity('Rare').maxStackSize(1).texture('kubejs:item/upgrades/upgrade2')
event.create('upgrade_swift3').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0188')).rarity('Epic').maxStackSize(1).texture('kubejs:item/upgrades/upgrade3')
event.create('upgrade_sharp').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0189')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/sharp')
event.create('upgrade_sharp2').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0190')).rarity('Rare').maxStackSize(1).texture('kubejs:item/upgrades/sharp2')
event.create('upgrade_sharp3').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0191')).rarity('Epic').maxStackSize(1).texture('kubejs:item/upgrades/sharp3')
event.create('upgrade_force').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0192')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/force')
event.create('upgrade_prof').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0193')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/profgain')

event.create('upgrade_heart').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0194')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/hp')
event.create('upgrade_gilded').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0195')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/shieldheart2')
event.create('upgrade_guarding').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0196')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/shield2')
event.create('upgrade_sniping').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0197')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/eye')
event.create('upgrade_quick').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0198')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/arrow')
event.create('upgrade_reach').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0199')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/reach')
event.create('upgrade_quickfeet').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0200')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/speed')
event.create('upgrade_lifesteal').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0201')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/lifesteal')
event.create('upgrade_fortress').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0202')).rarity('Uncommon').maxStackSize(1).texture('kubejs:item/upgrades/pillar')

event.create('defence').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0203'))
event.create('armorpen').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0204'))
event.create('backstab').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0205'))
event.create('parry').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0206'))
event.create('dualwield').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0207'))

event.create('star').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0208')).glow(true)
event.create('medal').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0209')).glow(true).tag('artifacts:artifact').maxDamage(666)
event.create('heart').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0210'))
event.create('heart-half').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0211'))
event.create('caution').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0212'))
event.create('chest').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0213'))
event.create('chest2').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0214'))
event.create('fire').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0215'))
event.create('forbid').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0216'))
event.create('help').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0217'))
event.create('key').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0218'))
event.create('key_01d').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0219'))
event.create('lightning').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0220'))
event.create('lock').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0221'))
event.create('lock-2').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0222'))
event.create('mark').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0223'))
event.create('skull').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0224'))
event.create('skull2').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0225'))
event.create('skull3').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0226'))
event.create('ace').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0227'))
event.create('armour').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0228'))
event.create('bleed').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0229'))
event.create('book2').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0230'))
event.create('book3').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0231'))
event.create('book4').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0232'))
event.create('book_02f').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0233'))
event.create('book_04g').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0234'))
event.create('campfire').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0235'))
event.create('dice').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0236'))
event.create('letter').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0237'))
event.create('magnifier').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0238'))
event.create('manuscript').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0239'))
event.create('map').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0240'))
event.create('mine').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0241'))
event.create('ruby').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0242'))
event.create('magicscroll').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0243'))
event.create('slash').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0244'))
event.create('spellbook_01d').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0245'))
event.create('spyglass').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0246'))
event.create('levelup').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0247'))
event.create('shield').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0248'))
event.create('amulet').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0249'))
event.create('rucksack').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0250'))
event.create('bomb').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0251'))
event.create('dodge').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0252'))
event.create('scaling').displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0253'))

event.create('obliterator', 'sword')
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0255'))
        .unstackable()
        .glow(true)
        .tooltip(Text.translate('kubejs.script.startup.scripts.itemregistry.0254'))
        .tier('netherite') 
        .attackDamageBaseline(10000);
///END
})

StartupEvents.registry('fluid', event => {

	event.create('molten_orichalcum')
		.thickTexture(0xFFBF49)
		.bucketColor(0xFFBF49)
		.displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0256'))
		.noBlock()

    event.create('aquaculture:molten_neptunium')
        .thickTexture(0x17f4b8)
        .bucketColor(0x17f4b8)
        .displayName(Text.translate('kubejs.script.startup.scripts.itemregistry.0257'))
        .tag('aquaculture:molten_neptunium');	

  /// END
})

StartupEvents.registry('block', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})


StartupEvents.postInit(event => { Platform.mods.kubejs.name = 'RAD 3'; });
