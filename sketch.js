//experimenting with the triple spiral turning into a collage from the Tropicana

//photos
let base;
let skirt;
let solo;
let light;
let EL;
let alp1 = 100;
let alp2 = 0;
let alp3 = 0;
let alp4 = 0;
let colour = 0;


// shapes
let angle = 0;
let radius = 0;
let spot = 0;
let radInc;
let angInc;
let tone = 100;
let x;
let y;
let glitches = [];

// Tiles configuration
let tiles = [];
let cols = 5;
let rows = 5;
let w, h;
let x1  = 0;
let y1 = 0;

// Order of tiles
let board = [];

function preload(){
  base = loadImage('assets/TropicanaNights_base.png');
  light = loadImage("assets/TropicanaNights_light.png") 
  //skirt = loadImage('assets/TropicanaNights_skirt.png');
  solo = loadImage('assets/TropicanaNights_solo.png')
  EL = loadImage('assets/TropicanaNights_EL.png');
}

function setup() {
  createCanvas(base.width/2, base.height/2);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(0);
  frameRate(5);
  rectMode(CENTER);
  for (let i = 0; i < 50; i++){
    glitches[i] = new Glitch(random(width), random(height), random(width), random(1,10));
  }

  // pixel dimensions of each tiles
  w = width / cols;
  h = height / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(w, h);
      img.copy(base, x, y, w, h, 0, 0, w, h);
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      tiles.push(tile);
    }
  }
}

function draw() {
  
  background(0);
    //light
  push();
  tint(255, alp4);
;    image(light, random(width*.25, width/2), 0, width, height);
    pop();
  // blend(light, 0, 0, light.width, light.height, random(500,700), 0, width, height, LIGHTEST);
  //base photo
  push();
  tint(255, alp1);
  image(base, 0, 0, width, height);
  pop();

 


  if (alp1 <= 15){
    alp4 = 100;
  } else {
    alp4 = 0;
  }

  noStroke();
  // fill(0, alp1);
  // rect(width/2, height/2, width, height);
  

for(let i = 0; i < glitches.length; i++){
  glitches[i].show();
  if (frameCount%8==0){
    glitches[i].change();
  }
}

if (frameCount%int(random(20))==0){
  colour = random(360);
  solo.filter(INVERT);
  alp1 = random(100);
  alp2 = random(50);
  if (alp3 <= 0){
    alp3 = 100;
    alp2 = 100
    } else {
      alp3 = 0;
      alp2 = 0;
    }
  }

// if (alp1 <= 40){
//   alp4 = 100;
// } else {
//   alp4 = 0;
// }

  radInc = random(2);
  angInc = random(5);

  //TRiangle
  push();
  translate(width/2, height/2);
  noFill();
  strokeWeight(random(10,20));
  stroke(180, random(100), tone);
  triangle(random(-100, 100), -300, 300, random(100, 400), -300, random(100, 400));
  pop();

   //solo
   push();
   tint(255, alp1);
   image(solo, random(-100), 0, width, height);
   pop();

   //spiral 1
  push();
  translate(width/2, height/2-100);
  spiral();
  pop();

  //spiral 2
  push();
  translate(width*.3, height/2+200);
  spiral();
  pop();

  //spiral 3
  push();
  translate(width*.7, height/2+200);
  spiral();
  pop();

   //dance shuffle
   push();
   for (let i = 0; i < cols; i++) {
     for (let j = 0; j < rows; j++) {
       let index = int(random(16));
       let x = i * w;
       let y = j * h;
       let tileIndex = board[index];
       if (tileIndex > -1) {
         tint(255, alp3);
         let img = tiles[tileIndex].img;
         image(img, x, y, w, h);
       }
     }
   }


  blend(solo, 0, 0, solo.width, solo.height, 0, 0, width, height, EXCLUSION);

    //EL
    push();
    tint(colour, random(20), 100, alp2);
    EL.filter(GRAY);
    image(EL, random(-50, 50), 0, width, height);
    pop();
  
  pop();
  
}

function spiral(){
  for (let i = 0; i < 200; i++){
  //   radInc = random(2);
  // angInc = random(5);
    push();
    rotate(angle);
    angle += angInc;
    radius += radInc;
    stroke(random(300, 360), 100, tone);
    strokeWeight(random(1,10));
    
    // ellipse(radius,spot,random(5,10), random(5,10));
    point(radius,spot);
    pop();
    if (radius>=10){
      radius = random(-width*.2, width*.2);
      spot = random(-width*.2, width*.2)
      tone = random(100)
    }
  }
}

class Glitch{
  constructor(x, y, wid, high){
    this.x = x;
    this.y = y;
    this.wid = wid;
    this.high = high;
  }
  change(){
    this.x = random(width);
    this.y = random(height);
    this.wid = random(width);
    this.high = random(1, 10);
  }
  show(){
    //noStroke();
    //noFill();
    stroke(70, 100, 100);
    fill(70, 100, 100, random(100));
    rect(this.x, this.y, this.wid, this.high);
  }
}

class Tile {
  constructor(i, img) {
    this.index = i;
    this.img = img;    
  }
}

function mousePressed(){
  saveCanvas('TropNights'+frameCount);
}
