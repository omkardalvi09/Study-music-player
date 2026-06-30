/*=========================
 PIXELBEAT SCRIPT
 PART 1
=========================*/

const songs = [

{
title:"Pixel Dreams",
artist:"Lofi Studio",
src:"music/song1.mp3",
cover:"images/cover1.png"
},

{
title:"Coffee Shop",
artist:"Pixel Beats",
src:"music/song2.mp3",
cover:"images/cover2.png"
},

{
title:"Rainy Window",
artist:"Night Owl",
src:"music/song3.mp3",
cover:"images/cover3.png"
},

{
title:"Night Walk",
artist:"Moon Records",
src:"music/song4.mp3",
cover:"images/cover1.png"
},

{
title:"Sunset Drive",
artist:"Retro FM",
src:"music/song5.mp3",
cover:"images/cover2.png"
}

];

const audio=document.getElementById("audio");

const title=document.getElementById("title");
const artist=document.getElementById("artist");
const cover=document.getElementById("cover");

const playBtn=document.getElementById("play");
const pauseBtn=document.getElementById("pause");
const nextBtn=document.getElementById("next");
const prevBtn=document.getElementById("prev");

const progress=document.getElementById("progress");

const current=document.getElementById("current");
const duration=document.getElementById("duration");

const volume=document.getElementById("volume");

const playlist=document.querySelectorAll("#playlist li");

const character=document.getElementById("character");
const status=document.getElementById("status");

let currentSong=0;

let isPlaying=false;

/*=========================
LOAD SONG
=========================*/

function loadSong(index){

audio.src=songs[index].src;

title.textContent=songs[index].title;

artist.textContent=songs[index].artist;

cover.src=songs[index].cover;

playlist.forEach(item=>item.classList.remove("active"));

playlist[index].classList.add("active");

localStorage.setItem("pixelSong",index);

}

/*=========================
PLAY
=========================*/

function playSong(){

audio.play();

isPlaying=true;

status.textContent="Dancing";

character.innerHTML="(^o^)";

}

/*=========================
PAUSE
=========================*/

function pauseSong(){

audio.pause();

isPlaying=false;

status.textContent="Sleeping";

character.innerHTML="(-_-)";

}

/*=========================
BUTTON EVENTS
=========================*/

playBtn.addEventListener("click",()=>{

playSong();

});

pauseBtn.addEventListener("click",()=>{

pauseSong();

});

nextBtn.addEventListener("click",()=>{

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

loadSong(currentSong);

playSong();

});

prevBtn.addEventListener("click",()=>{

currentSong--;

if(currentSong<0){

currentSong=songs.length-1;

}

loadSong(currentSong);

playSong();

});

/*=========================
PLAYLIST
=========================*/

playlist.forEach(item=>{

item.addEventListener("click",()=>{

currentSong=Number(item.dataset.index);

loadSong(currentSong);

playSong();

});

});

/*=========================
PROGRESS BAR
=========================*/

audio.addEventListener("timeupdate",()=>{

const percent=

(audio.currentTime/audio.duration)*100;

progress.value=percent;

let currentMin=

Math.floor(audio.currentTime/60);

let currentSec=

Math.floor(audio.currentTime%60);

if(currentSec<10){

currentSec="0"+currentSec;

}

current.textContent=

currentMin+":"+currentSec;

let totalMin=

Math.floor(audio.duration/60);

let totalSec=

Math.floor(audio.duration%60);

if(totalSec<10){

totalSec="0"+totalSec;

}

if(!isNaN(totalMin)){

duration.textContent=

totalMin+":"+totalSec;

}

});

/*=========================
SEEK
=========================*/

progress.addEventListener("input",()=>{

audio.currentTime=

(progress.value/100)

*audio.duration;

});

/*=========================
VOLUME
=========================*/

audio.volume=.7;

volume.value=70;

volume.addEventListener("input",()=>{

audio.volume=volume.value/100;

localStorage.setItem(

"pixelVolume",

volume.value

);

});

/*=========================
AUTO NEXT
=========================*/

audio.addEventListener("ended",()=>{

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

loadSong(currentSong);

playSong();

});

/*=========================
LOCAL STORAGE
=========================*/

window.addEventListener("load",()=>{

let savedSong=

localStorage.getItem("pixelSong");

let savedVolume=

localStorage.getItem("pixelVolume");

if(savedSong!=null){

currentSong=Number(savedSong);

}

loadSong(currentSong);

if(savedVolume!=null){

volume.value=savedVolume;

audio.volume=savedVolume/100;

}

});

/*=========================
KEYBOARD
=========================*/

document.addEventListener("keydown",(e)=>{

if(e.code==="Space"){

e.preventDefault();

if(isPlaying){

pauseSong();

}
else{

playSong();

}

}

if(e.code==="ArrowRight"){

nextBtn.click();

}

if(e.code==="ArrowLeft"){

prevBtn.click();

}

});
/*=========================
 PIXELBEAT PART 2
 RAIN + PARTICLES + AMBIENT
=========================*/

