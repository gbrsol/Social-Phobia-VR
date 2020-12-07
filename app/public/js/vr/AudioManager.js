function AudioManager(element, inter)
{
    this.el = element;
    var scene = inter["clinical"]["scene"];
    var situation = inter["clinical"]["situation"];
    this.textbox = document.querySelector('#text')
    this.pIndex = 0;
    this.nIndex = 0;
    this.qIndex = 0;
    var angel_audio = {
        "greeting": [
          {
            "situation": "none",
            "audios": { 
              "greeting": [{"id": "#angel_audio_greeting", "transcript": "Olá paciente, eu serei seu guia durante a simulação. Para andar, olhe para as placas com pegadas no chão por aproximadamente 1 segundo. Iniciaremos a sessão tentando relaxá-lo, então chegue perto do balão, por favor."}]
             }
          }
        ],
        "relax": [
          {
            "situation" : "none",
            "audios" : {"id": ""}
          }
        ],
        "house": [
          {
            "situation": "cellphone",
            "audios": {
              "positive": [{"id": "#cellphone_positive_1", "transcript":  "muito bem! Para vencer os seus medos você precisa se\
              expor às situações temidas. Hoje esses medos podem parecer grandes e\
              paralisantes, mas com o tempo o seu corpo vai aprendendo a reagir cada vez\
              menos a eles. Essa técnica é chamada dessensibilização sistemática.\""},
              {"id":"cellphone_positive_2", "transcript": "muito bem! Para vencer os seus medos você precisa se\
              expor às situações temidas. Mas isso só se sentir confortável e preparado."}],
      
              "negative": [{"id": "#cellphone_negative_1", "transcript": "Eu entendo que ainda não se sinta preparado para dar esse\
              passo, mas gostaria que soubesse que não está sozinho! Eu estou com você e\
              qualquer desconforto você pode me dizer...Gostaria de tentar?"}], // segundo negativo vai pra psicóloga
      
              "question": [{"id": "#cellphone_question_1" , "transcript": "O seu celular está tocando. Você parece estar mais ofegante e ansioso.\
              Vamos utilizar dos benefícios da respiração diafragmática? Inspire\
              profundamente contando até 4, segure a respiração contando até 4 e expire\
              contando até 5. Vamos começar.\
              1..2..3..4..5..1..2..3..4..5..1..2..3..4..5"},
              {"id": "#cellphone_question_2", "transcript": "Agora que estamos mais relaxados, vamos escolher. Você gostaria de\
              atender ao telefone?"}
            ]
            }
          },
          {
            "situation": "relative",
            "audios": {
              "positive": [{"id": "#relative_positive_1" , "transcript": "Tudo bem ir devagar e analisar o ambiente antes de prosseguir. Em qualquer dificuldade, identifique suas emoções e os pensamentos associados a elas. Avalie se esses pensamentos são verdadeiros ou não. Caso não sejam, visualize algum pensamento alternativo, porque assim você terá controle sobresuas emoções e comportamentos inadequados. Vamos até a porta."},
                          {"id": "#relative_positive_2" , "transcript": "Que tal iniciar com um cumprimento?"}],
              "negative": [{"id": "#relative_negative_1" , "transcript": "Percebo que você está desconfortável com a chegada deles ou é minha impressão?"},
                          {"id": "#relative_negative_2", "transcript": "Não precisa ficar preocupada com o que vão dizer, somente foque no que o outro tem a oferecer. Lembre-se de respirar"}],
              "question": [{"id": "#relative_question_1" , "transcript": "Seus parentes estão aí, vamos recebê-los?"},
                          {"id": "#relative_question_2" , "transcript": "Gostaria de prosseguir? "}]
            }
          },
          {
            "situation": "deliveryman",
            "audios": { 
              "positive": [{"id": "#delivery_positive_1", "transcript": "muito bem! Apesar do seu medo, isso não te paralisou. Ter medo é\
              natural, é uma emoção importante como qualquer outra. O enfrentamento gera\
              evidências do quanto você é capaz."},
              {"id": "delivery_positive_alt_1", "transcript": "vamos tentar fazer isso novamente?"},
              {"id": "delivery_positive_2", "transcript": "Tenha em mente o que vai dizer. Abra o portão."},
              {"id": "delivery_positive_3", "transcript": "Muito bem, você conseguiu. Olha o quanto você foi capaz é assertivo!"}],
      
              "negative": [{"id": "#delivery_negative_1", "transcript": "O que te leva a não conseguir realizar esse enfrentamento? Você já\
              enfrentou alguma situação semelhante no passado?  Na vida aparecem diversas situações novas e desafiadoras, é normal ter\
              medo e ficar ansioso. Aos poucos podemos enfrentar esses novos desafios, gostaria de tentar?"}], // segundo e terceiro neg voz do psicologo
      
              "question": [{"id": "#delivery_question_1", "transcript": "Estamos sozinhos, você vai a atender a campainha?"},
                          {"id": "#delivery_question_2" , "transcript" : "Gostaria de continuar?"},
                          {"id": "#delivery_question_3" , "transcript" : "não se preocupe, o entregador não está focado na sua\
                          assinatura, mas no tempo que ele precisa para entregar. Gostaria de continuar?"},]
            }
          }
        ], //, espaço para novas situações
        'office': [
          {
            'situation': 'presentation',
            'audios': {
              'positive': [],
              'negative': [],
              'question': []
            }
          },
          {
            'situation': 'presenter',
            'audios': {
              'positive': [],
              'negative': [],
              'question': []
            }
          }
        ]
      };
      var audio_list;
      var i;
      for(i = 0; angel_audio[scene][i].situation != situation ;i++)
        audio_list = angel_audio[scene][i].audios; 
      audio_list = angel_audio[scene][i].audios; 
      this.positives = audio_list["positive"]
      this.negatives = audio_list["negative"]
      this.questions = audio_list["question"]
      this.audio = angel_audio["greeting"][0]["audios"]["greeting"][0];
      //if(this.el != null)
      //this.el.setAttribute('sound','src',this.audio.id);
      console.log('Audio Manager started')
}

