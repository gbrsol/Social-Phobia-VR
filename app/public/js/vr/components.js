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
    console.log(this.el.toString() + ': Avatar component registered successfully!');
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
    console.log(this.el.toString() + ': Model component registered successfully!');
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
    el.components.sound.playSound();
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

AFRAME.registerComponent('footsteps',{
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
    el.setAttribute('goto','dur', data.dur);
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
      parent.setAttribute('animation__click',{property:"rotation",startEvents:"click",dur:"2000",to:"0 0 0"});//  el.setAttribute('model',{ext:'obj',scene:'#door',material:'#door-mtl'});
    else 
      parent.setAttribute('animation__click',{property:"rotation",startEvents:"click",dur:"2000",to:"0 -80 0"});//  el.setAttribute('model',{ext:'obj',scene:'#door-open',material:'#door-open-mtl'});
    opened_door = !opened_door;
   });
   parent.appendChild(el);
  }
});