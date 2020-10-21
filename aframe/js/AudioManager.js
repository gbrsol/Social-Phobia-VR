function AudioManager(el)
{
    this.audio = el.components.sound;
}

AudioManager.prototype.play() = function ()
{
    this.audio.playSound();
}

AudioManager.prototype.pause() = function ()
{
    this.audio.pauseSound();
}

AudioManager.prototype.repeat() = function()
{
    
}