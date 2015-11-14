// - global -----------------------------
var screen, info;
var run = true;
var fps = 1000 / 30;
var fire = false;
var ctx;
var counter = 0;
var score = 0;

var left = false;
var up = false;
var right = false;
var down = false;

var SHOT_MAX = 10;
var ENEMY_MAX = 15;
var ENEMY_SHOT_MAX = 100;
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

var enemyShot = new Array(ENEMY_SHOT_MAX)
for(i = 0;i<ENEMY_SHOT_MAX;i++){
	enemyShot[i] = new EnemyShot();
}

var disapp = new Array(SHOT_MAX);
for(i = 0;i < SHOT_MAX;i++){
	disapp[i] = new DisApp();
}

var chara = new Character();
chara.position.y = 300;
chara.position.x = 0;

window.onload = function(){
	
	screen = document.getElementById("screen");
	screen.width = 360;
	screen.height = 360;
	
	ctx = screen.getContext('2d');
	
	window.addEventListener("keydown",keyDown,true);
	window.addEventListener("keyup",keyUp,true);

	info = document.getElementById("info");
	
	Asset.loadAssets();
		
	// レンダリング
	(function(){
		info.innerHTML = "score:" + score;
		counter++;
		ctx.clearRect(0,0,screen.width,screen.height);
		
		//移動
		if(left)  chara.move("left");
		if(up)    chara.move("up");
		if(right) chara.move("right");
		if(down)  chara.move("down");

		//衝突
		for(i = 0;i < ENEMY_MAX;i++){
			if(enemy[i].alive){
				if(CollisionEnemy(enemy[i].position,chara.position)){
					run = false;
					console.log("Collision with Enemy!");
				}
				for(j = 0;j < SHOT_MAX;j++){
					if(charaShot[j].alive){
						if(CollisionMyShot(enemy[i].position,charaShot[j].position)){
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
								if(!disapp[k].alive){
									disapp[k].set(enemy[i].position);
								}
							}
						}
					}
				}

			}
		}

		for(i = 0;i < ENEMY_SHOT_MAX;i++){
			if(CollisionEnemyShot(enemyShot[i].position,chara.position)){
				run = false;
				console.log("Collision with EnemyShot!");
			}
		}



		//消滅画像の表示
		for(i = 0;i < SHOT_MAX;i++){
			if(disapp[i].alive){
				disapp[i].count++;
				if(disapp[i].count < 10){
					ctx.drawImage(Asset.images["disapp1"],disapp[i].position.x,disapp[i].position.y);
				}
				else if(disapp[i].count < 20){
					ctx.drawImage(Asset.images["disapp2"],disapp[i].position.x,disapp[i].position.y);
				}
				else{
					disapp[i].alive = false;
				}
			}
		}

		//enemy出現
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
				//enemy描写
				enemy[i].move();
				if(enemy[i].speed == 5){
					ctx.drawImage(Asset.images["kinoko"],enemy[i].position.x,enemy[i].position.y);	
				}
				else{
					ctx.drawImage(Asset.images["takenoko"],enemy[i].position.x,enemy[i].position.y);
				}

				//enemyShot出現
				if(enemy[i].count % 10 == 0){
					for(j = 0;j < ENEMY_SHOT_MAX;j++){
						if(!enemyShot[j].alive){
							enemyShot[j].set(enemy[i].position,chara.position);
							break;
						}
					}
				}
			}
		}

		//enemyShot描写
		for(i = 0;i < ENEMY_SHOT_MAX;i++){
			if(enemyShot[i].alive){
				enemyShot[i].move();
				if(enemyShot[i].count < 8){
					ctx.drawImage(Asset.images["enemyshot1"],enemyShot[i].position.x,enemyShot[i].position.y);
				}
				else if(enemyShot[i].count < 16){
					ctx.drawImage(Asset.images["enemyshot2"],enemyShot[i].position.x,enemyShot[i].position.y);
				}
				else{
					enemyShot[i].count = 0;
					ctx.drawImage(Asset.images["enemyshot2"],enemyShot[i].position.x,enemyShot[i].position.y);
				}

			}
		}

		//shot出現
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
}

function keyDown(event){
	var ck = event.keyCode;
	switch(ck){
		case 37:
			left = true;
			break;
		case 38:
			up = true;
			break;
		case 39:
			right = true;
			break;
		case 40:
			down = true;
			break;
		case 32:
			fire = true;
			break;
	}
}

function keyUp(event){
	var ck = event.keyCode;
	switch(ck){
		case 37:
			left = false;
			break;
		case 38:
			up = false;
			break;
		case 39:
			right = false;
			break;
		case 40:
			down = false;
			break;

	}
}


// - asset -------------
var Asset = {};
Asset.assets = [
	{type:"image",name:"box",src:"assets/box.png"},
	{type:"image",name:"shot",src:"assets/shot.png"},
	{type:"image",name:"kinoko",src:"assets/kinoko.png"},
	{type:"image",name:"takenoko",src:"assets/takenoko.png"},
	{type:"image",name:"disapp1",src:"assets/disapp1.png"},
	{type:"image",name:"disapp2",src:"assets/disapp2.png"},
	{type:"image",name:"enemyshot1",src:"assets/enemyshot1.png"},
	{type:"image",name:"enemyshot2",src:"assets/enemyshot2.png"}
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
function CollisionMyShot(enemyPos,myShotPos){
	if(enemyPos.x      > myShotPos.x + 1) return false;
	if(enemyPos.x + 64 < myShotPos.x + 1) return false;
	if(enemyPos.y + 42 < myShotPos.y    ) return false;
	return true;
}

function CollisionEnemyShot(enemyShotPos,myPos){
	if(enemyShotPos.x + 6 < myPos.x     )return false;
	if(enemyShotPos.x     > myPos.x + 32)return false;
	if(enemyShotPos.y + 6 < myPos.y     )return false;
	if(enemyShotPos.y     > myPos.y + 48)return false;
	return true;

}

function CollisionEnemy(enemyPos,myPos){
	if(enemyPos.x      > myPos.x + 32)return false;
	if(enemyPos.x + 64 < myPos.x     )return false;
	if(enemyPos.y + 42 < myPos.y     )return false;
	if(enemyPos.y      > myPos.y + 48)return false;
	return true;
}


