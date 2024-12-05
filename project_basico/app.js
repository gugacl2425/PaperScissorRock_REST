const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


let options = {
    rock: {rock: "draw", paper: "defeat", scissor: "victory"},
    paper: {paper: "draw", rock: "victry", scissor: "defeat"},
    scissor: {scissor: "draw", paper: "win", rock: "defeat"}
};

let matchs = [];
let match = 0;
app.post('/api/match', (req, res) => {

    match++;

    let newMatch = {
        id: match,
        player1: null,
        player2: null,
        victory1: 0,
        victory2: 0,
        draw: 0
    };

    matchs.push(newMatch);
    res.send(`The game has ${match} ID`);
});

function winner(player1, player2, code){
    let match = matchs.find(m => m.id === code);
    let selection = options[player1][player2];

    if (selection === "victory"){
        match.victory1++;
    } else if (selection === "defeat"){
        match.victory2++;
    } else {
        match.draw++;
    }

    if (match.victory1 > 2) return ('Player 1 has win');
    else if (match.victory2 > 2) return ('Player 2 has win');
    else{
        return (`Score -- player1: ${match.victory1}, player2: ${match.victory2}, draws: ${match.draw}`);

    }   
}

app.get('/api/match/:code', (req, res) =>{
    let code = req.params.code;
    let game = matchs.find(m => m.id === parseInt(code));

    if (!game) res.send('There is no game with the given id');

        if (game.player1 && game.player2){
        res.send(result);
        } else {
            res.send(`Waiting response from the players`);
        }
        
});

app.post('/api/match/:code', (req, res) => {
    let code = req.params.code;
    let game = matchs.find(m => m.id === parseInt(code));

    if (!game) res.send('There is no game with the given id');

    let player1 = req.body.player1;
    let player2 = req.body.player2;



    if (!options[player1]){
        res.send("You must choose between rock, paper and scissor");
    } else if (!options[player2]){
        res.send("You must choose between rock, paper and scissor");
    } else {
        game.player1 = player1;
        game.player2 = player2;
        res.send(`You have selected`);
        result = winner(game.player1,game.player2, parseInt(code));
    }    
});

app.delete('/api/match/:code', (req, res) => {
    let code = req.params.code;
    let game = matchs.findIndex(m => m.id === parseInt(code));

    if (game !== -1){
        matchs.splice(game, 1);
        res.send(`The match have being eliminated`);

    } else {
        res.send(`There is not a game with the given id`);
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));
