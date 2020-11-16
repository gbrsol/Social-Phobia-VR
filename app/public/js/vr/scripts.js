
function loadCharacters(inter)
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
  var angel = document.querySelector('#angel');
  audio_manager.play();
  var scene = inter['scene'];
  var situation = inter['situation'];
  var character = document.querySelector('#character');

  character.classList.add('clickable');
  switch(scene)
  {
    case 'house':
      switch(situation)
      {
        case 'relative':
        character.addEventListener('click', function(){
            character.classList.remove('clickable');
            walkToSofa();
        })
        break;

        case 'cellphone':
          interacted_with_npc = true;
          break;
        
        case 'delivery':
          character.addEventListener('click', function(){
            character.classList.remove('clickable');
            getMoneyGivePizza();
          })
          break;
      }
      break;
    case 'shopping':
      break;
  }
  waitInterventionEnd();
  waitExit();
}

function createButtons(buttons)
{
  var scene = document.querySelector('a-scene')
  for(var i = 0; i < buttons.length; i++)
  {
    scene.appendChild(buttons[i])
  }
}


function walkToSofa()
{
  var character = document.querySelector('#character');
  character.emit('walk');
  // position="0.25171 -40 -0.28302" rotation=""></a-entity>
  character.setAttribute('animation__tosofa',{property:'position',to:"0.25171 -40 -0.28302",dur: 5000});
  //character.setAttribute('animation','property', 'position', "0.25171 -40 -0.28302"); // colocar posição do sofá
  setTimeout(function(){
    character.setAttribute('rotation','0 0 0');
    character.emit('sit');
  }, 5100);
}

function spawnAngel()
{
  angel = document.querySelector('#angel');
  angel.setAttribute('visible',true);
  document.querySelector("#angel-text").style.visibility = "visible";
}

function despawnAngel()
{
  angel = document.querySelector('#angel');
  angel.setAttribute('visible',false);
  document.querySelector("#angel-text").style.visibility = "hidden";
}

function createAvatar(id)
{
  scene = document.querySelector('a-scene');
  ent = document.createElement('a-entity');
  ent.setAttribute('model',id);
  ent.setAttribute('avatar','');
  scene.appendChild(ent);
}
function loadSituation(inter)
{
  //restartSimulation();
  loadRelax(inter["relax"]);
  loadTransition(inter);
  loadClinical(inter["clinical"]["scene"]);
  loadFootsteps(inter["clinical"]);
  loadCharacters(inter["clinical"]);
  loadExit(inter);
  loadAngel();
  playSituation(inter['clinical']);
}
function soundTest()
{
  var el = document.querySelector('#relax');
  relax.components.sound.playSound();
}

function cellphoneRingtone()
{
  var cell = document.querySelector('#character');
  cell.setAttribute('sound','src','#ringtone');
  cell.components.sound.playSound();
}

function responseYes()
{
  audio_manager.nextPositive();
  var character = document.querySelector('#character');
  if(audio_manager.checkPreCharacter())
    character.emit('click');
}

function responseNo()
{
  audio_manager.nextNegative();
  var door = document.querySelector('#house-door')
  door.emit('click')
}

