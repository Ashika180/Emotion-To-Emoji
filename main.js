prediction1 = "";
prediction2 = "";


Webcam.set({
    width: 450,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach("camera");

function Take_snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("snap").innerHTML = "<img id= 'captured_image' src= '" + data_uri + "'>";
    });
}

console.log("ml5.version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/E7Zi7C-pC/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The prediction one is " + prediction1;
    speak_data2 = "the second prediction is " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function identify_emotion(){
image = document.getElementById("captured_image");
classifier.classify(image, gotResult);
}

function gotResult(error, result){

    if(error){
console.error("Error");
    }

    else{
        console.log(result);
        document.getElementById("result1").innerHTML = result[0].label;
        document.getElementById("result2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();

        if(result[0].label== "Happy"){
            document.getElementById("updated_1").innerHTML =  "&#128522"; 
        }

        if(result[0].label == 'Sad'){
            document.getElementById("updated_1").innerHTML =  "&#128532";
        }

        if(result[0].label == 'Surprised'){
            document.getElementById("updated_1").innerHTML =  "&#128562";
        }

        if(result[1].label == 'Happy'){
            document.getElementById("updated_2").innerHTML =  "&#128522";
        }

        if(result[1].label == 'Sad'){
            document.getElementById("updated_2").innerHTML =  "&#128532";
        }

        if(result[1].label == 'Surprised'){
            document.getElementById("updated_2").innerHTML =  "&#128562";
        }
    }
}