let matchId = null;
        
function startNewGame() {
    const urlencoded = new URLSearchParams();

const requestOptions = {
method: "POST",
body: urlencoded,
redirect: "follow"
};

fetch("http://172.20.17.185:3000/api/match", requestOptions)
.then((response) => response.text())
.then((result) => {
document.getElementById("result").textContent = result;
})
.catch((error) => console.error(error));
}

function searchGame() {
    const Id = document.getElementById("id").value;
    if (Id) {
        matchId = Id;
        document.getElementById("result").textContent = `Partida con ID ${matchId} seleccionada.`;
    } else {
        document.getElementById("result").textContent = "Por favor, ingresa un ID de partida válido.";
    }
}

function player1Choice(choice) {
    const urlencoded = new URLSearchParams();
    urlencoded.append("choice1", choice);

const requestOptions = {
method: "POST",
body: urlencoded,
redirect: "follow",
};

fetch(`http://172.20.17.185:3000/api/match/${matchId}/player1`, requestOptions)
.then((response) => response.text())
.then((result) => {
document.getElementById("result").textContent = result;
})
.catch((error) => console.error(error));
}

function player2Choice(choice) {
    const urlencoded = new URLSearchParams();
    urlencoded.append("choice2", choice);
    
const requestOptions = {
method: "POST",
body: urlencoded,
redirect: "follow"
};

fetch(`http://172.20.17.185:3000/api/match/${matchId}/player2`, requestOptions)
.then((response) => response.text())
.then((result) => {
document.getElementById("result").textContent = result;
})
.catch((error) => console.error(error));
}

let start = document.getElementById('start');
let rock1 = document.getElementById('player1-rock');
let paper1 = document.getElementById('player1-paper');
let scissor1 = document.getElementById('player1-scissor');

let rock2 = document.getElementById('player2-rock');
let paper2 = document.getElementById('player2-paper');
let scissor2 = document.getElementById('player2-scissor');

let search = document.getElementById('search');

window.onload = function() {
    start.addEventListener("click", startNewGame);

    rock1.addEventListener("click", () => player1Choice("rock"));
    paper1.addEventListener("click", () => player1Choice("paper"));
    scissor1.addEventListener("click", () => player1Choice("scissor"));

    rock2.addEventListener("click", () => player2Choice("rock"));
    paper2.addEventListener("click", () => player2Choice("paper"));
    scissor2.addEventListener("click", () => player2Choice("scissor"));

    search.addEventListener("click", searchGame);
};