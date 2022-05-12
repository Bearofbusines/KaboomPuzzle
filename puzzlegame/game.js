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
loadSprite("box","sprites/Box2.png");
loadSprite("bean","sprites/bean.png");
loadSprite("Pbox","sprites/PlayerBox.png");


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
scene("game", ({levelid}) => {
	const LEVELS = [
	[
		"===========================",
		"=                g     ggg=",
		"=                         =",
		"= f                       =",
		"=      b   b   b b        =",
		"=                     =   =",
		"= P      ====         =   =",
		"=                     =   =",
		"=        b     =      =   =",
		"===========================",
	],
	]

	const lvl = addLevel(LEVELS[levelid || 0],{
		width: 100,
		height: 100,
		"P": () => [
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
			sprite("box"),
			pos(),
			area(),
			color(101,56,24),
			outline(100,[0,0,0]),
			z(2),
			solid(),
			"boxx",
			"Moveable",
		],
		"g": () => [
			sprite("box"),
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
	const goals = get("goal");
	const boxes = get("boxx");
	var randomfix;//idk why this fixes the code
	loop(0.5, () => {
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
		//debug.log(checks);
		var finalcheck = Player.isColliding(PGoal);
		for(var i = 0; i<checks.length; i++){
			finalcheck = finalcheck && checks[i];
		}
		if(finalcheck){
			debug.log("win");
			if (levelid < LEVELS.length - 1) {
				// If there's a next level, go() to the same scene but load the next level
				go("game", {
					levelIdx: levelid + 1,
				})
			} else {
				// Otherwise we have reached the end of game, go to "win" scene!
				go("win", {})
			}
		}
	})
})

scene("startscr", ({levelid}) => {
	function lvlsrt(){
		go("game", {
			levelIdx: 0,
		})
	}
	addButton("start", center(), lvlsrt);
})

scene("win", ({levelid}) => {
	function lvlsrt(){
		go("game", {
			levelIdx: 0,
		})
	}
	addButton("start", center(), lvlsrt);
})

function start() {
	// Start with the "game" scene, with initial parameters
	
	go("startscr", {
		levelIdx: 0,
	})
}

start("game", { level: 0})