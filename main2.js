// - grobal ----------
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var counter = 0;
var screen,info;
var fire = false;
var run = true;

// - const -----------
var SCREEN_WIDTH = 360;
var SCREEN_HEIGHT = 360;
var MAX_SHOT_COUNT = 10;


// - main -----------
var p = new Point();
var i,j;

/*
var shot = new Array(MAX_SHOT_COUNT);
for(i = 0;i < MAX_SHOT_COUNT;i++){
	shot[i] = new Shot();
}
*/

window.onload = function(){
	screen = document.getElementById("screen");
	screen.width = SCREEN_WIDTH;
	screen.height = SCREEN_HEIGHT;
	
	info = document.getElementById("info");

	ctx = screen.getContext("2d");

	screen.addEventListener("mousemove",mouseMove,true);
	screen.addEventListener("mousedown",mouseDown,true);
	
	Asset.loadAssets();

	var chara = new Character();
	
	//レンダリング
	(function(){
		info.innerHTML = mouse.x + ":" + mouse.y;
		counter++;
		ctx.clearRect(0,0,screen.width,screen.height);

		chara.position.x = mouse.x;
		chara.position.y = mouse.y;

		ctx.drawImage(Asset.images["box"],chara.position.x,300);


		if(run){setTimeout(arguments.calee,fps);}
	})();
};

// - event --------------
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
	{type:"image",name:"shot",src:"assets/shot.png"}
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




