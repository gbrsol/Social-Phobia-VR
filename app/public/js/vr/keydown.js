

function initializeAudio()
{
    var avataranjo = document.querySelector('#angel');
    var audio_manager = new AudioManager(avataranjo,{
        "relax":"baloon", 
        "transition": "staircase", 
        "clinical":{
            "scene": "house", 
            "situation": "relative"
            },
        "transition_exit": "staircase"
    });
}

document.addEventListener('onkeydown',function(e){

    switch(e.key)
    {
        case "ArrowLeft":
            audio_manager.play();
            break;
        case "ArrowRight":
            audio_manager.nextQuestion();
            break;
        case "ArrowUp":
            audio_manager.nextPositive();
            break;
        case "ArrowDown":
            audio_manager.nextNegative();
            break;
    }
    console.log(e.key.toString());
    pressed_key = true;
  });
  document.addEventListener('onkeyup',function(e){
    pressed_key = false;
  });