
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
  setTimeout(() => {
    audio_manager.play();
  }, 300);
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
    
    case 'office':
      break;
    case 'shopping':
      break;
  }
  waitInterventionEnd();
  waitExit();
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

function loadRender(inter)
{
  var clin = inter["clinical"]["scene"]
  var plane = document.querySelector('#trans-anchor')
  var plane_exit = document.querySelector('#exit-anchor')
  switch(clin)
  {
    case 'house':
      plane.setAttribute('src','#render-house')
      break;
    case 'office':
      plane.setAttribute('src','#render-office')
      break;
  }

  //plane_exit.setAttribute('src','#render-relax')
}

function loadRaycaster()
{
  var scene = document.querySelector('a-scene')
  var interactives = scene.querySelectorAll('.clickable')
  for(var i = 0; i < interactives.length; i++)
  {
    interactives[i].setAttribute('raycastable',"");
  }
}

function switchButtonsToScene()
{
  var camera = document.querySelector('a-camera')
  var yes_player = document.querySelector('#btn-yes-player')
  var no_player = document.querySelector('#btn-no-player')
  var yes = document.querySelector('#btn-yes')
  var no = document.querySelector('#btn-no')
  var pos_y = new THREE.Vector3();
  var pos_n = new THREE.Vector3();
  yes_player.object3D.getWorldPosition(pos_y)
  no_player.object3D.getWorldPosition(pos_n)
  yes.setAttribute('position',pos_y)
  no.setAttribute('position',pos_n)
  yes.setAttribute('visible',true)
  no.setAttribute('visible',true)
}

