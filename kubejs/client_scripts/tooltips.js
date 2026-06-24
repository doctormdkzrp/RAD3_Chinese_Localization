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
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0001').yellow(),Text.translate('kubejs.script.client.scripts.tooltips.0002').green().bold(true),Text.translate('kubejs.script.client.scripts.tooltips.0003').yellow()
      ])
	})
	
	event.addAdvanced('kubejs:spam_voucher', (item, advanced, text) => {
				text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0004').gray().italic())
				text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0005').white())
				text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0006').white())
				text.add(5, Text.translate('kubejs.script.client.scripts.tooltips.0007').white())
				text.add(5, Text.translate('kubejs.script.client.scripts.tooltips.0008').white())
	})

	event.addAdvanced('fantasy_armor:moon_crystal', (item, advanced, text) => {
				text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0009').gray().italic())
				text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0010').white())
				text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0011').white())
				text.add(4, Text.translate('kubejs.script.client.scripts.tooltips.0012').white())
				text.add(5, Text.translate('kubejs.script.client.scripts.tooltips.0013').white())
	})

	event.addAdvanced('kubejs:map_fragment', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0014').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0015').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0016').gray()
      ])
    } else {
		text.add(1, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0017').white()
      ])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0018').white()
		])
      text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0019').white()
		])
    }
	})
		
	event.addAdvanced('minecraft:gold_ingot', (item, advanced, text) => {
				text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0020').gray());			
	})
		
	event.addAdvanced('bountiful:bountyboard', (stack, advanced, text) => {      
        if (!event.shift) {
            text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0021').gray().append(Text.gold('[Shift] ')).append(Text.gray('for mechanics.')))
        } else {
            text.add(2, Text.of(' 1. ').append(Text.gold('Bounty Board: ')).append(Text.white('Right-click to view and accept active contracts')))
            text.add(3, Text.of(' 2. ').append(Text.yellow('Rarity Tiers: ')).append(Text.white('Higher tiers offer significantly better rewards')))
            text.add(4, Text.of(' 3. ').append(Text.aqua('Turn-in: ')).append(Text.white('Right-click the board with a finished quest to claim loot')))
        }
    })

    event.addAdvanced('bountiful:decree', (stack, advanced, text) => {      
        if (!event.shift) {
            text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0025').gray().append(Text.gold('[Shift] ')).append(Text.gray('for mechanics.')))
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
        Text.translate('kubejs.script.client.scripts.tooltips.0030').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0031').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0032').gray()
      ])
    } else {
		text.add(1, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0033').white()
      ])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0034').white()
		])
      text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0035').white()
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
        Text.translate('kubejs.script.client.scripts.tooltips.0036').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0037').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0038').gray()
      ])
    } else {
		text.add(1, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0039').white()
      ])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0040').white()
		])
      text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0041').white()
		])
    }
	})

	event.addAdvanced('paraglider:spirit_orb', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0042').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0043').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0044').gray()
      ])
    } else {
		text.add(1, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0045').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0046').green(),
        Text.translate('kubejs.script.client.scripts.tooltips.0047').white()
      ])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0048').white()
		])
      text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0049').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0050').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0051').white()
		])
    }
	})

	event.addAdvanced('paraglider:stamina_vessel', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0052').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0053').green(),
        Text.translate('kubejs.script.client.scripts.tooltips.0054').gray()
      ])
    } else {	
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0055').white(), 
		Text.translate('kubejs.script.client.scripts.tooltips.0056').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0057').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0058').yellow()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0059').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0060').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0061').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0062').gray(),
		Text.translate('kubejs.script.client.scripts.tooltips.0063').darkPurple(),
		Text.translate('kubejs.script.client.scripts.tooltips.0064').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0065').green()
      ])
    }
	})

	event.addAdvanced(['kubejs:essence_earth'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0066').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0067').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0068').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0069').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0070').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0071').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0072').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0073').darkRed()
		])
      text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0074').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0075').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0076').white()
      ])
    }
  })

	event.addAdvanced('landsoficaria:totem_of_stuffing', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0077').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0078').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0079').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0080').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0081').yellow()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0082').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0083').gray(),
		Text.translate('kubejs.script.client.scripts.tooltips.0084').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0085').darkRed(),
		Text.translate('kubejs.script.client.scripts.tooltips.0086').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0087').green()
		])
    }
  })
  
  	event.addAdvanced('landsoficaria:totem_of_unblinding', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0088').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0089').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0090').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0091').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0092').gray(),
		Text.translate('kubejs.script.client.scripts.tooltips.0093').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0094').gray(),
		Text.translate('kubejs.script.client.scripts.tooltips.0095').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0096').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0097').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0098').white()
		])
    }
  })

  	event.addAdvanced('landsoficaria:totem_of_undrowning', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0099').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0100').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0101').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0102').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0103').blue()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0104').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0105').blue(),
		Text.translate('kubejs.script.client.scripts.tooltips.0106').white()
		])
    }
  })
    	
	event.addAdvanced('landsoficaria:totem_of_unshattering', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0107').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0108').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0109').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0110').white()
		])
    }
  })
  
  	event.addAdvanced('landsoficaria:totem_of_unsinking', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0111').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0112').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0113').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0114').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0115').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0116').blue(),
		Text.translate('kubejs.script.client.scripts.tooltips.0117').white()
		])
    }
  })  
  
	event.addAdvanced(['aether:healing_stone'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0118').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0119').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0120').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0121').white()
		])
    }
  })
	
	event.addAdvanced('the_bumblezone:bee_cannon', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0122').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0123').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0124').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0125').white()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0126').white()
		])
    }
  })
	
	event.addAdvanced('the_bumblezone:crystal_cannon', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0127').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0128').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0129').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0130').white()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0131').white()
		])
		text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0132').white()
		])
		text.add(4, [
        Text.translate('kubejs.script.client.scripts.tooltips.0133').white()
		])
    }
  })

	event.addAdvanced(['kubejs:gem_shard_great'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0134').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0135').darkPurple(),
        Text.translate('kubejs.script.client.scripts.tooltips.0136').gray()
      ])
    } else {
		text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0137').white()
		])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0138').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0139').yellow(),
		Text.translate('kubejs.script.client.scripts.tooltips.0140').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0141').darkPurple()
		])
    }
  })
	
	event.addAdvanced(['kubejs:voucher_relic'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0142').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0143').darkPurple(),
        Text.translate('kubejs.script.client.scripts.tooltips.0144').gray()
      ])
    } else {
		text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0145').white()
		])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0146').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0147').yellow(),
		Text.translate('kubejs.script.client.scripts.tooltips.0148').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0149').darkPurple()
		])
    }
  })
	
	event.addAdvanced('bonfires:estus_flask', (item, advanced, text) => {
			text.add(Text.of(''));
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0151').gray());
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0152').gray());
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0153').gray());
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0154').gray());
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0155').gray());
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0156').gray());
			text.add(Text.of(''));
    });	

	event.addAdvanced(['kubejs:gem_shard'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0158').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0159').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0160').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0161').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0162').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0163').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0164').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0165').darkRed(),
		Text.translate('kubejs.script.client.scripts.tooltips.0166').white()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0167').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0168').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0169').white()
        ])
    }
	})

	event.addAdvanced(['kubejs:junk'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0170').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0171').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0172').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0173').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0174').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0175').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0176').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0177').darkRed()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0178').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0179').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0180').white()
      ])
    }
	})
  
	event.addAdvanced(['kubejs:essence_monster', 'kubejs:essence_monster_raw'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0181').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0182').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0183').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0184').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0185').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0186').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0187').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0188').darkRed()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0189').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0190').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0191').white()
      ])
    }
	})
	
	event.addAdvanced('kubejs:artifact_fragment', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0192').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0193').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0194').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0195').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0196').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0197').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0198').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0199').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0200').darkPurple()
		])
		text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0201').white()
      ])
      text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0202').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0203').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0204').white()
      ])
    }
	})
	
	event.addAdvanced('kubejs:spawnercore', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0205').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0206').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0207').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0208').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0209').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0210').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0211').green()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0212').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0213').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0214').white()
      ])
    }
  })
	
	event.addAdvanced('kubejs:scroll_exp', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0215').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0216').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0217').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0218').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0219').green()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0220').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0221').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0222').white()
      ])
	  text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0223').aqua(),
        Text.translate('kubejs.script.client.scripts.tooltips.0224').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0225').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0226').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0227').darkGreen(),
		Text.translate('kubejs.script.client.scripts.tooltips.0228').white()
      ])
    }
  })

	event.addAdvanced('kubejs:scraps', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0229').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0230').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0231').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0232').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0233').blue()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0234').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0235').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0236').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0237').darkPurple()
		])
      text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0238').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0239').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0240').white()
      ])
    }
  })

	event.addAdvanced('kubejs:dust_alchemical', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0241').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0242').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0243').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0244').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0245').darkPurple()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0246').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0247').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0248').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0249').darkPurple()
		])
      text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0250').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0251').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0252').white()
      ])
    }
  })

	event.addAdvanced('kubejs:dust_experience', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0253').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0254').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0255').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0256').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0257').green()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0258').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0259').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0260').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0261').darkPurple()
		])
      text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0262').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0263').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0264').white()
      ])
    }
  })

	event.addAdvanced('kubejs:portable_dissolver', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0265').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0266').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0267').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0268').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0269').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0270').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0271').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0272').white()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0273').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0274').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0275').white()
      ])
    }
  })
  
  	event.addAdvanced('kubejs:portable_transmutator', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0276').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0277').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0278').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0279').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0280').lightPurple(),
		Text.translate('kubejs.script.client.scripts.tooltips.0281').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0282').darkPurple(),
		Text.translate('kubejs.script.client.scripts.tooltips.0283').white()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0284').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0285').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0286').white()
      ])
    }
  })

	event.addAdvanced('kubejs:portable_salvager', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0287').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0288').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0289').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0290').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0291').blue(),
		Text.translate('kubejs.script.client.scripts.tooltips.0292').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0293').darkPurple(),
		Text.translate('kubejs.script.client.scripts.tooltips.0294').white()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0295').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0296').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0297').white()
      ])
    }
  })

	event.addAdvanced('farmersdelight:straw', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0298').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0299').green(),
        Text.translate('kubejs.script.client.scripts.tooltips.0300').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0301').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0302').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0303').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0304').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0305').gold()
      ])
    }
  })
	
	event.addAdvanced('farmersdelight:rope', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0306').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0307').green(),
        Text.translate('kubejs.script.client.scripts.tooltips.0308').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0309').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0310').white()
      ])
	  text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0311').white()
      ])
	  text.add(4, [
        Text.translate('kubejs.script.client.scripts.tooltips.0312').white()
      ])
    }
  })	
	
  	event.addAdvanced(['skilltree:quiver', 'skilltree:fiery_quiver', 'skilltree:armored_quiver', 'skilltree:gilded_quiver', 'skilltree:toxic_quiver', 'skilltree:diamond_quiver', 'skilltree:healing_quiver', 'skilltree:silent_quiver', 'skilltree:bone_quiver'], (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0313').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0314').blue(),
		Text.translate('kubejs.script.client.scripts.tooltips.0315').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0316').gold()
      ])
	})

	// COINS
	event.addAdvanced('kubejs:coin_dungeon', (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0317').gold()
      ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0318').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0319').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0320').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0321').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0322').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0323').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0324').gold()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0325').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0326').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0327').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0328').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0329').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0330').gold().bold(true)

      ])
    }
  })

	event.addAdvanced(['kubejs:copper_coin', 'kubejs:iron_coin', 'kubejs:gold_coin', 'kubejs:diamond_coin'], (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0331').gold()
      ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0332').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0333').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0334').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0335').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0336').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0337').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0338').green()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0339').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0340').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0341').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0342').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0343').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0344').gold().bold(true)

      ])
    }
  })
  
    event.addAdvanced('kubejs:proofofwork', (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0345').yellow()
     ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0346').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0347').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0348').gray()
      ])
    } else {
	  	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0349').white()
      ])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0350').green().bold(true),
        Text.translate('kubejs.script.client.scripts.tooltips.0351').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0352').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0353').white()
      ])
	    text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0354').blue().bold(true),
        Text.translate('kubejs.script.client.scripts.tooltips.0355').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0356').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0357').white()
      ])
	  	text.add(4, [
		Text.translate('kubejs.script.client.scripts.tooltips.0358').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0359').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0360').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0361').green()
      ])
    }
  })

	event.addAdvanced(['kubejs:coin_raid'], (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0362').aqua()
    ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0363').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0364').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0365').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0366').white(), 
		Text.translate('kubejs.script.client.scripts.tooltips.0367').darkRed()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0368').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0369').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0370').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0371').green()
      ])
	  	text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0372').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0373').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0374').white()
      ])
    }
  })

	event.addAdvanced(['kubejs:coin_aether', 'kubejs:coin_undergarden', 'kubejs:coin_twilight', 'kubejs:coin_bumblezone', 'kubejs:coin_icaria', 'kubejs:coin_end', 'kubejs:coin_nether'], (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0375').aqua()
    ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0376').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0377').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0378').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0379').white(), 
		Text.translate('kubejs.script.client.scripts.tooltips.0380').darkPurple(), 
		Text.translate('kubejs.script.client.scripts.tooltips.0381').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0382').aqua(),
        Text.translate('kubejs.script.client.scripts.tooltips.0383').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0384').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0385').green()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0386').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0387').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0388').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0389').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0390').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0391').gold().bold(true)
      ])
    }
  })
  
  	event.addAdvanced('kubejs:coin_task', (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0392').blue()
    ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0393').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0394').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0395').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0396').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0397').blue(),
		Text.translate('kubejs.script.client.scripts.tooltips.0398').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0399').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0400').white()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0401').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0402').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0403').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0404').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0405').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0406').gold().bold(true)

      ])
    }
  })
