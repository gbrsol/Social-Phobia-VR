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
  //audios_to_play = getAngelAudios(inter);
  //spawnAngel();
  //angelGreet();
  //playCycleAngelAudio();
  var scene = inter['scene'];
  var situation = inter['situation'];
  var character = document.querySelector('#character');
  waitTransition();
  switch(scene)
  {
    case 'house':
      switch(situation)
      {
        case 'relative':
        //pegar pegada na frente da porta e ciclar audio nela
        //waitOpenDoor();
        //walkToSofa();
        character.addEventListener('click', function(){
          if(!interacted_with_npc)
          {
            interacted_with_npc = !interacted_with_npc;
            walkToSofa();
          }
        })
        break;

        case 'cellphone':
          cellphoneRingtone();
          break;
        
        case 'delivery':
          //waitOpenDoor()
          character.addEventListener('click', function(){
            if(!interacted_with_npc)
            {
              interacted_with_npc = !interacted_with_npc;
              getMoneyGivePizza();
            }
          })
          break;
      }
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
  character.setAttribute('animation__tosofa',{property:'position',to:"0.25171 -40 -0.28302",dur: 2500});
  //character.setAttribute('animation','property', 'position', "0.25171 -40 -0.28302"); // colocar posição do sofá
  setTimeout(function(){
    character.setAttribute('rotation','0 0 0');
    character.emit('sit');
  }, 3000);
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
function loadSituation(inter)
{
  loadRelax(inter["relax"]);
  loadTransition(inter["transition"]);
  loadClinical(inter["clinical"]["scene"]);
  loadFootsteps(inter["clinical"]);
  loadCharacters(inter["clinical"]);
  loadExit(inter["transition_exit"]);
  loadAngel();
  //playSituation(inter['clinical']);
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
  cell.components.sound.load();
  cell.components.sound.playSound();
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

function createFootsteps(positions)
{
  var id = 1;
  var scene = document.querySelector('a-scene');
  /* exemplo casa
        <a-plane id="foot-1" src="#footstep" goto rotation="-90 0 0" position="6.85164 -39.9465 -0.76414" material="" geometry="" class="clickable"></a-plane>
        <a-plane id="foot-2" src="#footstep" goto rotation="-90 0 0" position="2.6907 -39.9465 -0.76414" material="" geometry="" class="clickable"></a-plane>
        <a-plane id="foot-3" src="#footstep" goto rotation="-90 0 0" position="2.6907 -39.9465 3.51758" material="" geometry="" class="clickable"></a-plane>
        <a-plane id="foot-4" src="#footstep" goto rotation="-90 0 0" position="-3.02575 -39.9465 3.51758" material="" geometry="" class="clickable"></a-plane>
        <a-plane id="foot-5" src="#footstep" goto rotation="-90 0 0" position="-3.02575 -39.9465 -0.82681" material="" geometry="" class="clickable"></a-plane>
        <a-plane id="foot-6" src="#footstep" goto rotation="-90 0 0" position="1.70708 -39.9465 1.22194" material="" geometry="" class="clickable"></a-plane> 

  */ 
  for(var i = 0; i < positions.length; i++)
  {
    var el = document.createElement('a-plane');
    el.setAttribute('id','footsteps-'+ (i+1));
    el.setAttribute('rotation','-90 0 0');
    el.setAttribute('material',{src:'#footstep'});
    el.setAttribute('blink-teleportation','');
    el.setAttribute('position',positions[i]);
    el.classList.add('clickable');
    scene.appendChild(el);
  } 
  
  return;
  positions.forEach(function(){
    var el = document.createElement('a-plane');
    el.setAttribute('id','footsteps-'+id);
    el.setAttribute('rotation','-90 0 0');
    el.setAttribute('src','#footstep');
    el.setAttribute('position',this[i].toString());
    el.classList.add('clickable');
    scene.appendChild(el);
  });
}

function loadFootsteps(inter)
{
  var scene = inter['scene'];
  var positions = [];
  switch(scene)
  { 
    case 'house':
      var positions = ["6.85164 -39.9465 -0.76414", 
                       "2.6907 -39.9465 -0.76414",
                       "2.6907 -39.9465 3.51758",
                       "-3.02575 -39.9465 3.51758",
                       "-3.02575 -39.9465 -0.82681",
                       "1.70708 -39.9465 1.22194", // até aqui é casa
                       "9.2 0.01 -4.3",//chao
                      ];
      break;

    case 'shoppingmall':
      break;

    case 'park':
      break;
  }
  createFootsteps(positions);
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
}

function loadTransition(trans)
{
  var el = document.querySelector('#transition');
  var ent = document.createElement('a-entity');
  var plane = document.createElement('a-plane');
  plane.setAttribute('id','trans-anchor');
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
      el.setAttribute('position', '-7 -40 -4');//el.setAttribute('position',"-101.95343 0.1 15.91853")
      //anchor.setAttribute('position',"1505 1.6 245");
      anchor.setAttribute('position',"7.60976 -39.9 -0.93902");//<a-entity id="user-anchor" position="7.60976 -39.18216 -0.93902"></a-entity>
      //<a-entity door="" position="-3.39121 -40 0.4202" scale="0.01 0.01 0.01" animation__click="property: rotation; startEvents: click; dur: 2000; to: 0 80 0" event-set__click="opened_door = !opened_door;"><a-entity position="0 0 -0.65"><a-entity obj-model="obj: ../assets/models/scenes/sweet_3d/porta/porta_fechada.obj; mtl: ../assets/models/scenes/sweet_3d/porta/porta_fechada.mtl"></a-entity></a-entity></a-entity>
      //<a-entity id="house-door" door="" position="3.05381 -39 5.11742" class="clickable" obj-model="obj: ../assets/models/scenes/sweet_3d/porta/untitled.obj; mtl: ../assets/models/scenes/sweet_3d/porta/untitled.mtl" scale="0.01 0.01 0.01" model="ext: obj; scene: #door; material: #door-mtl"></a-entity>
      //<a-cylinder material="" geometry="" position="2.5057 -39.05853 5.13933" scale="0.01 0.77 0.01"></a-cylinder>
      createDoor("2.5057 -39.05853 5.13933");

      //criar background
      var planeBedroom = document.createElement('a-plane');
      planeBedroom.setAttribute('position','6.7 -39 -3')
      planeBedroom.setAttribute('scale','2 1.270 1');
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

function loadExit(trans)
{
  var el = document.querySelector('#transition_exit');
  var ent = document.createElement('a-entity');
  var plane = document.createElement('a-plane');
  plane.setAttribute('id','trans-exit-anchor');
  plane.setAttribute('src','#portal');
  plane.setAttribute('scale','2 2');
  plane.setAttribute('material','color','#FF0000');
  //plane.addEventListener('click',function(){blinkTransition();});
  plane.classList.add('clickable');
  plane.addEventListener('click',function(){sessionReport()})
  switch(trans)
  {
    case 'tunnel':
      el.setAttribute('model','scene','#tunnel');
      el.setAttribute('model','scale','0.01 0.01 0.03');
      // check position later
      plane.setAttribute('position','0 1.5 -4');
      //el.appendChild(ent);
      el.setAttribute('position','0 -40 0');
      break;

    case 'staircase':
      el.setAttribute('model','scene','#staircase');
      el.setAttribute('scale','0.07 0.07 0.07');
      el.setAttribute('position',"4.2 -45.36 7.1");
      el.setAttribute('rotation','0 0 0');
      plane.setAttribute('scale','30 30 30');
      plane.setAttribute('position','13 17 -8.5');
      break;    
  }
  el.appendChild(plane);
}

function loadAngel()
{
  var angel = document.querySelector('#angel');
  angel.setAttribute('model','scene','#mario');
  angel.setAttribute('position',"1.28716 0.29517 -1.00378");
  angel.setAttribute('rotation','10 -30 0');
  angel.setAttribute('scale','0.02 0.02 0.02');
  angel.setAttribute('angel-avatar','');
  //<a-entity id="angel" sound="src: [object Object]" gltf-model="/assets/models/characters/doctor_mario/scene.gltf" scale="0.02 0.02 0.02" model="scene: #mario" position="1.28716 0.29517 -1.00378" angel-avatar="" rotation="10 -29.999999999999996 0"></a-entity>
}

function getPhone()
{
  if(!phone_in_hand)
  {
    var scene = document.querySelector('a-scene')
    var cell = document.querySelector('#character')
    var cam = document.querySelector('a-camera')
    var ent = document.querySelector('a-entity')//cell.cloneNode()
    
    scene.removeChild(cell)
    cam.appendChild(ent)

    ent.setAttribute('position','0.10215 -0.06117 -0.02942');
    ent.setAttribute('rotation','-120 -80 0');
    ent.setAttribute('model','scene','#cellphone');
    ent.setAttribute('scale', '0.01 0.01 0.01');
    report.push(new Date().getTime()+": O usuário pegou o celular");
  }
}

function putDownPhone()
{
  if(phone_in_hand)
  {
    phone_in_hand = false; 
    //retirar celular do usuário e voltar pra mesa
    var character = document.querySelector('#character');
    var player = document.querySelector('a-camera');
    var scene = document.querySelector('a-scene');
    player.removeChild(character);
    character = document.createElement('a-entity');
    createPhone(character);
    character.setAttribute('position',"7.41339 -39.22504 0.55851");
    character.setAttribute('scale','0.01 0.01 0.01');
    scene.appendChild(character);
    report.push(new Date().getTime() + ": O usuário colocou o celular na mesa");
  }
}

function createPhone(element)
{
  element.setAttribute('id','character');
  element.setAttribute('model','scene','#cellphone');
  element.setAttribute('scale','0.01 0.01 0.01')
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
          character.setAttribute('scale','0.5 0.5 0.5');
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
  var character = document.querySelector('#deliveryman');
  waitInstruction(); // espera psicólogo falar, em instrução pega o "dinheiro"
  character.emit('Give')
  setTimeout(() => {
    character.emit('Idle')
  }, 200);
}

function sessionReport()
{
  //enviar para o relatório uma string
  app.app.controllers.admin.insert_relatorio(report);
}