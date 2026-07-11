const musica = document.getElementById("musica");
const btnMusica = document.getElementById("toggleMusic");
let wheel = new Winwheel({
    canvasId: 'canvas',
    numSegments: 8,
    outerRadius: 240,
    textFontSize: 20,
    textFillStyle: '#fff',
    pointerAngle: 0,

    segments: [
        { fillStyle:'#2ECC71', text:'$500' },
        { fillStyle:'#3498DB', text:'$1.000' },
        { fillStyle:'#9B59B6', text:'$2.000' },
        { fillStyle:'#E67E22', text:'$5.000' },
        { fillStyle:'#F1C40F', text:'$15.000' },
        { fillStyle:'#E91E63', text:'Sorpresa' },
        { fillStyle:'#E74C3C', text:'Sin Premio' },
        { fillStyle:'#7F8C8D', text:'Sin Premio' }
    ],

animation:{
    type:'spinToStop',
    duration:5,
    spins:8,
    callbackFinished: mostrarPremio
}
    }
);


if (musica.paused) {
    musica.volume = 0.3;
    musica.play().catch(() => {});
}
    wheel.stopAnimation(false);

    wheel.rotationAngle = 0;document.getElementById("girar").onclick = async function () {

    wheel.draw();

const nombre = document.getElementById("nombre").value.trim();

if (nombre === "") {
    alert("Ingresá tu nombre antes de girar.");
    return;
}
const usuario = await obtenerUsuario(nombre);
console.log(usuario);
if (usuario === null) {
    alert("No estás habilitado para jugar.");
    return;
}
if (!usuario.habilitado) {
    alert("No estás habilitado para jugar.");
    return;
}

if (usuario.tiros <= 0) {
    alert("Ya no tenés más giros disponibles.");
    return;
}

await descontarTiro(nombre, usuario.tiros);
    // Probabilidades
    const probabilidades = [30, 20, 10, 5, 1, 4, 15, 15];

    const total = probabilidades.reduce((a, b) => a + b, 0);
    let numero = Math.random() * total;

    let premio = 0;

    for (let i = 0; i < probabilidades.length; i++) {
        numero -= probabilidades[i];
        if (numero <= 0) {
            premio = i + 1; // Winwheel usa segmentos desde 1
            break;
        }
    }

    wheel.animation.stopAngle = wheel.getRandomForSegment(premio);


wheel.animation.stopAngle = wheel.getRandomForSegment(premio);

const nombresPremios = [
    "$500",
    "$1000",
    "$2000",
    "$5000",
    "$15000",
    "Sorpresa",
    "Sin Premio",
    "Sin Premio"
];

await descontarTiro(nombre);

guardarParticipante(nombre, nombresPremios[premio - 1]);

wheel.startAnimation();
}


function mostrarPremio(indicatedSegment){

    const premio = indicatedSegment.text;

    if(premio == "Sin Premio"){

        tituloPremio.innerHTML = `
            😢<br><br>
            <span style="font-size:42px;color:#ff4d4d;">
                SIN PREMIO
            </span>
            <br><br>
            <small>Más suerte la próxima 🍀</small>
        `;

    }else if(premio == "$15.000"){

        tituloPremio.innerHTML = `
            🏆<br><br>
            <span style="font-size:42px;color:gold;">
                PREMIO MAYOR
            </span>
            <br><br>
            <span style="font-size:36px;color:#00ff66;">
                $15.000
            </span>
        `;

    }else if(premio == "Sorpresa"){

        tituloPremio.innerHTML = `
            🎁<br><br>
            <span style="font-size:40px;">
                PREMIO SORPRESA
            </span>
        `;

   }else{

    

    tituloPremio.innerHTML = `
        💰<br><br>
        <span style="font-size:40px;">
            ¡GANASTE!
        </span>
        <br><br>
        <span style="font-size:36px;color:#00ff66;">
            ${premio}
        </span>
    `;

}

    document.getElementById("modal").classList.remove("oculto");

}

function cerrarModal(){
    document.getElementById("modal").classList.add("oculto");
}
btnMusica.onclick = function(){

    if(musica.paused){

        musica.play();
        btnMusica.innerHTML = "🔊 Música ON";

    }else{

        musica.pause();
        btnMusica.innerHTML = "🔇 Música OFF";

    }

}
async function obtenerUsuario(nombre) {

    nombre = nombre.trim().toLowerCase();

    const doc = await db.collection("usuarios").doc(nombre).get();

    if (!doc.exists) {
        return null;
    }

    return doc.data();

}