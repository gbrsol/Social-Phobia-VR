var List = require("collections/list");
var angel_audio = {
  "greeting": [ 
    {
      "situation": "none",
      "audios": { "transcript": "#angel_audio_greeting" },
    }
  ],
  "house": [
    {
      "situation": "cellphone",
      "audios": {
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
const intervention = {
  relax: "baloon",
  transition: "staircase",
  clinical: {
    scene: "house", 
    situation: "relative"
  }
};
var transitioned = false;
var opened_door = false;
var finished = false;
var audios_to_play = new List();