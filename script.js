let previous = document.querySelector('#previous');
let play = document.querySelector('#play_btn');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
// let recent_volume = document.querySelector('#volume');
let volumen = document.querySelector('#volumen');
let slider = document.querySelector('#slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
// let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let duracion = document.querySelector('#duration_song');
let seconds = document.querySelector('#seconds');
let prueba = document.querySelector('#prueba');

let timer;
let autoplay = 0;
let index_no = 0;
let mute = false;
let playing_song = false;
let minutos = 0;
let segundos = 0;

//creat an audio element
let track = document.createElement('audio');


//All song list
let All_song = [{
        name: "First song",
        path: "music/song1.mp3",
        // img: "img/img.jpg",
        singer: "First singer"
    },
    {
        name: "Second song",
        path: "music/song2.mp3",
        // img: "img/img.jpg",
        singer: "Second singer"
    },
    {
        name: "Third song",
        path: "music/song3.mp3",
        // img: "img/img.jpg",
        singer: "Third singer"
    },
    {
        name: "Fourth song",
        path: "music/song4.mp3",
        // img: "img/img.jpg",
        singer: "Fourth singer"
    },
    {
        name: "Fifth song",
        path: "music/song5.mp3",
        // img: "img/img.jpg",
        singer: "Fifth singer"
    }
];

//All function

//Function load the track
function load_track(index_no) {
    clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    // track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    // d = track.duration;
    track.load();
    // total.innerHTML = All_song.length;
    // present.innerHTML = index_no + 1;
    timer = setInterval(range_slider, 1000);
    // duracion.innerHTML = d;
}

load_track(index_no);

//mute sound
function mute_sound() {
    if (mute == false) {
        mute = true;
        track.volume = 0;
        volumen.innerHTML = '<i class="bx bx-volume-mute"></i>';
    } else {
        mute = false;
        track.volume = 1;
        volumen.innerHTML = '<i class="bx bx-volume-full"></i>';
    }
}



//reset song slider
function reset_slider() {
    slider.value = 0;
}


//checking the song is playing or not
function justplay() {
    if (playing_song == false) {
        playsong();
    } else {
        pausesong();
    }
}

//function playsong
function playsong() {
    minutos = 0;
    segundos = 0;
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="bx bx-pause"></i>';
    minutos = track.duration / 60;
    duracion.innerHTML = Math.round(minutos);
    segundos = (minutos - Math.round(minutos)) * 60;
    seconds.innerHTML = Math.round(segundos);
    prueba.innerHTML = minutos;
}

//pause song
function pausesong() {
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="bx bx-play"></i>';
}

//next song
function next_song() {
    if (index_no < (All_song.length - 1)) {
        index_no = index_no + 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

function previous_song() {
    if (index_no > 0) {
        index_no -= 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = All_song.length - 1;
        load_track(index_no);
        playsong();
    }
}

//Change Volumen

function volume_change() {
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

//change slider position
function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}


//autoplay function
function autoplay_switch() {
    if (autoplay == 1) {
        autoplay = 0;
        auto_play.style.background = "#566573"
    } else {
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}


function range_slider() {
    let position = 0;

    //update slider position
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    //function eoll run when the song is over
    if (track.ended) {
        play.innerHTML = '<i class = "fa fa-play"></i>';
        if (autoplay == 1) {
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}




let playlist = document.querySelector('.playlist');
let options = document.querySelector('.options');

function open_p() {
    playlist.classList.toggle('active');
}

function sidebar() {
    options.classList.toggle('active2');
}