function loadSituation(inter)
{
  //restartSimulation();
  document.querySelector('#player').setAttribute('position','0.016 0 -1.87')
  loadRelax(inter["relax"]);
  loadTransition(inter);
  loadClinical(inter["clinical"]["scene"]);
  loadCharacters(inter["clinical"]);
  loadExit(inter);
  loadAngel();
  loadRender(inter)
  loadRaycaster();
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
    var el = document.createElement('a-circle');
    el.setAttribute('radius','0.3')
    el.setAttribute('id','footsteps-'+ (++footstep_quant));
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
  var scene = inter["clinical"]["scene"];
  var rotations = [];
  var positions = [];
  var positions_relax = [ "0.027 0.01 -1.3", "1.73134 0.01 -2.04948", "4.6 0.01 -2.9", "14, 0.01 -4.3"] // primeiro canto, depois balão
  var rotacao_relax = ["0", "-90", "-90","-90"]

  var positions_transition = ["9.2 0.01 -4.3", "15.62 -2.6 -4.2", "15.62 -2.6 -6.4"]
  var rotacao_transition = ["-90","-90","0"]

  var pos = []
  var rot = []

  positions = positions.concat(positions_relax);
  positions = positions.concat(positions_transition);
  rotations = rotations.concat(rotacao_relax);
  rotations = rotations.concat(rotacao_transition);
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
      "10.33 -37.3 7.581",
      "1.106 -39.9 1.17" // perto do centro
    ]
      rot = ["-90","90","180","0","0", "180","-90", "-90", "90"]
      positions = positions.concat(pos)
      rotations = rotations.concat(rot);
      break;

    case 'office':
      pos = ['-0.62 -39.9465 -1.885', '4.174 -39.9465 -1.688']
      rot = ['0', '90']
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
  var camera = document.querySelector('#player');
  player.setAttribute('position', pos);
  
  //camera.setAttribute('position',pos);
  //camera.object3D.position.y +=1.6;
  setTimeout(() => {
    document.querySelector('a-camera').setAttribute('rotation','0 -180 0');
     // arrumar pra absoluto
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
          audios_transition = function(){
            setTimeout(() => {
              tocaCampainha(); spawnAngel();audio_manager.waitAnswer()
            }, 500);
          }
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
  //plane.setAttribute('material','color','#FF0000');
  getTransitionAudio(inter["clinical"]);
  plane.addEventListener('click',function(){
    blinkTransition();//inter["clinical"]);
  });
  plane.classList.add('clickable');
  switch(trans)
  {
    case 'tunnel':
      el.setAttribute('model','scene','#tunnel');
      el.setAttribute('scale','0.01 0.01 0.036');
      // check position later
      el.setAttribute('rotation', "0 -90 0")
      el.setAttribute('position',"13 0 -4.3")

      plane.setAttribute('position','-0.5 137.7 -108.3');
      plane.setAttribute('width',"150")
      plane.setAttribute('height',"128")
      plane.setAttribute('src','#render-house')
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

function createDoor(id,pos, rot, isClickable)
{
  var scene = document.querySelector('a-scene');
  var door = document.createElement('a-entity');
  door.setAttribute('scale','0.01 0.01 0.01');
  door.setAttribute('id',id+'-door');
  door.setAttribute('door','rot',rot);
  door.setAttribute('position',pos)
  
  if(isClickable)
    door.classList.add('clickable')

  setTimeout(()=>{scene.appendChild(door);}, 500)
}

function startInterventionTimer(time)
{
  setTimeout(() =>{
    nextPhase();
  } , time * 1000);
}

function makeText(value)
{
  var text = document.createElement('a-entity')
  text.setAttribute('text-geometry',{'value': value, 'height' : 0.1, 'size': 0.1})
  text.setAttribute('rotation','0 -90 0')
  text.setAttribute('text-geometry','height: 0.1')
  text.setAttribute('scale','1 1 0.1')
  text.setAttribute('material','color','#ec0404')
  text.setAttribute('position', '4.68 -37.8 3.03')
  return text;
}
function spawnExitPortal()
{
  var scene = document.querySelector('a-scene')
  
  //var player = document.querySelector("#player")
  ///var pos = portal.getAttribute('position')
  ///player.setAttribute('position',"5.49026 -39.9465 3.22022")
  //player.setAttribute('rotation', '-1.7 365.662 0')
  //player.position.y +=1.6
  var text = makeText("EXIT")
  var exit = document.querySelector('#exit-door')
  exit.emit('click')
  scene.appendChild(text);
  createFootsteps(["4.644 -39.9 3.128" , "7.462 -39.9 3.128", "9.7 -39.9 3.128"], ["-90", "-90", "-90"]);
  scene.appendChild(portal)
}

function createExitDoor(pos)
{
  var scene = document.querySelector('a-scene');
  var door = document.createElement('a-entity');
  door.setAttribute('scale','0.01 0.01 0.01');
  door.setAttribute('id','exit-door');
  door.setAttribute('door',"");
  door.setAttribute('position',pos)
  scene.appendChild(door);
}

function scaleDoor(id)
{
  switch(id)
  {
    case 'house':
      document.querySelector('#'+id+'-door').getChildren()[0].setAttribute('scale',{x: 1.6});
      document.querySelector('#'+id+'-door').classList.add('clickable')
      break;
    case 'exit':
      document.querySelector('#exit-door').setAttribute('rotation',{y:90})
      document.querySelector('#exit-door').setAttribute('scale',"0.011 0.01 0.01")
      document.querySelector('#exit-door').classList.toggle('clickable', false)
      break;
    case 'office':
      document.querySelector('#'+id+'-door').getChildren()[0].setAttribute('scale',{x: 1.6});
      document.querySelector('#'+id+'-door').classList.add('clickable')
      break;
  }
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
      anchor.setAttribute('position',"2.6 -39.9 -0.9");
      createDoor('house',"2.5057 -39.05853 5.13933", 80, true);
      createDoor('exit',"4.737 -39.059 3.511", -170, false)
    
      setTimeout(() => {
        scaleDoor('house')
        scaleDoor('exit')
      }, 3000);

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
    
    case 'office':
      el.setAttribute('model',{ext:"obj",scene:'#office',material:'#office-mtl'});
      el.setAttribute('scale','0.01 0.01 0.01'); // pra outra 0.03
      el.setAttribute('position', '-7 -40 -4');
      anchor.setAttribute('position',"4.04 -39.9 -0.9");
      createDoor('office',"-0.975 -39.081 -2.354", 170, true);
      setTimeout(() => {
        scaleDoor('office')
        
      }, 3000);
      break;
  }
}

function loadExit(inter)
{
  var el = document.querySelector('#transition_exit');
  var ent = document.createElement('a-entity');
  var plane = document.createElement('a-plane');
  var trans = inter["transition"] // era transition_exit antes
  var scene = inter["clinical"]["scene"]
  plane.setAttribute('id','trans-exit-anchor');
  plane.setAttribute('src','#portal');
  plane.setAttribute('scale','2 2');
  //plane.setAttribute('material','color','#FF0000');
  plane.classList.add('clickable');
  plane.addEventListener('click',function(){
    //sessionReport(); 
    document.querySelector('#player').setAttribute('position','0 0 0')})
  switch(scene)
  {
    case 'house':
      switch(trans)
      {
        case 'tunnel':
          el.setAttribute('model','scene','#tunnel');
          el.setAttribute('scale','0.01 0.01 0.025');
          // check position later
          el.setAttribute('rotation', "0 -90 0")
          //el.setAttribute('position',"13 -40 -4.3")
          //el.setAttribute('position',"7 -39.9465 3.22022"); <- muito grande na escala de 0.03
          el.setAttribute('position',"8.173 -39.9 3");
          plane.setAttribute('position','-0.5 137.7 -108.3');
          plane.setAttribute('width',"150")
          plane.setAttribute('height',"128")
          plane.setAttribute('src','#render-relax')
          break;
        case 'staircase':/*
          el.setAttribute('model','scene','#staircase');
          el.setAttribute('scale','0.07 0.07 0.07');
          el.setAttribute('position',"4.2 -45.36 7.1");
          el.setAttribute('rotation','0 0 0');
          plane.setAttribute('scale','30 30 30');
          plane.setAttribute('position','13 17 -8.5');*/
          var arrow = document.createElement('a-entity')
          arrow.setAttribute('footstep',"")
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
      case 'office':
        switch(trans)
        {
          case 'tunnel':
          el.setAttribute('model','scene','#tunnel');
          el.setAttribute('scale','0.01 0.01 0.025');
          el.setAttribute('position',"-0.8 -39.9 -5.878");
          plane.setAttribute('position','-0.5 137.7 -108.3');
          plane.setAttribute('width',"150")
          plane.setAttribute('height',"128")
          plane.setAttribute('src','#render-relax')
          break;
        case 'staircase':
          
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
    document.getElementById('text-report').innerHTML += ('\n'+new Date().getTime()+": O usuário pegou o celular");
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

    document.getElementById('text-report').innerHTML += ('\n'+new Date().getTime() + ": O usuário colocou o celular na mesa");
}

function makeNpcs(arg)
{
  var scene = document.querySelector('a-scene')
  character.setAttribute('model','scene','#coworker-1');
  character.setAttribute('scale','0.6 0.6 0.6')
  if(arg == 'presentation')
  {
    character.emit('talk')
    character.setAttribute('position','4.052 -40.046 -1.673');character.setAttribute('rotation','0 -90 0')
  }
  else 
  {
    character.emit('sit')
    character.setAttribute('position','0.392 -40.056 -1.673');
    character.setAttribute('rotation','0 30 0')
  }

  var c = document.createElement('a-entity')
  c.setAttribute('model','scene', '#coworker-2')
  c.setAttribute('position', '0.297 -40 0.702')
  c.setAttribute('rotation','0 120 0')
  c.emit('Sit')
  scene.appendChild(c)

  c = document.createElement('a-entity')
  c.setAttribute('model','scene', '#coworker-3')
  c.setAttribute('position', '-1.243 -39.918 -0.543')
  c.setAttribute('rotation','0 90 0')
  c.emit('Sit')
  scene.appendChild(c)

  c = document.createElement('a-entity')
  c.setAttribute('model','scene', '#coworker-4')
  c.setAttribute('position', '1.944 -39.987 -1.625')
  c.setAttribute('rotation','0 30 0')
  c.emit('Sit')
  scene.appendChild(c)
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
    
    case 'office':
      switch(situation)
      {
        case 'presentation':
          makeNpcs('presentation')
        break;
        case 'presenter':
          makeNpcs('presenter')
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
    var box = document.createElement('a-entity')
    var player = document.querySelector('#player')
    box.setAttribute('model', {scene: "#box"});
    box.setAttribute('position', '0.3 -0.01 -0.175')
    player.appendChild(box)
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
  //var time = document.getElementById('time').value.toString();
  var json = JSON.parse('{ "relax": "'+relax + '", "transition": "'+ ent + '", "clinical":{ "scene": "'+ clin + '", "situation": "'+sit + '"}, "transition_exit": "'+ exit + '"}')
  initializeSimulation(json);
  loadSituation(json);
  //startInterventionTimer(time);
  document.querySelector('#setup').style.visibility = "hidden"
}

function restartSimulation()
{
  document.body.innerHTML = sim_start_dom;
}