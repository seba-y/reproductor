let musicaActual = 0 ;

// MUSICA
const music = document.querySelector("#audio");

//
// Botones
const iniciar = document.querySelector(".iniciar");
const pausar = document.querySelector(".pausar");
const anterior = document.querySelector(".anterior");
const retroceder = document.querySelector(".retroceder")
const repetir = document.querySelector(".repetir")
const siguiente = document.querySelector(".siguiente");
const iniPau = document.querySelector(".ini-pau");
// Texto
const repArtista = document.querySelector(".rep-artista");
const repCancion = document.querySelector(".rep-cancion");
// Imagen de disco
const disco = document.querySelector(".disco");
// Minutos - Barra
const barra = document.querySelector(".barra");
const tiempoActual = document.querySelector(".tiempo-actual");
const duracion = document.querySelector(".duracion");
// Volumen
const volumen = document.querySelector(".volumen")
const imgVolume = document.querySelector(".img-volume")
const volumeMuteado = document.querySelector(".volume-muteado")

// BOTONES 

iniciar.addEventListener("click", () => {
        music.play()
}
)

pausar.addEventListener("click", () => {
        music.pause()
})


anterior.addEventListener("dblclick", ()=> {
        if(musicaActual >= 1){
            musicaActual--;
        }    
        obtenerMusica(musicaActual);
        music.play();
})

anterior.addEventListener("click", () =>{
            music.currentTime = 0 ;
            music.play();
}
)

siguiente.addEventListener("click", ()=> {
    if(musicaActual >= canciones.length -1){
        musicaActual = 0 ;
    } else if(music.loop == true){
        musicaActual = musicaActual;
    }
     else {
        musicaActual++;
    }
    obtenerMusica(musicaActual)
    music.play()
})

retroceder.addEventListener("click" , () => {
        music.currentTime = music.currentTime-10
})

repetir.addEventListener("click", () => {
    if (music.loop == false){
    music.loop = true;
    } else music.loop = false ;
    repetir.classList.toggle("seleccionado")
})

// ----------------------------------------------------


// BARRA --------------------------
setInterval(()=> {
    barra.value = music.currentTime;
    tiempoActual.innerHTML = formatoTiempo(music.currentTime)
},500)

barra.addEventListener("change", ()=> {
    music.currentTime = barra.value;
})

// ------------------------------------

// RUTA PARA IMG, CANCION Y NOMBRE

const obtenerMusica = (i) => {
    barra.value = 0;

    let cancion = canciones [i];
    musicaActual = i ;
    music.setAttribute("src" ,`${cancion.direccion}`);

    repArtista.innerHTML = cancion.artista.toUpperCase() ;
    repCancion.innerHTML = cancion.nombre;
    disco.setAttribute("src",`${cancion.imagen}`);
    
    tiempoActual.innerHTML = "00:00"
    setTimeout(()=>{
        barra.max = music.duration;
        duracion.innerHTML = formatoTiempo(music.duration) ;
    },300 );
    
    

 
}
obtenerMusica(0);

// -----------------------------

// AJUSTES DE MIN Y SEG
const formatoTiempo = (time) => {
    let min = Math.floor(time / 60);
    if(min< 10) {
        min = `0${min}`
    }
    let sec = Math.floor(time % 60);
    if(sec <10){
        sec = `0${sec}`;
    }
    return `${min}:${sec}`
}

// -------------------------------

// EVENTOS CON MUSIC

music.addEventListener("ended",() =>{
    siguiente.click();
})

music.addEventListener("play", () => {
    iniciar.toggleAttribute("hidden", true);
    pausar.toggleAttribute("hidden", false);
})

music.addEventListener("pause",() => {
    iniciar.toggleAttribute("hidden", false);
    pausar.toggleAttribute("hidden", true);

})



// VOLUME
volumen.addEventListener("input", ()=>{
    music.volume = volumen.value/100 ;
    if (volumen.value == 0){
        imgVolume.toggleAttribute("hidden", true);
        volumeMuteado.toggleAttribute("hidden", false);
    }else if ( volumen.value > 0 && music.muted == false ) {
        imgVolume.toggleAttribute("hidden", false);
    volumeMuteado.toggleAttribute("hidden", true);
    }
})

imgVolume.addEventListener("click", ()=>{
    imgVolume.toggleAttribute("hidden", true);
    volumeMuteado.toggleAttribute("hidden", false);
    music.muted = true;
})

volumeMuteado.addEventListener("click", ()=> {
    imgVolume.toggleAttribute("hidden", false);
    volumeMuteado.toggleAttribute("hidden", true);
    if ( music.muted == "true"){
    }
    music.muted = false ;
})


// EVENTOS DEL TECLADO

document.addEventListener("keydown", (e)=> {
    let letra = e.code;
    if ( letra == "KeyM"){
        if (music.muted == true){
            music.muted = false
            imgVolume.toggleAttribute("hidden", false);
            volumeMuteado.toggleAttribute("hidden", true);
            } else {
                music.muted = true;
                imgVolume.toggleAttribute("hidden", true);
                volumeMuteado.toggleAttribute("hidden", false);
            }
    } 
    else if ( letra == "Space"){
        if(music.paused == false){
            music.pause();
        } else music.play() ;
    }
    else if ( letra == "ArrowLeft"){
        music.currentTime = music.currentTime-10 ;
    }
    else if ( letra == "ArrowRight"){
        music.currentTime = music.currentTime+10 ;
    }
    else if ( letra == "ArrowDown"){
        if ( volumen.value >=10 ){
            music.volume = music.volume -(10/100) ;
            volumen.value = music.volume*100
            imgVolume.toggleAttribute("hidden", false);
            volumeMuteado.toggleAttribute("hidden", true);
        } else if (volumen.value < 10){
            music.volume = 0
            volumen.value = 0
            imgVolume.toggleAttribute("hidden", true);
            volumeMuteado.toggleAttribute("hidden", false);
        }
    }
    else if ( letra == "ArrowUp"){
        if ( volumen.value <= 90){
            music.volume = music.volume +(10/100) ;
            volumen.value = music.volume*100
            imgVolume.toggleAttribute("hidden", false);
            volumeMuteado.toggleAttribute("hidden", true);
        }
        else if( volumen.value > 90 ){
            music.volume = 1
            volumen.value = 100
        }

    }
})