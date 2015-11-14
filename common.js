function Point(){
	this.x = 0;
	this.y = 0;
}

function Character(){
	this.position = new Point();
	this.speed = 8;
	this.mode = 0;
}

function Shot(){
	this.position = new Point();
	this.speed = 0;
	this.alive = false;
}

Character.prototype.move = function(dir){
	switch(dir){
		case "up":
			if(this.position.y > 0){
				this.position.y -= this.speed;
			}
			break;
		case "down":
			if(this.position.y < 360 - 48){
				this.position.y += this.speed;
			}
			break;
		case "right":
			if(this.position.x < 360 - 32){
				this.position.x += this.speed;
			}
			break;
		case "left":
			if(this.position.x > 0){
				this.position.x -= this.speed;
			}
			break;
	}
}


Shot.prototype.set = function(p,speed){
	this.position.x = p.x + 15;
	this.position.y = p.y;
	this.speed = speed;
	this.alive = true;
}

Shot.prototype.move = function(){
	this.position.y -= this.speed;
	if(this.position.y <= -100){
		this.alive = false;
	}
}

function Enemy(){
	this.position = new Point();
	this.type = 0;
	this.speed = 0;
	this.type = null;
	this.alive = false;
	this.count = 0;
}

Enemy.prototype.set = function(p,type,speed){
	this.position.x = p.x;
	this.position.y = p.y;
	this.speed = speed;
	this.type = type;
	this.alive = true;
	this.count = 0;
}

Enemy.prototype.move = function(){
	this.count++;
	switch(this.type){
		case 0:
			this.position.x += this.speed;
			break;
		case 1:
			this.position.x -= this.speed;
			break;
	}
	if(this.position.x < -90 || this.position.x > 360 + 90){
		this.alive = false;
	}
}

function EnemyShot(){
	this.position = new Point();
	this.vector = new Point();
	this.speed = 0;
	this.count = 0;
	this.alive = false;
}

EnemyShot.prototype.set = function(enemyPos,myPos){
	this.position.x = enemyPos.x + 29;
	this.position.y = enemyPos.y + 42;
	this.speed = 5;
	this.alive = true;
	this.count = 0;

	this.vector.x = this.position.x - myPos.x;
	this.vector.y = this.position.y - myPos.y;
	var length = Math.sqrt(this.vector.x * this.vector.x + this.vector.y * this.vector.y);
	this.vector.x /= length;
	this.vector.y /= length;


}

EnemyShot.prototype.move = function(){
	this.count++;
	this.position.x -= this.vector.x * this.speed;
	this.position.y -= this.vector.y * this.speed;
	if(this.position.x < 0 || this.position.x + 6 >360 || this.position.y < 0 || this.position.y + 6 > 360){
		this.alive = false;
	}	
}


function DisApp(){
	this.position = new Point();
	this.count = 0;
	this.alive = false;
}

DisApp.prototype.set = function(p){
	this.position.x = p.x - 10;
	this.position.y = p.y - 21;
	this.alive = true;
	this.count = 0;
}


