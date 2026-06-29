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
            text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0021').gray().append(Text.gold(Text.translate('kubejs.script.client.scripts.tooltips.0022'))).append(Text.gray(Text.translate('kubejs.script.client.scripts.tooltips.0023'))))
        } else {
            text.add(2, Text.of(' 1. ').append(Text.gold(Text.translate('kubejs.script.client.scripts.tooltips.0025'))).append(Text.white(Text.translate('kubejs.script.client.scripts.tooltips.0026'))))
            text.add(3, Text.of(' 2. ').append(Text.yellow(Text.translate('kubejs.script.client.scripts.tooltips.0028'))).append(Text.white(Text.translate('kubejs.script.client.scripts.tooltips.0029'))))
            text.add(4, Text.of(' 3. ').append(Text.aqua(Text.translate('kubejs.script.client.scripts.tooltips.0031'))).append(Text.white(Text.translate('kubejs.script.client.scripts.tooltips.0032'))))
        }
    })

    event.addAdvanced('bountiful:decree', (stack, advanced, text) => {      
        if (!event.shift) {
            text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0033').gray().append(Text.gold(Text.translate('kubejs.script.client.scripts.tooltips.0034'))).append(Text.gray(Text.translate('kubejs.script.client.scripts.tooltips.0035'))))
        } else {
            text.add(2, Text.of(' 1. ').append(Text.gold(Text.translate('kubejs.script.client.scripts.tooltips.0037'))).append(Text.white(Text.translate('kubejs.script.client.scripts.tooltips.0038'))))
            text.add(3, Text.of(' 2. ').append(Text.yellow(Text.translate('kubejs.script.client.scripts.tooltips.0040'))).append(Text.white(Text.translate('kubejs.script.client.scripts.tooltips.0041'))))
            text.add(4, Text.of(' 3. ').append(Text.aqua(Text.translate('kubejs.script.client.scripts.tooltips.0043'))).append(Text.white(Text.translate('kubejs.script.client.scripts.tooltips.0044'))))
            text.add(5, Text.of(' 4. ').append(Text.lightPurple(Text.translate('kubejs.script.client.scripts.tooltips.0046'))).append(Text.white(Text.translate('kubejs.script.client.scripts.tooltips.0047'))))
        }
    })
	
	event.addAdvanced('kubejs:map_scroll_biome', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0048').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0049').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0050').gray()
      ])
    } else {
		text.add(1, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0051').white()
      ])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0052').white()
		])
      text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0053').white()
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

		text.add(1, Text.darkRed(Text.translate('kubejs.script.client.scripts.tooltips.0054')).bold())
        text.add(2, Text.gray(Text.translate('kubejs.script.client.scripts.tooltips.0055')))
		text.add(3, Text.gray(Text.translate('kubejs.script.client.scripts.tooltips.0056'))
            .append(Text.aqua(Text.translate('kubejs.script.client.scripts.tooltips.0057')))
            .append(Text.gray(Text.translate('kubejs.script.client.scripts.tooltips.0058')))
            .append(Text.aqua(Text.translate('kubejs.script.client.scripts.tooltips.0059')))
            .append(Text.gray(Text.translate('kubejs.script.client.scripts.tooltips.0060')))
        )
        
        let color = failChance >= 70 ? Text.red : Text.yellow
        text.add(4, Text.gold(Text.translate('kubejs.script.client.scripts.tooltips.0061')).append(color(`${failChance}%`)))

    })
	
	event.addAdvanced('kubejs:map_scroll_structure', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0062').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0063').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0064').gray()
      ])
    } else {
		text.add(1, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0065').white()
      ])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0066').white()
		])
      text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0067').white()
		])
    }
	})

	event.addAdvanced('paraglider:spirit_orb', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0068').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0069').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0070').gray()
      ])
    } else {
		text.add(1, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0071').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0072').green(),
        Text.translate('kubejs.script.client.scripts.tooltips.0073').white()
      ])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0074').white()
		])
      text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0075').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0076').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0077').white()
		])
    }
	})

	event.addAdvanced('paraglider:stamina_vessel', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0078').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0079').green(),
        Text.translate('kubejs.script.client.scripts.tooltips.0080').gray()
      ])
    } else {	
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0081').white(), 
		Text.translate('kubejs.script.client.scripts.tooltips.0082').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0083').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0084').yellow()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0085').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0086').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0087').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0088').gray(),
		Text.translate('kubejs.script.client.scripts.tooltips.0089').darkPurple(),
		Text.translate('kubejs.script.client.scripts.tooltips.0090').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0091').green()
      ])
    }
	})

	event.addAdvanced(['kubejs:essence_earth'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0092').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0093').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0094').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0095').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0096').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0097').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0098').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0099').darkRed()
		])
      text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0100').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0101').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0102').white()
      ])
    }
  })

	event.addAdvanced('landsoficaria:totem_of_stuffing', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0103').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0104').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0105').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0106').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0107').yellow()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0108').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0109').gray(),
		Text.translate('kubejs.script.client.scripts.tooltips.0110').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0111').darkRed(),
		Text.translate('kubejs.script.client.scripts.tooltips.0112').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0113').green()
		])
    }
  })
  
  	event.addAdvanced('landsoficaria:totem_of_unblinding', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0114').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0115').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0116').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0117').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0118').gray(),
		Text.translate('kubejs.script.client.scripts.tooltips.0119').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0120').gray(),
		Text.translate('kubejs.script.client.scripts.tooltips.0121').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0122').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0123').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0124').white()
		])
    }
  })

  	event.addAdvanced('landsoficaria:totem_of_undrowning', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0125').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0126').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0127').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0128').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0129').blue()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0130').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0131').blue(),
		Text.translate('kubejs.script.client.scripts.tooltips.0132').white()
		])
    }
  })
    	
	event.addAdvanced('landsoficaria:totem_of_unshattering', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0133').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0134').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0135').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0136').white()
		])
    }
  })
  
  	event.addAdvanced('landsoficaria:totem_of_unsinking', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0137').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0138').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0139').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0140').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0141').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0142').blue(),
		Text.translate('kubejs.script.client.scripts.tooltips.0143').white()
		])
    }
  })  
  
	event.addAdvanced(['aether:healing_stone'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0144').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0145').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0146').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0147').white()
		])
    }
  })
	
	event.addAdvanced('the_bumblezone:bee_cannon', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0148').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0149').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0150').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0151').white()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0152').white()
		])
    }
  })
	
	event.addAdvanced('the_bumblezone:crystal_cannon', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0153').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0154').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0155').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0156').white()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0157').white()
		])
		text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0158').white()
		])
		text.add(4, [
        Text.translate('kubejs.script.client.scripts.tooltips.0159').white()
		])
    }
  })

	event.addAdvanced(['kubejs:gem_shard_great'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0160').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0161').darkPurple(),
        Text.translate('kubejs.script.client.scripts.tooltips.0162').gray()
      ])
    } else {
		text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0163').white()
		])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0164').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0165').yellow(),
		Text.translate('kubejs.script.client.scripts.tooltips.0166').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0167').darkPurple()
		])
    }
  })
	
	event.addAdvanced(['kubejs:voucher_relic'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0168').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0169').darkPurple(),
        Text.translate('kubejs.script.client.scripts.tooltips.0170').gray()
      ])
    } else {
		text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0171').white()
		])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0172').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0173').yellow(),
		Text.translate('kubejs.script.client.scripts.tooltips.0174').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0175').darkPurple()
		])
    }
  })
	
	event.addAdvanced('bonfires:estus_flask', (item, advanced, text) => {
			text.add(Text.of(''));
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0177').gray());
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0178').gray());
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0179').gray());
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0180').gray());
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0181').gray());
			text.add(Text.translate('kubejs.script.client.scripts.tooltips.0182').gray());
			text.add(Text.of(''));
    });	

	event.addAdvanced(['kubejs:gem_shard'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0184').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0185').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0186').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0187').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0188').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0189').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0190').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0191').darkRed(),
		Text.translate('kubejs.script.client.scripts.tooltips.0192').white()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0193').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0194').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0195').white()
        ])
    }
	})

	event.addAdvanced(['kubejs:junk'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0196').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0197').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0198').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0199').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0200').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0201').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0202').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0203').darkRed()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0204').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0205').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0206').white()
      ])
    }
	})
  
	event.addAdvanced(['kubejs:essence_monster', 'kubejs:essence_monster_raw'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0207').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0208').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0209').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0210').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0211').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0212').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0213').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0214').darkRed()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0215').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0216').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0217').white()
      ])
    }
	})
	
	event.addAdvanced('kubejs:artifact_fragment', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0218').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0219').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0220').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0221').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0222').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0223').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0224').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0225').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0226').darkPurple()
		])
		text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0227').white()
      ])
      text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0228').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0229').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0230').white()
      ])
    }
	})
	
	event.addAdvanced('kubejs:spawnercore', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0231').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0232').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0233').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0234').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0235').white()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0236').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0237').green()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0238').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0239').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0240').white()
      ])
    }
  })
	
	event.addAdvanced('kubejs:scroll_exp', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0241').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0242').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0243').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0244').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0245').green()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0246').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0247').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0248').white()
      ])
	  text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0249').aqua(),
        Text.translate('kubejs.script.client.scripts.tooltips.0250').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0251').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0252').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0253').darkGreen(),
		Text.translate('kubejs.script.client.scripts.tooltips.0254').white()
      ])
    }
  })

	event.addAdvanced('kubejs:scraps', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0255').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0256').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0257').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0258').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0259').blue()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0260').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0261').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0262').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0263').darkPurple()
		])
      text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0264').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0265').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0266').white()
      ])
    }
  })

	event.addAdvanced('kubejs:dust_alchemical', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0267').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0268').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0269').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0270').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0271').darkPurple()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0272').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0273').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0274').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0275').darkPurple()
		])
      text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0276').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0277').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0278').white()
      ])
    }
  })

	event.addAdvanced('kubejs:dust_experience', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0279').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0280').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0281').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0282').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0283').green()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0284').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0285').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0286').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0287').darkPurple()
		])
      text.add(3, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0288').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0289').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0290').white()
      ])
    }
  })

	event.addAdvanced('kubejs:portable_dissolver', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0291').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0292').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0293').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0294').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0295').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0296').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0297').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0298').white()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0299').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0300').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0301').white()
      ])
    }
  })
  
  	event.addAdvanced('kubejs:portable_transmutator', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0302').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0303').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0304').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0305').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0306').lightPurple(),
		Text.translate('kubejs.script.client.scripts.tooltips.0307').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0308').darkPurple(),
		Text.translate('kubejs.script.client.scripts.tooltips.0309').white()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0310').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0311').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0312').white()
      ])
    }
  })

	event.addAdvanced('kubejs:portable_salvager', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0313').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0314').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0315').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0316').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0317').blue(),
		Text.translate('kubejs.script.client.scripts.tooltips.0318').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0319').darkPurple(),
		Text.translate('kubejs.script.client.scripts.tooltips.0320').white()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0321').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0322').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0323').white()
      ])
    }
  })

	event.addAdvanced('farmersdelight:straw', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0324').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0325').green(),
        Text.translate('kubejs.script.client.scripts.tooltips.0326').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0327').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0328').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0329').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0330').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0331').gold()
      ])
    }
  })
	
	event.addAdvanced('farmersdelight:rope', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0332').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0333').green(),
        Text.translate('kubejs.script.client.scripts.tooltips.0334').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0335').white()
		])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0336').white()
      ])
	  text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0337').white()
      ])
	  text.add(4, [
        Text.translate('kubejs.script.client.scripts.tooltips.0338').white()
      ])
    }
  })	
	
  	event.addAdvanced(['skilltree:quiver', 'skilltree:fiery_quiver', 'skilltree:armored_quiver', 'skilltree:gilded_quiver', 'skilltree:toxic_quiver', 'skilltree:diamond_quiver', 'skilltree:healing_quiver', 'skilltree:silent_quiver', 'skilltree:bone_quiver'], (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0339').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0340').blue(),
		Text.translate('kubejs.script.client.scripts.tooltips.0341').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0342').gold()
      ])
	})

	// COINS
	event.addAdvanced('kubejs:coin_dungeon', (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0343').gold()
      ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0344').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0345').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0346').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0347').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0348').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0349').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0350').gold()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0351').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0352').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0353').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0354').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0355').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0356').gold().bold(true)

      ])
    }
  })

	event.addAdvanced(['kubejs:copper_coin', 'kubejs:iron_coin', 'kubejs:gold_coin', 'kubejs:diamond_coin'], (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0357').gold()
      ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0358').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0359').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0360').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0361').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0362').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0363').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0364').green()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0365').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0366').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0367').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0368').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0369').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0370').gold().bold(true)

      ])
    }
  })
  
    event.addAdvanced('kubejs:proofofwork', (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0371').yellow()
     ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0372').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0373').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0374').gray()
      ])
    } else {
	  	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0375').white()
      ])
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0376').green().bold(true),
        Text.translate('kubejs.script.client.scripts.tooltips.0377').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0378').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0379').white()
      ])
	    text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0380').blue().bold(true),
        Text.translate('kubejs.script.client.scripts.tooltips.0381').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0382').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0383').white()
      ])
	  	text.add(4, [
		Text.translate('kubejs.script.client.scripts.tooltips.0384').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0385').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0386').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0387').green()
      ])
    }
  })

	event.addAdvanced(['kubejs:coin_raid'], (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0388').aqua()
    ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0389').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0390').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0391').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0392').white(), 
		Text.translate('kubejs.script.client.scripts.tooltips.0393').darkRed()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0394').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0395').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0396').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0397').green()
      ])
	  	text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0398').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0399').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0400').white()
      ])
    }
  })

	event.addAdvanced(['kubejs:coin_aether', 'kubejs:coin_undergarden', 'kubejs:coin_twilight', 'kubejs:coin_bumblezone', 'kubejs:coin_icaria', 'kubejs:coin_end', 'kubejs:coin_nether'], (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0401').aqua()
    ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0402').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0403').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0404').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0405').white(), 
		Text.translate('kubejs.script.client.scripts.tooltips.0406').darkPurple(), 
		Text.translate('kubejs.script.client.scripts.tooltips.0407').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0408').aqua(),
        Text.translate('kubejs.script.client.scripts.tooltips.0409').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0410').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0411').green()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0412').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0413').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0414').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0415').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0416').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0417').gold().bold(true)
      ])
    }
  })
  
  	event.addAdvanced('kubejs:coin_task', (item, advanced, text) => {
	text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0418').blue()
    ])	
    if (!event.isShift()) {
      text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0419').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0420').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0421').gray()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0422').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0423').blue(),
		Text.translate('kubejs.script.client.scripts.tooltips.0424').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0425').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0426').white()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0427').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0428').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0429').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0430').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0431').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0432').gold().bold(true)

      ])
    }
  })
