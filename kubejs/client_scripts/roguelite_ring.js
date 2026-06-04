ItemEvents.tooltip(event => {
    event.addAdvanced('kubejs:roguelite_ring', (item, assistant, text) => {
        let n = item.nbt;
        
        // Read the rank data the server already calculated
        let rankName = n && n.rank_name ? n.rank_name : "Wanderer";
        let rankColor = n && n.rank_color ? n.rank_color : "§7";
        let pts = n && n.points ? n.points : 0;
        let rebirths = n && n.rebirths ? n.rebirths : 0;
        let lastPos = n && n.last_death_pos ? n.last_death_pos : "Unknown";
        
        let milestones = [];
        if (n && n.unlocked_names) {
            n.unlocked_names.forEach(m => milestones.push(m));
        }
        
        let percent = Math.floor((milestones.length / 16) * 100);

        // Build Tooltip (Safe Append Only)
        text.add(Text.of("沉重的负担，换来第二次机会……").gray().italic());

        if (!event.shift) {
            text.add(Text.of("按住[Shift]查看机制。").yellow());
        } else {
            text.add(Text.of("死亡时清空物品栏并在随机位置重生").white());
            text.add(Text.of("根据解锁的里程碑给予不同战利品").white());

            // Use the data from NBT
            text.add(Text.of(` 1. §6Rank:§r ${rankColor}${rankName}§r (§f${pts} Pts§r)`));
            text.add(Text.of(` 2. §bProgress:§r §a${percent}%§7 of Milestones Completed`));
            text.add(Text.of(` 3. §eRebirths:§r §f${rebirths}§r`));
            text.add(Text.of(` 4. §bLast Death:§r §7${lastPos}§r`));

            if (milestones.length > 0) {
                text.add(Text.of(` 5. §bUnlocked Milestones:§r`));
                let itemsPerLine = 2; 
                for (let i = 0; i < milestones.length; i += itemsPerLine) {
                    let chunk = milestones.slice(i, i + itemsPerLine).join(', ');
                    if (i + itemsPerLine < milestones.length) chunk += ',';
                    text.add(Text.of(`    §7${chunk}§r`));
                }
            } else {
                text.add(Text.of(` 5. §bMilestones:§r §7None§r`));
            }
        }
    });
});