/* Rain */

const rain = document.getElementById("rain");

function createRain(){

    for(let i=0;i<80;i++){

        const drop=document.createElement("div");

        drop.classList.add("drop");

        drop.style.left=Math.random()*100+"%";

        drop.style.animationDelay=Math.random()+"s";

        drop.style.opacity=Math.random();

        rain.appendChild(drop);

    }

}

createRain();

/* Particles */

const particles=document.getElementById("particles");

function createParticles(){

    for(let i=0;i<30;i++){

        const particle=document.createElement("div");

        particle.classList.add("particle");

        particle.style.left=Math.random()*100+"%";

        particle.style.animationDelay=Math.random()*5+"s";

        particle.style.opacity=Math.random();

        particles.appendChild(particle);

    }

}

createParticles();

/* Day Night */

const dayNight=document.getElementById("dayNight");

function updateDayNight(){

    const hour=new Date().getHours();

    if(hour>=6 && hour<18){

        dayNight.textContent="Day";

        dayNight.style.background="#facc15";

        dayNight.style.color="black";

    }

    else{

        dayNight.textContent="Night";

        dayNight.style.background="black";

        dayNight.style.color="white";

    }

}

updateDayNight();

setInterval(updateDayNight,60000);

/* Live Clock */

const liveClock=document.getElementById("liveClock");

function updateClock(){

    const now=new Date();

    let h=now.getHours();

    let m=now.getMinutes();

    let s=now.getSeconds();

    if(h<10) h="0"+h;
    if(m<10) m="0"+m;
    if(s<10) s="0"+s;

    liveClock.textContent=h+":"+m+":"+s;

}

updateClock();

setInterval(updateClock,1000);

/* Equalizer Status */

const eqStatus=document.getElementById("equalizerStatus");

audio.addEventListener("play",()=>{

    eqStatus.textContent="Playing";

});

audio.addEventListener("pause",()=>{

    eqStatus.textContent="Paused";

});

/* Ambient Theme Text */

const themeName=document.getElementById("themeName");

const themeSelect=document.getElementById("themeSelect");

themeSelect.addEventListener("change",()=>{

    const value=themeSelect.value;

    if(value==="city"){

        themeName.textContent="Night City";

    }

    if(value==="forest"){

        themeName.textContent="Forest";

    }

    if(value==="beach"){

        themeName.textContent="Beach";

    }

    if(value==="space"){

        themeName.textContent="Space";

    }

    if(value==="rain"){

        themeName.textContent="Rain Street";

    }

});

/* Welcome */

const welcome=document.getElementById("welcome");

const hour=new Date().getHours();

if(hour<12){

welcome.textContent="Good Morning!";

}

else if(hour<18){

welcome.textContent="Good Afternoon!";

}

else{

welcome.textContent="Good Evening!";

}

/* Pixel Cat */

const cat=document.getElementById("cat");

audio.addEventListener("play",()=>{

cat.textContent="=^o^=";

});

audio.addEventListener("pause",()=>{

cat.textContent="=^.^=";

});

/* Ambient Background */

const overlay=document.getElementById("themeOverlay");

themeSelect.addEventListener("change",()=>{

switch(themeSelect.value){

case "city":

overlay.style.background="#09111f";

break;

case "forest":

overlay.style.background="#0b3d0b";

break;

case "beach":

overlay.style.background="#0ea5e9";

break;

case "space":

overlay.style.background="#12052e";

break;

case "rain":

overlay.style.background="#334155";

break;

}

});

/* Daily Reward */

const reward=document.getElementById("reward");

const today=new Date().toDateString();

const savedReward=localStorage.getItem("rewardDay");

if(savedReward!==today){

reward.textContent="🎁 +10 XP Daily Reward!";

localStorage.setItem("rewardDay",today);

}

else{

reward.textContent="Come back tomorrow!";
}

/* =========================
   STUDY TIMER
========================= */

const clock = document.getElementById("clock");
const startTimerBtn = document.getElementById("startTimer");
const resetTimerBtn = document.getElementById("resetTimer");

let timer;
let timeLeft = 25 * 60; // 25 minutes

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    clock.textContent = minutes + ":" + seconds;
}

startTimerBtn.addEventListener("click", () => {

    if (timer) return;

    timer = setInterval(() => {

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {

            clearInterval(timer);
            timer = null;

            alert("⏰ Study Session Complete!");

        }

    }, 1000);

});

resetTimerBtn.addEventListener("click", () => {

    clearInterval(timer);

    timer = null;

    timeLeft = 25 * 60;

    updateTimerDisplay();

});

updateTimerDisplay();