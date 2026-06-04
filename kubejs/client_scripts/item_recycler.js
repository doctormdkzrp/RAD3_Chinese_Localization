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
        text.add(Text.of('设计用于将物理物质分解为原始精华').gray().italic());
		
        // --- SECTION 1: PERSONAL MASTERY (Always Visible) ---
        text.add(Text.of('你的精通统计：').white());

        // Safety check for global data
        let stats = global.recyclerData || { count: 0, xp: 0 };
        let total = stats.count;
        let totalXP = stats.xp;

        if (total === 0 && totalXP === 0) {
            text.add(Text.of('§7尚无记录。开始回收！').italic());
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

            text.add([Text.of('§7等级：'), Text.of(tier)]);

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
                text.add([Text.of('§7下一等级：'), Text.of(`§8[${bar}§8] §f${total}/${nextGoal}`)]);
            } else {
                text.add(Text.of('§d§l已达最高等级').italic());
            }

            text.add([Text.of('§7总经验：'), Text.of(`§a${totalXP.toLocaleString()} XP`)]);
            text.add([Text.of('§7效率：'), Text.of(`§c${fail} Jam `), Text.of('§8| '), Text.of(`§d${jack} Jackpot`)]);
        }	
		
        // --- SECTION 2: MECHANICS (Hidden behind Shift) ---
        if (!event.isShift()) {
            text.add(Text.of('按住[Shift]查看机制').gray());
        } else {
            text.add(Text.of(' ')); // Spacer
            text.add(Text.of('• §6右键处理§e副手§f中的物品堆'));
            text.add(Text.of('• §2消耗副手堆叠。提取自供能量。'));
            text.add(Text.of('• §d逐个计算每件物品的成功率'));
            text.add(Text.of('• §c高级材料有几率产出稀有宝石'));
            text.add(Text.of('• §b不稳定会导致机器锁定10秒'));
        }
    });
});