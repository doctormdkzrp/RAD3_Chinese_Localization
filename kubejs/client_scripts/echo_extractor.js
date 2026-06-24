global.extractorData = { mastery: 0, cooldown: 0, discoveries: "", castTicks: 120, cooldownTicks: 400 };

NetworkEvents.dataReceived('sync_extractor_stats', event => {
    // This logs to the console so you can see if the data actually arrives
    // console.log("Received Echo Data: " + event.data.mastery);
    
    global.extractorData = {
        mastery: event.data.mastery,
        cooldown: event.data.cooldown,
        discoveries: event.data.discoveries,
        castTicks: event.data.castTicks,
        cooldownTicks: event.data.cooldownTicks
    };
});

ItemEvents.tooltip(event => {
	
	
    event.addAdvanced(['kubejs:echo_extractor'], (item, advanced, text) => {
        // Line 1: Lore
        text.add(1, Text.translate("kubejs.script.client.scripts.echo.extractor.0001").gray().italic());

            // --- SECTION 1: EXTRACTION EXPERTISE (NOW FIRST) ---
            text.add(2, Text.translate("kubejs.script.client.scripts.echo.extractor.0002").white());

            let mastery = global.extractorData.mastery;
            let castSec = (global.extractorData.castTicks / 20).toFixed(1);
            let cooldownSec = (global.extractorData.cooldownTicks / 20).toFixed(1);
            let currentRisk = Math.max(5.0, 30.0 - (mastery * 0.1));
            let bonusTier = Math.floor(mastery / 10);
            
            // Risk Color Calculation
            let riskColor = currentRisk > 20 ? "§c" : (currentRisk > 10 ? "§e" : "§a");

            text.add(3, [Text.translate('kubejs.script.client.scripts.echo.extractor.0003'), Text.translate("kubejs.script.client.scripts.echo.extractor.0004", mastery.toFixed(1)), Text.of('§8| '), Text.translate("kubejs.script.client.scripts.echo.extractor.0006", bonusTier)]);
            text.add(4, [Text.translate('kubejs.script.client.scripts.echo.extractor.0007'), Text.translate("kubejs.script.client.scripts.echo.extractor.0008", riskColor, currentRisk.toFixed(1))]);

            // --- PROGRESS BAR (Towards next Tier) ---
            let nextTierGoal = (bonusTier + 1) * 10;
            let prevTierGoal = bonusTier * 10;
            let pct = (mastery - prevTierGoal) / (nextTierGoal - prevTierGoal);
            let barColor = pct < 0.3 ? "§c" : (pct < 0.7 ? "§e" : "§a");
            
            let bar = "";
            for (let i = 0; i < 10; i++) {
                bar += (i < pct * 10) ? `${barColor}|` : "§8.";
            }
            text.add(5, [Text.translate('kubejs.script.client.scripts.echo.extractor.0009'), Text.translate("kubejs.script.client.scripts.echo.extractor.0010", bar, mastery.toFixed(1), nextTierGoal)]);

        if (!event.isShift()) {
            text.add(6, Text.translate("kubejs.script.client.scripts.echo.extractor.0011").yellow());
        } else {
            // --- SECTION 2: MECHANICS (NOW SECOND) ---
            text.add(6, Text.of(' ')); // Spacer
            text.add(7, [Text.of("§6• "), Text.translate("kubejs.script.client.scripts.echo.extractor.0014")]);
            text.add(8, [Text.translate("kubejs.script.client.scripts.echo.extractor.0015"), Text.translate("kubejs.script.client.scripts.echo.extractor.0016")]);
            text.add(9, [Text.of("§2• "), Text.translate("kubejs.script.client.scripts.echo.extractor.0018", castSec, cooldownSec)]);
            text.add(10, [Text.of("§4• "), Text.translate("kubejs.script.client.scripts.echo.extractor.0020")]);
            text.add(11, [Text.of("§4• "), Text.translate("kubejs.script.client.scripts.echo.extractor.0022")]);
		
		}
    });
	
	
	
    event.addAdvanced('kubejs:sealed_tome', (item, assistant, text) => {
        // Line 1: Lore
        text.add(1, Text.translate("kubejs.script.client.scripts.echo.extractor.0023").gray().italic());

        if (!event.shift) {
            text.add(2, Text.translate("kubejs.script.client.scripts.echo.extractor.0024").yellow());
        } else {
            text.add(2, Text.translate("kubejs.script.client.scripts.echo.extractor.0025").white());

            // Determine Theme from NBT
            let themeId = (item.nbt && item.nbt.theme) ? item.nbt.theme : "unknown";
            // Capitalize for display
            let displayTheme = themeId.charAt(0).toUpperCase() + themeId.slice(1);

            text.add(3, Text.translate("kubejs.script.client.scripts.echo.extractor.0026", displayTheme));
            text.add(4, Text.translate("kubejs.script.client.scripts.echo.extractor.0027"));
            text.add(5, Text.translate("kubejs.script.client.scripts.echo.extractor.0028"));
        }
    });	
});

