ItemEvents.tooltip(event => {
    // --- 1. ANCIENT LOOT CRATE ---
	event.addAdvanced('kubejs:ancient_crate', (item, advanced, text) => {
        text.add(1, Text.of('一个用生锈的铁箍着的风化箱子。').gray().italic())

        if (!event.isShift()) {
            text.add(2, [Text.of('按住 ').gray(), Text.of('[Shift] ').gold(), Text.of('查看机制。').gray()])
        } else {
            text.add(2, Text.of('§6机制：'))
            text.add(3, Text.of(' • 5秒冷却（可使用§b骷髅钥匙§f绕过）。').white())
            text.add(4, Text.of(' • 15%概率为§c宝箱怪§f陷阱。').white())
            
            text.add(5, Text.of('§d特殊特性：'))
            text.add(6, Text.of(' • §e头奖链：§f 10%概率在里面找到2个额外板条箱。').white())
            text.add(7, Text.of(' • §b维度战利品：§f 奖励随你的维度缩放。').white())
         
            text.add(8, [Text.of('§2运气加成：§f 雨天、夜晚和幸运药水提升投掷。')])
        }
    })

    // --- 2. RITUAL CRATE ---
    event.addAdvanced('kubejs:ritual_crate', (item, advanced, text) => {
        if (!event.isShift()) {
            text.add(1, [Text.of('按住 ').gray(), Text.of('[Shift] ').gold(), Text.of('查看详情。').gray()])
        } else {
            text.add(1, Text.of('• 必须在特定环境中打开。').white())
            text.add(2, Text.of('• 有效：深水（Y < 0）或高峰（Y > 200）。').aqua())
            text.add(3, Text.of('• 使用不当可能惊扰不安的魂魄。').darkGray())
        }
    })

    // --- 3. CHAOS CRATE ---
    event.addAdvanced('kubejs:chaos_crate', (item, advanced, text) => {
        if (!event.isShift()) {
            text.add(1, [Text.of('按住 ').gray(), Text.of('[Shift] ').gold(), Text.of('查看详情。').gray()])
        } else {
            text.add(1, Text.of('• 包含被囚禁的守卫者的精华。').white())
            text.add(2, Text.of('• 召唤3个主题生物；击败它们以获取奖励。').red())
            text.add(3, Text.of('• 奖励包括主题特定的稀有材料。').gold())
        }
    })

    // --- 4. WISHING WELL ---
    event.addAdvanced('kubejs:wishing_crate', (item, advanced, text) => {
        if (!event.isShift()) {
            text.add(1, [Text.of('按住 ').gray(), Text.of('[Shift] ').gold(), Text.of('查看详情。').gray()])
        } else {
            text.add(1, Text.of('• 需要祭品才能运作。').white())
            text.add(2, Text.of('• 在副手持有钻石、绿宝石或下界合金。').gold())
        }
    })

	event.addAdvanced('kubejs:botanical_crate', (item, advanced, text) => {
        let stage = (item.nbt && item.nbt.growthStage) ? item.nbt.growthStage : 0;
        
        text.add(1, Text.of('包裹着厚实古老的藤蔓。').darkGreen().italic())
        
        if (event.isShift()) {
            text.add(2, Text.of('§2生长规则：'))
            text.add(3, Text.of(' • 使用时在§e副手§r持有§f骨粉§r。').white())
            text.add(4, Text.of(' • 必须达到§a阶段3§r才能绽放出战利品。').white())
            text.add(5, Text.of(` • Current Growth: §6${stage}/3`).yellow())
        } else {
            text.add(2, [Text.of('当前生长：').gray(), Text.of(`${stage}/3`).green()])
            text.add(3, [Text.of('按住 ').gray(), Text.of('[Shift]').gold()])
        }
    })

    // --- 5. SUPPORT ITEMS (Keys & Hearts) ---
	event.addAdvanced('kubejs:skeleton_key', (item, advanced, text) => {
			text.add(1, Text.of('锁匠的杰作。').gray().italic())

			if (!event.isShift()) {
				text.add(2, [Text.of('按住 ').gray(), Text.of('[Shift] ').gold(), Text.of('查看用法。').gray()])
			} else {
				text.add(2, Text.of('§b功能：'))
				text.add(3, Text.of(' • 立即解锁远古板条箱。').white())
				text.add(4, Text.of(' • 使用后消耗。放在副手持有。').gray())
			}
	})

	event.addAdvanced('kubejs:echo_crate', (item, advanced, text) => {
        text.add(1, Text.of('超敏感晶体结构。').gray().italic())
        if (event.isShift()) {
            text.add(2, Text.of('§3声学规则：'))
            text.add(3, Text.of(' • 附近有敌对振动（生物）时无法打开。').white())
            text.add(4, Text.of(' • §b和谐：§f 唱片机音乐覆盖生物噪音并提升战利品。').white())
            text.add(5, Text.of(' • §d有一定几率释放声波脉冲击退敌人。').darkPurple())
        } else {
            text.add(2, [Text.of('按住').gray(), Text.of('[Shift]').gold()])
        }
    })

    event.addAdvanced('kubejs:mimic_heart', (item, advanced, text) => {
        if (event.isShift()) {
            text.add(1, Text.of('• 从宝箱怪身上收获的搏动器官。').darkRed())
            text.add(2, Text.of('• 用于重铸破损钥匙。').white())
        }
    })

	event.addAdvanced('kubejs:quest_crate', (item, advanced, text) => {
			text.add(Text.of('铁箍板条箱').white());
			text.add(Text.of(''));
			text.add(Text.of('§7可在以下地方的箱子中找到：').white());
			text.add(Text.of('§7 • 亡灵地窖').white());
			text.add(Text.of('§7 • 怪物迷宫').white());
			text.add(Text.of(''));
			text.add(Text.of('将其带至').white());
			text.add(Text.of('流浪者驿站').darkRed());
    });

	
})	