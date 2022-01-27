img = "";
status = "";
objects = [];
objectDetector = "";

function preload()
{
    img = loadImage('ac.jpg');
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
    objectDetector.detect(img, gotResults);
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
    
        

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no.of.objects").innerHTML = "Number Of Objects Detected are : " + objects.length;

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "   " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width - 100, objects[i].height - 100);
        }
    }
}
function back()
{
    window.location = "index.html";
}