let handpose;
let video;
let predictions = [];

const coef = 1.3

function setup() {
    createCanvas(640 * coef, 480 * coef);
    video = createCapture(VIDEO);
    video.size(width * coef, height * coef);

    handpose = ml5.handpose(video, modelReady);

    handpose.on("predict", results => {
        predictions = results;
    });    
    video.hide();
}

function modelReady() {
    console.log("Model ready!");
}

function draw() {
    image(video, 0, 0, width, height);    
    drawKeypoints();
}

const pouce = [2, 3]
const index = [5, 6, 7]
const majeur = [9, 10, 11]
const ori = [13, 14, 15]
const anu = [17, 18, 19]

const fingers = pouce.concat(index).concat(majeur).concat(ori).concat(anu)
const hand = [0, 1, 2, 5, 9, 13, 17, 0]

function drawKeypoints() {    
    for (let i = 0; i < predictions.length; i++) {        
        const prediction = predictions[i];
        for (let j = 0; j < prediction.landmarks.length; j++) {
            const keypoint = prediction.landmarks[j];
            if (fingers.includes(j)) {
                const keypoint2 = prediction.landmarks[j + 1];
                stroke(0, 0, 255)
                strokeWeight(6)                
                line(keypoint[0] * coef, keypoint[1] * coef, keypoint2[0] * coef, keypoint2[1] * coef)                
            } 
            
            if (hand.includes(j)) {
                fill(0, 255, 0);
                noStroke();
                ellipse(keypoint[0] * coef, keypoint[1] * coef, 10, 10);
            }
        }        
    }    
}
