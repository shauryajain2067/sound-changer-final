song1="";
song2="";
left_wrist_x=0;
left_wrist_y=0;
right_wrist_x=0;
right_wrist_y=0;
scoreleftwrist=0;
scorerightwrist=0;
song1status="";
song2status="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3"); 
}

function setup(){
    
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
  
}

function modelLoaded(){
    console.log("POSENET IS INITILIZED");
}





function gotPoses(results){
    if(results > 0){
        console.log(results);
        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
        console.log("left wrist x is " + left_wrist_x + "left wrist y is " + left_wrist_y);

        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;
        console.log("right wrist x is " + right_wrist_x + "right wrist y is " + right_wrist_y);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("left wrist score is " + scoreleftwrist);
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("right wrist score is " + scorerightwrist);

    }
}

function draw(){
    image(video,0,0,600,500);
    stroke("red");
    fill("red");
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();

    if(scoreleftwrist > 0.2){
        circle(left_wrist_x,left_wrist_y,20);
        song2.stop();
    
    if(song1status == false){
song1.play();
document.getElementById("song_name").innerHTML="playing - Haryy Potter theme song";
legend("song_name")
    }
    }
    if(scorerightwrist > 0.2){
        circle(right_wrist_x,right_wrist_y,20);
        song1.stop();
    
    if(song2status == false){
song2.play();
document.getElementById("song_name").innerHTML="playing - Peter pan";

    }
    }
}
    
