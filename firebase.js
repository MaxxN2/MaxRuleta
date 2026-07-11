const firebaseConfig = {
  apiKey: "AIzaSyBw11PvjkEp4MqrKEJVikCS7r8sgq2iH58",
  authDomain: "maxruleta-19667.firebaseapp.com",
  projectId: "maxruleta-19667",
  storageBucket: "maxruleta-19667.firebasestorage.app",
  messagingSenderId: "798150344122",
  appId: "1:798150344122:web:66199a7b262309c9e0b183"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

console.log("Firebase conectado correctamente ✅");

// ==========================
// PEGAR ACA
// ==========================

async function obtenerUsuario(nombre){

    console.log("Buscando:", nombre);

    const doc = await db.collection("usuarios")
        .doc(nombre.toLowerCase())
        .get();

    console.log("Existe:", doc.exists);

    if(doc.exists){
        console.log("Datos:", doc.data());
    }

    return doc.exists ? doc.data() : null;
}
// ==========================
// DESPUÉS SIGUE ESTO
// ==========================
async function descontarTiro(nombre){
console.log("Entró a descontarTiro:", nombre);
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