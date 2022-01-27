img = "";
status = "";
objects = [];
objectDetector = "";

function preload()
{
    img = loadImage('sta.jpg');
}

function setup()
{
    canvas = createCanvas(650, 500);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded")
    status = true;
    
}

function gotResults(error, results)
{
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img, 0, 0, 650, 500);

    if(status != "")
    {
    
        objectDetector.detect(img, gotResults);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no.of.objects").innerHTML = "Number Of Objects Detected are : " + objects.length;

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "   " + percent + "%", objects[i].x , objects[i].y );
            noFill();
            stroke("#ff0000");
            rect(objects[i].x - 100, objects[i].y - 100, objects[i].width, objects[i].height);
        }
    }
}
function back()
{
    window.location = "index.html";
}