// ==========================================================================
// INTEGRATED COMMAND REGISTRY
// ==========================================================================
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Args } = event;
	
    event.register(
        // Base command name.	
        Commands.literal('crate')
            .then(Commands.literal('stats').executes(ctx => {
                let p = ctx.source.player;
                let s = p.persistentData.stats || { rituals: 0, chaos: 0, wishes: 0, ancient: 0 };
                let total = p.persistentData.totalCratesOpened || 0;
					p.tell(Text.translate("kubejs.script.server.scripts.custom.loot.crates.loot.crate.command.0001"));
				    p.tell(Text.translate("kubejs.script.server.scripts.custom.loot.crates.loot.crate.command.0002", s.rituals));
                    p.tell(Text.translate("kubejs.script.server.scripts.custom.loot.crates.loot.crate.command.0003", s.chaos));
                    p.tell(Text.translate("kubejs.script.server.scripts.custom.loot.crates.loot.crate.command.0004", s.wishes));
					p.tell(Text.translate("kubejs.script.server.scripts.custom.loot.crates.loot.crate.command.0005", s.ancient));
					p.tell("§8> §3Echo: §b" + (s.echo || 0));
                return 1;
            }))
            .then(Commands.literal('reset')
				.requires(s => s.hasPermission(2))
				.then(Commands.argument('target', Args.PLAYER.create(event))
					.executes(ctx => {
					let target = Args.PLAYER.getResult(ctx, 'target');
					target.persistentData.totalCratesOpened = 0;
					target.persistentData.stats = { rituals: 0, chaos: 0, wishes: 0, ancient: 0 };
					ctx.source.sendSuccess(Text.green(Text.translate("kubejs.script.server.scripts.custom.loot.crates.loot.crate.command.0006", target.name.string)), true);
					return 1;
            })))
    );
});