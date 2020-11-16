AFRAME.registerComponent('baloon', {
  init: function(){
    var el = this.el;
    var data = this.data;
    //el.setAttribute('id','baloon');
    el.setAttribute('geometry','primitive','sphere');
    el.setAttribute('scale','0.3 0.5 0.3');
    el.setAttribute('material','color','#FF0000');
    el.setAttribute('position','0 1 -3');
    el.setAttribute('animation','property:scale; to:0.5 0.7 0.5; loop:true; dir:alternate; dur: 4000; easing:easeInOutCirc; ');
    console.log('Baloon component registered successfully!');
  }
});

AFRAME.registerComponent('animated-avatar',{
  schema: {},
  init: function (){
    var el = this.el;
    var data = this.data;
    el.addEventListener('idle',function (){
      el.setAttribute('animation-mixer','clip','Idle')
    });
    el.addEventListener('walk',function (){
      el.setAttribute('animation-mixer','clip','Walk')
    });
    el.addEventListener('sit',function (){
      el.setAttribute('animation-mixer','clip','Sit')
    });
    el.addEventListener('talk',function (){
      el.setAttribute('animation-mixer','clip','Talk')
    });
    el.addEventListener('give',function (){
      el.setAttribute('animation-mixer','clip','Give')
    });
    el.addEventListener('greet',function (){
      el.setAttribute('animation-mixer','clip','Greet')
    });
  }
});

AFRAME.registerComponent('model',{
  schema:{
    ext: {type: 'string', default:'gltf'},
    scene:{type: 'string'},
    material:{type: 'string'},
    scale:{type: 'string', default: '1 1 1'}
  },
  init: function (){
    var el = this.el;
    var data = this.data;
    if(data.ext == 'obj')
    {
      el.setAttribute('obj-model','obj',data.scene);
      el.setAttribute('obj-model','mtl',data.material);
    }
    else
      el.setAttribute('gltf-model',data.scene);
    el.setAttribute('scale',data.scale);
  }
});

AFRAME.registerComponent('transition',{
  init: function ()
  {
    var el = this.el;
    var data = this.data;
    el.classList.add('clickable');
    el.addEventListener('click',function(){
      var player = document.querySelector('#player');
      var anchor = document.querySelector('#clinical_anchor');
      var pos = anchor.getAttribute('position');
      player.setAttribute('position',pos);
    });
  }
});

AFRAME.registerComponent('character',{
  init: function ()
  {
    var el = this.el;
    var data = this.data;
    el.setAttribute('animated-avatar',"");
    el.emit('idle');
  }
});

AFRAME.registerComponent('angel-avatar',{
  init: function ()
  {
    var el = this.el;
    var data = this.data;
    var pos = el.getAttribute('position')
    var rot = el.getAttribute('rotation')
    el.setAttribute('sound','');
    el.setAttribute('animation__position',{property:'position',to:{y:pos.y+0.05},loop:true, dir:"alternate", dur: 2000, easing:"easeInOutCirc" })
    el.setAttribute('animation__rotation',{property:'rotation',to:{y:pos.y-0.05},loop:true, dir:"alternate", dur: 4000, easing:"linear" })
  }
});

AFRAME.registerComponent('footstep',{
  schema:{
    dur: 'number', default:300
  },
  init:function ()
  {
    var tex = document.querySelector('#footstep');
    var el = this.el;
    var data = this.data;
    el.setAttribute('geometry',"primitive","plane");
    el.setAttribute('src',tex);
    el.setAttribute('position',{y:(y+0.1)});
    el.setAttribute('blink-teleportation','dur', data.dur);
  }
});

AFRAME.registerComponent('door',{
  init:function(){
   var parent = this.el;
   var el = document.createElement('a-entity')//this.el;
   var data = this.data;

   el.classList.add('clickable');
   el.setAttribute('model',{ext:'obj',scene:'#door',material:'#door-mtl'});
   //el.setAttribute('scale','0.01 0.01 0.01')
   el.setAttribute('position','56 5 0');
   el.addEventListener('click',function(){
     console.log('the door was clicked');
    if(opened_door)
      parent.setAttribute('animation__click',{property:"rotation",startEvents:"click",dur:"500",to:"0 0 0"});//  el.setAttribute('model',{ext:'obj',scene:'#door',material:'#door-mtl'});
    else 
      parent.setAttribute('animation__click',{property:"rotation",startEvents:"click",dur:"500",to:"0 -80 0"});//  el.setAttribute('model',{ext:'obj',scene:'#door-open',material:'#door-open-mtl'});
    opened_door = !opened_door;

    if(!interacted_with_npc)
    {
      interacted_with_npc = !interacted_with_npc;
      audio_manager.waitAnswer();//ask4Interaction();
      el.emit('character_interaction');
    }
   });

   el.addEventListener('character_interaction', function(){
     //var character = document.querySelector('#character');
     setTimeout(() => {
      //character.emit('click');
     }, 300);
   });

   parent.appendChild(el);

  }
});

