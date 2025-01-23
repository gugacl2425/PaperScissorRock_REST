const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const esquema = buildSchema(`
    type Game {
        id: Int!
        player1: Int
        player2: Int
        choice1: String
        choice2: String
        victory1: Int
        victory2: Int
        draw: Int
    }

    type Query {
        consultarEstat(codiPartida: Int!): String
    }

    type Mutation {
        iniciarJoc(codiPartida: Int!): String
        moureJugador(codiPartida: Int!, jugador: Int!, tipusMovimiento: String!): String
        acabarJoc(codiPartida: Int!): String
    }
`);

let db = [];

let options = {
    rock: { scissor: "victory", paper: "defeat" },
    paper: { scissor: "defeat", rock: "victory" },
    scissor: { rock: "defeat", paper: "victory" }
};

function winner(choice1, choice2) {
    if (choice1 === choice2) return "draw";
    return options[choice1][choice2];
}

const route = {
    consultarEstat: ({ codiPartida }) => {
        const match = db.find(a => a.id === codiPartida);
        if (!match) return "No match found";

        if (match.victory1 === 3) return "Player 1 wins!";
        if (match.victory2 === 3) return "Player 2 wins!";
        
        return `Score player 1: ${match.victory1}, player 2: ${match.victory2}, Draws: ${match.draw}`;
    },

    iniciarJoc: ({ codiPartida }) => {
        const match = db.find(a => a.id === codiPartida);
        if (match) return "Match ID already exists";

        const newMatch = {
            id: codiPartida,
            player1: null,
            player2: null,
            choice1: null,
            choice2: null,
            victory1: 0,
            victory2: 0,
            draw: 0,
        };

        db.push(newMatch);
        return `New match with ID ${codiPartida} has been created`;
    },

    moureJugador: ({ codiPartida, jugador, tipusMovimiento }) => {
        const match = db.find(a => a.id === codiPartida);
        if (!match) return "No match found";

        if (jugador === 1) {
            match.player1 = jugador;
            match.choice1 = tipusMovimiento;
        } else if (jugador === 2) {
            match.player2 = jugador;
            match.choice2 = tipusMovimiento;
        } else {
            return "Invalid player number";
        }

        if (match.choice1 && match.choice2) {
            let result = winner(match.choice1, match.choice2);

            if (result === "draw") {
                match.draw++;
            } else if (result === "victory") {
                    match.victory1++;
                } else {
                    match.victory2++;
                }
            
            match.choice1 = null;
            match.choice2 = null;
        }

        return "Player has chosen successfully";
    },

    acabarJoc: ({ codiPartida }) => {
        let index = db.findIndex((game) => game.id === codiPartida);

        db.splice(index, 1);
        return `Match with ID ${codiPartida} has been removed`;
    },
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: esquema,
    rootValue: route,
    graphiql: true,
}));
app.listen(4000);
console.log('Server running at http://localhost:4000/graphql');
