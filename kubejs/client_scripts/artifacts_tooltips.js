ItemEvents.tooltip(event => {
    // 1. Original Living Branch
    event.addAdvanced('kubejs:living_branch', (item, advanced, text) => {
		text.add(1, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0001').green().italic())
        if (!event.isShift()) {
            text.add(2, [Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0002').gray(), Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0003').gold(), Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0004').gray()])
        } else {
            text.add(2, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0005'))
            text.add(3, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0006').white())
            text.add(4, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0007').white())
        }
    })

    // 2. Branch of Bridging
    event.addAdvanced('kubejs:living_branch_bridging', (item, advanced, text) => {
        text.add(1, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0008').gray().italic())
        if (!event.isShift()) {
            text.add(2, [Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0009').gray(), Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0010').gold(), Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0011').gray()])
        } else {
            text.add(2, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0012'))
            text.add(3, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0013').white())
            text.add(4, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0014').white())
            text.add(5, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0015').white())
        }
    })

    // 3. Buzzing Branch
    event.addAdvanced('kubejs:buzzing_living_branch', (item, advanced, text) => {
        text.add(1, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0016').gray().italic())
        if (!event.isShift()) {
            text.add(2, [Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0017').gray(), Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0018').gold(), Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0019').gray()])
        } else {
            text.add(2, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0020'))
            text.add(3, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0021').white())
            text.add(4, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0022').white())
            text.add(5, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0023').white())
            text.add(6, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0024').white())
        }
    })
	
	event.addAdvanced('kubejs:gamble_coin', (item, advanced, text) => {
				
			text.add(1, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0025').white()),
			text.add(2, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0026').white()),
			text.add(3, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0027').white()),
			text.add(4, Text.of('').white()),
			text.add(5, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0029').white()),
			text.add(6, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0030').white())
	})
	
	
	event.addAdvanced('lrdynamicdungeon:dungeon_pass', (item, advanced, text) => {
			text.add(Text.of(''));
			text.add(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0032'));
			text.add(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0033'));
			text.add(Text.of(''));
			text.add(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0035'));
			text.add(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0036'));
    });
	
	event.addAdvanced('kubejs:entropic_cent', (item, advanced, text) => {
        text.add(1, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0037').yellow().italic())
        if (!event.isShift()) {
            text.add(2, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0038').gold())
        } else {
            text.add(2, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0039').white())
            text.add(3, Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0040').gray())
        }
    })
	
		const tooltipData = [
        {
            id: 'kubejs:rusty_key',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0004',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0005',
                'kubejs.script.client.scripts.artifacts.tooltips.0006'
            ]
        },
        {
            id: 'kubejs:unstable_battery',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0007',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0008',
                'kubejs.script.client.scripts.artifacts.tooltips.0009',
                'kubejs.script.client.scripts.artifacts.tooltips.0010'
            ]
        },
        {
            id: 'kubejs:emergency_flare',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0011',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0012',
                'kubejs.script.client.scripts.artifacts.tooltips.0013',
                'kubejs.script.client.scripts.artifacts.tooltips.0014'
            ]
        },
        {
            id: 'kubejs:bee_jar',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0015',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0016',
                'kubejs.script.client.scripts.artifacts.tooltips.0017',
                'kubejs.script.client.scripts.artifacts.tooltips.0018'
            ]
        },
        {
            id: 'kubejs:data_slate',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0019',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0020',
                'kubejs.script.client.scripts.artifacts.tooltips.0021',
                'kubejs.script.client.scripts.artifacts.tooltips.0022'
            ]
        },
		{
            id: 'kubejs:sentry_remote',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0023',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0024',
                'kubejs.script.client.scripts.artifacts.tooltips.0025',
                'kubejs.script.client.scripts.artifacts.tooltips.0026'
            ]
        },
        {
            id: 'kubejs:bioscan_syringe',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0027',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0028',
                'kubejs.script.client.scripts.artifacts.tooltips.0029',
                'kubejs.script.client.scripts.artifacts.tooltips.0030'
            ]
        },
        {
            id: 'kubejs:magnetic_grapple',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0031',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0032',
                'kubejs.script.client.scripts.artifacts.tooltips.0033',
                'kubejs.script.client.scripts.artifacts.tooltips.0034'
            ]
        },
        {
            id: 'kubejs:thermal_paste',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0035',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0036',
                'kubejs.script.client.scripts.artifacts.tooltips.0037',
                'kubejs.script.client.scripts.artifacts.tooltips.0038'
            ]
        },
        {
            id: 'kubejs:echo_locator',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0039',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0040',
                'kubejs.script.client.scripts.artifacts.tooltips.0041'
            ]
        },
        {
            id: 'kubejs:kinetic_dampener',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0042',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0043',
                'kubejs.script.client.scripts.artifacts.tooltips.0044',
                'kubejs.script.client.scripts.artifacts.tooltips.0045'
            ]
        },
        {
            id: 'kubejs:scavenger_magnet',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0046',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0047',
                'kubejs.script.client.scripts.artifacts.tooltips.0048',
                'kubejs.script.client.scripts.artifacts.tooltips.0049'
            ]
        },
        {
            id: 'kubejs:translocation_coil',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0050",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0051',
                'kubejs.script.client.scripts.artifacts.tooltips.0052',
                'kubejs.script.client.scripts.artifacts.tooltips.0053'
            ]
        },
		{
            id: 'kubejs:berserk_draught',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0054",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0055',
                'kubejs.script.client.scripts.artifacts.tooltips.0056'
            ]
        },
		{
            id: 'kubejs:bottled_ice',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0057",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0058',
                'kubejs.script.client.scripts.artifacts.tooltips.0059'
            ]
        },
		{
            id: 'kubejs:dungeon_recall',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0060",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0061',
                'kubejs.script.client.scripts.artifacts.tooltips.0062',
                'kubejs.script.client.scripts.artifacts.tooltips.0063'
            ]
        },
		{
            id: 'kubejs:ice_shard',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0064",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0065',
                'kubejs.script.client.scripts.artifacts.tooltips.0066',
                'kubejs.script.client.scripts.artifacts.tooltips.0067',
                'kubejs.script.client.scripts.artifacts.tooltips.0068',
                'kubejs.script.client.scripts.artifacts.tooltips.0069'
            ]
        },
		{
            id: 'kubejs:kill_multiplier',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0070",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0071',
                'kubejs.script.client.scripts.artifacts.tooltips.0072',
                'kubejs.script.client.scripts.artifacts.tooltips.0073',
                'kubejs.script.client.scripts.artifacts.tooltips.0074',
                'kubejs.script.client.scripts.artifacts.tooltips.0075'
            ]
        },
		{
			id: 'kubejs:void_core',
			lore: "kubejs.script.client.scripts.artifacts.tooltips.0076",
			mechanics: [
				'kubejs.script.client.scripts.artifacts.tooltips.0077',
				'kubejs.script.client.scripts.artifacts.tooltips.0078',
				'kubejs.script.client.scripts.artifacts.tooltips.0079',
				'kubejs.script.client.scripts.artifacts.tooltips.0080',
				'kubejs.script.client.scripts.artifacts.tooltips.0081',
				'kubejs.script.client.scripts.artifacts.tooltips.0082'
			]
		}
    ];

    tooltipData.forEach(item => {
        event.addAdvanced(item.id, (stack, advanced, text) => {
            // Line 0 is the Item Name. Line 1 is our Italicized Lore.
            text.add(1, Text.translate(item.lore).italic().gray());

            if (!event.shift) {
                text.add(2, Text.translate("kubejs.script.client.scripts.artifacts.tooltips.0120").yellow());
            } else {
                item.mechanics.forEach((m, index) => {
                    // Start adding from line 3 onwards
                    text.add(2 + index, Text.translate(m).white());
                });
            }
        });
    });
	
	const dice = [
        { id: 'kubejs:d6', lore: 'kubejs.script.client.scripts.artifacts.tooltips.0083', faces: 6 },
        { id: 'kubejs:d10', lore: 'kubejs.script.client.scripts.artifacts.tooltips.0084', faces: 10 },
        { id: 'kubejs:d12', lore: 'kubejs.script.client.scripts.artifacts.tooltips.0085', faces: 12 },
        { id: 'kubejs:d20', lore: 'kubejs.script.client.scripts.artifacts.tooltips.0086', faces: 20 }
    ]

    dice.forEach(die => {
        event.addAdvanced(die.id, (item, advanced, text) => {
            text.add(1, Text.translate(die.lore).gray().italic())
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