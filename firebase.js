const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

console.log("Firebase conectado correctamente ✅");

// ==========================
// PEGAR ACA
// ==========================

async function obtenerUsuario(nombre){

    const doc = await db.collection("usuarios")
        .doc(nombre.toLowerCase())
        .get();

    if(!doc.exists){
        return null;
    }

    return doc.data();
}

// ==========================
// DESPUÉS SIGUE ESTO
// ==========================
async function descontarTiro(nombre){

    const ref = db.collection("usuarios").doc(nombre.toLowerCase());

    await db.runTransaction(async (transaction) => {

        const doc = await transaction.get(ref);

        if(!doc.exists){
            return;
        }

        const datos = doc.data();

        if(datos.tiros <= 0){
            return;
        }

        transaction.update(ref,{
            tiros: datos.tiros - 1
        });

    });

}

function guardarParticipante(nombre, premio) {
    db.collection("participantes").add({
        nombre: nombre,
        premio: premio,
        fecha: new Date().toLocaleString()
    })
    .then(() => {
        console.log("Participante guardado ✅");
    })
    .catch((error) => {
        console.error("Error al guardar:", error);
    });
}