function responseRepeat()
{
  audio_manager.play();
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

function createFootsteps(positions, rotations)
{
  var id = 1;
  var scene = document.querySelector('a-scene');
  for(var i = 0; i < positions.length; i++)
  {
    var el = document.createElement('a-plane');
    el.setAttribute('id','footsteps-'+ (i+1));
    el.setAttribute('rotation',{x:-90, y:rotations[i]});
    el.setAttribute('material',{src:'#footstep'});
    el.setAttribute('blink-teleportation','');
    el.setAttribute('position',positions[i]);
    el.classList.add('clickable');
    scene.appendChild(el);
  } 
}

function tocaCampainha()
{
  var scene = document.querySelector('a-scene')
  scene.setAttribute('sound','src','#knock_door')
  scene.components.sound.playSound();
}

function loadFootsteps(inter)
{
  var scene = inter['scene'];
  var rotations = [];
  var positions = [];
  var positions_chao = [ "0.027 0.01 -1.3", "4.6 0.01 -2.9", "14, 0.01 -4.3"] // primeiro canto, depois balão
  var rotacao_chao = ["0", "-90","-90"]

  var positions_escada = ["9.2 0.01 -4.3", "15.62 -2.6 -4.2", "15.62 -2.6 -6.4"]
  var rotacao_escada = ["-90","-90","0"]

  var positions_tunel = []
  var rotacao_tunel = []

  var pos = []
  var rot = []

  positions = positions.concat(positions_chao);
  positions = positions.concat(positions_escada);
  rotations = rotations.concat(rotacao_chao);
  rotations = rotations.concat(rotacao_escada);
  switch(scene)
  { 
    case 'house':
      pos = ["6.85164 -39.9465 -0.76414", 
      "2.6907 -39.9465 -0.76414",
      "2.6907 -39.9465 3.51758",
      "-3.02575 -39.9465 3.51758",
      "-3.02575 -39.9465 -0.82681",
      "3.05 -39.9465 7.581", 
      "5.886 -39.9465 7.581",
      "10.33 -37.3 7.581"]
      rot = ["90","90","180","0","0", "180","-90", "-90"]
      positions = positions.concat(pos)
      rotations = rotations.concat(rot);
      break;

    case 'shoppingmall':
      break;

    case 'park':
      break;
  }
  console.log(positions);
  createFootsteps(positions, rotations);
}

function blinkTransition()
{
  var anchor = document.querySelector('#user-anchor');
  var player = document.querySelector('#player');

  //var pos = new THREE.Vector3();
  //anchor.object3D.getWorldPosition(pos);
  //console.log(pos)
  var pos = anchor.getAttribute('position');
  var camera = document.querySelector('a-camera');
  player.setAttribute('position', pos); // arrumar pra absoluto
  //camera.setAttribute('position',pos);
  //camera.object3D.position.y +=1.6;
  setTimeout(() => {
    transitioned = true;
  }, 500);
  audios_transition();
}

function getTransitionAudio(clin)
{
  var scene = clin["scene"];
  var situation = clin["situation"];
  switch(scene)
  {
    case 'house':
      switch(situation)
      {
        case 'delivery':
          audios_transition = function(){tocaCampainha(); spawnAngel();audio_manager.waitAnswer()}
          break;
        case 'relative':
          audios_transition = function(){tocaCampainha(); spawnAngel();audio_manager.waitAnswer()}
          break;
        case 'cellphone':
          audios_transition = function(){
            cellphoneRingtone(); setTimeout(()=>{audio_manager.waitAnswer();spawnAngel()}, 500);
          }
          break;
      }
      break;
  }
}

function loadTransition(inter)
{
  var trans = inter["transition"];
  var el = document.querySelector('#transition');
  var ent = document.createElement('a-entity');
  var plane = document.createElement('a-plane');
  plane.setAttribute('id','trans-anchor');
  plane.setAttribute('src','#portal');
  plane.setAttribute('scale','2 2');
  plane.setAttribute('material','color','#FF0000');
  getTransitionAudio(inter["clinical"]);
  plane.addEventListener('click',function(){
    blinkTransition();//inter["clinical"]);
  });
  plane.classList.add('clickable');
  switch(trans)
  {
    case 'tunnel':
      el.setAttribute('model','scene','#tunnel');
      el.setAttribute('scale','0.01 0.01 0.03');
      // check position later
      el.setAttribute('rotation', "0 -90 0")
      el.setAttribute('position',"13 0 -4.3")

      plane.setAttribute('position','-0.5 137.7 -108.3');
      plane.setAttribute('width',"150")
      plane.setAttribute('height',"128")
      //el.appendChild(ent);
      break;

    case 'staircase':

      el.setAttribute('model','scene','#staircase');
      el.setAttribute('scale','0.07 0.07 0.07');
      el.setAttribute('position',"12 -5.3 -5.6");
      el.setAttribute('rotation','0 90 0');
      plane.setAttribute('scale','30 30 30');
      plane.setAttribute('position','13 17 -8.5');
      break;
  }
  el.appendChild(plane);
}

function createDoor(pos)
{
  var scene = document.querySelector('a-scene');
  var door = document.createElement('a-entity');
  door.setAttribute('scale','0.01 0.01 0.01');
  door.setAttribute('id','house-door');
  door.setAttribute('door',"");
  door.setAttribute('position',pos)
  scene.appendChild(door);
}
function loadClinical(clin)
{
  var el = document.querySelector('#clinical');
  var scene = document.querySelector('a-scene');
  var anchor = document.querySelector('#user-anchor');
  // switch to variable as in '#'+clin+'mtl'
  switch(clin)
  {
    case 'cabin': // cabin é pra testes
      el.setAttribute('model',{ext:'obj',scene:'#cabin',material:'#cabin-mtl',scale:'1 1 1'});
      break;
    case 'house':
      el.setAttribute('model',{ext:"obj",scene:'#casa',material:'#casa-mtl'});
      el.setAttribute('scale','0.01 0.01 0.01'); // pra outra 0.03
      el.setAttribute('position', '-7 -40 -4');
      anchor.setAttribute('position',"7.60976 -39.9 -0.93902");
      createDoor("2.5057 -39.05853 5.13933");

      //criar background
      var planeBedroom = document.createElement('a-plane');
      planeBedroom.setAttribute('position','6.7 -39 -3')
      planeBedroom.setAttribute('scale','2.5 1.270 1');
      planeBedroom.setAttribute('src','#fence');

      var planeLR = document.createElement('a-plane');
      planeLR.setAttribute('position','-4.2 -38.4 1.3')
      planeLR.setAttribute('scale','1.8 1.6 1');
      planeLR.setAttribute('src','#street');
      planeLR.setAttribute('rotation','0 90 0')

      scene.appendChild(planeBedroom);
      scene.append(planeLR);
      break;
  }
}

function loadExit(inter)
{
  var el = document.querySelector('#transition_exit');
  var ent = document.createElement('a-entity');
  var plane = document.createElement('a-plane');
  var trans = inter["transition_exit"]
  var scene = inter["clinical"]["scene"]
  plane.setAttribute('id','trans-exit-anchor');
  plane.setAttribute('src','#portal');
  plane.setAttribute('scale','2 2');
  plane.setAttribute('material','color','#FF0000');
  plane.classList.add('clickable');
  plane.addEventListener('click',function(){sessionReport()})
  switch(scene)
  {
    case 'house':
      switch(trans)
      {
        case 'tunnel':
        case 'staircase':/*
          el.setAttribute('model','scene','#staircase');
          el.setAttribute('scale','0.07 0.07 0.07');
          el.setAttribute('position',"4.2 -45.36 7.1");
          el.setAttribute('rotation','0 0 0');
          plane.setAttribute('scale','30 30 30');
          plane.setAttribute('position','13 17 -8.5');*/
          var arrow = document.createElement('a-entity')
          arrow.setAttribute('model',{ext:"obj", scene: "#arrow", material: "#arrow-mtl"})
          arrow.setAttribute('position', '7.5 -38.74106 7.66096')
          arrow.setAttribute('rotation', '-130 90 0')
          arrow.setAttribute('scale', '0.2 0.2 0.2')
          arrow.classList.add('clickable')
          arrow.addEventListener('click', ()=>{
            document.querySelector('#footsteps-14').emit('click')
            arrow.classList.remove('clickable')
          })
          document.querySelector('a-scene').appendChild(arrow)
          
          el.setAttribute('position','12.51598 -36.24594 7.72012')
          plane.setAttribute('rotation',"0 -90 0")
          break;    
      }
      break;
  }
  el.appendChild(plane)
}

function loadAngel()
{
  var angel = document.querySelector('#angel');
  angel.setAttribute('model','scene','#mario');
  angel.setAttribute('position',"0.55772 -0.01885 -0.47872");
  angel.setAttribute('rotation','10 -30 0');
  angel.setAttribute('scale','0.02 0.02 0.02');
  angel.setAttribute('angel-avatar','');
  //<a-entity id="angel" sound="src: [object Object]" gltf-model="/assets/models/characters/doctor_mario/scene.gltf" scale="0.02 0.02 0.02" model="scene: #mario" position="1.28716 0.29517 -1.00378" angel-avatar="" rotation="10 -29.999999999999996 0"></a-entity>
  spawnAngel()
}

function getPhone()
{
    var scene = document.querySelector('a-scene')
    var cell = document.querySelector('#character')
    var cam = document.querySelector('a-camera')
    var ent = document.createElement('a-entity')//cell.cloneNode()

    var plane = document.createElement('a-plane');
    plane.setAttribute('id', 'plane_cellphone')
    plane.addEventListener('click', ()=>{putDownPhone(); })
    plane.setAttribute('width', 0.2)
    plane.setAttribute('height', 0.2)
    plane.setAttribute('position', '7.3 -39.2 0.55')
    plane.setAttribute('rotation','-90 0 0')
    plane.classList.add('clickable')

    scene.appendChild(plane)
    scene.removeChild(cell)
    
    createPhone(ent);
    ent.setAttribute('position','0.3 -0.01 -0.175')
    ent.setAttribute('rotation','-90 120 180')
    cam.appendChild(ent)
    report.push(new Date().getTime()+": O usuário pegou o celular");
}

function putDownPhone()
{
    //retirar celular do usuário e voltar pra mesa
    var cell = document.querySelector('#character');
    var player = document.querySelector('a-camera');
    var scene = document.querySelector('a-scene');
    var ent = document.createElement('a-entity');
    createPhone(ent);
    ent.setAttribute('position',"7.41339 -39.22504 0.55851");

    player.removeChild(character);
    var plane = document.querySelector('plane_cellphone')
    scene.appendChild(ent);
    scene.removeChild(plane)

    report.push(new Date().getTime() + ": O usuário colocou o celular na mesa");
}

function createPhone(element)
{
  element.setAttribute('id','character');
  element.setAttribute('model','scene','#cellphone');
  //element.setAttribute('scale','0.01 0.01 0.01')
  element.setAttribute('rotation','180 180 0');
  element.classList.add('clickable');
  element.addEventListener('click',function(){
    getPhone();
    console.log('user picked the phone');
  });
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
          // position="3.16801 -40 6.63065" rotation="0 180 0"></a-entity>
          character.setAttribute('position',"3.16801 -40 5.6");
          character.setAttribute('rotation',"0 180 0");
          character.setAttribute('scale','0.5 0.5 0.5');
        break;
        case 'cellphone':
          // scale="0.01 0.01 0.01" model="scene: #cellphone" position="7.41339 -39.22504 0.55851" rotation="180 180 0"></a-entity>
          createPhone(character);
          character.setAttribute('position',"7.41339 -39.22504 0.55851");
          break;
        case 'delivery':
          character.setAttribute('model','scene','#deliveryman');
          character.setAttribute('position',"3.16801 -40 5.6");
          character.setAttribute('rotation',"0 180 0");
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
    
    case 'park':
      switch(situation)
      {
        case 'stranger':
          character.setAttribute('model','scene','#stranger');
          character.setAttribute('position','0 0 0');
          break;
      }
      break;
  }
}


function getMoneyGivePizza()
{
  var character = document.querySelector('#character');
  //waitInstruction(); // espera psicólogo falar, em instrução pega o "dinheiro"
  character.emit('greet');
  setTimeout(()=>{character.emit('give')}, 500);
  character.emit('stop');
  setTimeout(() => {
    character.emit('idle')
  }, 2000);
}



function sessionReport()
{
  //enviar para o relatório uma string
  app.app.controllers.admin.insert_relatorio(report);
}

function loadSituationForm()
{
  var relax = document.getElementById('opt_relax').value.toString();
  var ent = document.getElementById('opt_transition').value.toString();
  var clin = document.getElementById('opt_clinical').value.toString();
  var sit = document.getElementById('opt_situation').value.toString();
  var exit = document.getElementById('opt_transition_exit').value.toString();
  var json = JSON.parse('{ "relax": "'+relax + '", "transition": "'+ ent + '", "clinical":{ "scene": "'+ clin + '", "situation": "'+sit + '"}, "transition_exit": "'+ exit + '"}')
  loadSituation(json);
  initializeSimulation(json);
}

function restartSimulation()
{
  document.body.innerHTML = sim_start_dom;
}