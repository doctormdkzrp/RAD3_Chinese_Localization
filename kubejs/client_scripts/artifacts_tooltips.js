ItemEvents.tooltip(event => {
    // 1. Original Living Branch
    event.addAdvanced('kubejs:living_branch', (item, advanced, text) => {
		text.add(1, Text.of('随着森林的心跳脉动。').green().italic())
        if (!event.isShift()) {
            text.add(2, [Text.of('按住 ').gray(), Text.of('[Shift] ').gold(), Text.of('查看机制。').gray()])
        } else {
            text.add(2, Text.of('§6机制：'))
            text.add(3, Text.of(' • §e转化：§f 作用于木头、泥土、圆石和石砖').white())
            text.add(4, Text.of(' • §2燃料：§f 消耗物品栏中的§f骨粉§f。').white())
        }
    })

    // 2. Branch of Bridging
    event.addAdvanced('kubejs:living_branch_bridging', (item, advanced, text) => {
        text.add(1, Text.of('这根树枝指向的地方空气变得稠密。').gray().italic())
        if (!event.isShift()) {
            text.add(2, [Text.of('按住 ').gray(), Text.of('[Shift] ').gold(), Text.of('查看机制。').gray()])
        } else {
            text.add(2, Text.of('§6机制：'))
            text.add(3, Text.of(' • §e踏空而行：§f 放置5个水平方向的永久性树叶。').white())
            text.add(4, Text.of(' • §b精准：§f 如果碰到固体方块则自动停止。').white())
            text.add(5, Text.of(' • §2燃料：§f 每5格爆发消耗§f1个骨粉§f。').white())
        }
    })

    // 3. Buzzing Branch
    event.addAdvanced('kubejs:buzzing_living_branch', (item, advanced, text) => {
        text.add(1, Text.of('你能听到木头传来微弱的嗡嗡声。').gray().italic())
        if (!event.isShift()) {
            text.add(2, [Text.of('按住 ').gray(), Text.of('[Shift] ').gold(), Text.of('查看机制。').gray()])
        } else {
            text.add(2, Text.of('§6机制：'))
            text.add(3, Text.of(' • §e蜂群：§f 召唤3只守卫蜂保护使用者。').white())
            text.add(4, Text.of(' • §b忠诚：§f 蜜蜂传送以保持在范围内。').white())
            text.add(5, Text.of(' • §d寿命：§f 蜜蜂在60秒后消失').white())
            text.add(6, Text.of(' • §2燃料：§f 消耗物品栏中的§f骨粉§f').white())
        }
    })
	
	event.addAdvanced('kubejs:gamble_coin', (item, advanced, text) => {
				
			text.add(1, Text.of('§7将此硬币放在你的§f主手').white()),
			text.add(2, Text.of('§72. 需要§6金锭§7和少量§4经验值§7才能转动').white()),
			text.add(3, Text.of('§7§f右键§7转动').white()),
			text.add(4, Text.of('').white()),
			text.add(5, Text.of('§8• 冷却：每次转动间隔5秒。').white()),
			text.add(6, Text.of('§8• 转动限制会定期重置').white())
	})
	
	
	event.addAdvanced('lrdynamicdungeon:dungeon_pass', (item, advanced, text) => {
			text.add(Text.of(''));
			text.add(Text.of('§7进入地牢的单次通行证'));
			text.add(Text.of('§7可作为战利品找到，或用地下城或突袭硬币购买'));
			text.add(Text.of(''));
			text.add(Text.of('§8使用 §7/raidstats §8查看你的排名和统计'));
			text.add(Text.of('§8使用 §7/raidhelp §8获取系统信息'));
    });
	
	event.addAdvanced('kubejs:entropic_cent', (item, advanced, text) => {
        text.add(1, Text.of('沉重、镀金且不可预测。').yellow().italic())
        if (!event.isShift()) {
            text.add(2, Text.of('按住 [Shift] 查看详情').gold())
        } else {
            text.add(2, Text.of(' • 右键：翻转以获得巨大运气或厄运。').white())
            text.add(3, Text.of(' • 每次翻转消耗1个金块。').gray())
        }
    })
	
		const tooltipData = [
        {
            id: 'kubejs:rusty_key',
            lore: '一把覆盖着厚厚橙色锈迹的旧钥匙',
            mechanics: [
                '§6• 可用于强行打开铁门',
                '§2• 钥匙很脆弱，使用一次后就会断裂'
            ]
        },
        {
            id: 'kubejs:unstable_battery',
            lore: '它发出危险且闪烁的橙色光芒',
            mechanics: [
                '§b• 获得巨大的速度和急迫效果，持续30秒',
                '§2• 效果结束后极度虚弱（饥饿）',
                '§6• 右键使用并激活'
            ]
        },
        {
            id: 'kubejs:emergency_flare',
            lore: '地下探索的标准装备',
            mechanics: [
                '§6• 在所在位置点燃强光',
                '§b• 透视显示附近隐藏的实体',
                '§d• 60秒后熄灭'
            ]
        },
        {
            id: 'kubejs:bee_jar',
            lore: '你能听到里面愤怒的嗡嗡声',
            mechanics: [
                '§b• 撞击后释放3-4只攻击性蜜蜂',
                '§d• 蜜蜂有特殊寿命，会消失。',
                '§6• 适合快速制造混乱。'
            ]
        },
        {
            id: 'kubejs:data_slate',
            lore: '部分数据可读',
            mechanics: [
                '§6• 右键尝试解密',
                '§2• 有40%几率失败并清除数据',
                '§b• 可能揭示秘密坐标或经验值'
            ]
        },
		{
            id: 'kubejs:sentry_remote',
            lore: '破碎的屏幕显示“协议：冻结”',
            mechanics: [
                '§b• 发出脉冲冻结敌对生物的移动',
                '§6• 影响10格半径内的所有怪物',
                '§d• 由以太云能量驱动'
            ]
        },
        {
            id: 'kubejs:bioscan_syringe',
            lore: '用于从生物异常中提取样本',
            mechanics: [
                '§2• 右键发光蜜蜂以收获能量',
                '§6• 成功后获得充能毒刺',
                '§d• 宿主在提取过程中被消耗'
            ]
        },
        {
            id: 'kubejs:magnetic_grapple',
            lore: '为城市攀爬改造的工业绞盘。',
            mechanics: [
                '§6• 将使用者拉向目标方块',
                '§2• 机械故障风险高（耐久度）',
                '§b• 最大有效距离：20格'
            ]
        },
        {
            id: 'kubejs:thermal_paste',
            lore: '高腐蚀性化合物',
            mechanics: [
                '§2• 瞬间溶解铁栏杆和铁活板门',
                '§6• 接触金属时消耗',
                '§b• 警告：请勿涂抹在皮肤上'
            ]
        },
        {
            id: 'kubejs:echo_locator',
            lore: '“我听到战利品在呼吸……”',
            mechanics: [
                '§b• 标记附近储存容器的位置',
                '§6• 可穿透实心墙壁和地板'
            ]
        },
        {
            id: 'kubejs:kinetic_dampener',
            lore: '物理定律？更像是建议',
            mechanics: [
                '§b• 立即停止所有垂直和水平速度',
                '§6• 重置摔落距离以防止撞击伤害',
                '§2• 每次使用高能量消耗'
            ]
        },
        {
            id: 'kubejs:scavenger_magnet',
            lore: '因为弯腰太麻烦了',
            mechanics: [
                '§b• 脉动吸引附近的掉落物向你',
                '§6• 12格有效半径',
                '§2• 利用磁共振吸引战利品'
            ]
        },
        {
            id: 'kubejs:translocation_coil',
            lore: "我宁愿在那里，你宁愿在这里",
            mechanics: [
                '§d• 与目标生物交换位置',
                '§b• 最大距离：25格',
                '§c• 警告：极高的耐久度消耗'
            ]
        },
		{
            id: 'kubejs:berserk_draught',
            lore: "一种猛烈的药剂，麻痹痛苦并激发愤怒",
            mechanics: [
                '§F• Grants §bSpeed§f and §eStrength§f buffs',
                '§b• 20秒后大量§c饥饿§f损失'
            ]
        },
		{
            id: 'kubejs:bottled_ice',
            lore: "装有真冰碎片的玻璃瓶",
            mechanics: [
                '§f• 对液体或实体有效',
                '§b• 必须直接投向液体'
            ]
        },
		{
            id: 'kubejs:dungeon_recall',
            lore: "一个脉动的神器，记得你从哪里开始",
            mechanics: [
                '§f• 将使用者传送至地牢入口坐标',
                '§2• 消耗品（1次使用）',
                '§8• 仅在突袭维度内有效'
            ]
        },
		{
            id: 'kubejs:ice_shard',
            lore: "来自远古冰元素的冻结碎片",
            mechanics: [
                '§6• 定住附近所有敌人',
                '§e• 8格半径',
                '§d• 效果持续3秒',
                '§2• 消耗品（1次使用）',
                '§8• 仅在袭击维度内有效'
            ]
        },
		{
            id: 'kubejs:kill_multiplier',
            lore: "时间只是个建议，而虚空建议你抓紧",
            mechanics: [
                '§6• 仅在袭击维度内有效',
                '§e• 倍增所有击杀得分',
                '§d• 效果持续45秒',
                '§2• 不影响宝箱战利品得分',
                '§8• 消耗品（1次使用）'
            ]
        },
		{
			id: 'kubejs:void_core',
			lore: "它脉动着一种重力，像是一个你无法回答的问题。",
			mechanics: [
				'§6• §f使用时释放一股强大的§e发光§f光环。',
				'§b• §f发光期间，§d石头§f、§d沙子§f和§d泥土§f会被消除',
				'§2• 蹲下[Shift]以稳定核心并防止破坏',
				'§e• 不影响玩家建造的结构或贵重材料',
				'§d• 光环在30秒后消散。',
				'§8• ! 请极其小心地处理 !'
			]
		}
    ];

    tooltipData.forEach(item => {
        event.addAdvanced(item.id, (stack, advanced, text) => {
            // Line 0 is the Item Name. Line 1 is our Italicized Lore.
            text.add(1, Text.of(item.lore).italic().gray());

            if (!event.shift) {
                text.add(2, Text.of("按住 [Shift] 查看更多信息").yellow());
            } else {
                item.mechanics.forEach((m, index) => {
                    // Start adding from line 3 onwards
                    text.add(2 + index, Text.of(m).white());
                });
            }
        });
    });
	
	const dice = [
        { id: 'kubejs:d6', lore: '一个简单的木质方块，上面刻有凹点。', faces: 6 },
        { id: 'kubejs:d10', lore: '一个尖利的双金字塔形，深受命运追寻者喜爱。', faces: 10 },
        { id: 'kubejs:d12', lore: '一个复杂的几何形状，嗡嗡作响充满能量。', faces: 12 },
        { id: 'kubejs:d20', lore: '命运的终极仲裁者。', faces: 20 }
    ]

    dice.forEach(die => {
        event.addAdvanced(die.id, (item, advanced, text) => {
            text.add(1, Text.gray(die.lore).italic())
            if (!event.shift) {
                text.add(2, Text.white('Hold [Shift] for mechanics.'))
            } else {
                text.add(2, Text.gold('Mechanics:'))
                text.add(3, Text.of(' • ').white().append(Text.gold(`Chaos Roll: `).append(Text.white(`Rolls 1-${die.faces}.`))))
                text.add(4, Text.of(' • ').white().append(Text.aqua('Outcome: ').append(Text.white('Triggers a random effect based on the result.'))))
                text.add(5, Text.of(' • ').white().append(Text.lightPurple('Lifespan: ').append(Text.white('1 Durability per use.'))))
                text.add(6, Text.of(' • ').white().append(Text.darkGreen('Cost: ').append(Text.white('5 Experience Levels.'))))
            }
        })
    })
///END	
})