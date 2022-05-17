//import kaboom from "kaboom"
//import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

// initialize context
kaboom({
	global: true,
	fullscreen: true,
	scale: 0.5,
	//debug: true,
	background: [136,139,141,],
  })
//debug.inspect = true;

// load assets
loadRoot("assets/");
//loadSprite("Plr", "sprites/Player.png");
//loadSprite("Sword", "sprites/Sword.png")
//loadSprite("Emy", "sprites/Enemy.png");
loadSprite("airb","sprites/Box.png");
loadSprite("box","sprites/Box2.png");
loadSprite("box2","sprites/Boxbrown.png");
loadSprite("rules","sprites/For_Nongamer_'People'.png");
loadSprite("Pbox","sprites/PlayerBox.png");
loadSprite("Gbox","sprites/GoalBox.png");
loadSound("score","sounds/score.mp3");


function centerOffSet(x, y){
	return vec2(center().x + x, center().y + y)
}



function addButton(txt, p, f) {

	const btn = add([
		text(txt),
		pos(p),
		area({ cursor: "pointer", }),
		scale(1),
		origin("center"),
	])

	btn.onClick(f)

	btn.onUpdate(() => {
		if (btn.isHovering()) {
			const t = time() * 10
			btn.color = rgb(
				wave(0, 255, t),
				wave(0, 255, t + 2),
				wave(0, 255, t + 4),
			)
			btn.scale = vec2(1.2)
		} else {
			btn.scale = vec2(1)
			btn.color = rgb()
		}
	})

}
scene("game", ({levelid,bonus}) => {
	const LEVELS = [
		[
			"====",
			"=p =",
			"= f=",
			"====",
		],
		[
			"=========",
			"=====  ==",
			"=p    bf=",
			"====== ==",
			"=========",
		],
		[
			"========",
			"=fp b g=",
			"========",
		],
		[
			"==================",
			"========  ========",
			"====  == b========",
			"==== b== b===  ===",
			"=p   b   b      f=",
			"=====g===g====g===",
			"=====g===g========",
			"==================",
		],
		[
			"=======",
			"=p g f=",
			"=  b  =",
			"====  =",
			"=======",
		],
		
		[
			"====================",
			"=p      b   b    gg=",
			"=f        b b    gg=",
			"====================",
		],
		[
			"================",
			"=p  b b bb gggg=",
			"=f             =",
			"================",

		],
		[
			"========================",
			"=p  ===g  b     =   b g=",
			"=== ========= = = = == =",
			"=   ==      = = = = == =",
			"=b  == ==== === = = ====",
			"=g=    ===        =   f=",
			"========================",
		],
				[
			"========================",
			"=p  ===g        =     g=",
			"=== =======b=b= = = = b=",
			"=   ==      =g= = = =  =",
			"=b  == ==== === = = ====",
			"=g=    ===        =   f=",
			"========================",
		],
	]
	const bonuns = [
		"=====",
		"=p=g=",
		"= = =",
		"= b =",
		"= = =",
		"= = =",
		"= = =",
		"= ===",
		"=  f=",
		"=====",
	];
	if(!bonus){
		const lvl = addLevel(LEVELS[levelid || 0],{
			width: 100,
			height: 100,
			"p": () => [
				sprite("Pbox"),
				color(RED),
				z(2),
				"player",
				area(),
				solid(),
				{
					oldpos: vec2(0,0),
				},
			],
			"=": () => [
				sprite("box"),
				area(),
				z(2),
				solid(),
				color(67,70,75),
				"wall",
			],
			"b": () => [
				sprite("box2"),
				pos(),
				area(),
				//color(101,56,24),
				z(2),
				solid(),
				"boxx",
				"Moveable",
			],
			"g": () => [
				sprite("Gbox"),
				area(),
				pos(),
				color(256,256,256),
				z(1),
				"goal",
				{
					Trigger: false
				},
			],
			"f": () => [
				sprite("Pbox"),
				area(),
				pos(),
				color(256,256,256),
				z(1),
				"pgoal",
				{
					Trigger: false
				},
			],
			" ": () => [
				sprite("airb"),
				area(),
				pos(),
				color(136,139,141,),
				z(0),
				"air",
			],
		});
	}else{
		const lvl = addLevel(bonuns,{
			width: 100,
			height: 100,
			"p": () => [
				sprite("Pbox"),
				color(RED),
				z(2),
				"player",
				area(),
				solid(),
				{
					oldpos: vec2(0,0),
				},
			],
			"=": () => [
				sprite("box"),
				area(),
				z(2),
				solid(),
				color(67,70,75),
				"wall",
			],
			"b": () => [
				sprite("box2"),
				pos(),
				area(),
				//color(101,56,24),
				z(2),
				solid(),
				"boxx",
				"Moveable",
			],
			"g": () => [
				sprite("Gbox"),
				area(),
				pos(),
				color(256,256,256),
				z(1),
				"goal",
				{
					Trigger: false
				},
			],
			"f": () => [
				sprite("Pbox"),
				area(),
				pos(),
				color(256,256,256),
				z(1),
				"pgoal",
				{
					Trigger: false
				},
			],
			" ": () => [
				sprite("airb"),
				area(),
				pos(),
				color(136,139,141,),
				z(0),
				"air",
			],
		});
	}

	const Player = get("player")[0]
	const PGoal = get("pgoal")[0]
	//movement events
	var movementp = 3003.003 * 1.2;
	var movement = 100;
	onKeyPress("w", () => {
		Player.move(0,-movementp);
		Player.moveTo(Math.round(Player.pos.x / 100) * 100, Math.round(Player.pos.y / 100) * 100);
	})
	onKeyPress("s", () => {
		Player.move(0,movementp);
		Player.moveTo(Math.round(Player.pos.x / 100) * 100, Math.round(Player.pos.y / 100) * 100);
	})
	onKeyPress("a", () => {
		Player.move(-movementp, 0);
		Player.moveTo(Math.round(Player.pos.x / 100) * 100, Math.round(Player.pos.y / 100) * 100);
	})
	onKeyPress("d", () => {
		Player.move(movementp, 0);
		Player.moveTo(Math.round(Player.pos.x / 100) * 100, Math.round(Player.pos.y / 100) * 100);
	})
	onKeyPress("r", () => {
		go("game", {
			levelid: levelid,
			bonus: bonus,
		})
	})

	var counter = 0;
	onCollide("player","Moveable",(obj1,obj2) => {
		counter++;
		//debug.log("collide " + counter);
		if(counter%2==1){
			if(isKeyPressed("w")){
				obj2.move(0, -movementp);
				obj2.moveTo(Math.round(obj2.pos.x / 100) * 100, Math.round(obj2.pos.y / 100) * 100);
				wait(0.03, () => {
				obj1.move(0, -movementp);
				obj1.moveTo(Math.round(obj1.pos.x / 100) * 100, Math.round(obj1.pos.y / 100) * 100);
				})
			}
			if(isKeyPressed("s")){
				obj2.move(0, movementp);
				obj2.moveTo(Math.round(obj2.pos.x / 100) * 100, Math.round(obj2.pos.y / 100) * 100);
				wait(0.03, () => {
					obj1.move(0, movementp);
					obj1.moveTo(Math.round(obj1.pos.x / 100) * 100, Math.round(obj1.pos.y / 100) * 100);
				})
			}
			if(isKeyPressed("a")){
				obj2.move(-movementp, 0);
				obj2.moveTo(Math.round(obj2.pos.x / 100) * 100, Math.round(obj2.pos.y / 100) * 100);
				wait(0.03, () => {
				obj1.move(-movementp, 0);
				obj1.moveTo(Math.round(obj1.pos.x / 100) * 100, Math.round(obj1.pos.y / 100) * 100);
				})
			}
			if(isKeyPressed("d")){
				obj2.move(movementp, 0);
				obj2.moveTo(Math.round(obj2.pos.x / 100) * 100, Math.round(obj2.pos.y / 100) * 100);
				wait(0.03, () => {
				obj1.move(movementp, 0);
				obj1.moveTo(Math.round(obj1.pos.x / 100) * 100, Math.round(obj1.pos.y / 100) * 100);
				})
			}
		}
	})
	var counter2 = 0;
	onCollide("Moveable","Moveable",(obj2,obj1) => {
		counter2++;
		//debug.log("collide2 " + counter2);
		if(counter2%2==1){
			if(isKeyPressed("w")){
				//obj2.move(0, -movementp);
				//obj2.moveTo(Math.round(obj2.pos.x / 100) * 100, Math.round(obj2.pos.y / 100) * 100);
				wait(0.03, () => {
				obj1.move(0, -movementp);
				obj1.moveTo(Math.round(obj1.pos.x / 100) * 100, Math.round(obj1.pos.y / 100) * 100);
				})
			}
			if(isKeyPressed("s")){
				//obj2.move(0, movementp);
				//obj2.moveTo(Math.round(obj2.pos.x / 100) * 100, Math.round(obj2.pos.y / 100) * 100);
				wait(0.03, () => {
					obj1.move(0, movementp);
					obj1.moveTo(Math.round(obj1.pos.x / 100) * 100, Math.round(obj1.pos.y / 100) * 100);
				})
			}
			if(isKeyPressed("a")){
				//obj2.move(-movementp, 0);
				//obj2.moveTo(Math.round(obj2.pos.x / 100) * 100, Math.round(obj2.pos.y / 100) * 100);
				wait(0.03, () => {
				obj1.move(-movementp, 0);
				obj1.moveTo(Math.round(obj1.pos.x / 100) * 100, Math.round(obj1.pos.y / 100) * 100);
				})
			}
			if(isKeyPressed("d")){
				//obj2.move(movementp, 0);
				//obj2.moveTo(Math.round(obj2.pos.x / 100) * 100, Math.round(obj2.pos.y / 100) * 100);
				wait(0.03, () => {
				obj1.move(movementp, 0);
				obj1.moveTo(Math.round(obj1.pos.x / 100) * 100, Math.round(obj1.pos.y / 100) * 100);
				})
			}
		}
	})
	loop(0.5, () => {
		if(get("goal").length>0){
			const goals = get("goal");
			const boxes = get("boxx");
			var randomfix;//idk why this fixes the code
			const checks = [];
			for(var i = 0; i<goals.length; i++){
				checks.push(false);
			}
				for(var i = 0; i<goals.length; i++){
					for(var o = 0; o<boxes.length; o++){
						randomfix = goals[i];
						if(randomfix.isColliding(boxes[o])){
							checks[i] = true;
						}
					}
				}
			var finalcheck = Player.isColliding(PGoal);
			for(var i = 0; i<checks.length; i++){
				finalcheck = finalcheck && checks[i];
			}
			if(finalcheck){
				play("score");
				//debug.log("win");
				if (levelid < LEVELS.length - 1 && bonus == false) {
					// If there's a next level, go() to the same scene but load the next level
					go("game", {
						levelid: levelid + 1,
						bonus: false,
					})
				} else {
					// Otherwise we have reached the end of game, go to "win" scene!
					go("win", {})
				}
			}
		}else{
			play("score");
			if(Player.isColliding(PGoal)){
				if (levelid < LEVELS.length - 1) {
					// If there's a next level, go() to the same scene but load the next level
					go("game", {
						levelid: levelid + 1,
						bonus: false,
					})
				} else {
					// Otherwise we have reached the end of game, go to "win" scene!
					go("win", {})
				}
			}
		}
	})
})

function bonussrt(){
	go("game", {
		levelid: 0,
		bonus: true,
	})
}

function srtscr(){
	go("startscr", {
		levelid: 0,
	})
}


scene("startscr", ({levelid}) => {
	function lvlsrt(){
		go("game", {
			levelid: 0,
			bonus: false,
		})
	}
	addButton("Start", centerOffSet(0, -200), lvlsrt);
	add([sprite("rules"), pos(centerOffSet(0, 350)), origin("center"), scale(2)])
})

scene("win", ({levelid}) => {
	function lvlsrt(){
		go("game", {
			levelid: 0,
			bonus: false,
		})
	}
	add([text("You Win"), pos(centerOffSet(0, -100)), origin("center"), scale(2)])
	addButton("Play Again?", center(), lvlsrt);
	addButton("Bonus?", centerOffSet(0, 100), bonussrt);
	addButton("Title Screen", centerOffSet(0, 200), srtscr);
})

function start() {
	// Start with the "game" scene, with initial parameters
	
	go("startscr", {
		levelid: 0,
	})
}

start("startscr", { levelid: 0})
