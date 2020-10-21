
document.addEventListener('onkeydown',(e)=>{
  switch(e.keyCode)
  {
    case 	37: //left

      break;
    case 38: //up
      
      break;
    case 39: //right
      
      break;
    case 40: //down
      
      break;
    case 70: //f
      finished = true;
    break;
    case 13: //esc
      exited = true;
    break;
  }
});

function playCycleAngelAudio()
{
  var angel = document.querySelector('#angel');
  angel.components.sound.playSound();
  var current = angel.getAttribute('sound','src');
  var index = audios_to_play.indexOf(current)+1;
  if(index == audios_to_play.length())
    index = 0;
  angel.setAttribute('sound','src',audios_to_play[index]);
}

function loadSituation(inter)
{
  var relax = document.querySelector('#relax');
  var trans = document.querySelector('#transition');
  var clin = document.querySelector('#clinical');
  /*switch(inter["scene"])
  {
    case 'house':
      // ajustar posições
      relax.setAttribute('position',"-0.35 2 -8");
      trans.setAttribute('position',"7 0 -6");
      clin.setAttribute('position',"-10 -20 0");
      break;
  }
  */
  //loadInteractives(inter); // doors, etc
  setupCharacter(inter);
}

function playSituation(inter)
{
  angel = document.querySelector('#angel');
  audios_to_play = getAngelAudios(inter);
  spawnAngel();
  angelGreet();
  playCycleAngelAudio();
  var scene = inter['scene'];
  var situation = inter['situation'];
  while(!transitioned)
  {
    setTimeout(() => {
      console.log(new Date().now().toString() + " Status: User didn't transition yet");
    }, 500);
  }
  switch(scene)
  {
    case 'house':
      switch(situation)
      {
        case 'relative':
        //pegar pegada na frente da porta e ciclar audio nela
        while(!opened_door)
        {
          setTimeout(()=>{}, 500);
        }
        walkToSofa();
        break;

        case 'cellphone':
          cellphoneRingtone();
          while(!opened_door) // porta do quarto
          {
            setTimeout(()=>{}, 500);
          }
          break;
        
        case 'delivery':
          while(!opened_door)
          {
            setTimeout(()=>{},500);
          }
          break;
          
      }
      break;
  }
  while(!finished) // checar algo sobre waitevent ou algo async
  {
    setTimeout(()=>{},300);
  }console.log(new Date().now().toString() + " Status: Finished the session");
  while(!exited)
  {
    setTimeout(()=>{},300);
  }
  console.log(new Date().now().toString() + " Status: The session has now ended.....");
}

function walkToSofa()
{
  var character = document.querySelector('#character');
  character.emit('walk');
  character.setAttribute('animation','property', 'position', '0 0 0'); // colocar posição do sofá
  character.setAttribute('animation','dur',3000)
  setTimeout(() => {
    character.setAttribute('animation',"");
  }, 3000);
  character.emit('sit');
}
function angelGreet()
{
  angel = document.querySelector('#angel');
  angel.setAttribute('sound','src',angel_audio["greeting"].audios[0]);
  angel.components.sound.playSound();
}
function getAngelAudios(inter)
{
  var list = new List()
  for(audio in angel_audio[inter["scene"]].audios)
  {
    list.push(audio);
  }
  return list;
}

function spawnAngel()
{
  angel = document.querySelector('#angel');
  player = document.querySelector('#player');
  angel.setAttribute('visible',true);
  angel.setAttribute('position','-0.3 -0.3 -0.3');
  player.removeChild(angel);
  player.appendChild(angel);
}

function despawnAngel()
{
  angel = document.querySelector('#angel');
  angel.setAttribute('visible',false);
  angel.setAttribute('position','-0.3 -0.3 -0.3');
}

