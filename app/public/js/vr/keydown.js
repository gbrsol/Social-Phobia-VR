var audio_manager = new AudioManager(intervention);

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
    pressed_key = true;
  });
  document.addEventListener('onkeyup',function(e){
    pressed_key = false;
  });