cancion = "";
cancion2 = "";
puntuacion_derecha = 0;
puntuacion_izquierda = 0;
muñeca_derechaX = 0;
muñeca_derechaY = 0;
muñeca_izquierdaX = 0;
muñeca_izquierdaY = 0;

function preload(){
    cancion = loadSound("creo-aurora.mp3");
    cancion2 = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotResults);
}

function gotResults(results, error){
    if(results.length > 0){
        console.log(results);
        muñeca_derechaX = results[0].pose.rightWrist.x;
        muñeca_derechaY = results[0].pose.rightWrist.y;
        muñeca_izquierdaX = results[0].pose.leftWrist.x;
        muñeca_izquierdaY = results[0].pose.leftWrist.y;

        puntuacion_derecha = results[0].pose.keypoints[10].score;
        puntuacion_izquierda = results[0].pose.keypoints[9].score;
    }

    else{
        console.error(error);
    }
}

function modelLoaded(){
    console.log("modelo cargado");
}

function draw(){
    image(video, 0, 0, 500, 400);
    cancion1_status = cancion.isPlaying();
    cancion2_status = cancion2.isPlaying();
    fill("red");
    stroke("yellow");

    if(puntuacion_derecha > 0.2){
        circle(muñeca_derechaX, muñeca_derechaY, 20, 20);
        cancion2.stop();
        if(cancion1_status == false){
            cancion.play();
            document.getElementById("nombre_cancion").innerHTML = "Reproduciendo cancion de = creo-aurora";
        }
    }

    if(puntuacion_izquierda > 0.2){
        circle(muñeca_izquierdaX, muñeca_izquierdaY, 20, 20);
        cancion.stop();
        if(cancion2_status == false){
            cancion2.play();
            document.getElementById("nombre_cancion").innerHTML = "Reproduciendo cancion de = Harry Potter";
        }
    }
}