function createAvatar(id)
{
  scene = document.querySelector('a-scene');
  ent = document.createElement('a-entity');
  ent.setAttribute('model',id);
  ent.setAttribute('avatar','');
  scene.appendChild(ent);
}
var intervention = {
  relax: "baloon",
  transition: "tunnel",
  clinical: {
    scene: "house", 
    situation: "relative"
  }
};
function loadSituationFromJSON(inter)
{
  loadRelax(inter["relax"]);
  loadTransition(inter["transition"]);
  loadClinical(inter["clinical"]["scene"]);
  loadSituation(inter["clinical"]);
}
function soundTest()
{
  var el = document.querySelector('#relax');
  relax.components.sound.playSound();
}
function loadRelax(relax)
{
  var el = document.querySelector('#relax');
  switch(relax)
  {
    case 'baloon':
      el.setAttribute('position','3 0 0.5');
      el.setAttribute('baloon','');
      break;
  }
}

function blinkTransition()
{
  var anchor = document.querySelector('#user-anchor');
  var player = document.querySelector('#player');
  var pos = anchor.getAttribute('position');
  var clin = document.querySelector('#clinical');
  var posclin = clin.getAttribute('position');
  var abs = {x: pos.x + posclin.x, y: pos.y + posclin.y, z: pos.z + posclin.z};

  player.setAttribute('position', abs); // arrumar pra absoluto
  setTimeout(() => {
    transitioned = true;
  }, 500);
}

function loadTransition(trans)
{
  var el = document.querySelector('#transition');
  var ent = document.createElement('a-entity');
  var plane = document.createElement('a-plane');
  plane.setAttribute('src','#portal');
  plane.setAttribute('scale','2 2');
  plane.setAttribute('material','color','#FF0000');
  plane.addEventListener('click',function(){blinkTransition();});
  plane.classList.add('clickable');
  switch(trans)
  {
    case 'tunnel':
      el.setAttribute('model','scene','#tunnel');
      el.setAttribute('model','scale','0.01 0.01 0.03');
      // check position later
      plane.setAttribute('position','0 1.5 -4');
      //el.appendChild(ent);
      break;

    case 'staircase':
      el.setAttribute('model','scene','#staircase');
      el.setAttribute('scale','0.1 0.1 0.1');
      el.setAttribute('position',"12.80991 -7.45887 -6");
      el.setAttribute('rotation','0 90 0');
      plane.setAttribute('scale','30 30 30');
      plane.setAttribute('position','13 17 -8.5');
      break;
  }
  el.appendChild(plane);
}

function loadClinical(clin)
{
  var el = document.querySelector('#clinical');
  // switch to variable as in '#'+clin+'mtl'
  switch(clin)
  {
    case 'cabin': // cabin é pra testes
      el.setAttribute('model',{ext:'obj',scene:'#cabin',material:'#cabin-mtl',scale:'1 1 1'});
      break;
    case 'house':
      el.setAttribute('model',{ext:'obj',scene:'#cabin',material:'#cabin-mtl',scale:'1 1 1'});
      break;
  }
}

function loadAngel()
{
  var angel = document.querySelector('#angel');
  angel.setAttribute('model','scene','#mario');
  angel.setAttribute('position','0.2 0.2 -0.5');
  angel.setAttribute('angel-avatar','');
}

function setupCharacter(inter)
{
  var character = document.querySelector('#character');
  var scene = inter["scene"];
  var situation = inter["situation"];
  switch(scene)
  {
    case 'house':
      switch(situation)
      {
        case 'relative':
          character.setAttribute('model','scene','#relative');
          character.setAttribute('position','0 0 0');
        break;
        case 'cellphone':
          character.setAttribute('model','scene','#cellphone');
          character.setAttribute('position','0 0 0');
          break;
        case 'delivery':
          character.setAttribute('model','scene','#deliveryman');
          character.setAttribute('position','0 0 0');
          break;
      }
      break;

    case 'shopping':
      switch(situation)
      {
        case 'fastfood':
          character.setAttribute('model','scene','#attendant');
          character.setAttribute('position','0 0 0');
        break;
      }
      break;
  }
}