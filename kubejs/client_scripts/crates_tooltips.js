ItemEvents.tooltip(event => {
    // --- 1. ANCIENT LOOT CRATE ---
	event.addAdvanced('kubejs:ancient_crate', (item, advanced, text) => {
        text.add(1, Text.translate('kubejs.script.client.scripts.crates.tooltips.0001').gray().italic())

        if (!event.isShift()) {
            text.add(2, [Text.translate('kubejs.script.client.scripts.crates.tooltips.0002').gray(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0003').gold(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0004').gray()])
        } else {
            text.add(2, Text.translate('kubejs.script.client.scripts.crates.tooltips.0005'))
            text.add(3, Text.translate('kubejs.script.client.scripts.crates.tooltips.0006').white())
            text.add(4, Text.translate('kubejs.script.client.scripts.crates.tooltips.0007').white())
            
            text.add(5, Text.translate('kubejs.script.client.scripts.crates.tooltips.0008'))
            text.add(6, Text.translate('kubejs.script.client.scripts.crates.tooltips.0009').white())
            text.add(7, Text.translate('kubejs.script.client.scripts.crates.tooltips.0010').white())
         
            text.add(8, [Text.translate('kubejs.script.client.scripts.crates.tooltips.0011')])
        }
    })

    // --- 2. RITUAL CRATE ---
    event.addAdvanced('kubejs:ritual_crate', (item, advanced, text) => {
        if (!event.isShift()) {
            text.add(1, [Text.translate('kubejs.script.client.scripts.crates.tooltips.0012').gray(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0013').gold(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0014').gray()])
        } else {
            text.add(1, Text.translate('kubejs.script.client.scripts.crates.tooltips.0015').white())
            text.add(2, Text.translate('kubejs.script.client.scripts.crates.tooltips.0016').aqua())
            text.add(3, Text.translate('kubejs.script.client.scripts.crates.tooltips.0017').darkGray())
        }
    })

    // --- 3. CHAOS CRATE ---
    event.addAdvanced('kubejs:chaos_crate', (item, advanced, text) => {
        if (!event.isShift()) {
            text.add(1, [Text.translate('kubejs.script.client.scripts.crates.tooltips.0018').gray(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0019').gold(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0020').gray()])
        } else {
            text.add(1, Text.translate('kubejs.script.client.scripts.crates.tooltips.0021').white())
            text.add(2, Text.translate('kubejs.script.client.scripts.crates.tooltips.0022').red())
            text.add(3, Text.translate('kubejs.script.client.scripts.crates.tooltips.0023').gold())
        }
    })

    // --- 4. WISHING WELL ---
    event.addAdvanced('kubejs:wishing_crate', (item, advanced, text) => {
        if (!event.isShift()) {
            text.add(1, [Text.translate('kubejs.script.client.scripts.crates.tooltips.0024').gray(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0025').gold(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0026').gray()])
        } else {
            text.add(1, Text.translate('kubejs.script.client.scripts.crates.tooltips.0027').white())
            text.add(2, Text.translate('kubejs.script.client.scripts.crates.tooltips.0028').gold())
        }
    })

	event.addAdvanced('kubejs:botanical_crate', (item, advanced, text) => {
        let stage = (item.nbt && item.nbt.growthStage) ? item.nbt.growthStage : 0;
        
        text.add(1, Text.translate('kubejs.script.client.scripts.crates.tooltips.0029').darkGreen().italic())
        
        if (event.isShift()) {
            text.add(2, Text.translate('kubejs.script.client.scripts.crates.tooltips.0030'))
            text.add(3, Text.translate('kubejs.script.client.scripts.crates.tooltips.0031').white())
            text.add(4, Text.translate('kubejs.script.client.scripts.crates.tooltips.0032').white())
            text.add(5, Text.translate("kubejs.script.client.scripts.crates.tooltips.0033", stage).yellow())
        } else {
            text.add(2, [Text.translate('kubejs.script.client.scripts.crates.tooltips.0034').gray(), Text.translate("kubejs.script.client.scripts.crates.tooltips.0035", stage).green()])
            text.add(3, [Text.translate('kubejs.script.client.scripts.crates.tooltips.0036').gray(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0037').gold()])
        }
    })

    // --- 5. SUPPORT ITEMS (Keys & Hearts) ---
	event.addAdvanced('kubejs:skeleton_key', (item, advanced, text) => {
			text.add(1, Text.translate('kubejs.script.client.scripts.crates.tooltips.0038').gray().italic())

			if (!event.isShift()) {
				text.add(2, [Text.translate('kubejs.script.client.scripts.crates.tooltips.0039').gray(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0040').gold(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0041').gray()])
			} else {
				text.add(2, Text.translate('kubejs.script.client.scripts.crates.tooltips.0042'))
				text.add(3, Text.translate('kubejs.script.client.scripts.crates.tooltips.0043').white())
				text.add(4, Text.translate('kubejs.script.client.scripts.crates.tooltips.0044').gray())
			}
	})

	event.addAdvanced('kubejs:echo_crate', (item, advanced, text) => {
        text.add(1, Text.translate('kubejs.script.client.scripts.crates.tooltips.0045').gray().italic())
        if (event.isShift()) {
            text.add(2, Text.translate('kubejs.script.client.scripts.crates.tooltips.0046'))
            text.add(3, Text.translate('kubejs.script.client.scripts.crates.tooltips.0047').white())
            text.add(4, Text.translate('kubejs.script.client.scripts.crates.tooltips.0048').white())
            text.add(5, Text.translate('kubejs.script.client.scripts.crates.tooltips.0049').darkPurple())
        } else {
            text.add(2, [Text.translate('kubejs.script.client.scripts.crates.tooltips.0050').gray(), Text.translate('kubejs.script.client.scripts.crates.tooltips.0051').gold()])
        }
    })

    event.addAdvanced('kubejs:mimic_heart', (item, advanced, text) => {
        if (event.isShift()) {
            text.add(1, Text.translate('kubejs.script.client.scripts.crates.tooltips.0052').darkRed())
            text.add(2, Text.translate('kubejs.script.client.scripts.crates.tooltips.0053').white())
        }
    })

	event.addAdvanced('kubejs:quest_crate', (item, advanced, text) => {
			text.add(Text.translate('kubejs.script.client.scripts.crates.tooltips.0054').white());
			text.add(Text.of(''));
			text.add(Text.translate('kubejs.script.client.scripts.crates.tooltips.0056').white());
			text.add(Text.translate('kubejs.script.client.scripts.crates.tooltips.0057').white());
			text.add(Text.translate('kubejs.script.client.scripts.crates.tooltips.0058').white());
			text.add(Text.of(''));
			text.add(Text.translate('kubejs.script.client.scripts.crates.tooltips.0060').white());
			text.add(Text.translate('kubejs.script.client.scripts.crates.tooltips.0061').darkRed());
    });

	
})	