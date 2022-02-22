song1 = "";
song2 = "";
var rightWristX = 0;
var rightWristY = 0;
var leftWristX = 0;
var leftWristY = 0;

var leftWristScore= 0;
var rightWristScore= 0;

song1_status=false;
song2_status=false;
function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("Model is loaded");
}
function draw() {
    image(video, 0, 0, 600, 500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill ("red");
    stroke ("red");
    if (rightWristScore>0.2){
       circle (rightWristX , rightWristY , 20);
       if (song1_status==false){
        song2.stop();
        song1.play();
    }
    document.getElementById("song_name").innerHTML="Playing Haryy Potter song";
    } 
    if (leftWristScore>0.2){
        circle (leftWristX , leftWristY , 20);
        if (song2_status==false){
         song1.stop();
         song2.play();
     }
     document.getElementById("song_name").innerHTML="Playing Peter Pan song";
     } 
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWrist X= " + leftWristX + " Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWrist X= " + rightWristX + " Y = " + rightWristY);

        rightWristScore=results[0].pose.keypoints[10].score;
        console.log("rightWristScore = " + rightWristScore);
        
        leftWristScore=results[0].pose.keypoints[9].score;
        console.log("leftWristScore = " + leftWristScore);
    }
}