
status = "";
objects = [];



function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    idenitify = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw(){
    image(video,0,0,380,380);
    
    if(status != ""){
        r = floor(random(255));
        g = floor(random(255));
        b = floor(random(255));
        console.log(r,g,b);
        idenitify.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status: Detected Objects";
            document.getElementById("no_of_objects").innerHTML = "There are: " + objects.length + " " + "Objects detected by cocossd";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " +  percent + "%", objects[i].x+10 , objects[i].y+15);
            noFill();
            stroke(r,g,b);
            
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
        
        
    }
}

function modelLoaded(){
    console.log("MOdel loaded");
    status = true;
    
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    
        console.log(results);
        objects = results;
        
    
}