/////////////////////
  
    event.addAdvanced('naturescompass:naturescompass', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0407').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0408').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0409').gold()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0410').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0411').green().bold(true),
        Text.translate('kubejs.script.client.scripts.tooltips.0412').white()
      ])
    }
  })
  
      event.addAdvanced('l2hostility:hostility_orb', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0413').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0414').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0415').gold()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0416').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0417').red(),
        Text.translate('kubejs.script.client.scripts.tooltips.0418').white()
      ])
	   text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0419').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0420').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0421').white()
      ])
	    text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0422').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0423').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0424').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0425').red().bold(true),
		Text.translate('kubejs.script.client.scripts.tooltips.0426').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0427').red().bold(true)
      ])
    }
  })
  
    event.addAdvanced('#chalk:chalks', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0428').gray(),
          Text.translate('kubejs.script.client.scripts.tooltips.0429').yellow(),
          Text.translate('kubejs.script.client.scripts.tooltips.0430').gray()
        ])
      } else {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0431').white(),
          Text.translate('kubejs.script.client.scripts.tooltips.0432').green(),
          Text.translate('kubejs.script.client.scripts.tooltips.0433').white()
        ])
        text.add(2, [
          Text.translate('kubejs.script.client.scripts.tooltips.0434').white(),
          Text.translate('kubejs.script.client.scripts.tooltips.0435').green(),
          Text.translate('kubejs.script.client.scripts.tooltips.0436').white()
        ])
      }
    })
	
	event.addAdvanced('roughtweaks:plaster', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0437').gray(),
          Text.translate('kubejs.script.client.scripts.tooltips.0438').red(),
          Text.translate('kubejs.script.client.scripts.tooltips.0439').gray()
        ])
      } else {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0440').red(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0441').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0442').red().bold(true),
          Text.translate('kubejs.script.client.scripts.tooltips.0443').white(),
          Text.translate('kubejs.script.client.scripts.tooltips.0444').green(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0445').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0446').red()
        ])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0447').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0448').blue(),		
        Text.translate('kubejs.script.client.scripts.tooltips.0449').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0450').white()
        ])
      }
    })


    event.addAdvanced('eccentrictome:tome', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0451').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0452').green()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0453').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0454').white()
		])
		text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0455').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0456').white()
		])
		text.add(4, [
        Text.translate('kubejs.script.client.scripts.tooltips.0457').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0458').white()
		])
		text.add(5, [
        Text.translate('kubejs.script.client.scripts.tooltips.0459').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0460').white()
        ]) 
  })
  
    event.addAdvanced('bonfires:undead_bone_shard', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0461').gray(),
          Text.translate('kubejs.script.client.scripts.tooltips.0462').red(),
          Text.translate('kubejs.script.client.scripts.tooltips.0463').gray()
        ])
      } else {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0464').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0465').green(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0466').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0467').darkRed(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0468').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0469').red()
        ])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0470').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0471').blue(),		
        Text.translate('kubejs.script.client.scripts.tooltips.0472').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0473').darkPurple(),
		Text.translate('kubejs.script.client.scripts.tooltips.0474').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0475').yellow(),
		Text.translate('kubejs.script.client.scripts.tooltips.0476').white()
        ])
      }
    })

	event.addAdvanced('kubejs:book_old', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0477').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0478').gray()
      ])
	})

	event.addAdvanced('kubejs:lost_bag', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0479').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0480').gray()
      ])
	})
	
	event.addAdvanced('kubejs:unidentified_glyph_scroll', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0481').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0482').gray()
      ])
	})
	
	event.addAdvanced('kubejs:unidentified_glyph_scroll_2', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0483').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0484').gray()
      ])
	})
	
	event.addAdvanced('kubejs:unidentified_glyph_scroll_3', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0485').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0486').gray()
      ])
	})
	
    event.addAdvanced('bonfires:titanite_shard', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0487').gray(),
          Text.translate('kubejs.script.client.scripts.tooltips.0488').red(),
          Text.translate('kubejs.script.client.scripts.tooltips.0489').gray()
        ])
      } else {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0490').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0491').green(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0492').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0493').darkRed(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0494').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0495').red()
        ])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0496').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0497').darkPurple(),
        Text.translate('kubejs.script.client.scripts.tooltips.0498').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0499').darkRed()
        ])
      }
    })
	
    event.addAdvanced('bonfires:large_titanite_shard', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0500').gray(),
          Text.translate('kubejs.script.client.scripts.tooltips.0501').red(),
          Text.translate('kubejs.script.client.scripts.tooltips.0502').gray()
        ])
      } else {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0503').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0504').green(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0505').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0506').darkRed(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0507').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0508').red()
        ])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0509').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0510').aqua(),
        Text.translate('kubejs.script.client.scripts.tooltips.0511').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0512').darkRed()
        ])
      }
    })
	
    event.addAdvanced('bonfires:titanite_chunk', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0513').gray(),
          Text.translate('kubejs.script.client.scripts.tooltips.0514').red(),
          Text.translate('kubejs.script.client.scripts.tooltips.0515').gray()
        ])
      } else {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0516').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0517').green(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0518').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0519').darkRed(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0520').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0521').red()
        ])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0522').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0523').darkGreen(),
        Text.translate('kubejs.script.client.scripts.tooltips.0524').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0525').darkRed()
        ])
      }
    })
	
    event.addAdvanced('bonfires:titanite_slab', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0526').gray(),
          Text.translate('kubejs.script.client.scripts.tooltips.0527').red(),
          Text.translate('kubejs.script.client.scripts.tooltips.0528').gray()
        ])
      } else {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0529').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0530').green(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0531').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0532').darkRed(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0533').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0534').red()
        ])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0535').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0536').darkGray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0537').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0538').darkRed()
        ])
      }
    })

    event.addAdvanced('kubejs:gemcutters_pouch', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0539').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0540').gray()
      ])
	})

	
	event.addAdvanced('kubejs:ore_bag', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0541').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0542').gray()
      ])
	})

	event.addAdvanced('kubejs:mage_bag', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0543').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0544').gray()
      ])
	})
	
	event.addAdvanced('kubejs:reagent_box', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0545').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0546').gray()
      ])
	})

	event.addAdvanced('kubejs:book_ancient', (item, advanced, text) => {
		text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0547').gold().italic(true)
      ])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0548').gray()
      ]) 
	})
	
	event.addAdvanced('kubejs:canned_food', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0549').gold().italic(true)
      ])
	})
	
	event.addAdvanced('kubejs:detonator', (item, advanced, text) => {
		text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0550').gold().italic(true)
      ])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0551').gray().italic(true)
      ]) 
	})

	event.addAdvanced(['kubejs:quest_crate'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0552').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0553').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0554').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0555').darkRed()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0556').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0557').darkRed(),
		Text.translate('kubejs.script.client.scripts.tooltips.0558').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0559').white()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0560').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0561').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0562').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0563').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0564').white()
        ])
     }
	})
  	event.addAdvanced('#rad3:decapitating', (item, advanced, text) => {
      text.add(1, [
		Text.translate('kubejs.script.client.scripts.tooltips.0565').white(),
        Text.of('25% ').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0567').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0568').red(),
		Text.translate('kubejs.script.client.scripts.tooltips.0569').white()
      ])
	})
	event.addAdvanced('sophisticatedstorage:chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0570')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0571'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0572'))
	})
	event.addAdvanced('sophisticatedstorage:copper_chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0573')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0574'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0575'))
	})
	event.addAdvanced('sophisticatedstorage:iron_chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0576')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0577'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0578'))
	})
	event.addAdvanced('sophisticatedstorage:gold_chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0579')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0580'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0581'))
	})
	event.addAdvanced('sophisticatedstorage:diamond_chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0582')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0583'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0584'))
	})
	event.addAdvanced('sophisticatedstorage:netherite_chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0585')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0586'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0587'))
	})


    // drop info
	event.addAdvanced('cataclysm:amethyst_crab_meat', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0588').gray()) 
	})
	event.addAdvanced('cataclysm:amethyst_crab_shell', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0589').gray()) 
	})
	event.addAdvanced('hmag:ancient_stone', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0590').gray()) 
	})
	event.addAdvanced('hmag:kobold_leather', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0591').gray()) 
	})
	event.addAdvanced('hmag:ogre_horn', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0592').gray()) 
	})
	event.addAdvanced('hmag:lich_cloth', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0593').gray()) 
	})
	event.addAdvanced('hmag:necrofiber', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0594').gray()) 
	})
	event.addAdvanced('hmag:ender_plasm', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0595').gray()) 
	})
	event.addAdvanced('hmag:crimson_cuticula', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0596').gray()) 
	})
	event.addAdvanced('hmag:dyssomnia_skin', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0597').gray()) 
	})
	event.addAdvanced('hmag:mysterious_petal', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0598').gray()) 
	})
	event.addAdvanced('hmag:sharp_fang', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0599').gray()) 
	})
	event.addAdvanced('hmag:burning_core', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0600').gray()) 
	})
	event.addAdvanced('hmag:cubic_nucleus', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0601').gray()) 
	})
	event.addAdvanced('hmag:evil_crystal_fragment', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0602').gray()) 
	})
	event.addAdvanced('hmag:lightning_particle', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0603').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:ancient_anima', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0604').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:blazing_eye', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0605').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:obsidian_heart', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0606').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:void_thorn', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0607').gray()) 
	})
	event.addAdvanced('aether_redux:sentry_chip', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0608').gray())
	})
	// item info
	event.addAdvanced('hmag:insomnia_fruit', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0609').gray()) 
	})
	event.addAdvanced('hmag:insomnia_sword', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0610').gray()) 
	})
	event.addAdvanced('hmag:nemesis_blade', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0611').gray()) 
	})
	event.addAdvanced('hmag:crimson_bow', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0612').gray()) 
	})
	event.addAdvanced('hmag:fortress_shield', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0613').gray()) 
	})
	event.addAdvanced('hmag:bat_stew', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0614').gray()) 
	})
	event.addAdvanced('#hmag:reinforced_blocks', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0615').gray()) 
	})
	event.addAdvanced('darkerdepths:void_soul_jar', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0616').gray()) 
	})
	event.addAdvanced('minecraft:reinforced_deepslate', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0617').gray()) 
	})
	event.addAdvanced('minecraft:brewing_stand', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0618').gray()) 
	})
	event.addAdvanced('ancient_aether:valkyrum_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0619').gray()) 
	})
	event.addAdvanced('landsoficaria:yellowstone', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0620').gray()) 
	})
	event.addAdvanced('landsoficaria:lignite_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0621').gray()) 
	})
	event.addAdvanced('landsoficaria:chalkos_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0622').gray()) 
	})
	event.addAdvanced('landsoficaria:silkstone', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0623').gray()) 
	})
	event.addAdvanced('landsoficaria:kassiteros_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0624').gray()) 
	})
	event.addAdvanced('landsoficaria:dolomite_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0625').gray()) 
	})
	event.addAdvanced('landsoficaria:sunstone', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0626').gray()) 
	})
	event.addAdvanced('landsoficaria:vanadium_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0627').gray()) 
	})
	event.addAdvanced('landsoficaria:sliver_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0628').gray()) 
	})
	event.addAdvanced('landsoficaria:voidshale', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0629').gray()) 
	})
	event.addAdvanced('landsoficaria:sideros_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0630').gray()) 
	})
	event.addAdvanced('landsoficaria:anthracite_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0631').gray()) 
	})
	event.addAdvanced('landsoficaria:baetyl', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0632').gray()) 
	})
	event.addAdvanced('landsoficaria:molybdenum_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0633').gray()) 
	})
	event.addAdvanced('landsoficaria:hyliastrum_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0634').gray()) 
	})
	event.addAdvanced('pandorasbox:pandoras_box', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0635').red()) 
	})
	event.addAdvanced('kubejs:great_soul', (item, advanced, text) => {
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0636').darkRed().italic(true)])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0637').darkPurple()])
	})
	
	event.addAdvanced('ars_nouveau:mob_jar', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0638').red()) 
	})
	

	//Gear Upgrades
	event.addAdvanced('kubejs:upgrade_swift', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0639').white(),Text.translate('kubejs.script.client.scripts.tooltips.0640').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0641').white(),Text.translate('kubejs.script.client.scripts.tooltips.0642').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0643').white(),Text.translate('kubejs.script.client.scripts.tooltips.0644').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0645').white(),Text.translate('kubejs.script.client.scripts.tooltips.0646').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0647').white(),Text.translate('kubejs.script.client.scripts.tooltips.0648').green(),Text.translate('kubejs.script.client.scripts.tooltips.0649').white(),Text.translate('kubejs.script.client.scripts.tooltips.0650').white(),Text.translate('kubejs.script.client.scripts.tooltips.0651').blue()])}	
	})
	
	event.addAdvanced('kubejs:upgrade_swift2', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0652').white(),Text.translate('kubejs.script.client.scripts.tooltips.0653').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0654').white(),Text.translate('kubejs.script.client.scripts.tooltips.0655').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0656').white(),Text.translate('kubejs.script.client.scripts.tooltips.0657').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0658').white(),Text.translate('kubejs.script.client.scripts.tooltips.0659').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0660').white(),Text.translate('kubejs.script.client.scripts.tooltips.0661').green(),Text.translate('kubejs.script.client.scripts.tooltips.0662').white(),Text.translate('kubejs.script.client.scripts.tooltips.0663').white(),Text.translate('kubejs.script.client.scripts.tooltips.0664').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_swift3', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0665').white(),Text.translate('kubejs.script.client.scripts.tooltips.0666').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0667').white(),Text.translate('kubejs.script.client.scripts.tooltips.0668').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0669').white(),Text.translate('kubejs.script.client.scripts.tooltips.0670').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0671').white(),Text.translate('kubejs.script.client.scripts.tooltips.0672').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0673').white(),Text.translate('kubejs.script.client.scripts.tooltips.0674').green(),Text.translate('kubejs.script.client.scripts.tooltips.0675').white(),Text.translate('kubejs.script.client.scripts.tooltips.0676').white(),Text.translate('kubejs.script.client.scripts.tooltips.0677').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sharp', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0678').white(),Text.translate('kubejs.script.client.scripts.tooltips.0679').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0680').white(),Text.translate('kubejs.script.client.scripts.tooltips.0681').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0682').white(),Text.translate('kubejs.script.client.scripts.tooltips.0683').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0684').white(),Text.translate('kubejs.script.client.scripts.tooltips.0685').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0686').white(),Text.translate('kubejs.script.client.scripts.tooltips.0687').green(),Text.translate('kubejs.script.client.scripts.tooltips.0688').white(),Text.translate('kubejs.script.client.scripts.tooltips.0689').white(),Text.translate('kubejs.script.client.scripts.tooltips.0690').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sharp2', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0691').white(),Text.translate('kubejs.script.client.scripts.tooltips.0692').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0693').white(),Text.translate('kubejs.script.client.scripts.tooltips.0694').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0695').white(),Text.translate('kubejs.script.client.scripts.tooltips.0696').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0697').white(),Text.translate('kubejs.script.client.scripts.tooltips.0698').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0699').white(),Text.translate('kubejs.script.client.scripts.tooltips.0700').green(),Text.translate('kubejs.script.client.scripts.tooltips.0701').white(),Text.translate('kubejs.script.client.scripts.tooltips.0702').white(),Text.translate('kubejs.script.client.scripts.tooltips.0703').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sharp3', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0704').white(),Text.translate('kubejs.script.client.scripts.tooltips.0705').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0706').white(),Text.translate('kubejs.script.client.scripts.tooltips.0707').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0708').white(),Text.translate('kubejs.script.client.scripts.tooltips.0709').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0710').white(),Text.translate('kubejs.script.client.scripts.tooltips.0711').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0712').white(),Text.translate('kubejs.script.client.scripts.tooltips.0713').green(),Text.translate('kubejs.script.client.scripts.tooltips.0714').white(),Text.translate('kubejs.script.client.scripts.tooltips.0715').white(),Text.translate('kubejs.script.client.scripts.tooltips.0716').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_force', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0717').white(),Text.translate('kubejs.script.client.scripts.tooltips.0718').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0719').white(),Text.translate('kubejs.script.client.scripts.tooltips.0720').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0721').white(),Text.translate('kubejs.script.client.scripts.tooltips.0722').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0723').white(),Text.translate('kubejs.script.client.scripts.tooltips.0724').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0725').white(),Text.translate('kubejs.script.client.scripts.tooltips.0726').green(),Text.translate('kubejs.script.client.scripts.tooltips.0727').white(),Text.translate('kubejs.script.client.scripts.tooltips.0728').white(),Text.translate('kubejs.script.client.scripts.tooltips.0729').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_prof', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0730').white(),Text.translate('kubejs.script.client.scripts.tooltips.0731').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0732').white(),Text.translate('kubejs.script.client.scripts.tooltips.0733').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0734').white(),Text.translate('kubejs.script.client.scripts.tooltips.0735').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0736').white(),Text.translate('kubejs.script.client.scripts.tooltips.0737').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0738').white(),Text.translate('kubejs.script.client.scripts.tooltips.0739').green(),Text.translate('kubejs.script.client.scripts.tooltips.0740').white(),Text.translate('kubejs.script.client.scripts.tooltips.0741').white(),Text.translate('kubejs.script.client.scripts.tooltips.0742').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_heart', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0743').white(),Text.translate('kubejs.script.client.scripts.tooltips.0744').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0745').white(),Text.translate('kubejs.script.client.scripts.tooltips.0746').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0747').white(),Text.translate('kubejs.script.client.scripts.tooltips.0748').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0749').white(),Text.translate('kubejs.script.client.scripts.tooltips.0750').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0751').white(),Text.translate('kubejs.script.client.scripts.tooltips.0752').green(),Text.translate('kubejs.script.client.scripts.tooltips.0753').white(),Text.translate('kubejs.script.client.scripts.tooltips.0754').white(),Text.translate('kubejs.script.client.scripts.tooltips.0755').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_gilded', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0756').white(),Text.translate('kubejs.script.client.scripts.tooltips.0757').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0758').white(),Text.translate('kubejs.script.client.scripts.tooltips.0759').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0760').white(),Text.translate('kubejs.script.client.scripts.tooltips.0761').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0762').white(),Text.translate('kubejs.script.client.scripts.tooltips.0763').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0764').white(),Text.translate('kubejs.script.client.scripts.tooltips.0765').green(),Text.translate('kubejs.script.client.scripts.tooltips.0766').white(),Text.translate('kubejs.script.client.scripts.tooltips.0767').white(),Text.translate('kubejs.script.client.scripts.tooltips.0768').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_guarding', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0769').white(),Text.translate('kubejs.script.client.scripts.tooltips.0770').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0771').white(),Text.translate('kubejs.script.client.scripts.tooltips.0772').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0773').white(),Text.translate('kubejs.script.client.scripts.tooltips.0774').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0775').white(),Text.translate('kubejs.script.client.scripts.tooltips.0776').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0777').white(),Text.translate('kubejs.script.client.scripts.tooltips.0778').green(),Text.translate('kubejs.script.client.scripts.tooltips.0779').white(),Text.translate('kubejs.script.client.scripts.tooltips.0780').white(),Text.translate('kubejs.script.client.scripts.tooltips.0781').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sniping', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0782').white(),Text.translate('kubejs.script.client.scripts.tooltips.0783').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0784').white(),Text.translate('kubejs.script.client.scripts.tooltips.0785').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0786').white(),Text.translate('kubejs.script.client.scripts.tooltips.0787').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0788').white(),Text.translate('kubejs.script.client.scripts.tooltips.0789').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0790').white(),Text.translate('kubejs.script.client.scripts.tooltips.0791').green(),Text.translate('kubejs.script.client.scripts.tooltips.0792').white(),Text.translate('kubejs.script.client.scripts.tooltips.0793').white(),Text.translate('kubejs.script.client.scripts.tooltips.0794').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_quick', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0795').white(),Text.translate('kubejs.script.client.scripts.tooltips.0796').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0797').white(),Text.translate('kubejs.script.client.scripts.tooltips.0798').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0799').white(),Text.translate('kubejs.script.client.scripts.tooltips.0800').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0801').white(),Text.translate('kubejs.script.client.scripts.tooltips.0802').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0803').white(),Text.translate('kubejs.script.client.scripts.tooltips.0804').green(),Text.translate('kubejs.script.client.scripts.tooltips.0805').white(),Text.translate('kubejs.script.client.scripts.tooltips.0806').white(),Text.translate('kubejs.script.client.scripts.tooltips.0807').blue()])}	
	})	
	
	event.addAdvanced('kubejs:upgrade_reach', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0808').white(),Text.translate('kubejs.script.client.scripts.tooltips.0809').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0810').white(),Text.translate('kubejs.script.client.scripts.tooltips.0811').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0812').white(),Text.translate('kubejs.script.client.scripts.tooltips.0813').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0814').white(),Text.translate('kubejs.script.client.scripts.tooltips.0815').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0816').white(),Text.translate('kubejs.script.client.scripts.tooltips.0817').green(),Text.translate('kubejs.script.client.scripts.tooltips.0818').white(),Text.translate('kubejs.script.client.scripts.tooltips.0819').white(),Text.translate('kubejs.script.client.scripts.tooltips.0820').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_quickfeet', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0821').white(),Text.translate('kubejs.script.client.scripts.tooltips.0822').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0823').white(),Text.translate('kubejs.script.client.scripts.tooltips.0824').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0825').white(),Text.translate('kubejs.script.client.scripts.tooltips.0826').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0827').white(),Text.translate('kubejs.script.client.scripts.tooltips.0828').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0829').white(),Text.translate('kubejs.script.client.scripts.tooltips.0830').green(),Text.translate('kubejs.script.client.scripts.tooltips.0831').white(),Text.translate('kubejs.script.client.scripts.tooltips.0832').white(),Text.translate('kubejs.script.client.scripts.tooltips.0833').blue()])}	
	})	

	event.addAdvanced('kubejs:upgrade_lifesteal', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0834').white(),Text.translate('kubejs.script.client.scripts.tooltips.0835').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0836').white(),Text.translate('kubejs.script.client.scripts.tooltips.0837').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0838').white(),Text.translate('kubejs.script.client.scripts.tooltips.0839').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0840').white(),Text.translate('kubejs.script.client.scripts.tooltips.0841').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0842').white(),Text.translate('kubejs.script.client.scripts.tooltips.0843').green(),Text.translate('kubejs.script.client.scripts.tooltips.0844').white(),Text.translate('kubejs.script.client.scripts.tooltips.0845').white(),Text.translate('kubejs.script.client.scripts.tooltips.0846').blue()])}	
	})	

	event.addAdvanced('kubejs:upgrade_fortress', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0847').white(),Text.translate('kubejs.script.client.scripts.tooltips.0848').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0849').white(),Text.translate('kubejs.script.client.scripts.tooltips.0850').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0851').white(),Text.translate('kubejs.script.client.scripts.tooltips.0852').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0853').white(),Text.translate('kubejs.script.client.scripts.tooltips.0854').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0855').white(),Text.translate('kubejs.script.client.scripts.tooltips.0856').green(),Text.translate('kubejs.script.client.scripts.tooltips.0857').white(),Text.translate('kubejs.script.client.scripts.tooltips.0858').white(),Text.translate('kubejs.script.client.scripts.tooltips.0859').blue()])}	
	})		
	
	event.addAdvanced('kubejs:mending', (item, advanced, text) => {
		// line indices 1-13: The Tragic Tale (Italicized Gray Lore)
		text.add(1, Text.translate("kubejs.script.client.scripts.tooltips.0860").gray().italic())
		text.add(2, Text.translate("kubejs.script.client.scripts.tooltips.0861").gray().italic())
		text.add(3, Text.translate("kubejs.script.client.scripts.tooltips.0862").gray().italic())
		text.add(4, Text.translate("kubejs.script.client.scripts.tooltips.0863").gray().italic())
		text.add(5, Text.translate("kubejs.script.client.scripts.tooltips.0864").gray().italic())
		text.add(6, Text.translate("kubejs.script.client.scripts.tooltips.0865").gray().italic())
		text.add(7, Text.translate("kubejs.script.client.scripts.tooltips.0866").gray().italic())
		text.add(8, Text.translate("kubejs.script.client.scripts.tooltips.0867").gray().italic())
		text.add(9, Text.translate("kubejs.script.client.scripts.tooltips.0868").gray().italic())
		text.add(10, Text.translate("kubejs.script.client.scripts.tooltips.0869").gray().italic())
		text.add(11, Text.translate("kubejs.script.client.scripts.tooltips.0870").gray().italic())
		text.add(12, Text.translate("kubejs.script.client.scripts.tooltips.0871").gray().italic())
		text.add(13, Text.translate("kubejs.script.client.scripts.tooltips.0872").gray().italic())
		text.add(14, Text.translate("kubejs.script.client.scripts.tooltips.0873").gray().italic())
		text.add(15, Text.translate("kubejs.script.client.scripts.tooltips.0874").gray().italic())
		text.add(16, Text.translate("kubejs.script.client.scripts.tooltips.0875").gray().italic())
		text.add(17, Text.translate("kubejs.script.client.scripts.tooltips.0876").gray().italic())
		text.add(18, Text.translate("kubejs.script.client.scripts.tooltips.0877").gray().italic())
		text.add(19, Text.translate("kubejs.script.client.scripts.tooltips.0878").gray().italic())
		text.add(20, Text.translate("kubejs.script.client.scripts.tooltips.0879").gray().italic())
	})
	

// THE END	
})
ClientEvents.lang('en_us', event => {
  event.renameItem('graveyard:upper_bone_staff', 'Skull of the Wizard King')
  event.renameItem('graveyard:middle_bone_staff', 'Ribs of the Warrior King')
  event.renameItem('graveyard:lower_bone_staff', 'Tail of the Beast King')

})
