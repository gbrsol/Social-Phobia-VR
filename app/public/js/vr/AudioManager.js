function AudioManager(inter)
{
    this.el = document.querySelector('#angel');
    this.audio = el.components.sound;
    var scene = inter["clinical"]["scene"];
    var situation = inter["clinical"]["situation"];
    this.pIndex = 0;
    this.nIndex = 0;
    this.qIndex = 0;
    var angel_audio = {
        "greeting": [ 
          {
            "situation": "none",
            "audios": { "id": "#angel_audio_greeting", "transcript": "Olá paciente" }
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
      
              "question ": [{"id": "#cellphone_question_1" , "transcript": "O seu celular está tocando. Você parece estar mais ofegante e ansioso.\
              Vamos utilizar dos benefícios da respiração diafragmática? Inspire\
              profundamente contando até 4, segure a respiração contando até 4 e expire\
              contando até 5. Vamos começar.\
              1..2..3..4..5..1..2..3..4..5..1..2..3..4..5"},
              {"id": "cellphone_question_2", "transcript": "Agora que estamos mais relaxados, vamos escolher. Você gostaria de\
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
                          {"id": "delivery_question_2" , "transcript" : "Gostaria de continuar?"},
                          {"id": "delivery_question_3" , "transcript" : "não se preocupe, o entregador não está focado na sua\
                          assinatura, mas no tempo que ele precisa para entregar. Gostaria de continuar?"},]
            }
          }
        ] //, espaço para novas situações
      };
      this.audio_list = this.angel_audio[scene][situation];
      this.audio = this.audio_list["greeting"][0];
}

AudioManager.prototype.play() = function ()
{
    this.audio.playSound();
}

AudioManager.prototype.pause() = function ()
{
    this.audio.pauseSound();
}

AudioManager.prototype.nextPositive() = function()
{
    this.element.setAttribute('sound','src',audio_list["positive"][pIndex++]);
    this.play();
}

AudioManager.prototype.lastPositive() = function()
{
    if(this.pIndex > 0)
        this.element.setAttribute('sound','src',audio_list["positive"][pIndex--]);
    this.play();
}

AudioManager.prototype.nextNegative() = function()
{
    this.element.setAttribute('sound','src',audio_list["negative"][nIndex++]);
    this.play();
}

AudioManager.prototype.lastNegative() = function()
{
    if(this.nIndex > 0)
        this.element.setAttribute('sound','src',audio_list["negative"][nIndex++]);
    this.play();
}

AudioManager.prototype.nextQuestion() = function()
{
    this.element.setAttribute('sound','src',audio_list["question"][qIndex++]);
    this.play();
}

AudioManager.prototype.lastQuestion() = function()
{
    if(this.qIndex > 0)
        this.element.setAttribute('sound','src',audio_list["question"][qIndex--]);
    this.play();
}