AFRAME.registerComponent('blink-teleportation', {
	schema: {
		pos: {type: 'vec3'},
		dur: {type: 'number', default: 300},
		hide: {type: 'boolean', default: false}
	},
	
	init: function () {
		var el = this.el;
		var data = this.data;
		var camera = document.querySelector('a-camera');
		var cameraRig = document.querySelector('#player');
		var cursor = document.querySelector('a-cursor');
		var blinkTeleportationEl = document.querySelectorAll('[blink-teleportation]');
		
		// CREATE A TRANSPARENT BLACK IMAGE
		var blink = document.createElement('a-image');
		blink.setAttribute('material', {
			color: '#000000',
			opacity: 0
		});
		
		// SET THE BLACK IMAGE POSITION AND APPEND IT AS CAMERA'S CHILD ENTITY
		blink.setAttribute('position', {x: 0, y: 0, z: -0.1});
		camera.appendChild(blink);
		
		// ON CLICK, ANIMATE THE BLACK IMAGE (FADE-IN)
		el.addEventListener('click', function () {
			blink.setAttribute('animation', {
				property: 'material.opacity',
				from: 0,
				to: 1,
				dur: data.dur,
				easing: 'easeOutCubic'
			});
      var elPos = el.getAttribute('position');
      var rigPos = el.getAttribute('position');
      
			// WHEN FADE-IN ANIMATION COMPLETES, MOVE THE CAMERA RIG TO DESTINATION
			setTimeout(function () {
				cameraRig.setAttribute('position', AFRAME.utils.coordinates.stringify({x: elPos.x, y: (/*elPos.y+ */rigPos.y), z: elPos.z}));
				
				// RESET VISIBLE AND CLASS VALUES FOR ALL THE BLINK-TELEPORTATION ENTITIES
				for (var i = 0; i < blinkTeleportationEl.length; i++) {
					blinkTeleportationEl[i].setAttribute('visible', 'true');
					blinkTeleportationEl[i].setAttribute('class', 'clickable');
				}
				
				// IF HIDE PROPERTY IS SET TO TRUE, HIDE THE BLINK-TELEPORTATION ENTITY
				if (data.hide === true) {
					el.setAttribute('visible', 'false');
				}
                
                // THEN MAKE ONLY THE SELECTED BLINK-TELEPORTATION ENTITY NOT-CLICKABLE
                // NOTE: not only is it possible to move these 2 lines of code (57 and 58) out of the "for" loop,
                //       but it would also be the best approach because you would reduce the performance overhead
                //       caused by setAttribute() being used on each increment.
                // PS:   Apologies for any confusion, guys! :-)
                el.setAttribute('class', 'not-clickable');
                cursor.components.raycaster.refreshObjects();
				
				// EMIT CUSTOM EVENT TO TRIGGER THE FADE-OUT ANIMATION
				el.emit('position-changed');	
			}, data.dur);
		});
		
		// ON CUSTOM EVENT, ANIMATE THE BLACK IMAGE (FADE-OUT)
		el.addEventListener('position-changed', function () {
			blink.setAttribute('animation', {
				to: 0
			});
		});
	}
});

// use a system to keep a global track if we are already moving <- https://stackoverflow.com/questions/60856290/how-do-i-use-checkpoint-controls-in-a-frame
AFRAME.registerSystem('goto', {
  init: function() {
    this.isMoving = false
  }
})

// this component will have the actual logic
AFRAME.registerComponent('goto', {
    schema:{dur: 'number', default:300},
  init: function() {
     let camRig = document.querySelector('#player');
     var data = this.data;
     var el = this.el;
     this.el.classList.add('clickable');
     // upon click - move the camera
     el.addEventListener('click', e => {
        // check if we are already moving
        if (this.system.isMoving) return;

        // lock other attempts to move
        this.system.isMoving = true

        // grab the positions
        let targetPos = this.el.getAttribute("position")
        let rigPos = camRig.getAttribute("position")

        // set the animation attributes. 
        camRig.setAttribute("animation", {
          "property":"position",
          "startEvents":"go",
          "from": rigPos,
          "to": AFRAME.utils.coordinates.stringify({x: targetPos.x, y: rigPos.y, z: targetPos.z}),
          "dur": targetPos.distanceTo(rigPos) * 400,
          "easing": "linear"
        })
        camRig.emit('go')
     })

     // when the animation is finished - update the "shared" variable
     camRig.addEventListener('animationcomplete', e=> {
       this.system.isMoving = false
     })
  }
});