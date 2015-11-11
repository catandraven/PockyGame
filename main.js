// - global -----------------------------
var screen, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var fire = false;
var ctx;
var counter = 0;
var score = 0;

var SHOT_MAX = 10;
var ENEMY_MAX = 15;
var p = new Point();
var i,j,k;
// - main ---------------------------------
var charaShot = new Array(SHOT_MAX);
for(i = 0;i < SHOT_MAX;i++){
	charaShot[i] = new Shot();
}

var enemy = new Array(ENEMY_MAX);
for(i = 0;i < ENEMY_MAX;i++){
	enemy[i] = new Enemy();
}

var bomb = new Array(SHOT_MAX);
for(i = 0;i < SHOT_MAX;i++){
	bomb[i] = new Bomb();
}

window.onload = function(){
	
	screen = document.getElementById('screen');
	screen.width = 360;
	screen.height = 360;
	
	ctx = screen.getContext('2d');
	
	screen.addEventListener('mousemove', mouseMove, true);
	window.addEventListener('mousedown', mouseDown, true);
	
	info = document.getElementById('info');
	
	Asset.loadAssets();
	
	var chara = new Character();
	chara.position.y = 300;
	
	// レンダリング
	(function(){
		info.innerHTML = mouse.x + ' : ' + mouse.y + "<br>" + score;
		counter++;
		ctx.clearRect(0,0,screen.width,screen.height);
		
		chara.position.x = mouse.x - 45;

		for(i = 0;i < ENEMY_MAX;i++){
			if(enemy[i].alive){
				for(j = 0;j < SHOT_MAX;j++){
					if(charaShot[j].alive){
						if(Collision(enemy[i].position,charaShot[j].position)){
							enemy[i].alive = false;
							charaShot[j].alive = false;
							switch(enemy[i].speed){
								case 5:
									score += 10;
									break;
								case 10:
									score += 30;
									break;
							}
							for(k = 0;k < SHOT_MAX;k++){
								if(!bomb[k].alive){
									bomb[k].set(enemy[i].position);
								}
							}
						}
					}
				}
			}
		}

		for(i = 0;i < SHOT_MAX;i++){
			if(bomb[i].alive){
				ctx.drawImage(Asset.images["bomb"],bomb[i].position.x,bomb[i].position.y);
				if(bomb[i].count <= 20){
					bomb[i].alive = false;
				}
				bomb[i].count++;
			}
		}


		if(counter % 25 == 0){
			for(i = 0;i < ENEMY_MAX;i++){
				if(!enemy[i].alive){
					j = (counter % 50) / 25;
					p.x = 540 * j - 90;
					p.y = 20 + ((counter % 75) / 20) * 70;
					if(counter % 125 == 0){
						enemy[i].set(p,j,10);
					}
					else {
						enemy[i].set(p,j,5);
					}
					break;
				}
			}
		}

		for(i = 0;i < ENEMY_MAX;i++){
			if(enemy[i].alive){
				enemy[i].move();
				if(enemy[i].speed == 5){
					ctx.drawImage(Asset.images["kinoko"],enemy[i].position.x,enemy[i].position.y);	
				}
				else{
					ctx.drawImage(Asset.images["takenoko"],enemy[i].position.x,enemy[i].position.y);
				}
			}
		}


		if(fire){
			for(i = 0;i < SHOT_MAX;i++){
				if(!charaShot[i].alive){
					charaShot[i].set(chara.position,20);
					break;
				}
			}
			fire = false;
		}

		for(i = 0;i < SHOT_MAX;i++){
			if(charaShot[i].alive){
				charaShot[i].move();
				ctx.drawImage(Asset.images["shot"],charaShot[i].position.x,charaShot[i].position.y);
			}
		}

		ctx.drawImage(Asset.images["box"],chara.position.x,chara.position.y);
		
		// 再帰呼び出し
		if(run){setTimeout(arguments.callee, fps);}
	})();
};

// - event ---------------------------------------
function mouseMove(event){
	mouse.x = event.clientX - screen.offsetLeft;
	mouse.y = event.clientY - screen.offsetTop;
}

function mouseDown(event){
	fire = true;
}

// - asset -------------
var Asset = {};
Asset.assets = [
	{type:"image",name:"box",src:"assets/box.png"},
	{type:"image",name:"shot",src:"assets/shot.png"},
	{type:"image",name:"kinoko",src:"assets/kinoko.png"},
	{type:"image",name:"takenoko",src:"assets/takenoko.png"},
	{type:"image",name:"bomb",src:"assets/bomb.png"}
];

Asset.images = {};

Asset.loadAssets = function(){
	var total = Asset.assets.length;
	var loadCount = 0;

	var onLoad = function(){
		loadCount++;
		if(loadCount >= total){
			return;
		}
	};

	Asset.assets.forEach(function(asset){
		switch(asset.type){
			case "image":
				Asset._loadImage(asset,onLoad);
				break;
		}
	});
};

Asset._loadImage = function(asset,onLoad){
	var image = new Image();
	image.src = asset.src;
	image.onload = onLoad;
	Asset.images[asset.name] = image;
};

//衝突判定
function Collision(e_p,s_p){
	if(e_p.x > (s_p.x +5)) return false;
	if((e_p.x + 90) < (s_p.x +5)) return false;
	if((e_p.y + 45) < s_p.y) return false;
	return true;
}




