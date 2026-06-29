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
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0041',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0042',
                'kubejs.script.client.scripts.artifacts.tooltips.0043'
            ]
        },
        {
            id: 'kubejs:unstable_battery',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0044',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0045',
                'kubejs.script.client.scripts.artifacts.tooltips.0046',
                'kubejs.script.client.scripts.artifacts.tooltips.0047'
            ]
        },
        {
            id: 'kubejs:emergency_flare',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0048',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0049',
                'kubejs.script.client.scripts.artifacts.tooltips.0050',
                'kubejs.script.client.scripts.artifacts.tooltips.0051'
            ]
        },
        {
            id: 'kubejs:bee_jar',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0052',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0053',
                'kubejs.script.client.scripts.artifacts.tooltips.0054',
                'kubejs.script.client.scripts.artifacts.tooltips.0055'
            ]
        },
        {
            id: 'kubejs:data_slate',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0056',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0057',
                'kubejs.script.client.scripts.artifacts.tooltips.0058',
                'kubejs.script.client.scripts.artifacts.tooltips.0059'
            ]
        },
		{
            id: 'kubejs:sentry_remote',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0060',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0061',
                'kubejs.script.client.scripts.artifacts.tooltips.0062',
                'kubejs.script.client.scripts.artifacts.tooltips.0063'
            ]
        },
        {
            id: 'kubejs:bioscan_syringe',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0064',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0065',
                'kubejs.script.client.scripts.artifacts.tooltips.0066',
                'kubejs.script.client.scripts.artifacts.tooltips.0067'
            ]
        },
        {
            id: 'kubejs:magnetic_grapple',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0068',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0069',
                'kubejs.script.client.scripts.artifacts.tooltips.0070',
                'kubejs.script.client.scripts.artifacts.tooltips.0071'
            ]
        },
        {
            id: 'kubejs:thermal_paste',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0072',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0073',
                'kubejs.script.client.scripts.artifacts.tooltips.0074',
                'kubejs.script.client.scripts.artifacts.tooltips.0075'
            ]
        },
        {
            id: 'kubejs:echo_locator',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0076',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0077',
                'kubejs.script.client.scripts.artifacts.tooltips.0078'
            ]
        },
        {
            id: 'kubejs:kinetic_dampener',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0079',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0080',
                'kubejs.script.client.scripts.artifacts.tooltips.0081',
                'kubejs.script.client.scripts.artifacts.tooltips.0082'
            ]
        },
        {
            id: 'kubejs:scavenger_magnet',
            lore: 'kubejs.script.client.scripts.artifacts.tooltips.0083',
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0084',
                'kubejs.script.client.scripts.artifacts.tooltips.0085',
                'kubejs.script.client.scripts.artifacts.tooltips.0086'
            ]
        },
        {
            id: 'kubejs:translocation_coil',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0087",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0088',
                'kubejs.script.client.scripts.artifacts.tooltips.0089',
                'kubejs.script.client.scripts.artifacts.tooltips.0090'
            ]
        },
		{
            id: 'kubejs:berserk_draught',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0091",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0092',
                'kubejs.script.client.scripts.artifacts.tooltips.0093'
            ]
        },
		{
            id: 'kubejs:bottled_ice',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0094",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0095',
                'kubejs.script.client.scripts.artifacts.tooltips.0096'
            ]
        },
		{
            id: 'kubejs:dungeon_recall',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0097",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0098',
                'kubejs.script.client.scripts.artifacts.tooltips.0099',
                'kubejs.script.client.scripts.artifacts.tooltips.0100'
            ]
        },
		{
            id: 'kubejs:ice_shard',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0101",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0102',
                'kubejs.script.client.scripts.artifacts.tooltips.0103',
                'kubejs.script.client.scripts.artifacts.tooltips.0104',
                'kubejs.script.client.scripts.artifacts.tooltips.0105',
                'kubejs.script.client.scripts.artifacts.tooltips.0106'
            ]
        },
		{
            id: 'kubejs:kill_multiplier',
            lore: "kubejs.script.client.scripts.artifacts.tooltips.0107",
            mechanics: [
                'kubejs.script.client.scripts.artifacts.tooltips.0108',
                'kubejs.script.client.scripts.artifacts.tooltips.0109',
                'kubejs.script.client.scripts.artifacts.tooltips.0110',
                'kubejs.script.client.scripts.artifacts.tooltips.0111',
                'kubejs.script.client.scripts.artifacts.tooltips.0112'
            ]
        },
		{
			id: 'kubejs:void_core',
			lore: "kubejs.script.client.scripts.artifacts.tooltips.0113",
			mechanics: [
				'kubejs.script.client.scripts.artifacts.tooltips.0114',
				'kubejs.script.client.scripts.artifacts.tooltips.0115',
				'kubejs.script.client.scripts.artifacts.tooltips.0116',
				'kubejs.script.client.scripts.artifacts.tooltips.0117',
				'kubejs.script.client.scripts.artifacts.tooltips.0118',
				'kubejs.script.client.scripts.artifacts.tooltips.0119'
			]
		}
    ];

    tooltipData.forEach(item => {
        event.addAdvanced(item.id, (stack, advanced, text) => {
            // Line 0 is the Item Name. Line 1 is our Italicized Lore.
            text.add(1, Text.translate(item.lore).gray().italic());

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
        { id: 'kubejs:d6', lore: 'kubejs.script.client.scripts.artifacts.tooltips.0121', faces: 6 },
        { id: 'kubejs:d10', lore: 'kubejs.script.client.scripts.artifacts.tooltips.0122', faces: 10 },
        { id: 'kubejs:d12', lore: 'kubejs.script.client.scripts.artifacts.tooltips.0123', faces: 12 },
        { id: 'kubejs:d20', lore: 'kubejs.script.client.scripts.artifacts.tooltips.0124', faces: 20 }
    ]

    dice.forEach(die => {
        event.addAdvanced(die.id, (item, advanced, text) => {
            text.add(1, Text.translate(die.lore).gray().italic())
            if (!event.shift) {
                text.add(2, Text.white(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0125')))
            } else {
                text.add(2, Text.gold(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0126')))
                text.add(3, Text.of(' • ').white().append(Text.gold(Text.translate("kubejs.script.client.scripts.artifacts.tooltips.0128")).append(Text.white(Text.translate("kubejs.script.client.scripts.artifacts.tooltips.0129", die.faces)))))
                text.add(4, Text.of(' • ').white().append(Text.aqua(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0131')).append(Text.white(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0132')))))
                text.add(5, Text.of(' • ').white().append(Text.lightPurple(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0134')).append(Text.white(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0135')))))
                text.add(6, Text.of(' • ').white().append(Text.darkGreen(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0137')).append(Text.white(Text.translate('kubejs.script.client.scripts.artifacts.tooltips.0138')))))
            }
        })
    })
///END	
})