// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Double Pendulum
// https://youtu.be/uWzPe_S-RVE

//length of the pendulum
let r1 = 125;
let r2 = 125;
//size of the pendulum
let m1 = 10;
let m2 = 10;
//angle of the first pendulum
let a1 = 0;
//angle of the second pendulum
let a2 = 0;
//velocity of the first pendulum
let a1_v = 0;
//velocity of the second pendulum
let a2_v = 0;
//universal gravitational constant
let g = 1;
//previous position of pendulum 2 in order to trace the line from previous position
let px2 = -1;
let py2 = -1;

let cx, cy;
let buffer;
let r1Slider;
let r2Slider;

  function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);
    r1Slider = createSlider(125,300,1);
    r1Slider.position(width/2-r1Slider.width-20,10);
    r2Slider = createSlider(125,300,1);
    r2Slider.position(width/2+20,10);
    a1 = PI / 2;
    a2 = PI / 2;
    
    //define the center point of art
    cx = width / 2;
    cy = 50;
    
    // for rendering the graphics separately from the background
    buffer = createGraphics(width, height);
    buffer.background(175);
    buffer.translate(cx, cy);
  }
  
  function draw() {
    background(175);
    imageMode(CORNER);
    image(buffer, 0, 0, width, height);
    let r1 = r1Slider.value();
    let r2 = r2Slider.value();
    
    //calculation for the acceleration of pendulum 1 with gravity
    let num1 = -g * (2 * m1 + m2) * sin(a1);
    let num2 = -m2 * g * sin(a1 - 2 * a2);
    let num3 = -2 * sin(a1 - a2) * m2;
    let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
    let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    let a1_a = (num1 + num2 + num3 * num4) / den;
  
    //calculation for acceleration of pensulum 2 with gravity
    num1 = 2 * sin(a1 - a2);
    num2 = (a1_v * a1_v * r1 * (m1 + m2));
    num3 = g * (m1 + m2) * cos(a1);
    num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
    den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    let a2_a = (num1 * (num2 + num3 + num4)) / den;
  
    translate(cx, cy);
    stroke(0);
    strokeWeight(2);
    
    //calculate the coordinate of the first pendulum
    let x1 = r1 * sin(a1);
    let y1 = r1 * cos(a1);
  
    //caluclate the coordinate of the second pendulum
    let x2 = x1 + r2 * sin(a2);
    let y2 = y1 + r2 * cos(a2);
    
    //draw the first line and pendulum
    line(0, 0, x1, y1);
    fill(0);
    ellipse(x1, y1, m1, m1);
  
    //draw the second line and pendulum
    line(x1, y1, x2, y2);
    fill(0);
    ellipse(x2, y2, m2, m2);
  
    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;
  
    // a1_v *= 0.99;
    // a2_v *= 0.99;
  
    buffer.stroke(0);
    //draw the line only if it has moved more than 1 frame
    if (frameCount > 1) {
      buffer.line(px2, py2, x2, y2);
    }
    
    //save the previous position of the pendulum at the end
    px2 = x2;
    py2 = y2;
  }