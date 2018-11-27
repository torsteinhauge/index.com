function setup() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBjtK8SqZSsVRocQ0sRxjpnRU5qMtU2Pjc",
        authDomain: "chat-76e23.firebaseapp.com",
        databaseURL: "https://chat-76e23.firebaseio.com",
        projectId: "chat-76e23",
        storageBucket: "",
        messagingSenderId: "904833647965"
    };
    firebase.initializeApp(config);

    var regMelding = document.getElementById("regMelding");
    var inpNavn = document.getElementById("inpNavn");
    var inpTekst = document.getElementById("inpTekst");
    var visMeldinger = document.getElementById("visMeldinger");
    let lastNode = null;
    var database = firebase.database();
    var ref = database.ref("meldinger");
    regMelding.onsubmit = function (evt) {
        evt.preventDefault();
        ref.push({
            navn: inpNavn.value,
            tekst: inpTekst.value
        });
    }
    ref.on("child_added", function (snapshot) {
        let nyDiv = document.createElement('li');
        var melding = snapshot.val();
        nyDiv.innerHTML = `${melding.navn} sier 
        <i>${melding.tekst}</i>`;
        visMeldinger.insertBefore(nyDiv, lastNode);
        lastNode = nyDiv;
    });

}