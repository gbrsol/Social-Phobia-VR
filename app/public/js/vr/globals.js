var List = require(["collections/list"]);
//var file = require(["../intervention/intervention.json"]);
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
        "positive": [{"id": "" , "transcript": ""}],
        "1": "#angel_audio_house_2_1",
        "2": "#angel_audio_house_2_2",
        "3": "#angel_audio_house_2_3"
      },
      "transcript": ""
    },
    {
      "situation": "relative",
      "audios": {
        "1": "#angel_audio_house_1_1",
        "2": "#angel_audio_house_1_2",
        "3": "#angel_audio_house_1_3"
      },
      "transcript": ""
    },
    {
      "situation": "deliveryman",
      "audios": {
        "1": "#angel_audio_delivery_3_1",
        "2": "#angel_audio_house_3_2"
      }
    }
  ],
  "shopping":[

  ]
};
var phone_in_hand = false;
var transitioned = false;
var opened_door = false;
var finished = false;
var audios_to_play = new List();
var pressed_key = false;
var intervention = {
  "relax": "baloon",
  "transition": "staircase",
  "clinical": {
    "scene": "house", 
    "situation": "relative"
  }
}
function loadFromFile(file)
{
  var chooser = document.querySelector('#inputfile')
  var objectURL = window.URL.createObjectURL("../intervention/intervention.json");
  var reader = new FileReader();
  var text = reader.readAsText(objectURL);
  //var json = $.getJSON("../intervention/intervention.json").done(function(json){console.log(json);json = json.replace(/[\u0000-\u0019]+/g,"");intervention = json});
  return JSON.parse(text.replace(/[\u0000-\u0019]+/g,""));
}