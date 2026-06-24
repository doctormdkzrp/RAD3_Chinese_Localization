// Initialize global sync data
if (!global.recyclerData) {
    global.recyclerData = { count: 0, xp: 0 };
}

// Listen for Server Sync
NetworkEvents.dataReceived('sync_recycler_stats', event => {
    global.recyclerData = {
        count: event.data.count || 0,
        xp: event.data.xp || 0
    };
});
	
ItemEvents.tooltip(event => {
    event.addAdvanced(['kubejs:item_recycler'], (item, advanced, text) => {
        // Line 1: Lore (Always First)
        text.add(Text.translate('kubejs.script.client.scripts.item.recycler.0001').gray().italic());
		
        // --- SECTION 1: PERSONAL MASTERY (Always Visible) ---
        text.add(Text.translate('kubejs.script.client.scripts.item.recycler.0002').white());

        // Safety check for global data
        let stats = global.recyclerData || { count: 0, xp: 0 };
        let total = stats.count;
        let totalXP = stats.xp;

        if (total === 0 && totalXP === 0) {
            text.add(Text.translate('kubejs.script.client.scripts.item.recycler.0003').italic());
        } else {
            // Rank Logic
            let tier = "§fNovice"; let fail = "10%"; let jack = "1%"; let nextGoal = 1000;
            
            if (total >= 100000) { tier = "§d§lGrandmaster"; fail = "1%"; jack = "6%"; nextGoal = 0; } 
            else if (total >= 75000) { tier = "§4Mythic"; fail = "2%"; jack = "5.5%"; nextGoal = 100000; }
            else if (total >= 50000) { tier = "§cLegend"; fail = "3%"; jack = "5%"; nextGoal = 75000; }
            else if (total >= 40000) { tier = "§eElite"; fail = "3.5%"; jack = "4.5%"; nextGoal = 50000; }
            else if (total >= 30000) { tier = "§6Artisan"; fail = "4%"; jack = "4%"; nextGoal = 40000; }
            else if (total >= 20000) { tier = "§5Master"; fail = "4.5%"; jack = "3.5%"; nextGoal = 30000; }
            else if (total >= 15000) { tier = "§2Professional"; fail = "5%"; jack = "3%"; nextGoal = 20000; }
            else if (total >= 10000) { tier = "§aSpecialist"; fail = "6%"; jack = "2.5%"; nextGoal = 15000; }
            else if (total >= 5000)  { tier = "§3Expert"; fail = "7%"; jack = "2%"; nextGoal = 10000; }
            else if (total >= 3000)  { tier = "§9Craftsman"; fail = "8%"; jack = "1.5%"; nextGoal = 5000; }
            else if (total >= 1000)  { tier = "§bJourneyman"; fail = "9%"; jack = "1.2%"; nextGoal = 3000; }

            text.add([Text.translate('kubejs.script.client.scripts.item.recycler.0004'), Text.of(tier)]);

            // --- PROGRESS BAR LOGIC ---
            if (nextGoal > 0) {
                let prevGoal = 0;
                const goals = [0, 1000, 3000, 5000, 10000, 15000, 20000, 30000, 40000, 50000, 75000, 100000];
                for (let g of goals) { if (g < nextGoal) prevGoal = g; }

                let pct = (total - prevGoal) / (nextGoal - prevGoal);
                let progress = pct * 10;
                let barColor = pct < 0.3 ? "§c" : (pct < 0.7 ? "§e" : "§a");
                
                let bar = "";
                for (let i = 0; i < 10; i++) {
                    bar += (i < progress) ? `${barColor}|` : "§8.";
                }
                text.add([Text.translate('kubejs.script.client.scripts.item.recycler.0005'), Text.translate("kubejs.script.client.scripts.item.recycler.0006", bar, total, nextGoal)]);
            } else {
                text.add(Text.translate('kubejs.script.client.scripts.item.recycler.0007').italic());
            }

            text.add([Text.translate('kubejs.script.client.scripts.item.recycler.0008'), Text.translate("kubejs.script.client.scripts.item.recycler.0009", totalXP.toLocaleString())]);
            text.add([Text.translate('kubejs.script.client.scripts.item.recycler.0010'), Text.translate("kubejs.script.client.scripts.item.recycler.0011", fail), Text.of('§8| '), Text.translate("kubejs.script.client.scripts.item.recycler.0013", jack)]);
        }	
		
        // --- SECTION 2: MECHANICS (Hidden behind Shift) ---
        if (!event.isShift()) {
            text.add(Text.translate('kubejs.script.client.scripts.item.recycler.0014').gray());
        } else {
            text.add(Text.of(' ')); // Spacer
            text.add(Text.translate('kubejs.script.client.scripts.item.recycler.0016'));
            text.add(Text.translate('kubejs.script.client.scripts.item.recycler.0017'));
            text.add(Text.translate('kubejs.script.client.scripts.item.recycler.0018'));
            text.add(Text.translate('kubejs.script.client.scripts.item.recycler.0019'));
            text.add(Text.translate('kubejs.script.client.scripts.item.recycler.0020'));
        }
    });
});