document.addEventListener('DOMContentLoaded', (e) => {

const player = document.querySelector('.player');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const playAudio = document.querySelector('.play');
const audio = document.querySelector('.audio');
const title = document.querySelector('.song');
const singerName = document.querySelector('singer');
const cover = document.querySelector('.img1');
const playPause = document.querySelector('.play-pause');
const progress = document.querySelector('.progress')
const bigCover = document.querySelector('.cover-img')
const durationTime = document.querySelector('.duration-time');
const current = document.querySelector('.current-time')
const progressContainer = document.querySelector('.progress-container')
//Названия песен
const songs = ['Don\'t Hurt Yourself', 'Don\'t Start Now'];
const singers = ['Beyonce', 'Dua Lipa']

//Песня по умолчанию
let songIndex = 0;
let singerIndex = 0;
 
//
function loadSong(song){
    title.innerHTML = song
    
    audio.src = `audio/${song}.mp3`
    cover.src = `img/cover${songIndex + 1}.png`
    bigCover.src = `img/bigcover${songIndex + 1}.png`
}
loadSong(songs[songIndex]);

//Play
function playSong(){
   player.classList.add('play')
   playPause.src = './svg/pause.png'
   audio.play() 
}

//Pause
function pauseSong(){
    
    player.classList.remove('play')
    playPause.src = './svg/play.png'
    audio.pause() 
 }

playAudio.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying){
        pauseSong();
    } else {
        playSong();
    }
})

// Next song
function nextSong(){
    songIndex++
    if (songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
nextBtn.addEventListener('click', nextSong)

// Prev song
function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
prevBtn.addEventListener('click', prevSong)

// Progress bar
function updateProgress(event){
    
    const {duration, currentTime} = event.srcElement
    const progressPersent = (currentTime / duration) * 100
    progress.style.width = `${progressPersent}%`
    progress.max = durationTime.innerHTML
    durationTime.innerHTML = parseFloat((duration / 60 -0.01 ).toFixed(2));
    current.innerHTML = parseFloat((currentTime / 60 - 0.001).toFixed(2));
}
audio.addEventListener('timeupdate', updateProgress)

// Set progress
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}

progressContainer.addEventListener('click', setProgress)

//Autoplay
audio.addEventListener('ended', nextSong)
})
