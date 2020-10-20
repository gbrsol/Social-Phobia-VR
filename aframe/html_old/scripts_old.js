var PsoundIndex = 0;
var NsoundIndex = 0;
var QsoundIndex = 0;
const soundsP = ['anjo_p1','anjo_p2','anjo_p3'];
const soundsN = ['anjo_n1'];
const soundsQ = ['anjo_q1','anjo_q2']
var animIndex = 0;
var doorState = true;
var walked = false;
const clips = ["TPose","Idle","Sit","Walk"];
//const sounds = ['anjo_s3f1','anjo_s3f2','anjo_s3f3','anjo_s3f4','anjo_s3f5']

function getNextSound(response)
{
    //return "sounds/"+sounds[soundIndex++];
    if(response == "positive")
    {
        NsoundIndex++;
        return '#'+soundsP[PsoundIndex++];
    }
    else if(response == "negative")
        {
            return '#'+soundsN[NsoundIndex];
        }
    else
        {
            return '#'+soundsQ[QsoundIndex++];
        }
}
function getLastQuestion()
{
    return '#'+soundsQ[QsoundIndex-1];
}
function getAnim(name)
{
    return clips[clips.indexOf(name)];
}
function cycleAnim()
{
    if(animIndex == clips.length)
        animIndex = 0;
    return clips[animIndex++];
}

function fadeInOut()
{
    
}

function fala(fala)
{
    
    console.log("chegou na fala");
    var msg = new SpeechSynthesisUtterance(fala);
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10];
    msg.voiceURI = "native";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0.8;
    msg.text = fala;
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
}