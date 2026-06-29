
BlockEvents.placed("bonfires:ash_bone_pile", event =>{
    const {level, entity, player, server, block} = event
    let dim = String(level.getDimension())
    if (!((dim == "bloodmagic:dungeon") || (dim == "lrdynamicdungeon:dungeon_dimension") || (dim == "dimdungeons:dungeon_dimension"))){return}
    player.setStatusMessage(Text.translate("kubejs.script.server.scripts.bonfire.dim.blacklist.0001"))
    event.cancel()
})

global["SpellResolveEvent$Pre"] = function(event) {
    const {resolver, world, shooter, spell, context} = event
    
    let dim = String(world.getDimension())
    if (!((dim == "bloodmagic:dungeon") || (dim == "lrdynamicdungeon:dungeon_dimension") || (dim == "dimdungeons:dungeon_dimension"))){return}

    spell.recipe.forEach(entry => {
        if (entry.getName() == "Place Block") {
            if (shooter.isPlayer()) {
                shooter.setStatusMessage(Text.translate("kubejs.script.server.scripts.bonfire.dim.blacklist.0002"))
            }
            event.setCanceled(true)
        }
    })
}