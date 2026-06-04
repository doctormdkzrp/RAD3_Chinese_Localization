// priority: 0

console.info('> Jei-description script starting...')

JEIEvents.information(event => {

event.addItem('supplementaries:planter', ["用于在没有水源方块的情况下种植作物。", "现在你甚至可以在下界种植它们，而且不用担心动物踩踏你的作物！"])
event.addItem('supplementaries:faucet', ["开启后，它会向地面倾泻其后方最多两个方块的物品栏中的物品。如果你将其放在水源方块（炼药锅、水/含水方块）前，它会开始滴落水粒子。", "你可以用它向罐子中倒入或从中倒出液体。由于它能从方块侧面提取物品，因此可以实现原版无法实现的某种自动化。", "它还会与蜂巢和混凝土粉末等其他方块互动。其水的颜色取决于后方的方块。"])
event.addItem('supplementaries:jar', ["储存4桶或12瓶任何原版液体（如蜂蜜、牛奶、熔岩、药水、汤、龙息或经验），以及萤火虫。它相当于液体的潜影盒或简易储罐。现在你还可以储存饼干和鱼！与锻造流体系统或其他流体模组不兼容，仅用于补充原版。"])
event.addItem('supplementaries:wind_vane', ["根据天气发出红石信号。天气越差，信号越强。"])
event.addItem('supplementaries:pedestal', ["在上面放置物品以展示。堆叠多个基座会将其变为柱子。"])
event.addItem('supplementaries:redstone_illuminator', ["光源，可通过红石信号关闭。"])
event.addItem('supplementaries:crank', ["输出红石信号，信号强度随曲柄旋转程度增加。"])
event.addItem('supplementaries:spring_launcher', ["接收到红石信号时，将抛飞其上的任何实体。"])
event.addItem('supplementaries:turn_table', ["通电后，会旋转其上的任何物品/实体。"])
event.addItem('supplementaries:clock_block', ["右键点击方块以获取时间（小时）。你可以在18:00睡觉，黎明在06:00。"])
event.addItem('supplementaries:bellows', ["通电后，会将前方的实体或物品沿其面向的方向吹飞。"])
event.addItem('supplementaries:cog_block', ["传输红石信号，就像红石粉一样，但所有方向都能连接。","这使得垂直红石更容易，而且看起来更酷。"])
event.addItem('supplementaries:safe', ["极其坚硬的方块，功能如同箱子。破坏后保留物品栏。"])
event.addItem('supplementaries:hourglass', ["将沙子放入其中，它会提供红石信号直到沙子耗尽。翻转并重复。"])

event.addItem('kubejs:upgrade_swift2', ["可以在袭击地牢中找到，作为第5阶段战利品"])
event.addItem('kubejs:upgrade_sharp2', ["可以在袭击地牢中找到，作为第5阶段战利品"])

//event.addItem('waystones:waystone', ["This item can be bought in the shop", "", "Players can activate waystones, which will allow them to teleport back to those waystones using items such as the Warp Stone or Warp Scrolls.", "", "Waystones can also be used to travel between each other."])
//event.addItem('waystones:mossy_waystone', ["This item can be bought in the shop"])
//event.addItem('waystones:sandy_waystone', ["This item can be bought in the shop"])
//event.addItem('waystones:sharestone', ["This item can be bought in the shop", "", "The sharestone is a block that can be used to teleport to other sharestones of the same color. Unlike waystones, sharestones do not require the player to activate it first.", "", "All sharestones are always available to all players, making them a great tool for multiplayer servers."])
//event.addItem('waystones:bound_scroll', ["This item can be bought in the shop", "", "The bound scroll is a special kind of warp scroll that can be tied to a specific waystone by right-clicking the waystone with it.", "", "It can be used to teleport back to that specific waystone, or it could be given to another player and allow them to easily get to the bound waystone even if they have not activated it yet."])
//event.addItem('waystones:warp_scroll', ["This item can be bought in the shop", "", "The warp scroll is the one-time use version of the Warp Stone. It can be used to teleport to any of your activated waystones."])
//event.addItem('waystones:warp_stone', ["This item can be bought in the shop", "", "The warp stone allows you to teleport to any of your activated waystones.", "", "Once used, a cooldown period starts before you can use a warp stone again. This cooldown is tied to your player, not the warp stone itself, so there is no use in having multiple warp stones."])
//event.addItem('waystones:warp_plate', ["This item can be bought in the shop", "", "Warp Plates can be compared to teleporting pressure plates. Stand on one and you will get teleported to another warp plate. Warp Plates are attuned to each other by inserting the Attuned Shard of another warp plate."])
  
  
  
  
})