// Varying values of d can create varying types of roses even if they all have the same number of petals (meaning same value of n)
// When d = 1 it just becomes a Rhodonea Curve, a curve which can be expressed in the form r = cos(n*k) where n is an integer defining the number of petals (2n if n is even and n when odd)
let n;
let d;
let size = 200;
let dSlider;
let nSlider;
let button; 
let checkbox;
let auto = false;
let play = false;
    
function setup() {
   createCanvas(600, 600);
  // by default p5js uses radians for angles, so we change it to degrees
   angleMode(DEGREES);
   nSlider = createSlider(1,180,1);
   nSlider.position(width/2-nSlider.width-20,10);
   dSlider = createSlider(1,180,1);
   dSlider.position(width/2+20,10);
   textSize(40);
   checkbox = createCheckbox('Auto-Run', false);
   checkbox.changed(myCheckedEvent);
    button = createButton('Play/Pause');
    button.position(19, 19);
    button.mousePressed(buttonPressed);
   
}

function myCheckedEvent() {
  if (this.checked()) {
    auto = true;
  } else {
    auto = false;
  }
}

function draw() {
  // give a black background
  background(0);
  stroke(255);
  textAlign(CENTER);
  drawWords();
  
  if (auto == false){
    // find the center point of the canvas
     translate(width / 2, height / 2);
    // stroke will be white in color
     n = nSlider.value();
     d = dSlider.value();
     noFill();
     beginShape();
     strokeWeight(1);
     for (let i = 0; i < 361; i++) {
        let k = i * d;
        let r = size * sin(n * k);
        let x = r * cos(k);
        let y = r * sin(k);
        vertex(x, y);
     }
     endShape();

    //Draws on only the vertex points 360 times
     noFill();
     stroke(0, 0, 255, 255);
     strokeWeight(4);
     beginShape();
     for (let i = 0; i < 361; i++) {
        let k = i;
        let r = size * sin(n * k);
        let x = r * cos(k);
        let y = r * sin(k);
        vertex(x, y);
     }
     endShape();
  }
  else{
    // find the center point of the canvas
     translate(width / 2, height / 2);
    // stroke will be white in color
     noFill();
     beginShape();
     strokeWeight(1);
     for (let i = 0; i < 361; i++) {
        let k = i * d;
        let r = size * sin(n * k);
        let x = r * cos(k);
        let y = r * sin(k);
        vertex(x, y);
     }
     endShape();

    //Draws on only the vertex points 360 times
     noFill();
     stroke(0, 255, 255, 255);
     strokeWeight(4);
     beginShape();
     for (let i = 0; i < 361; i++) {
        let k = i;
        let r = size * sin(n * k);
        let x = r * cos(k);
        let y = r * sin(k);
        vertex(x, y);
     }
     endShape();
    n+=0.01;
    d+=0.03;
  }
}

function drawWords() {
  fill(255);
  text(`n = ${Math.round(n)}   d = ${Math.round(d)}`,300,80);
}

function buttonPressed(){
  if (play == true){
    noLoop();
    play = false;
  }
  else{
    loop();
    play = true;
  }
}