/////////////////////
  
    event.addAdvanced('naturescompass:naturescompass', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0433').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0434').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0435').gold()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0436').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0437').green().bold(true),
        Text.translate('kubejs.script.client.scripts.tooltips.0438').white()
      ])
    }
  })
  
      event.addAdvanced('l2hostility:hostility_orb', (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0439').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0440').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0441').gold()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0442').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0443').red(),
        Text.translate('kubejs.script.client.scripts.tooltips.0444').white()
      ])
	   text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0445').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0446').blue(),
        Text.translate('kubejs.script.client.scripts.tooltips.0447').white()
      ])
	    text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0448').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0449').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0450').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0451').red().bold(true),
		Text.translate('kubejs.script.client.scripts.tooltips.0452').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0453').red().bold(true)
      ])
    }
  })
  
    event.addAdvanced('#chalk:chalks', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0454').gray(),
          Text.translate('kubejs.script.client.scripts.tooltips.0455').yellow(),
          Text.translate('kubejs.script.client.scripts.tooltips.0456').gray()
        ])
      } else {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0457').white(),
          Text.translate('kubejs.script.client.scripts.tooltips.0458').green(),
          Text.translate('kubejs.script.client.scripts.tooltips.0459').white()
        ])
        text.add(2, [
          Text.translate('kubejs.script.client.scripts.tooltips.0460').white(),
          Text.translate('kubejs.script.client.scripts.tooltips.0461').green(),
          Text.translate('kubejs.script.client.scripts.tooltips.0462').white()
        ])
      }
    })
	
	event.addAdvanced('roughtweaks:plaster', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0463').gray(),
          Text.translate('kubejs.script.client.scripts.tooltips.0464').red(),
          Text.translate('kubejs.script.client.scripts.tooltips.0465').gray()
        ])
      } else {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0466').red(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0467').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0468').red().bold(true),
          Text.translate('kubejs.script.client.scripts.tooltips.0469').white(),
          Text.translate('kubejs.script.client.scripts.tooltips.0470').green(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0471').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0472').red()
        ])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0473').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0474').blue(),		
        Text.translate('kubejs.script.client.scripts.tooltips.0475').green(),
		Text.translate('kubejs.script.client.scripts.tooltips.0476').white()
        ])
      }
    })


    event.addAdvanced('eccentrictome:tome', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0477').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0478').green()
		])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0479').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0480').white()
		])
		text.add(3, [
        Text.translate('kubejs.script.client.scripts.tooltips.0481').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0482').white()
		])
		text.add(4, [
        Text.translate('kubejs.script.client.scripts.tooltips.0483').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0484').white()
		])
		text.add(5, [
        Text.translate('kubejs.script.client.scripts.tooltips.0485').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0486').white()
        ]) 
  })
  
    event.addAdvanced('bonfires:undead_bone_shard', (item, advanced, text) => {
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
        Text.translate('kubejs.script.client.scripts.tooltips.0497').blue(),		
        Text.translate('kubejs.script.client.scripts.tooltips.0498').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0499').darkPurple(),
		Text.translate('kubejs.script.client.scripts.tooltips.0500').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0501').yellow(),
		Text.translate('kubejs.script.client.scripts.tooltips.0502').white()
        ])
      }
    })

	event.addAdvanced('kubejs:book_old', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0503').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0504').gray()
      ])
	})

	event.addAdvanced('kubejs:lost_bag', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0505').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0506').gray()
      ])
	})
	
	event.addAdvanced('kubejs:unidentified_glyph_scroll', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0507').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0508').gray()
      ])
	})
	
	event.addAdvanced('kubejs:unidentified_glyph_scroll_2', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0509').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0510').gray()
      ])
	})
	
	event.addAdvanced('kubejs:unidentified_glyph_scroll_3', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0511').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0512').gray()
      ])
	})
	
    event.addAdvanced('bonfires:titanite_shard', (item, advanced, text) => {
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
        Text.translate('kubejs.script.client.scripts.tooltips.0523').darkPurple(),
        Text.translate('kubejs.script.client.scripts.tooltips.0524').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0525').darkRed()
        ])
      }
    })
	
    event.addAdvanced('bonfires:large_titanite_shard', (item, advanced, text) => {
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
        Text.translate('kubejs.script.client.scripts.tooltips.0536').aqua(),
        Text.translate('kubejs.script.client.scripts.tooltips.0537').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0538').darkRed()
        ])
      }
    })
	
    event.addAdvanced('bonfires:titanite_chunk', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0539').gray(),
          Text.translate('kubejs.script.client.scripts.tooltips.0540').red(),
          Text.translate('kubejs.script.client.scripts.tooltips.0541').gray()
        ])
      } else {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0542').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0543').green(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0544').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0545').darkRed(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0546').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0547').red()
        ])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0548').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0549').darkGreen(),
        Text.translate('kubejs.script.client.scripts.tooltips.0550').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0551').darkRed()
        ])
      }
    })
	
    event.addAdvanced('bonfires:titanite_slab', (item, advanced, text) => {
      if (!event.shift) {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0552').gray(),
          Text.translate('kubejs.script.client.scripts.tooltips.0553').red(),
          Text.translate('kubejs.script.client.scripts.tooltips.0554').gray()
        ])
      } else {
        text.add(1, [
          Text.translate('kubejs.script.client.scripts.tooltips.0555').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0556').green(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0557').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0558').darkRed(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0559').white(),
		  Text.translate('kubejs.script.client.scripts.tooltips.0560').red()
        ])
        text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0561').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0562').darkGray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0563').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0564').darkRed()
        ])
      }
    })

    event.addAdvanced('kubejs:gemcutters_pouch', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0565').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0566').gray()
      ])
	})

	
	event.addAdvanced('kubejs:ore_bag', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0567').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0568').gray()
      ])
	})

	event.addAdvanced('kubejs:mage_bag', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0569').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0570').gray()
      ])
	})
	
	event.addAdvanced('kubejs:reagent_box', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0571').gold().italic(true)
      ])
	  text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0572').gray()
      ])
	})

	event.addAdvanced('kubejs:book_ancient', (item, advanced, text) => {
		text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0573').gold().italic(true)
      ])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0574').gray()
      ]) 
	})
	
	event.addAdvanced('kubejs:canned_food', (item, advanced, text) => {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0575').gold().italic(true)
      ])
	})
	
	event.addAdvanced('kubejs:detonator', (item, advanced, text) => {
		text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0576').gold().italic(true)
      ])
		text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0577').gray().italic(true)
      ]) 
	})

	event.addAdvanced(['kubejs:quest_crate'], (item, advanced, text) => {
    if (!event.isShift()) {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0578').gray(),
        Text.translate('kubejs.script.client.scripts.tooltips.0579').gold(),
        Text.translate('kubejs.script.client.scripts.tooltips.0580').gray()
      ])
	    text.add(2, [
        Text.translate('kubejs.script.client.scripts.tooltips.0581').darkRed()
      ])
    } else {
      text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0582').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0583').darkRed(),
		Text.translate('kubejs.script.client.scripts.tooltips.0584').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0585').white()
		])
      text.add(2, [
	    Text.translate('kubejs.script.client.scripts.tooltips.0586').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0587').darkRed(),
        Text.translate('kubejs.script.client.scripts.tooltips.0588').white(),
		Text.translate('kubejs.script.client.scripts.tooltips.0589').gold(),
		Text.translate('kubejs.script.client.scripts.tooltips.0590').white()
        ])
     }
	})
  	event.addAdvanced('#rad3:decapitating', (item, advanced, text) => {
      text.add(1, [
		Text.translate('kubejs.script.client.scripts.tooltips.0591').white(),
        Text.of('25% ').yellow(),
        Text.translate('kubejs.script.client.scripts.tooltips.0593').white(),
        Text.translate('kubejs.script.client.scripts.tooltips.0594').red(),
		Text.translate('kubejs.script.client.scripts.tooltips.0595').white()
      ])
	})
	event.addAdvanced('sophisticatedstorage:chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0596')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0597'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0598'))
	})
	event.addAdvanced('sophisticatedstorage:copper_chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0599')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0600'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0601'))
	})
	event.addAdvanced('sophisticatedstorage:iron_chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0602')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0603'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0604'))
	})
	event.addAdvanced('sophisticatedstorage:gold_chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0605')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0606'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0607'))
	})
	event.addAdvanced('sophisticatedstorage:diamond_chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0608')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0609'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0610'))
	})
	event.addAdvanced('sophisticatedstorage:netherite_chest', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0611')) 
	text.add(2, Text.translate('kubejs.script.client.scripts.tooltips.0612'))
    text.add(3, Text.translate('kubejs.script.client.scripts.tooltips.0613'))
	})


    // drop info
	event.addAdvanced('cataclysm:amethyst_crab_meat', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0614').gray()) 
	})
	event.addAdvanced('cataclysm:amethyst_crab_shell', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0615').gray()) 
	})
	event.addAdvanced('hmag:ancient_stone', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0616').gray()) 
	})
	event.addAdvanced('hmag:kobold_leather', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0617').gray()) 
	})
	event.addAdvanced('hmag:ogre_horn', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0618').gray()) 
	})
	event.addAdvanced('hmag:lich_cloth', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0619').gray()) 
	})
	event.addAdvanced('hmag:necrofiber', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0620').gray()) 
	})
	event.addAdvanced('hmag:ender_plasm', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0621').gray()) 
	})
	event.addAdvanced('hmag:crimson_cuticula', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0622').gray()) 
	})
	event.addAdvanced('hmag:dyssomnia_skin', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0623').gray()) 
	})
	event.addAdvanced('hmag:mysterious_petal', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0624').gray()) 
	})
	event.addAdvanced('hmag:sharp_fang', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0625').gray()) 
	})
	event.addAdvanced('hmag:burning_core', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0626').gray()) 
	})
	event.addAdvanced('hmag:cubic_nucleus', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0627').gray()) 
	})
	event.addAdvanced('hmag:evil_crystal_fragment', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0628').gray()) 
	})
	event.addAdvanced('hmag:lightning_particle', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0629').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:ancient_anima', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0630').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:blazing_eye', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0631').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:obsidian_heart', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0632').gray()) 
	})
	event.addAdvanced('bosses_of_mass_destruction:void_thorn', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0633').gray()) 
	})
	event.addAdvanced('aether_redux:sentry_chip', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0634').gray())
	})
	// item info
	event.addAdvanced('hmag:insomnia_fruit', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0635').gray()) 
	})
	event.addAdvanced('hmag:insomnia_sword', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0636').gray()) 
	})
	event.addAdvanced('hmag:nemesis_blade', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0637').gray()) 
	})
	event.addAdvanced('hmag:crimson_bow', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0638').gray()) 
	})
	event.addAdvanced('hmag:fortress_shield', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0639').gray()) 
	})
	event.addAdvanced('hmag:bat_stew', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0640').gray()) 
	})
	event.addAdvanced('#hmag:reinforced_blocks', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0641').gray()) 
	})
	event.addAdvanced('darkerdepths:void_soul_jar', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0642').gray()) 
	})
	event.addAdvanced('minecraft:reinforced_deepslate', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0643').gray()) 
	})
	event.addAdvanced('minecraft:brewing_stand', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0644').gray()) 
	})
	event.addAdvanced('ancient_aether:valkyrum_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0645').gray()) 
	})
	event.addAdvanced('landsoficaria:yellowstone', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0646').gray()) 
	})
	event.addAdvanced('landsoficaria:lignite_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0647').gray()) 
	})
	event.addAdvanced('landsoficaria:chalkos_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0648').gray()) 
	})
	event.addAdvanced('landsoficaria:silkstone', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0649').gray()) 
	})
	event.addAdvanced('landsoficaria:kassiteros_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0650').gray()) 
	})
	event.addAdvanced('landsoficaria:dolomite_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0651').gray()) 
	})
	event.addAdvanced('landsoficaria:sunstone', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0652').gray()) 
	})
	event.addAdvanced('landsoficaria:vanadium_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0653').gray()) 
	})
	event.addAdvanced('landsoficaria:sliver_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0654').gray()) 
	})
	event.addAdvanced('landsoficaria:voidshale', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0655').gray()) 
	})
	event.addAdvanced('landsoficaria:sideros_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0656').gray()) 
	})
	event.addAdvanced('landsoficaria:anthracite_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0657').gray()) 
	})
	event.addAdvanced('landsoficaria:baetyl', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0658').gray()) 
	})
	event.addAdvanced('landsoficaria:molybdenum_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0659').gray()) 
	})
	event.addAdvanced('landsoficaria:hyliastrum_ore', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0660').gray()) 
	})
	event.addAdvanced('pandorasbox:pandoras_box', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0661').red()) 
	})
	event.addAdvanced('kubejs:great_soul', (item, advanced, text) => {
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0662').darkRed().italic(true)])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0663').darkPurple()])
	})
	
	event.addAdvanced('ars_nouveau:mob_jar', (item, advanced, text) => {
    text.add(1, Text.translate('kubejs.script.client.scripts.tooltips.0664').red()) 
	})
	

	//Gear Upgrades
	event.addAdvanced('kubejs:upgrade_swift', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0665').white(),Text.translate('kubejs.script.client.scripts.tooltips.0666').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0667').white(),Text.translate('kubejs.script.client.scripts.tooltips.0668').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0669').white(),Text.translate('kubejs.script.client.scripts.tooltips.0670').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0671').white(),Text.translate('kubejs.script.client.scripts.tooltips.0672').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0673').white(),Text.translate('kubejs.script.client.scripts.tooltips.0674').green(),Text.translate('kubejs.script.client.scripts.tooltips.0675').white(),Text.translate('kubejs.script.client.scripts.tooltips.0676').white(),Text.translate('kubejs.script.client.scripts.tooltips.0677').blue()])}	
	})
	
	event.addAdvanced('kubejs:upgrade_swift2', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0678').white(),Text.translate('kubejs.script.client.scripts.tooltips.0679').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0680').white(),Text.translate('kubejs.script.client.scripts.tooltips.0681').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0682').white(),Text.translate('kubejs.script.client.scripts.tooltips.0683').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0684').white(),Text.translate('kubejs.script.client.scripts.tooltips.0685').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0686').white(),Text.translate('kubejs.script.client.scripts.tooltips.0687').green(),Text.translate('kubejs.script.client.scripts.tooltips.0688').white(),Text.translate('kubejs.script.client.scripts.tooltips.0689').white(),Text.translate('kubejs.script.client.scripts.tooltips.0690').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_swift3', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0691').white(),Text.translate('kubejs.script.client.scripts.tooltips.0692').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0693').white(),Text.translate('kubejs.script.client.scripts.tooltips.0694').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0695').white(),Text.translate('kubejs.script.client.scripts.tooltips.0696').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0697').white(),Text.translate('kubejs.script.client.scripts.tooltips.0698').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0699').white(),Text.translate('kubejs.script.client.scripts.tooltips.0700').green(),Text.translate('kubejs.script.client.scripts.tooltips.0701').white(),Text.translate('kubejs.script.client.scripts.tooltips.0702').white(),Text.translate('kubejs.script.client.scripts.tooltips.0703').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sharp', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0704').white(),Text.translate('kubejs.script.client.scripts.tooltips.0705').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0706').white(),Text.translate('kubejs.script.client.scripts.tooltips.0707').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0708').white(),Text.translate('kubejs.script.client.scripts.tooltips.0709').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0710').white(),Text.translate('kubejs.script.client.scripts.tooltips.0711').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0712').white(),Text.translate('kubejs.script.client.scripts.tooltips.0713').green(),Text.translate('kubejs.script.client.scripts.tooltips.0714').white(),Text.translate('kubejs.script.client.scripts.tooltips.0715').white(),Text.translate('kubejs.script.client.scripts.tooltips.0716').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sharp2', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0717').white(),Text.translate('kubejs.script.client.scripts.tooltips.0718').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0719').white(),Text.translate('kubejs.script.client.scripts.tooltips.0720').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0721').white(),Text.translate('kubejs.script.client.scripts.tooltips.0722').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0723').white(),Text.translate('kubejs.script.client.scripts.tooltips.0724').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0725').white(),Text.translate('kubejs.script.client.scripts.tooltips.0726').green(),Text.translate('kubejs.script.client.scripts.tooltips.0727').white(),Text.translate('kubejs.script.client.scripts.tooltips.0728').white(),Text.translate('kubejs.script.client.scripts.tooltips.0729').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sharp3', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0730').white(),Text.translate('kubejs.script.client.scripts.tooltips.0731').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0732').white(),Text.translate('kubejs.script.client.scripts.tooltips.0733').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0734').white(),Text.translate('kubejs.script.client.scripts.tooltips.0735').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0736').white(),Text.translate('kubejs.script.client.scripts.tooltips.0737').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0738').white(),Text.translate('kubejs.script.client.scripts.tooltips.0739').green(),Text.translate('kubejs.script.client.scripts.tooltips.0740').white(),Text.translate('kubejs.script.client.scripts.tooltips.0741').white(),Text.translate('kubejs.script.client.scripts.tooltips.0742').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_force', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0743').white(),Text.translate('kubejs.script.client.scripts.tooltips.0744').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0745').white(),Text.translate('kubejs.script.client.scripts.tooltips.0746').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0747').white(),Text.translate('kubejs.script.client.scripts.tooltips.0748').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0749').white(),Text.translate('kubejs.script.client.scripts.tooltips.0750').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0751').white(),Text.translate('kubejs.script.client.scripts.tooltips.0752').green(),Text.translate('kubejs.script.client.scripts.tooltips.0753').white(),Text.translate('kubejs.script.client.scripts.tooltips.0754').white(),Text.translate('kubejs.script.client.scripts.tooltips.0755').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_prof', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0756').white(),Text.translate('kubejs.script.client.scripts.tooltips.0757').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0758').white(),Text.translate('kubejs.script.client.scripts.tooltips.0759').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0760').white(),Text.translate('kubejs.script.client.scripts.tooltips.0761').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0762').white(),Text.translate('kubejs.script.client.scripts.tooltips.0763').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0764').white(),Text.translate('kubejs.script.client.scripts.tooltips.0765').green(),Text.translate('kubejs.script.client.scripts.tooltips.0766').white(),Text.translate('kubejs.script.client.scripts.tooltips.0767').white(),Text.translate('kubejs.script.client.scripts.tooltips.0768').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_heart', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0769').white(),Text.translate('kubejs.script.client.scripts.tooltips.0770').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0771').white(),Text.translate('kubejs.script.client.scripts.tooltips.0772').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0773').white(),Text.translate('kubejs.script.client.scripts.tooltips.0774').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0775').white(),Text.translate('kubejs.script.client.scripts.tooltips.0776').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0777').white(),Text.translate('kubejs.script.client.scripts.tooltips.0778').green(),Text.translate('kubejs.script.client.scripts.tooltips.0779').white(),Text.translate('kubejs.script.client.scripts.tooltips.0780').white(),Text.translate('kubejs.script.client.scripts.tooltips.0781').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_gilded', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0782').white(),Text.translate('kubejs.script.client.scripts.tooltips.0783').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0784').white(),Text.translate('kubejs.script.client.scripts.tooltips.0785').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0786').white(),Text.translate('kubejs.script.client.scripts.tooltips.0787').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0788').white(),Text.translate('kubejs.script.client.scripts.tooltips.0789').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0790').white(),Text.translate('kubejs.script.client.scripts.tooltips.0791').green(),Text.translate('kubejs.script.client.scripts.tooltips.0792').white(),Text.translate('kubejs.script.client.scripts.tooltips.0793').white(),Text.translate('kubejs.script.client.scripts.tooltips.0794').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_guarding', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0795').white(),Text.translate('kubejs.script.client.scripts.tooltips.0796').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0797').white(),Text.translate('kubejs.script.client.scripts.tooltips.0798').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0799').white(),Text.translate('kubejs.script.client.scripts.tooltips.0800').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0801').white(),Text.translate('kubejs.script.client.scripts.tooltips.0802').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0803').white(),Text.translate('kubejs.script.client.scripts.tooltips.0804').green(),Text.translate('kubejs.script.client.scripts.tooltips.0805').white(),Text.translate('kubejs.script.client.scripts.tooltips.0806').white(),Text.translate('kubejs.script.client.scripts.tooltips.0807').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_sniping', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0808').white(),Text.translate('kubejs.script.client.scripts.tooltips.0809').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0810').white(),Text.translate('kubejs.script.client.scripts.tooltips.0811').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0812').white(),Text.translate('kubejs.script.client.scripts.tooltips.0813').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0814').white(),Text.translate('kubejs.script.client.scripts.tooltips.0815').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0816').white(),Text.translate('kubejs.script.client.scripts.tooltips.0817').green(),Text.translate('kubejs.script.client.scripts.tooltips.0818').white(),Text.translate('kubejs.script.client.scripts.tooltips.0819').white(),Text.translate('kubejs.script.client.scripts.tooltips.0820').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_quick', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0821').white(),Text.translate('kubejs.script.client.scripts.tooltips.0822').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0823').white(),Text.translate('kubejs.script.client.scripts.tooltips.0824').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0825').white(),Text.translate('kubejs.script.client.scripts.tooltips.0826').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0827').white(),Text.translate('kubejs.script.client.scripts.tooltips.0828').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0829').white(),Text.translate('kubejs.script.client.scripts.tooltips.0830').green(),Text.translate('kubejs.script.client.scripts.tooltips.0831').white(),Text.translate('kubejs.script.client.scripts.tooltips.0832').white(),Text.translate('kubejs.script.client.scripts.tooltips.0833').blue()])}	
	})	
	
	event.addAdvanced('kubejs:upgrade_reach', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0834').white(),Text.translate('kubejs.script.client.scripts.tooltips.0835').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0836').white(),Text.translate('kubejs.script.client.scripts.tooltips.0837').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0838').white(),Text.translate('kubejs.script.client.scripts.tooltips.0839').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0840').white(),Text.translate('kubejs.script.client.scripts.tooltips.0841').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0842').white(),Text.translate('kubejs.script.client.scripts.tooltips.0843').green(),Text.translate('kubejs.script.client.scripts.tooltips.0844').white(),Text.translate('kubejs.script.client.scripts.tooltips.0845').white(),Text.translate('kubejs.script.client.scripts.tooltips.0846').blue()])}	
	})

	event.addAdvanced('kubejs:upgrade_quickfeet', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0847').white(),Text.translate('kubejs.script.client.scripts.tooltips.0848').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0849').white(),Text.translate('kubejs.script.client.scripts.tooltips.0850').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0851').white(),Text.translate('kubejs.script.client.scripts.tooltips.0852').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0853').white(),Text.translate('kubejs.script.client.scripts.tooltips.0854').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0855').white(),Text.translate('kubejs.script.client.scripts.tooltips.0856').green(),Text.translate('kubejs.script.client.scripts.tooltips.0857').white(),Text.translate('kubejs.script.client.scripts.tooltips.0858').white(),Text.translate('kubejs.script.client.scripts.tooltips.0859').blue()])}	
	})	

	event.addAdvanced('kubejs:upgrade_lifesteal', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0860').white(),Text.translate('kubejs.script.client.scripts.tooltips.0861').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0862').white(),Text.translate('kubejs.script.client.scripts.tooltips.0863').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0864').white(),Text.translate('kubejs.script.client.scripts.tooltips.0865').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0866').white(),Text.translate('kubejs.script.client.scripts.tooltips.0867').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0868').white(),Text.translate('kubejs.script.client.scripts.tooltips.0869').green(),Text.translate('kubejs.script.client.scripts.tooltips.0870').white(),Text.translate('kubejs.script.client.scripts.tooltips.0871').white(),Text.translate('kubejs.script.client.scripts.tooltips.0872').blue()])}	
	})	

	event.addAdvanced('kubejs:upgrade_fortress', (item, advanced, text) => {
	if (!event.isShift()) {	
      text.add(1, [Text.translate('kubejs.script.client.scripts.tooltips.0873').white(),Text.translate('kubejs.script.client.scripts.tooltips.0874').blue()])
	  text.add(2, [Text.translate('kubejs.script.client.scripts.tooltips.0875').white(),Text.translate('kubejs.script.client.scripts.tooltips.0876').darkGreen()])
	  text.add(3, [Text.translate('kubejs.script.client.scripts.tooltips.0877').white(),Text.translate('kubejs.script.client.scripts.tooltips.0878').darkRed()])
	} else {text.add(1, [
        Text.translate('kubejs.script.client.scripts.tooltips.0879').white(),Text.translate('kubejs.script.client.scripts.tooltips.0880').darkGreen(),Text.translate('kubejs.script.client.scripts.tooltips.0881').white(),Text.translate('kubejs.script.client.scripts.tooltips.0882').green(),Text.translate('kubejs.script.client.scripts.tooltips.0883').white(),Text.translate('kubejs.script.client.scripts.tooltips.0884').white(),Text.translate('kubejs.script.client.scripts.tooltips.0885').blue()])}	
	})		
	
	event.addAdvanced('kubejs:mending', (item, advanced, text) => {
		// line indices 1-13: The Tragic Tale (Italicized Gray Lore)
		text.add(1, Text.translate("kubejs.script.client.scripts.tooltips.0886").gray().italic())
		text.add(2, Text.translate("kubejs.script.client.scripts.tooltips.0887").gray().italic())
		text.add(3, Text.translate("kubejs.script.client.scripts.tooltips.0888").gray().italic())
		text.add(4, Text.translate("kubejs.script.client.scripts.tooltips.0889").gray().italic())
		text.add(5, Text.translate("kubejs.script.client.scripts.tooltips.0890").gray().italic())
		text.add(6, Text.translate("kubejs.script.client.scripts.tooltips.0891").gray().italic())
		text.add(7, Text.translate("kubejs.script.client.scripts.tooltips.0892").gray().italic())
		text.add(8, Text.translate("kubejs.script.client.scripts.tooltips.0893").gray().italic())
		text.add(9, Text.translate("kubejs.script.client.scripts.tooltips.0894").gray().italic())
		text.add(10, Text.translate("kubejs.script.client.scripts.tooltips.0895").gray().italic())
		text.add(11, Text.translate("kubejs.script.client.scripts.tooltips.0896").gray().italic())
		text.add(12, Text.translate("kubejs.script.client.scripts.tooltips.0897").gray().italic())
		text.add(13, Text.translate("kubejs.script.client.scripts.tooltips.0898").gray().italic())
		text.add(14, Text.translate("kubejs.script.client.scripts.tooltips.0899").gray().italic())
		text.add(15, Text.translate("kubejs.script.client.scripts.tooltips.0900").gray().italic())
		text.add(16, Text.translate("kubejs.script.client.scripts.tooltips.0901").gray().italic())
		text.add(17, Text.translate("kubejs.script.client.scripts.tooltips.0902").gray().italic())
		text.add(18, Text.translate("kubejs.script.client.scripts.tooltips.0903").gray().italic())
		text.add(19, Text.translate("kubejs.script.client.scripts.tooltips.0904").gray().italic())
		text.add(20, Text.translate("kubejs.script.client.scripts.tooltips.0905").gray().italic())
	})
	

// THE END	
})
ClientEvents.lang('en_us', event => {
  event.renameItem('graveyard:upper_bone_staff', 'Skull of the Wizard King')
  event.renameItem('graveyard:middle_bone_staff', 'Ribs of the Warrior King')
  event.renameItem('graveyard:lower_bone_staff', 'Tail of the Beast King')

})
