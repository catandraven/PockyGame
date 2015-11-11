function Point(){
	this.x = 0;
	this.y = 0;
}

function Character(){
	this.position = new Point();
}

function Shot(){
	this.position = new Point();
	this.speed = 0;
	this.alive = false;
}

Shot.prototype.set = function(p,speed){
	this.position.x = p.x + 45;
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
}

Enemy.prototype.set = function(p,type,speed){
	this.position.x = p.x;
	this.position.y = p.y;
	this.speed = speed;
	this.type = type;
	this.alive = true;
}

Enemy.prototype.move = function(){
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

function Bomb(){
	this.position = new Point();
	this.count = 0;
	this.alive = false;
}

Bomb.prototype.set = function(p){
	this.position.x = p.x + 15;
	this.position.y = p.y;
	this.alive = true;
	this.count = 0;
}


