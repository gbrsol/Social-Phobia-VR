async function wait(funcao)
{
  await funcao();
  return new Promise((resolve, reject) => {
    
  })
}

function waitOpenDoor()
{
  /*
  while(!opened_door)
  {
    setTimeout(function(){console.log('waiting for user to open the door');}, 500);
  }*/
  var door = document.querySelector('#house-door');
  door.addEventListener('animationend',function(){
    setTimeout(function(){walkToSofa();},300);
  });
}

function waitInterventionEnd()
{
  while(!finished) // checar algo sobre waitevent ou algo async
  {
    setTimeout(function(){console.log('waiting for intervention end')},300);
  }
  report.push(new Date().now().toString() + " Status: Finished the session");
}

function waitExit()
{
  while(!exited)
  {
    console.log('waiting for user to exit');
    setTimeout(()=>{},300);
  }
  report.push(new Date().now().toString() + " Status: The session has now ended.....");
}

function waitTransition()
{
  while(!transitioned)
  {
    setTimeout(() => {
      console.log(new Date().now().toString() + " Status: User didn't transition yet");
    }, 500);
  }
}


function waitInstruction()
{
  setTimeout(() => {
    //wait keydown
  }, 500);
}