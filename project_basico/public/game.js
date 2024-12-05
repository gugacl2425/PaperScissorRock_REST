let res = document.getElementById('result');
let gameId = null; 

function start(){

    const urlencoded = new URLSearchParams();

const requestOptions = {
  method: "POST",
  body: urlencoded,
  redirect: "follow"
};

fetch("http://localhost:3000/api/match", requestOptions)
  .then((response) => response.text())
  .then((result) => res.innerHTML = result)
  .catch((error) => console.error(error));
}



function selection1(option){
    const urlencoded = new URLSearchParams();
    urlencoded.append('player1', option);

const requestOptions = {
  method: "POST",
  body: urlencoded,
  redirect: "follow"
};

fetch(`http://localhost:3000/api/match/${gameId}`, requestOptions)
  .then((response) => response.text())
  .then((result) => res.innerHTML = result)
  .catch((error) => console.error(error));
}

function selection2(option){
    const urlencoded = new URLSearchParams();
    urlencoded.append('player2', option);

const requestOptions = {
  method: "POST",
  body: urlencoded,
  redirect: "follow"
};

fetch(`http://localhost:3000/api/match/${gameId}`, requestOptions)
  .then((response) => response.text())
  .then((result) => res.innerHTML = result)
  .catch((error) => console.error(error));
}




window.onload = function() {

}