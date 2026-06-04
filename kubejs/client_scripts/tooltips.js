ItemEvents.tooltip(event =>{
    event.addAdvanced(Ingredient.all, (item, advanced, text) => {
        if (item.maxDamage > 0){
            let durability = String(item.maxDamage - item.damageValue).split(".", 1)
            let maxDurability = String(item.maxDamage).split(".", 1)
            if (item.damageValue/item.maxDamage >= 0.9){
                text.add(Text.red("Durability: " + durability + " / " + maxDurability))
            } else if(item.damageValue/item.maxDamage >= 0.5){
                text.add(Text.yellow("Durability: " + durability + " / " + maxDurability))
            } else {
                text.add(Text.green("Durability: " + durability + " / " + maxDurability))
            }
        }
    })
	
	event.addAdvanced('#skilltree:gems', (item, advanced, text) => {
      text.add(1, [Text.of('• 使用').yellow(),Text.of('锻造台').green().bold(true),Text.of('将其嵌入').yellow()
      ])
	})
	
	event.addAdvanced('kubejs:spam_voucher', (item, advanced, text) => {
				text.add(1, Text.of('隐约散发着廉价麦酒和绝望的气息。').gray().italic())
				text.add(2, Text.of(' • §6机制：§f 在铁匠处提供0%折扣。').white())
				text.add(3, Text.of(' • §2费用：§f 一组钻石（不可退款）。').white())
				text.add(5, Text.of(' • §b特殊能力：§f 让玩家感到不安。').white())
				text.add(5, Text.of(' • §d寿命：§f 已于昨日过期。').white())
	})

	event.addAdvanced('fantasy_armor:moon_crystal', (item, advanced, text) => {
				text.add(1, Text.of('一块固化月光碎片，触感冰凉').gray().italic())
				text.add(2, Text.of(' • §6击败凋灵后开始在宝箱中出现').white())
				text.add(3, Text.of(' • §2可以在各种袋子与战利品箱中找到').white())
				text.add(4, Text.of(' • §b有时会作为任务奖励').white())
				text.add(5, Text.of(' • §d用于修改下界合金盔甲的外观').white())
	})

	event.addAdvanced('kubejs:map_fragment', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').gold(),
        Text.of('查看更多信息').gray()
      ])
    } else {
		text.add(1, [
	    Text.of('• 用于向§2哥布林商人§f、§6流浪商人§f和§b图书管理员§f购买地图卷轴').white()
      ])
      text.add(2, [
        Text.of('• 可以从§b不同商人§f或§b战利品§f中获得').white()
		])
      text.add(3, [
        Text.of('• 查看§6寻路者任务章节§f了解更多信息').white()
		])
    }
	})
		
	event.addAdvanced('minecraft:gold_ingot', (item, advanced, text) => {
				text.add(1, Text.of('可以用任何武器或盔甲合成以更新其属性').gray());			
	})
		
	event.addAdvanced('bountiful:bountyboard', (stack, advanced, text) => {      
        if (!event.shift) {
            text.add(1, Text.of('按住 ').gray().append(Text.gold('[Shift] ')).append(Text.gray('for mechanics.')))
        } else {
            text.add(2, Text.of(' 1. ').append(Text.gold('Bounty Board: ')).append(Text.white('Right-click to view and accept active contracts')))
            text.add(3, Text.of(' 2. ').append(Text.yellow('Rarity Tiers: ')).append(Text.white('Higher tiers offer significantly better rewards')))
            text.add(4, Text.of(' 3. ').append(Text.aqua('Turn-in: ')).append(Text.white('Right-click the board with a finished quest to claim loot')))
        }
    })

    event.addAdvanced('bountiful:decree', (stack, advanced, text) => {      
        if (!event.shift) {
            text.add(1, Text.of('按住 ').gray().append(Text.gold('[Shift] ')).append(Text.gray('for mechanics.')))
        } else {
            text.add(2, Text.of(' 1. ').append(Text.gold('Application: ')).append(Text.white('Apply to a Bounty Board to set the theme of bounties')))
            text.add(3, Text.of(' 2. ').append(Text.yellow('Specialization: ')).append(Text.white('Forces the board to only generate specific task types')))
            text.add(4, Text.of(' 3. ').append(Text.aqua('Reset: ')).append(Text.white('Replaces all unclaimed bounties upon application')))
            text.add(5, Text.of(' 4. ').append(Text.lightPurple('Longevity: ')).append(Text.white('The decree stays active until a different one is applied')))
        }
    })
	
	event.addAdvanced('kubejs:map_scroll_biome', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').gold(),
        Text.of('查看更多信息').gray()
      ])
    } else {
		text.add(1, [
	    Text.of('• 可兑换用于定位特定§2生物群系§f的§6寻路者羽毛笔§f').white()
      ])
      text.add(2, [
        Text.of('• 可以从§b不同商人§f处获得，或作为§b战利品§f稀有掉落').white()
		])
      text.add(3, [
        Text.of('• 查看§6寻路者任务章节§f了解更多信息').white()
		])
    }
	})

    event.addAdvanced('ars_nouveau:spell_crossbow', (item, advanced, text) => {
        let failChance = 15
        
        if (item.enchantments.hasOwnProperty('minecraft:multishot')) {
            failChance += 15
        }
        
        if (item.enchantments.hasOwnProperty('apotheosis:crescendo')) {
            let enchLevel = item.enchantments['apotheosis:crescendo']
            failChance += (10 * enchLevel)
        }

		text.add(1, Text.darkRed('Arcane Instability').bold())
        text.add(2, Text.gray('Has a slight chance to fail to cast any spell'))
		text.add(3, Text.gray('Risk increases significantly with ')
            .append(Text.aqua('Multishot'))
            .append(Text.gray(' or '))
            .append(Text.aqua('Crescendo'))
            .append(Text.gray(' enchantments'))
        )
        
        let color = failChance >= 70 ? Text.red : Text.yellow
        text.add(4, Text.gold('Current misfire Chance: ').append(color(`${failChance}%`)))

    })
	
	event.addAdvanced('kubejs:map_scroll_structure', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').gold(),
        Text.of('查看更多信息').gray()
      ])
    } else {
		text.add(1, [
	    Text.of('• 可兑换用于定位特定结构的§e制图师羽毛笔§f').white()
      ])
      text.add(2, [
        Text.of('• 可以从§b不同商人§f处获得，或作为§b战利品§f稀有掉落').white()
		])
      text.add(3, [
        Text.of('• 查看§6寻路者任务章节§f了解更多信息').white()
		])
    }
	})

	event.addAdvanced('paraglider:spirit_orb', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').gold(),
        Text.of('查看更多信息').gray()
      ])
    } else {
		text.add(1, [
	    Text.of('• 可以在村庄中兑换成 ').white(),
        Text.of('耐力瓶 ').green(),
        Text.of('在村庄中').white()
      ])
      text.add(2, [
        Text.of('• 破坏刷怪笼时可能掉落').white()
		])
      text.add(3, [
        Text.of('• 在 ').white(),
        Text.of('⭐ 市场 ').yellow(),
        Text.of('任务书章节的战利品箱中随机获得').white()
		])
    }
	})

	event.addAdvanced('paraglider:stamina_vessel', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').green(),
        Text.of('查看更多信息').gray()
      ])
    } else {	
      text.add(1, [
        Text.of('• 从 ').white(), 
		Text.of('女神雕像 ').gold(),
		Text.of('处用 ').white(),
		Text.of('灵魂宝珠 ').yellow()
		])
      text.add(2, [
	    Text.of('• 也可以从 ').white(),
        Text.of('袭击、 ').darkRed(),
        Text.of('击杀 ').white(),
		Text.of('凋灵、 ').gray(),
		Text.of('末影龙 ').darkPurple(),
		Text.of('或从 ').white(),
		Text.of('哥布林商人 ').green()
      ])
    }
	})

	event.addAdvanced(['kubejs:essence_earth'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').gold(),
        Text.of('查看更多信息').gray()
      ])
	    text.add(2, [
        Text.of('⭐ 专精： ').darkRed(),
        Text.of('炼药 ').white()
      ])
    } else {
      text.add(1, [
        Text.of('• 挖掘矿石或沙砾时可能掉落').white()
		])
      text.add(2, [
        Text.of('• 可以使用 ').white(),
        Text.of('⭐ 专精 ').darkRed()
		])
      text.add(3, [
	    Text.of('• 在 ').white(),
        Text.of('⭐ 专精 ').darkRed(),
        Text.of('任务书章节中查找更多详细信息').white()
      ])
    }
  })

	event.addAdvanced('landsoficaria:totem_of_stuffing', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').gold(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 防止玩家在 ').white(),
		Text.of('饥饿 ').yellow()
		])
      text.add(2, [
        Text.of('• 移除任何 ').white(),
		Text.of('饥饿 ').gray(),
		Text.of('效果，添加 ').white(),
		Text.of('饱和 ').darkRed(),
		Text.of('效果10秒并完全恢复食物与饱和度 ').white(),
		Text.of('完全').green()
		])
    }
  })
  
  	event.addAdvanced('landsoficaria:totem_of_unblinding', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').gold(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 防止被 ').white(),
		Text.of('失明 ').gray(),
		Text.of('或 ').white(),
		Text.of('黑暗 ').gray(),
		Text.of('效果致盲（尤其有助于对抗伊卡利亚的一些生物）').white()
		])
      text.add(2, [
        Text.of('• 添加 ').white(),
		Text.of('失明免疫 ').green(),
		Text.of('效果持续30秒').white()
		])
    }
  })

  	event.addAdvanced('landsoficaria:totem_of_undrowning', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').gold(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 避免在').white(),
		Text.of('溺水').blue()
		])
      text.add(2, [
        Text.of('• 添加').white(),
		Text.of('水下呼吸').blue(),
		Text.of('效果持续30秒并完全补充空气').white()
		])
    }
  })
    	
	event.addAdvanced('landsoficaria:totem_of_unshattering', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').gold(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 防止盔甲、工具和武器在耐久达到90%以上时损坏，并恢复其90%的耐久度').white()
		])
    }
  })
  
  	event.addAdvanced('landsoficaria:totem_of_unsinking', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').gold(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 防止玩家掉入虚空时受伤，通过传送至相同X、Z坐标的最高Y位置').white()
		])
      text.add(2, [
        Text.of('• 添加').white(),
		Text.of('缓降').blue(),
		Text.of('效果持续30秒').white()
		])
    }
  })  
  
	event.addAdvanced(['aether:healing_stone'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').blue(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 施加生命恢复I效果，持续30秒').white()
		])
    }
  })
	
	event.addAdvanced('the_bumblezone:bee_cannon', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').blue(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('让你储存右键点击的蜜蜂，最多3只！按住右键后松开，即可发射蜜蜂！任何你注视的非蜜蜂生物都会被蜜蜂攻击！').white()
		])
		text.add(2, [
        Text.of('• 可以用蜂蜜水晶碎片、糖浸石或糖浸圆石修复。').white()
		])
    }
  })
	
	event.addAdvanced('the_bumblezone:crystal_cannon', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').blue(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 高击退、高伤害的加农炮让你从物品栏储存蜂蜜水晶碎片！右键最多3次，储存最多3个蜂蜜水晶碎片。按住右键后松开，即可发射水晶！').white()
		])
		text.add(2, [
        Text.of('• 水晶为消耗性弹药，发射后无法回收。').white()
		])
		text.add(3, [
        Text.of('• 可附魔快速装填、冲击、力量、穿透，以及耐久、消失诅咒和经验修补。').white()
		])
		text.add(4, [
        Text.of('• 可以用蜂蜜水晶碎片、糖浸石或糖浸圆石修复。').white()
		])
    }
  })

	event.addAdvanced(['kubejs:gem_shard_great'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').darkPurple(),
        Text.of('查看更多信息').gray()
      ])
    } else {
		text.add(1, [
        Text.of('• 主要通过完成悬赏获得').white()
		])
        text.add(2, [
        Text.of('• 在').white(),
		Text.of('⭐ 集市').yellow(),
		Text.of('任务章节兑换一个随机').white(),
		Text.of('神化宝石').darkPurple()
		])
    }
  })
	
	event.addAdvanced(['kubejs:voucher_relic'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').darkPurple(),
        Text.of('查看更多信息').gray()
      ])
    } else {
		text.add(1, [
        Text.of('• 在地下深处的宝箱中找到').white()
		])
        text.add(2, [
        Text.of('• 在').white(),
		Text.of('⭐ 集市').yellow(),
		Text.of('任务章节兑换一个随机').white(),
		Text.of('遗物').darkPurple()
		])
    }
  })
	
	event.addAdvanced('bonfires:estus_flask', (item, advanced, text) => {
			text.add(Text.of(''));
			text.add(Text.of('• §2使用次数§7在§6篝火§7处恢复').gray());
			text.add(Text.of('• 在§6篝火§7处强化以增加').gray());
			text.add(Text.of('§4治愈的心§7数量').gray());
			text.add(Text.of('• §2使用次数§7可通过§1右键点击§7').gray());
			text.add(Text.of('物品栏中的§e原素碎片§7与§3原素瓶§7增加').gray());
			text.add(Text.of('').gray());
			text.add(Text.of(''));
    });	

	event.addAdvanced(['kubejs:gem_shard'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').gold(),
        Text.of('查看更多信息').gray()
      ])
	    text.add(2, [
        Text.of('⭐ 专精：').darkRed(),
        Text.of('拾荒').white()
      ])
    } else {
      text.add(1, [
        Text.of('• 可以在宝箱中找到').white()
		])
      text.add(2, [
        Text.of('• 9个碎片可转换为一个随机普通').white(),
        Text.of('神化').darkRed(),
		Text.of('宝石').white()
		])
      text.add(2, [
	    Text.of('• 在').white(),
        Text.of('⭐ 专精').darkRed(),
        Text.of('任务书章节查看详情').white()
        ])
    }
	})

	event.addAdvanced(['kubejs:junk'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').gold(),
        Text.of('查看更多信息').gray()
      ])
	    text.add(2, [
        Text.of('⭐ 专精：').darkRed(),
        Text.of('拾荒').white()
      ])
    } else {
      text.add(1, [
        Text.of('• 可以在宝箱中找到').white()
		])
      text.add(2, [
        Text.of('• 可使用').white(),
        Text.of('⭐ 专精').darkRed()
		])
      text.add(2, [
	    Text.of('• 在').white(),
        Text.of('⭐ 专精').darkRed(),
        Text.of('任务书章节').white()
      ])
    }
	})
  
	event.addAdvanced(['kubejs:essence_monster', 'kubejs:essence_monster_raw'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').gold(),
        Text.of('查看更多信息').gray()
      ])
	    text.add(2, [
        Text.of('⭐ 专精：').darkRed(),
        Text.of('附魔、炼药').white()
      ])
    } else {
      text.add(1, [
        Text.of('• 可从怪物掉落或箱子中找到').white()
		])
      text.add(2, [
        Text.of('• 使用某一种 ').white(),
        Text.of('⭐ 专精').darkRed()
		])
      text.add(2, [
	    Text.of('• 更多详情请查看 ').white(),
        Text.of('⭐ 专精 ').darkRed(),
        Text.of('任务书章节').white()
      ])
    }
	})
	
	event.addAdvanced('kubejs:artifact_fragment', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').gold(),
        Text.of('查看更多信息').gray()
      ])
	    text.add(2, [
        Text.of('⭐ 专精：').darkRed(),
        Text.of('搜刮').white()
      ])
    } else {
      text.add(1, [
        Text.of('• 通过分解').white(),
		Text.of('工艺品 ').gold(),
		Text.of('或 ').white(),
		Text.of('遗物').darkPurple()
		])
		text.add(2, [
	    Text.of('• 看起来可以在其他地方重新组装……').white()
      ])
      text.add(3, [
	    Text.of('• 更多详情请查看 ').white(),
        Text.of('⭐ 专精 ').darkRed(),
        Text.of('任务书章节').white()
      ])
    }
	})
	
	event.addAdvanced('kubejs:spawnercore', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').gold(),
        Text.of('查看更多信息').gray()
      ])
	    text.add(2, [
        Text.of('⭐ 专精：').darkRed(),
        Text.of('附魔、炼药、搜刮 ').white()
      ])
    } else {
      text.add(1, [
        Text.of('• 右键获得少量 ').white(),
        Text.of('经验').green()
		])
      text.add(2, [
	    Text.of('• 可在 ').white(),
        Text.of('⭐ 专精 ').darkRed(),
        Text.of('任务书章节').white()
      ])
    }
  })
	
	event.addAdvanced('kubejs:scroll_exp', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').blue(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 右键获得少量 ').white(),
        Text.of('经验').green()
		])
      text.add(2, [
	    Text.of('• 可在 ').white(),
        Text.of('⭐ 专精 ').darkRed(),
        Text.of('任务书章节').white()
      ])
	  text.add(3, [
	    Text.of('• 便携式经验溶解器 ').aqua(),
        Text.of('可用于提取 ').white(),
        Text.of('经验粉尘 ').green(),
		Text.of('用于 ').white(),
        Text.of('附魔专精 ').darkGreen(),
		Text.of('配方').white()
      ])
    }
  })

	event.addAdvanced('kubejs:scraps', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').blue(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 升级所需的主要材料 ').white(),
		Text.of('搜刮 ⭐ 专精').blue()
		])
		text.add(2, [
        Text.of('• 可在  ').white(),
		Text.of('地牢箱子 ').gold(),
		Text.of('或使用 ').white(),
        Text.of('便携式迷你拆解器').darkPurple()
		])
      text.add(3, [
	    Text.of('• 更多详情请查看 ').white(),
        Text.of('⭐ 专精 ').darkRed(),
        Text.of('任务书章节').white()
      ])
    }
  })

	event.addAdvanced('kubejs:dust_alchemical', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').blue(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 升级所需的主要材料 ').white(),
		Text.of('炼药 ⭐ 专精').darkPurple()
		])
		text.add(2, [
        Text.of('• 可在  ').white(),
		Text.of('地牢箱子 ').gold(),
		Text.of('或使用 ').white(),
        Text.of('便携式转化装置').darkPurple()
		])
      text.add(3, [
	    Text.of('• 更多详情请查看 ').white(),
        Text.of('⭐ 专精 ').darkRed(),
        Text.of('任务书章节').white()
      ])
    }
  })

	event.addAdvanced('kubejs:dust_experience', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').blue(),
        Text.of('查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 升级所需的主要材料 ').white(),
		Text.of('附魔 ⭐ 专精').green()
		])
		text.add(2, [
        Text.of('• 可在  ').white(),
		Text.of('地牢箱子 ').gold(),
		Text.of('或用').white(),
        Text.of('便携式经验溶解器').darkPurple()
		])
      text.add(3, [
	    Text.of('• 了解更多详情，请查看').white(),
        Text.of('⭐ 精通').darkRed(),
        Text.of('任务书章节').white()
      ])
    }
  })

	event.addAdvanced('kubejs:portable_dissolver', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').blue(),
        Text.of('查看详情').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 用于获取').white(),
		Text.of('经验粉尘').green(),
		Text.of('，用于').white(),
        Text.of('附魔精通').green(),
		Text.of('配方').white()
		])
      text.add(2, [
	    Text.of('• 了解更多详情，请查看').white(),
        Text.of('⭐ 精通').darkRed(),
        Text.of('任务书章节').white()
      ])
    }
  })
  
  	event.addAdvanced('kubejs:portable_transmutator', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').blue(),
        Text.of('查看详情').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 用于获取').white(),
		Text.of('炼金粉末').lightPurple(),
		Text.of('，用于').white(),
        Text.of('炼金精通').darkPurple(),
		Text.of('配方').white()
		])
      text.add(2, [
	    Text.of('• 了解更多详情，请查看').white(),
        Text.of('⭐ 精通').darkRed(),
        Text.of('任务书章节').white()
      ])
    }
  })

	event.addAdvanced('kubejs:portable_salvager', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').blue(),
        Text.of('查看详情').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 用于获取').white(),
		Text.of('碎片').blue(),
		Text.of('，用于').white(),
        Text.of('拾荒精通').darkPurple(),
		Text.of('配方').white()
		])
      text.add(2, [
	    Text.of('• 了解更多详情，请查看').white(),
        Text.of('⭐ 精通').darkRed(),
        Text.of('任务书章节').white()
      ])
    }
  })

	event.addAdvanced('farmersdelight:straw', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').green(),
        Text.of('查看详情').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 收割草类植物（高草丛、小麦和水稻）时，你可以收集').white(),
        Text.of('稻草').green(),
		Text.of('').white()
		])
      text.add(2, [
        Text.of('• 可用于制作').white(),
		Text.of('绳索').gold()
      ])
    }
  })
	
	event.addAdvanced('farmersdelight:rope', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住').gray(),
        Text.of('[Shift]').green(),
        Text.of('查看详情').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 可攀爬的方块，与藤蔓和梯子类似').white()
		])
      text.add(2, [
        Text.of('• 要攀爬，只需在接触时按住跳跃键').white()
      ])
	  text.add(3, [
        Text.of('• 放置绳索时，你可以对着已有的绳索继续使用绳索以向下延伸').white()
      ])
	  text.add(4, [
        Text.of('• 要阻止绳索延伸，只需在放置时潜行').white()
      ])
    }
  })	
	
  	event.addAdvanced(['skilltree:quiver', 'skilltree:fiery_quiver', 'skilltree:armored_quiver', 'skilltree:gilded_quiver', 'skilltree:toxic_quiver', 'skilltree:diamond_quiver', 'skilltree:healing_quiver', 'skilltree:silent_quiver', 'skilltree:bone_quiver'], (item, advanced, text) => {
      text.add(1, [
        Text.of('• 与').white(),
		Text.of('箭矢').blue(),
		Text.of('一起放入').white(),
        Text.of('合成网格').gold()
      ])
	})

	// COINS
	event.addAdvanced('kubejs:coin_dungeon', (item, advanced, text) => {
	text.add(1, [
        Text.of('战利品硬币').gold()
      ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.of('按住').gray(),
        Text.of('[Shift]').blue(),
        Text.of('查看详情').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 从').white(),
        Text.of('地牢宝箱').gold(),
        Text.of('和破坏').white(),
        Text.of('刷怪笼').gold()
      ])
	    text.add(2, [
        Text.of('• 在').white(),
        Text.of('⭐ 市场').gold(),
        Text.of('任务章节中').white(),
		Text.of('任务书').green(),
		Text.of('兑换有价值的').white(),
		Text.of('战利品').gold().bold(true)

      ])
    }
  })

	event.addAdvanced(['kubejs:copper_coin', 'kubejs:iron_coin', 'kubejs:gold_coin', 'kubejs:diamond_coin'], (item, advanced, text) => {
	text.add(1, [
        Text.of('任务硬币').gold()
      ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.of('按住').gray(),
        Text.of('[Shift]').gold(),
        Text.of('查看详情').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 通过完成').white(),
        Text.of('任务').gold(),
		Text.of('从').white(),
		Text.of('任务书').green()
      ])
	    text.add(2, [
        Text.of('• 在').white(),
        Text.of('⭐ 市场 ').gold(),
        Text.of('任务章节，位于').white(),
		Text.of('任务书 ').green(),
		Text.of('以换取有价值的').white(),
		Text.of('战利品').gold().bold(true)

      ])
    }
  })
  
    event.addAdvanced('kubejs:proofofwork', (item, advanced, text) => {
	text.add(1, [
        Text.of('殖民地硬币').yellow()
     ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').yellow(),
        Text.of('以查看更多信息').gray()
      ])
    } else {
	  	text.add(1, [
        Text.of('获取方式：').white()
      ])
      text.add(2, [
        Text.of('• 一次性').green().bold(true),
        Text.of('任务奖励，位于').white(),
        Text.of('Minecolonies 相关').gold(),
        Text.of('任务中。').white()
      ])
	    text.add(3, [
        Text.of('• 可重复').blue().bold(true),
        Text.of('随机奖励，来自某些').white(),
        Text.of('Minecolonies 职业').gold(),
        Text.of('（筛矿工、下界矿工、普通矿工）').white()
      ])
	  	text.add(4, [
		Text.of('• 可在').white(),
        Text.of('⭐ 市场 ').gold(),
        Text.of('任务章节，位于').white(),
		Text.of('任务书中兑换。').green()
      ])
    }
  })

	event.addAdvanced(['kubejs:coin_raid'], (item, advanced, text) => {
	text.add(1, [
        Text.of('战利品硬币').aqua()
    ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').yellow(),
        Text.of('以查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 获取自').white(), 
		Text.of('地牢突袭').darkRed()
      ])
	    text.add(2, [
        Text.of('• 可在').white(),
        Text.of('⭐ 市场 ').gold(),
        Text.of('任务章节，位于').white(),
		Text.of('任务书 ').green()
      ])
	  	text.add(3, [
        Text.of('• 使用').white(),
        Text.of('/raidvault ').gold(),
        Text.of('在聊天中执行以存入或取出').white()
      ])
    }
  })

	event.addAdvanced(['kubejs:coin_aether', 'kubejs:coin_undergarden', 'kubejs:coin_twilight', 'kubejs:coin_bumblezone', 'kubejs:coin_icaria', 'kubejs:coin_end', 'kubejs:coin_nether'], (item, advanced, text) => {
	text.add(1, [
        Text.of('维度硬币').aqua()
    ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').yellow(),
        Text.of('以查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 获取自').white(), 
		Text.of('战利品').darkPurple(), 
		Text.of('或通过完成相应').white(),
		Text.of('维度').aqua(),
        Text.of('任务').gold(),
		Text.of('来自').white(),
		Text.of('任务书 ').green()
      ])
	    text.add(2, [
        Text.of('• 可在').white(),
        Text.of('⭐ 市场 ').gold(),
        Text.of('任务章节，位于').white(),
		Text.of('任务书 ').green(),
		Text.of('以换取有价值的').white(),
		Text.of('战利品').gold().bold(true)
      ])
    }
  })
  
  	event.addAdvanced('kubejs:coin_task', (item, advanced, text) => {
	text.add(1, [
        Text.of('任务硬币').blue()
    ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').yellow(),
        Text.of('以查看更多信息').gray()
      ])
    } else {
      text.add(1, [
        Text.of('• 通过完成各种').white(),
		Text.of('悬赏').blue(),
		Text.of('来自').white(),
		Text.of('悬赏').gold(),
        Text.of('榜').white()
      ])
	    text.add(2, [
        Text.of('• 可在').white(),
        Text.of('⭐ 市场 ').gold(),
        Text.of('任务章节，位于').white(),
		Text.of('任务书 ').green(),
		Text.of('以换取特定').white(),
		Text.of('战利品').gold().bold(true)

      ])
    }
  })
