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
        text.add(Text.translate("kubejs.script.client.scripts.roguelite.ring.0001").gray().italic());

        if (!event.shift) {
            text.add(Text.translate("kubejs.script.client.scripts.roguelite.ring.0002").yellow());
        } else {
            text.add(Text.translate("kubejs.script.client.scripts.roguelite.ring.0003").white());
            text.add(Text.translate("kubejs.script.client.scripts.roguelite.ring.0004").white());

            // Use the data from NBT
            text.add(Text.translate("kubejs.script.client.scripts.roguelite.ring.0005", rankColor, rankName, pts));
            text.add(Text.translate("kubejs.script.client.scripts.roguelite.ring.0006", percent));
            text.add(Text.translate("kubejs.script.client.scripts.roguelite.ring.0007", rebirths));
            text.add(Text.translate("kubejs.script.client.scripts.roguelite.ring.0008", lastPos));

            if (milestones.length > 0) {
                text.add(Text.translate("kubejs.script.client.scripts.roguelite.ring.0009"));
                let itemsPerLine = 2; 
                for (let i = 0; i < milestones.length; i += itemsPerLine) {
                    let chunk = milestones.slice(i, i + itemsPerLine).join(', ');
                    if (i + itemsPerLine < milestones.length) chunk += ',';
                    text.add(Text.translate("kubejs.script.client.scripts.roguelite.ring.0010", chunk));
                }
            } else {
                text.add(Text.translate("kubejs.script.client.scripts.roguelite.ring.0011"));
            }
        }
    });
});