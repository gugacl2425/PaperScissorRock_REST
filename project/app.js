const express = require('express');
const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let options = {
    rock: { scissor: "victory", paper: "defeat" },
    paper: { scissor: "defeat", rock: "victory" },
    scissor: { rock: "defeat", paper: "victory" }
};

let n = 0;
let matchs = [];

function winner(player1, player2) {
    if (player1 === player2) return "draw";
    else return options[player1][player2];
}

app.post('/api/match', (req, res) => {
    let matchId = n;
    n++;

    let newMatch = {
        matchId: matchId,
        player1: "player1",
        player2: "player2",
        choice1: null,
        choice2: null,
        result: null,
        player1Victories: 0,
        player2Victories: 0,
        empate: 0
    };
    matchs.push(newMatch);
    res.send(`New game has started, id = ${matchId}`);
});

app.post('/api/match/:matchId/player1', (req, res) => {
    let matchId = req.params.matchId;
    let game = matchs.find(m => m.matchId === parseInt(matchId));

    if (!game) {
        return res.send("The game does not exist");
    }

    let choice1 = req.body.choice1;
    if (!options[choice1]) {
        return res.send("Player 1 must choose between rock, paper, and scissor.");
    }

    game.choice1 = choice1;

    let interval = setInterval(() => {
        if (game.choice1 && game.choice2) {
            clearInterval(interval);
            let result = winner(game.choice1, game.choice2);

            if (result === "victory") {
                game.player1Victories += 1;
            } else if (result === "defeat") {
                game.player2Victories += 1;
            }else {
                game.empate +=1;
            }

            if (game.player1Victories === 3) {
                res.send(`${game.player1} wins the match!`);
                clearInterval(interval);
            } else if (game.player2Victories === 3) {
                res.send(`${game.player2} wins the match!`);
                clearInterval(interval);
            } else {

                let intervalId = setInterval(() =>{
                        res.send(`Current score - ${game.player1}: ${game.player1Victories}, ${game.player2}: ${game.player2Victories} Draw: ${game.empate}`);
                        game.choice1 = null;
                        game.choice2 = null;
                        clearInterval(intervalId);
                    
                }, 500);
            }
             
        }
    }, 500);
});

app.post('/api/match/:matchId/:player2', (req, res) => {
    let matchId = req.params.matchId;
    let game = matchs.find(m => m.matchId === parseInt(matchId));

    if (!game) {
        return res.send("The game does not exist");
    }
    
    let choice2 = req.body.choice2;
    if (!options[choice2]) {
        return res.send("Player 2 must choose between rock, paper, and scissor.");
    }

    game.choice2 = choice2;
 
    let interval = setInterval(() => {
        if (game.choice1 && game.choice2) {
            clearInterval(interval); 
            let intervalId = setInterval(() =>{
                clearInterval(intervalId);
            if (game.player1Victories === 3) {
                res.send(`${game.player1} wins the match!`);
                clearInterval(interval);
            } else if (game.player2Victories === 3) {
                res.send(`${game.player2} wins the match!`);
                clearInterval(interval);
            } else {
                
                        res.send(`Current score - ${game.player1}: ${game.player1Victories}, ${game.player2}: ${game.player2Victories} Draw: ${game.empate}`);
                       
                    
               
            }
        }, 500);
        }
    }, 500);
});

app.listen(3000, '0.0.0.0', () => console.log('Server started on port 3000'));