AudioManager.prototype.play = function ()
{
    //this.audio.playSound();
    this.el.components.sound.playSound ();
    this.textbox.innerHTML = this.audio.transcript;
}

AudioManager.prototype.pause = function ()
{
    //this.audio.pauseSound();
}

AudioManager.prototype.nextPositive = function()
{
    var aud = this.positives[this.pIndex]
    this.el.setAttribute('sound','src',aud.id);
    this.audio = aud.id;
    document.querySelector('#text').innerHTML = aud.transcript
    this.pIndex++
    this.nIndex++;
    this.play();
}

AudioManager.prototype.lastPositive = function()
{
    if(this.pIndex > 0)
    {
      var aud = this.positives[this.pIndex]
      this.el.setAttribute('sound','src',aud.id);
      this.audio = aud.id;
      document.querySelector('#text').innerHTML = aud.transcript;
      this.pIndex--
      this.nIndex--;
      this.play();
    }
}

AudioManager.prototype.nextNegative = function()
{
    var aud = this.negatives[this.nIndex]
    this.el.setAttribute('sound','src',aud.id);
    this.audio = aud.id;
    document.querySelector('#text').innerHTML = aud.transcript;
    this.pIndex++
    this.nIndex++;
    this.play();
}

AudioManager.prototype.lastNegative = function()
{
    if(this.nIndex > 0)
    {
      var aud = this.negatives[this.nIndex]
      this.el.setAttribute('sound','src',aud.id);
      this.audio = aud.id;
      document.querySelector('#text').innerHTML= aud.transcript;
      this.pIndex-- 
      this.nIndex--;
    }
    this.play();
}

AudioManager.prototype.nextQuestion = function()
{
    var aud = this.questions[this.qIndex]
    this.el.setAttribute('sound','src',aud.id);
    document.querySelector('#text').innerHTML= aud.transcript;
    this.audio = aud.id;
    this.qIndex++;
    this.play();
    //ask4Interaction();
    //this.waitAnswer();
}

AudioManager.prototype.lastQuestion = function()
{
    if(this.qIndex > 0)
    {
      var aud = this.questions[this.qIndex]
      this.el.setAttribute('sound','src',aud.id);
      this.audio = aud.id;
      document.querySelector('#text').innerHTML= aud.transcript;
      this.qIndex--;
      this.play();
    }
}

AudioManager.prototype.greet = function()
{
  var aud = this.audio_list["greeting"][0]["audios"]["greeting"][0];
  this.el.setAttribute('sound','src',aud.id);
  this.audio = aud.id;
  this.el.components.sound.playSound();
  document.querySelector('#text').innerHTML= aud.transcript;
}

AudioManager.prototype.checkPreCharacter = function(){
  return this.questions.length == this.qIndex;
}
AudioManager.prototype.checkPrePreCharacter = function(){
  return this.questions.length-1 == this.qIndex;
}
function removeButtons()
{
  document.querySelector('#btn-yes').setAttribute('visible',false)
  document.querySelector('#btn-no').setAttribute('visible',false)
}

function removeAngel()
{
  document.querySelector('#angel').setAttribute('visible', false)
  document.querySelector('#angel-text').style.visibility = false;
}

function spawnAngel()
{
  document.querySelector('#angel').setAttribute('visible', true)
  document.querySelector('#angel-text').style.visibility = true;
}


function newButton(type)
{
  removeButtons()
  switch(type)
  {
    case 'positive':
      audio_manager.nextPositive();
      break;
    case 'negative':
      audio_manager.nextNegative();
      break;
  }
  
  var dur = document.querySelector(this.audio).duration
  setTimeout(()=>{
    audio_manager.waitAnswer(); 
    if(this.checkPrePreCharacter())
    {
      document.querySelector('#house-door').classList.add('clickable')
    }
  }, dur+300)
}
AudioManager.prototype.waitAnswer = function()
{
  // spawnar caixas botões
  this.nextQuestion();
  spawnAngel()
  var player = document.querySelector('#player');
  var player_pos = player.getAttribute('position');
  var dist = 0.3
  var scene = document.querySelector('a-scene');
  var yes = document.querySelector('#btn-yes')
  var no = document.querySelector('#btn-no')
  yes.addEventListener('click',function(){
    newButton('positive')
  });
  no.addEventListener('click',function(){
    newButton('negative')
  })
  
  if(this.checkPreCharacter())
  {
    yes.addEventListener('click',function(){
      document.querySelector('#character').emit('click');
      removeButtons();
      removeAngel();
    })
    no.addEventListener('click', function(){
      document.querySelector('#house-door').emit('click')
      removeButtons();
      removeAngel();
    })
  }
  switchButtonsToScene()
}