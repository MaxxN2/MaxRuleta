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