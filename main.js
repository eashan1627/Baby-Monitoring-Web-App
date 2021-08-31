status = ""; 
var objects = [];
var sound="";

function setup() {       
   canvas = createCanvas(380, 380);
   canvas.center();
   video = createCapture(VIDEO);
   video.size(380, 380);
   video.hide();    
   object_detector = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Status: Detecting Objects";   
}

function modelLoaded() {    
  console.log("Model is loaded successfully.");
  status = "true";
  //Gurpreet : commented executing the model here
  //object_detector.detect(video, gotResult); 
}

function draw() {   
  image(video, 0, 0, 380, 380);

   if (status != "") {     
        //sound.play();
    
     r = random(255);
     g = random(255);
     b = random(255);
     //Gurpreet : executing model here, if the if condition is true, so now the video is not freezing
     object_detector.detect(video, gotResult);  
           
      for (i = 0; i < objects.length; i++) {
         document.getElementById("status").innerHTML = "Staus: Object Detected";
         document.getElementById("number_of_objects").innerHTML = "Number Of Objects detected are " + objects.length;

         fill(r, g, b);
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 20);
         stroke(r, g, b);
         noFill();
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

         //Gurpreet: adding the below code to play sound only if the child(person) is detected, elsad1f5e not
         if(objects[i].label == "person")
         {
           document.getElementById("number_of_objects").innerHTML = "Baby Found";
           console.log("stop");
           sound.stop();
         }
         else
         {
           document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
           console.log("play"); 
           sound.play();
         }
        }

       if(objects.length == 0)
       {
         document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
         console.log("play"); 
         sound.play();
       }

       //Gurpreet: newly added code completes here.
      }       
   }   
 


function preload() {   
   sound = loadSound("the_purge_siren_22.mp3");
}



function gotResult(error, results) {   
   if (error) {
      console.log(error);
   }
   console.log(results);
   objects = results;
}