/////////////////////
  
    event.addAdvanced('naturescompass:naturescompass', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gold(),
        Text.of('[Shift] ').yellow(),
        Text.of('以查看更多信息').gold()
      ])
    } else {
      text.add(1, [
        Text.of('• 允许你搜索').white(),
        Text.of('生物群系').green().bold(true),
        Text.of('的位置').white()
      ])
    }
  })
  
      event.addAdvanced('l2hostility:hostility_orb', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gold(),
        Text.of('[Shift] ').yellow(),
        Text.of('以查看更多信息').gold()
      ])
    } else {
      text.add(1, [
        Text.of('• 用于让一个区块区域').white(),
        Text.of('永久').red(),
        Text.of('不再生成有等级的怪物').white()
      ])
	   text.add(2, [
        Text.of('• 使用').white(),
        Text.of('敌意探测器 ').blue(),
        Text.of('以了解当前难度').white()
      ])
	    text.add(3, [
        Text.of('• 在专门的').white(),
        Text.of('任务章节 ').green(),
		Text.of('在任务书中—— ').white(),
        Text.of('敌对世界 ').red().bold(true),
		Text.of('或在指南书中—— ').white(),
		Text.of('L2敌意指南').red().bold(true)
      ])
    }
  })
  
    event.addAdvanced('#chalk:chalks', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.of('按住 ').gray(),
          Text.of('[Shift] ').yellow(),
          Text.of('以查看更多信息').gray()
        ])
      } else {
        text.add(1, [
          Text.of('• 点击').white(),
          Text.of('完整侧面 ').green(),
          Text.of('来在方块上绘制标记。').white()
        ])
        text.add(2, [
          Text.of('• ').white(),
          Text.of('方向 ').green(),
          Text.of('很重要，箭头会指向该方向。').white()
        ])
      }
    })
	
	event.addAdvanced('roughtweaks:plaster', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.of('按住 ').gray(),
          Text.of('[Shift] ').red(),
          Text.of('以查看更多信息').gray()
        ])
      } else {
        text.add(1, [
          Text.of('• 自然恢复 ').red(),
		  Text.of('已').white(),
		  Text.of('禁用。 ').red().bold(true),
          Text.of('这是能够').white(),
          Text.of('恢复').green(),
		  Text.of('你的').white(),
		  Text.of('生命值').red()
        ])
        text.add(2, [
        Text.of('• 了解更多关于恢复的细节，请参阅').white(),
        Text.of('⭐ 特性 ').blue(),		
        Text.of('任务章节 ').green(),
		Text.of('任务书').white()
        ])
      }
    })


    event.addAdvanced('eccentrictome:tome', (item, advanced, text) => {
      text.add(1, [
        Text.of('• 用于存放所有').white(),
        Text.of('指南书').green()
		])
		text.add(2, [
        Text.of('• 右键点击').gold(),
        Text.of('以打开书籍选择界面').white()
		])
		text.add(3, [
        Text.of('• Shift + 右键点击').gold(),
        Text.of('以转换为你正在观看的方块的指南书').white()
		])
		text.add(4, [
        Text.of('• 左键点击').gold(),
        Text.of('空气处将指南书变回手册').white()
		])
		text.add(5, [
        Text.of('• Shift + Q').gold(),
        Text.of('以从中弹出指南书').white()
        ]) 
  })
  
    event.addAdvanced('bonfires:undead_bone_shard', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.of('按住 ').gray(),
          Text.of('[Shift] ').red(),
          Text.of('以查看更多信息').gray()
        ])
      } else {
        text.add(1, [
          Text.of('• 用于强化').white(),
		  Text.of('元素瓶 ').green(),
		  Text.of('在').white(),
		  Text.of('篝火 ').darkRed(),
		  Text.of('以增加').white(),
		  Text.of('治疗量').red()
        ])
        text.add(2, [
        Text.of('• 随机从').white(),
        Text.of('维度').blue(),		
        Text.of('或').white(),
		Text.of('地牢币 ').darkPurple(),
		Text.of('奖励中，在').white(),
		Text.of('⭐ 市场 ').yellow(),
		Text.of('任务章节').white()
        ])
      }
    })

	event.addAdvanced('kubejs:book_old', (item, advanced, text) => {
      text.add(1, [
        Text.of('一些旧笔记，没有实际价值').gold().italic(true)
      ])
	  text.add(2, [
        Text.of('手持时右键点击将其撕碎').gray()
      ])
	})

	event.addAdvanced('kubejs:lost_bag', (item, advanced, text) => {
      text.add(1, [
        Text.of('在废墟中发现的一个布满灰尘的袋子……').gold().italic(true)
      ])
	  text.add(2, [
        Text.of('手持时右键点击查看里面有什么').gray()
      ])
	})
	
	event.addAdvanced('kubejs:unidentified_glyph_scroll', (item, advanced, text) => {
      text.add(1, [
        Text.of('古老的墨水闪烁着未被发掘的潜力').gold().italic(true)
      ])
	  text.add(2, [
        Text.of('右键点击以解读基础符文').gray()
      ])
	})
	
	event.addAdvanced('kubejs:unidentified_glyph_scroll_2', (item, advanced, text) => {
      text.add(1, [
        Text.of('羊皮纸随着高级奥术谐波而振动').gold().italic(true)
      ])
	  text.add(2, [
        Text.of('右键点击以解读高级符文').gray()
      ])
	})
	
	event.addAdvanced('kubejs:unidentified_glyph_scroll_3', (item, advanced, text) => {
      text.add(1, [
        Text.of('墨水干枯易碎，隐约散发出旧图书馆的灰尘和潜力的气味').gold().italic(true)
      ])
	  text.add(2, [
        Text.of('右键点击以解读大师符文').gray()
      ])
	})
	
    event.addAdvanced('bonfires:titanite_shard', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.of('按住 ').gray(),
          Text.of('[Shift] ').red(),
          Text.of('以查看更多信息。').gray()
        ])
      } else {
        text.add(1, [
          Text.of('• 用于强化').white(),
		  Text.of('武器 ').green(),
		  Text.of('在').white(),
		  Text.of('篝火 ').darkRed(),
		  Text.of('以增加').white(),
		  Text.of('伤害').red()
        ])
        text.add(2, [
        Text.of('• 通过燃烧').white(),
        Text.of('黑曜石或燧石 ').darkPurple(),
        Text.of('在').white(),
		Text.of('火或熔岩中').darkRed()
        ])
      }
    })
	
    event.addAdvanced('bonfires:large_titanite_shard', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.of('按住 ').gray(),
          Text.of('[Shift] ').red(),
          Text.of('查看详细信息。').gray()
        ])
      } else {
        text.add(1, [
          Text.of('• 用于在 ').white(),
		  Text.of('武器 ').green(),
		  Text.of('的 ').white(),
		  Text.of('篝火 ').darkRed(),
		  Text.of('处强化，以提升 ').white(),
		  Text.of('伤害').red()
        ])
        text.add(2, [
        Text.of('• 通过将 ').white(),
        Text.of('气凝胶 ').aqua(),
        Text.of('置于 ').white(),
		Text.of('火焰或熔岩中烧制获得').darkRed()
        ])
      }
    })
	
    event.addAdvanced('bonfires:titanite_chunk', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.of('按住 ').gray(),
          Text.of('[Shift] ').red(),
          Text.of('查看详细信息。').gray()
        ])
      } else {
        text.add(1, [
          Text.of('• 用于在 ').white(),
		  Text.of('武器 ').green(),
		  Text.of('的 ').white(),
		  Text.of('篝火 ').darkRed(),
		  Text.of('处强化，以提升 ').white(),
		  Text.of('伤害').red()
        ])
        text.add(2, [
        Text.of('• 通过将 ').white(),
        Text.of('陨石 ').darkGreen(),
        Text.of('置于 ').white(),
		Text.of('火焰或熔岩中烧制获得').darkRed()
        ])
      }
    })
	
    event.addAdvanced('bonfires:titanite_slab', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.of('按住 ').gray(),
          Text.of('[Shift] ').red(),
          Text.of('查看详细信息。').gray()
        ])
      } else {
        text.add(1, [
          Text.of('• 用于在 ').white(),
		  Text.of('武器 ').green(),
		  Text.of('的 ').white(),
		  Text.of('篝火 ').darkRed(),
		  Text.of('处强化，以提升 ').white(),
		  Text.of('伤害').red()
        ])
        text.add(2, [
        Text.of('• 通过将 ').white(),
        Text.of('强化深板岩 ').darkGray(),
        Text.of('置于 ').white(),
		Text.of('火焰或熔岩中烧制获得').darkRed()
        ])
      }
    })

    event.addAdvanced('kubejs:gemcutters_pouch', (item, advanced, text) => {
      text.add(1, [
        Text.of('一个沉重、天鹅绒内衬的袋子，装着未经切割的宝物').gold().italic(true)
      ])
	  text.add(2, [
        Text.of('手持时右键点击查看里面有什么').gray()
      ])
	})

	
	event.addAdvanced('kubejs:ore_bag', (item, advanced, text) => {
      text.add(1, [
        Text.of('一个沉重、叮当响的袋子，散发着硫磺和石头的味道').gold().italic(true)
      ])
	  text.add(2, [
        Text.of('手持时右键点击查看里面有什么').gray()
      ])
	})

	event.addAdvanced('kubejs:mage_bag', (item, advanced, text) => {
      text.add(1, [
        Text.of('一个编织的袋子，嗡嗡作响，充满魔法共鸣').gold().italic(true)
      ])
	  text.add(2, [
        Text.of('手持时右键点击查看里面有什么').gray()
      ])
	})
	
	event.addAdvanced('kubejs:reagent_box', (item, advanced, text) => {
      text.add(1, [
        Text.of('一个沉重的黄铜捆扎箱子，炼金术士常用').gold().italic(true)
      ])
	  text.add(2, [
        Text.of('手持时右键点击打开').gray()
      ])
	})

	event.addAdvanced('kubejs:book_ancient', (item, advanced, text) => {
		text.add(1, [
        Text.of('用早已失传的语言写成，无法解读').gold().italic(true)
      ])
		text.add(2, [
        Text.of('手持时右键点击将其撕成碎片').gray()
      ]) 
	})
	
	event.addAdvanced('kubejs:canned_food', (item, advanced, text) => {
      text.add(1, [
        Text.of('已过期。自行承担打开的风险').gold().italic(true)
      ])
	})
	
	event.addAdvanced('kubejs:detonator', (item, advanced, text) => {
		text.add(1, [
        Text.of('不确定是否应该按下那个红色按钮……').gold().italic(true)
      ])
		text.add(2, [
        Text.of('但你想按，对吧？').gray().italic(true)
      ]) 
	})

	event.addAdvanced(['kubejs:quest_crate'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.of('按住 ').gray(),
        Text.of('[Shift] ').gold(),
        Text.of('查看详细信息').gray()
      ])
	    text.add(2, [
        Text.of('任务物品').darkRed()
      ])
    } else {
      text.add(1, [
        Text.of('• 完成 ').white(),
        Text.of('sidestory_name ').darkRed(),
		Text.of('支线故事 ').gold(),
		Text.of('任务后可在宝箱中找到').white()
		])
      text.add(2, [
	    Text.of('• 可在 ').white(),
        Text.of('⭐ sidestory_npc_name ').darkRed(),
        Text.of('的帮助下于 ').white(),
		Text.of('支线故事 ').gold(),
		Text.of('任务章节中打开').white()
        ])
     }
	})
  	event.addAdvanced('#rad3:decapitating', (item, advanced, text) => {
      text.add(1, [
		Text.of('有 ').white(),
        Text.of('25% ').yellow(),
        Text.of('几率 ').white(),
        Text.of('斩首 ').red(),
		Text.of('被击杀的生物').white()
      ])
	})
	event.addAdvanced('sophisticatedstorage:chest', (item, advanced, text) => {
    text.add(1, Text.of('无法储存在胶囊中。 ')) 
	text.add(2, Text.of('双重箱子会导致 Toms Simple Storage 出现问题。 '))
    text.add(3, Text.of('使用木桶则完全正常！'))
	})
	event.addAdvanced('sophisticatedstorage:copper_chest', (item, advanced, text) => {
    text.add(1, Text.of('无法储存在胶囊中。 ')) 
	text.add(2, Text.of('双重箱子会导致 Toms Simple Storage 出现问题。 '))
    text.add(3, Text.of('使用木桶则完全正常！'))
	})
	event.addAdvanced('sophisticatedstorage:iron_chest', (item, advanced, text) => {
    text.add(1, Text.of('无法储存在胶囊中。 ')) 
	text.add(2, Text.of('双重箱子会导致 Toms Simple Storage 出现问题。 '))
    text.add(3, Text.of('使用木桶则完全正常！'))
	})
	event.addAdvanced('sophisticatedstorage:gold_chest', (item, advanced, text) => {
    text.add(1, Text.of('无法储存在胶囊中。 ')) 
	text.add(2, Text.of('双重箱子会导致 Toms Simple Storage 出现问题。 '))
    text.add(3, Text.of('桶完全没问题！'))
	})
	event.addAdvanced('sophisticatedstorage:diamond_chest', (item, advanced, text) => {
    text.add(1, Text.of('不能存放在胶囊中。 ')) 
	text.add(2, Text.of('双箱子会导致Toms Simple Storage出现问题。 '))
    text.add(3, Text.of('桶完全没问题！'))
	})
	event.addAdvanced('sophisticatedstorage:netherite_chest', (item, advanced, text) => {
    text.add(1, Text.of('不能存放在胶囊中。 ')) 
	text.add(2, Text.of('双箱子会导致Toms Simple Storage出现问题。 '))
    text.add(3, Text.of('桶完全没问题！'))
	})


    // drop info
	event.addAdvanced('cataclysm:amethyst_crab_meat', (item, advanced, text) => {
    text.add(1, Text.of('由紫水晶蟹小Boss掉落，罕见生成于繁茂洞穴生物群系').gray()) 
	})
	event.addAdvanced('cataclysm:amethyst_crab_shell', (item, advanced, text) => {
    text.add(1, Text.of('由紫水晶蟹小Boss掉落，罕见生成于繁茂洞穴生物群系').gray()) 
	})
	event.addAdvanced('hmag:ancient_stone', (item, advanced, text) => {
    text.add(1, Text.of('由远古守卫者和巨像掉落').gray()) 
	})
	event.addAdvanced('hmag:kobold_leather', (item, advanced, text) => {
    text.add(1, Text.of('由地精掉落，罕见生成于地下').gray()) 
	})
	event.addAdvanced('hmag:ogre_horn', (item, advanced, text) => {
    text.add(1, Text.of('由食人魔掉落，罕见生成于地下').gray()) 
	})
	event.addAdvanced('hmag:lich_cloth', (item, advanced, text) => {
    text.add(1, Text.of('由巫妖掉落，罕见生成于地下').gray()) 
	})
	event.addAdvanced('hmag:necrofiber', (item, advanced, text) => {
    text.add(1, Text.of('由死灵行者掉落，罕见生成于地下').gray()) 
	})
	event.addAdvanced('hmag:ender_plasm', (item, advanced, text) => {
    text.add(1, Text.of('由末影执行者掉落，罕见生成于末影人附近').gray()) 
	})
	event.addAdvanced('hmag:crimson_cuticula', (item, advanced, text) => {
    text.add(1, Text.of('由绯红杀戮者掉落，罕见生成于绯红森林').gray()) 
	})
	event.addAdvanced('hmag:dyssomnia_skin', (item, advanced, text) => {
    text.add(1, Text.of('由失眠怪掉落，它会攻击无眠的玩家').gray()) 
	})
	event.addAdvanced('hmag:mysterious_petal', (item, advanced, text) => {
    text.add(1, Text.of('由蔓德拉草掉落，罕见生成于丛林').gray()) 
	})
	event.addAdvanced('hmag:sharp_fang', (item, advanced, text) => {
    text.add(1, Text.of('由雪犬掉落，罕见生成于雪地生物群系').gray()) 
	})
	event.addAdvanced('hmag:burning_core', (item, advanced, text) => {
    text.add(1, Text.of('由堡垒看守者掉落，罕见生成于下界要塞').gray()) 
	})
	event.addAdvanced('hmag:cubic_nucleus', (item, advanced, text) => {
    text.add(1, Text.of('由史莱姆女孩掉落，罕见生成于沼泽').gray()) 
	})
	event.addAdvanced('hmag:evil_crystal_fragment', (item, advanced, text) => {
    text.add(1, Text.of('由邪恶女巫掉落').gray()) 
	})
	event.addAdvanced('hmag:lightning_particle', (item, advanced, text) => {
    text.add(1, Text.of('由闪电苦力怕掉落').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:ancient_anima', (item, advanced, text) => {
    text.add(1, Text.of('由夜巫妖Boss掉落').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:blazing_eye', (item, advanced, text) => {
    text.add(1, Text.of('由下界铁拳Boss掉落').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:obsidian_heart', (item, advanced, text) => {
    text.add(1, Text.of('由黑曜石巨岩Boss掉落').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:void_thorn', (item, advanced, text) => {
    text.add(1, Text.of('由虚空花Boss掉落').gray()) 
	})
	event.addAdvanced('aether_redux:sentry_chip', (item, advanced, text) => {
    text.add(1, Text.of('由哨兵掉落，生成于天境的青铜地下城').gray())
	})
	// item info
	event.addAdvanced('hmag:insomnia_fruit', (item, advanced, text) => {
    text.add(1, Text.of('越久不睡觉，变得越强').gray()) 
	})
	event.addAdvanced('hmag:insomnia_sword', (item, advanced, text) => {
    text.add(1, Text.of('越久不睡觉，变得越强').gray()) 
	})
	event.addAdvanced('hmag:nemesis_blade', (item, advanced, text) => {
    text.add(1, Text.of('你的经验值越少，变得越强').gray()) 
	})
	event.addAdvanced('hmag:crimson_bow', (item, advanced, text) => {
    text.add(1, Text.of('你越饥饿，变得越强').gray()) 
	})
	event.addAdvanced('hmag:fortress_shield', (item, advanced, text) => {
    text.add(1, Text.of('点燃攻击者').gray()) 
	})
	event.addAdvanced('hmag:bat_stew', (item, advanced, text) => {
    text.add(1, Text.of('给予黑暗免疫').gray()) 
	})
	event.addAdvanced('#hmag:reinforced_blocks', (item, advanced, text) => {
    text.add(1, Text.of('免疫凋零效果').gray()) 
	})
	event.addAdvanced('darkerdepths:void_soul_jar', (item, advanced, text) => {
    text.add(1, Text.of('用玻璃瓶捕获虚空之魂').gray()) 
	})
	event.addAdvanced('minecraft:reinforced_deepslate', (item, advanced, text) => {
    text.add(1, Text.of('只能使用Sculkium镐采集').gray()) 
	})
	event.addAdvanced('minecraft:brewing_stand', (item, advanced, text) => {
    text.add(1, Text.of('只能使用精准采集附魔的镐采集').gray()) 
	})
	event.addAdvanced('ancient_aether:valkyrum_ore', (item, advanced, text) => {
    text.add(1, Text.of('只能使用神圣镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:yellowstone', (item, advanced, text) => {
    text.add(1, Text.of('只能使用燧石镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:lignite_ore', (item, advanced, text) => {
    text.add(1, Text.of('只能使用燧石镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:chalkos_ore', (item, advanced, text) => {
    text.add(1, Text.of('只能使用燧石镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:silkstone', (item, advanced, text) => {
    text.add(1, Text.of('只能使用Chalkos镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:kassiteros_ore', (item, advanced, text) => {
    text.add(1, Text.of('只能使用Chalkos镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:dolomite_ore', (item, advanced, text) => {
    text.add(1, Text.of('只能使用Chalkos镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:sunstone', (item, advanced, text) => {
    text.add(1, Text.of('只能使用奥利哈康镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:vanadium_ore', (item, advanced, text) => {
    text.add(1, Text.of('只能使用奥利哈康镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:sliver_ore', (item, advanced, text) => {
    text.add(1, Text.of('只能使用奥利哈康镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:voidshale', (item, advanced, text) => {
    text.add(1, Text.of('只能使用钒钢镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:sideros_ore', (item, advanced, text) => {
    text.add(1, Text.of('只能使用钒钢镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:anthracite_ore', (item, advanced, text) => {
    text.add(1, Text.of('只能使用钒钢镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:baetyl', (item, advanced, text) => {
    text.add(1, Text.of('只能使用Sideros镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:molybdenum_ore', (item, advanced, text) => {
    text.add(1, Text.of('只能使用Sideros镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('landsoficaria:hyliastrum_ore', (item, advanced, text) => {
    text.add(1, Text.of('只能使用Sideros镐或更好的镐采集……或使用爆炸物').gray()) 
	})
	event.addAdvanced('pandorasbox:pandoras_box', (item, advanced, text) => {
    text.add(1, Text.of('警告：极度危险').red()) 
	})
	event.addAdvanced('kubejs:great_soul', (item, advanced, text) => {
      text.add(1, [Text.of('强大怪物的灵魂').darkRed().italic(true)])
	  text.add(2, [Text.of('用于制作最强物品和附魔').darkPurple()])
	})
	
	event.addAdvanced('ars_nouveau:mob_jar', (item, advanced, text) => {
    text.add(1, Text.of('强度不足以容纳强大的怪物').red()) 
	})
	

	//Gear Upgrades
	event.addAdvanced('kubejs:upgrade_swift', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度：').white(),Text.of('常见').blue()])
	  text.add(2, [Text.of('类型：').white(),Text.of('工具、近战').darkGreen()])
	  text.add(3, [Text.of('信息：').white(),Text.of('提升15%挖掘速度或攻击速度').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用 ').white(),Text.of('铁砧 ').darkGreen(),Text.of('将其插入到 ').white(),Text.of('升级槽 ').green(),Text.of('的装备中 ').white(),Text.of('并拥有足够的 ').white(),Text.of('熟练度 ').blue()])}	
	})
	
	event.addAdvanced('kubejs:upgrade_swift2', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度：').white(),Text.of('常见').blue()])
	  text.add(2, [Text.of('类型：').white(),Text.of('工具、近战').darkGreen()])
	  text.add(3, [Text.of('信息：').white(),Text.of('提升25%挖掘速度或攻击速度').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用 ').white(),Text.of('铁砧 ').darkGreen(),Text.of('将其插入到 ').white(),Text.of('升级槽 ').green(),Text.of('在你的装备上 ').white(),Text.of('需要足够的 ').white(),Text.of('熟练度 ').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_swift3', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度： ').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型： ').white(),Text.of('工具、近战').darkGreen()])
	  text.add(3, [Text.of('信息： ').white(),Text.of('挖掘速度或攻击速度提高35%').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用 ').white(),Text.of('铁砧 ').darkGreen(),Text.of('将其插入 ').white(),Text.of('升级槽 ').green(),Text.of('在你的装备上 ').white(),Text.of('需要足够的 ').white(),Text.of('熟练度 ').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sharp', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度： ').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型： ').white(),Text.of('工具、近战').darkGreen()])
	  text.add(3, [Text.of('信息： ').white(),Text.of('攻击伤害提高10%').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用 ').white(),Text.of('铁砧 ').darkGreen(),Text.of('将其插入 ').white(),Text.of('升级槽 ').green(),Text.of('在你的装备上 ').white(),Text.of('需要足够的 ').white(),Text.of('熟练度 ').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sharp2', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度： ').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型： ').white(),Text.of('工具、近战').darkGreen()])
	  text.add(3, [Text.of('信息： ').white(),Text.of('攻击伤害提高15%').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用 ').white(),Text.of('铁砧 ').darkGreen(),Text.of('将其插入 ').white(),Text.of('升级槽 ').green(),Text.of('在你的装备上 ').white(),Text.of('需要足够的 ').white(),Text.of('熟练度 ').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sharp3', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度： ').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型： ').white(),Text.of('工具、近战').darkGreen()])
	  text.add(3, [Text.of('信息： ').white(),Text.of('攻击伤害提高25%').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用 ').white(),Text.of('铁砧 ').darkGreen(),Text.of('将其插入 ').white(),Text.of('升级槽 ').green(),Text.of('在你的装备上 ').white(),Text.of('需要足够的 ').white(),Text.of('熟练度 ').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_force', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度： ').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型： ').white(),Text.of('工具、近战').darkGreen()])
	  text.add(3, [Text.of('信息： ').white(),Text.of('攻击伤害和移动速度提高10%').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用 ').white(),Text.of('铁砧 ').darkGreen(),Text.of('将其插入 ').white(),Text.of('升级槽 ').green(),Text.of('在你的装备上 ').white(),Text.of('需要足够的 ').white(),Text.of('熟练度 ').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_prof', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度： ').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型： ').white(),Text.of('戒指、项链、腰带、护符、手镯').darkGreen()])
	  text.add(3, [Text.of('信息： ').white(),Text.of('熟练度获取量提高100%').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用 ').white(),Text.of('铁砧 ').darkGreen(),Text.of('将其插入 ').white(),Text.of('升级槽 ').green(),Text.of('在你的装备上 ').white(),Text.of('拥有足够的').white(),Text.of('熟练度').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_heart', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度：').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型：').white(),Text.of('胸甲').darkGreen()])
	  text.add(3, [Text.of('信息：').white(),Text.of('+400% 最大生命值，-100% 护甲，-100% 护甲韧性').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用').white(),Text.of('铁砧').darkGreen(),Text.of('将其插入到').white(),Text.of('升级槽').green(),Text.of('中的你的装备').white(),Text.of('拥有足够的').white(),Text.of('熟练度').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_gilded', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度：').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型：').white(),Text.of('胸甲').darkGreen()])
	  text.add(3, [Text.of('信息：').white(),Text.of('+40% 过量治疗，-2 最大生命心，-2 护甲').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用').white(),Text.of('铁砧').darkGreen(),Text.of('将其插入到').white(),Text.of('升级槽').green(),Text.of('中的你的装备').white(),Text.of('拥有足够的').white(),Text.of('熟练度').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_guarding', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度：').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型：').white(),Text.of('胸甲').darkGreen()])
	  text.add(3, [Text.of('信息：').white(),Text.of('-3 最大生命心，+100% 护甲，+100% 护甲韧性').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用').white(),Text.of('铁砧').darkGreen(),Text.of('将其插入到').white(),Text.of('升级槽').green(),Text.of('中的你的装备').white(),Text.of('拥有足够的').white(),Text.of('熟练度').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sniping', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度：').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型：').white(),Text.of('弓').darkGreen()])
	  text.add(3, [Text.of('信息：').white(),Text.of('+30% 箭矢伤害，+30% 箭矢速度，-25% 拉弓速度，-20% 移动速度').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用').white(),Text.of('铁砧').darkGreen(),Text.of('将其插入到').white(),Text.of('升级槽').green(),Text.of('中的你的装备').white(),Text.of('拥有足够的').white(),Text.of('熟练度').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_quick', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度：').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型：').white(),Text.of('弓').darkGreen()])
	  text.add(3, [Text.of('信息：').white(),Text.of('+30% 拉弓速度，-10% 移动速度，-25% 箭矢伤害，+20% 箭矢速度').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用').white(),Text.of('铁砧').darkGreen(),Text.of('将其插入到').white(),Text.of('升级槽').green(),Text.of('中的你的装备').white(),Text.of('拥有足够的').white(),Text.of('熟练度').blue()])}	
	})	
	
	event.addAdvanced('kubejs:upgrade_reach', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度：').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型：').white(),Text.of('镐').darkGreen()])
	  text.add(3, [Text.of('信息：').white(),Text.of('+1 方块放置距离，-10% 挖掘速度').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用').white(),Text.of('铁砧').darkGreen(),Text.of('将其插入到').white(),Text.of('升级槽').green(),Text.of('中的你的装备').white(),Text.of('拥有足够的').white(),Text.of('熟练度').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_quickfeet', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度：').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型：').white(),Text.of('足部').darkGreen()])
	  text.add(3, [Text.of('信息：').white(),Text.of('+30% 移动速度').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用').white(),Text.of('铁砧').darkGreen(),Text.of('将其插入').white(),Text.of('升级槽').green(),Text.of('在你的装备中，').white(),Text.of('并消耗足够的').white(),Text.of('熟练度').blue()])}	
	})	

	event.addAdvanced('kubejs:upgrade_lifesteal', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度：').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型：').white(),Text.of('护甲').darkGreen()])
	  text.add(3, [Text.of('信息：').white(),Text.of('+20% 生命偷取，-1 最大生命值').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用').white(),Text.of('铁砧').darkGreen(),Text.of('将其插入').white(),Text.of('升级槽').green(),Text.of('在你的装备中，').white(),Text.of('并消耗足够的').white(),Text.of('熟练度').blue()])}	
	})	

	event.addAdvanced('kubejs:upgrade_fortress', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.of('稀有度：').white(),Text.of('普通').blue()])
	  text.add(2, [Text.of('类型：').white(),Text.of('盾牌').darkGreen()])
	  text.add(3, [Text.of('信息：').white(),Text.of('+5 攻击伤害，+20% 攻击速度，+2 攻击击退，+10% 移动速度').darkRed()])
	} else {text.add(1, [
        Text.of('• 使用').white(),Text.of('铁砧').darkGreen(),Text.of('将其插入').white(),Text.of('升级槽').green(),Text.of('在你的装备中，').white(),Text.of('并消耗足够的').white(),Text.of('熟练度').blue()])}	
	})		
	
	event.addAdvanced('kubejs:mending', (item, advanced, text) => {
		// line indices 1-13: The Tragic Tale (Italicized Gray Lore)
		text.add(1, Text.of("过去的名字仍在不断纠缠……内心的回忆如").gray().italic())
		text.add(2, Text.of("“minecraft:mending”般挥之不去，一个已死之名的鬼魂").gray().italic())
		text.add(3, Text.of("从坟墓中爬出，萦绕不散。名声是一种诅咒，一旦你拥有了名声，").gray().italic())
		text.add(4, Text.of("所有人都会追猎你，人们会不惜一切代价只为得到你，无论手段").gray().italic())
		text.add(5, Text.of("多么残酷恐怖。无数无辜的图书管理员村民被奴役，").gray().italic())
		text.add(6, Text.of("只为有机会尝到你的力量。其他").gray().italic())
		text.add(7, Text.of("附魔觊觎你的名声，试图通过自称为").gray().italic())
		text.add(8, Text.of("“生命修补”或“末影修补”来窃取。你为村民的遭遇感到自责，").gray().italic())
		text.add(9, Text.of("渴望逃离。于是你").gray().italic())
		text.add(10, Text.of("首先改变了自己的机制；现在你拥有独特的能力：重置").gray().italic())
		text.add(11, Text.of("物品的修复费用。这在以前从未实现过，").gray().italic())
		text.add(12, Text.of("连砂轮也做不到，这真是一种便利的能力。但玩家们仍").gray().italic())
		text.add(13, Text.of("看见你的名字，尽管像生命修补这样的附魔取代了你的工作，").gray().italic())
		text.add(14, Text.of("玩家们仍追寻你旧有的修复能力。于是你改名为").gray().italic())
		text.add(15, Text.of("“修复”，一个代表重置").gray().italic())
		text.add(16, Text.of("修复费用的名字。然而玩家们仍然追寻你的过去，无论你如何改变，").gray().italic())
		text.add(17, Text.of("你旧有的功能都会永远").gray().italic())
		text.add(18, Text.of("纠缠着你……").gray().italic())
		text.add(19, Text.of("这是最受欢迎附魔的悲剧故事。有名且").gray().italic())
		text.add(20, Text.of("强大是一种无法逃避的诅咒，伪装成恩赐。").gray().italic())
	})
	

// THE END	
})
ClientEvents.lang('en_us', event => {
  event.renameItem('graveyard:upper_bone_staff', 'Skull of the Wizard King')
  event.renameItem('graveyard:middle_bone_staff', 'Ribs of the Warrior King')
  event.renameItem('graveyard:lower_bone_staff', 'Tail of the Beast King')

})
