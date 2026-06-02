// priority: 0

console.info('Hello, World! (You will only see this line once in console, during startup)')

StartupEvents.registry('item', event => {

/* event.create('roguefp').displayName('盗贼指纹').tooltip('Used to choose your Specialization path')
event.create('wizardfp').displayName('法师指纹').tooltip('Used to choose your Specialization path')
event.create('fighterfp').displayName('战士指纹').tooltip('Used to choose your Specialization path')
event.create('crafterfp').displayName('工匠指纹').tooltip('Used to choose your Specialization path')

//fighter archetype
//1st mark fighter
event.create('mark_paladin').displayName('I. 圣骑士之印')
event.create('mark_blackguard').displayName('I. 黑卫之印')
event.create('mark_warrior').displayName('I. 勇士之印')
event.create('mark_barbarian').displayName('I. 野蛮人之印')
event.create('mark_warlord').displayName('I. 军阀之印') 
//2nd mark fighter
event.create('mark_crusader').displayName('II. 十字军之印')
event.create('mark_hexblade').displayName('II. 咒刃之印')
event.create('mark_mercenary').displayName('II. 雇佣兵之印')
event.create('mark_savage').displayName('II. 凶蛮者之印')
event.create('mark_marshal').displayName('II. 元帅之印')
//3rd mark fighter
event.create('mark_templar').displayName('III. 圣堂武士之印')
event.create('mark_deathknight').displayName('III. 死亡骑士之印')
event.create('mark_champion').displayName('III. 冠军之印')
event.create('mark_berserker').displayName('III. 狂战士之印')
event.create('mark_commander').displayName('III. 指挥官之印')

//crafter archetype
//1st mark crafter
event.create('mark_miner').displayName('I. 矿工之印')
event.create('mark_alchemist').displayName('I. 炼金术士之印')
event.create('mark_explorer').displayName('I. 探险家之印')
event.create('mark_huntsman').displayName('I. 猎手之印')
event.create('mark_farmer').displayName('I. 农夫之印')
//2nd mark crafter
event.create('mark_spelunker').displayName('II. 洞穴探险者之印')
event.create('mark_enchanter').displayName('II. 附魔师之印')
event.create('mark_wanderer').displayName('II. 漫游者之印')
event.create('mark_tracker').displayName('II. 追踪者之印')
event.create('mark_rancher').displayName('II. 牧场主之印')
//3rd mark crafter
event.create('mark_cavemaster').displayName('III. 洞窟宗师之印')
event.create('mark_thaumaturge').displayName('III. 奇术师之印')
event.create('mark_pathfinder').displayName('III. 开路者之印')
event.create('mark_pursuer').displayName('III. 追猎者之印')
event.create('mark_agrarian').displayName('III. 农耕者之印')
	
//wizard archetype
//1st mark wizard
event.create('mark_elementalist').displayName('I. 元素使之印')
event.create('mark_tamer').displayName('I. 驯兽师之印')
event.create('mark_mage').displayName('I. 法师之印')
event.create('mark_healer').displayName('I. 治疗者之印')
event.create('mark_battlemage').displayName('I. 战斗法师之印')
//2nd mark wizard
event.create('mark_sorcerer').displayName('II. 术士之印')
event.create('mark_summoner').displayName('II. 召唤师之印')
event.create('mark_warlock').displayName('II. 契术师之印')
event.create('mark_spiritualist').displayName('II. 通灵者之印')
event.create('mark_spellblade').displayName('II. 法刃之印')
//3rd mark wizard
event.create('mark_masterlementalist').displayName('III. 元素宗师之印')
event.create('mark_beastmaster').displayName('III. 兽王之印')
event.create('mark_archmage').displayName('III. 大法师之印')
event.create('mark_shaman').displayName('III. 萨满之印')
event.create('mark_warmage').displayName('III. 战法师之印')

//rogue archetype
//1st mark rogue
event.create('mark_archer').displayName('I. 弓手之印')
event.create('mark_shadow').displayName('I. 影行者之印')
event.create('mark_pirate').displayName('I. 海盗之印')
event.create('mark_pitfighter').displayName('I. 斗士之印')
event.create('mark_thief').displayName('I. 盗贼之印')
//2nd mark rogue
event.create('mark_arbalester').displayName('II. 弩手之印')
event.create('mark_assasin').displayName('II. 刺客之印')
event.create('mark_corsair').displayName('II. 私掠者之印')
event.create('mark_gladiator').displayName('II. 角斗士之印')
event.create('mark_bandit').displayName('II. 强盗之印')
//3rd mark rogue
event.create('mark_sniper').displayName('III. 狙击手之印')
event.create('mark_nightblade').displayName('III. 夜刃之印')
event.create('mark_captain').displayName('III. 船长之印')
event.create('mark_underdog').displayName('III. 逆袭者之印')
event.create('mark_brigand').displayName('III. 恶棍之印')*/

//arrows



//////////////////////end
})

StartupEvents.registry('block', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})

StartupEvents.postInit(event => { Platform.mods.kubejs.name = 'RAD 3'; });