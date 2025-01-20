package edu.fje.daw2.proyecto7_3;


import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/createMatch")
@Produces(MediaType.TEXT_PLAIN)
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
public class GamePath {

    public static ArrayList<Game> games = new ArrayList<>();
    private static int matchid = 0;

    @POST
    public String createGame() {
        matchid++;
        Game game = new Game(matchid);
        games.add(game);
        return "Game created with ID: " + matchid;
    }

    @GET
    @Path("/{id}/status")
    public String status(@PathParam("id") int id) {
        Game match = null;
        for (Game game : games) {
            if (game.getId() == id) {
                match = game;
            }
        }
        if (match == null) {
            return "No match found with ID: " + id;
        }
        if (match.getPlayer1() != null && match.getPlayer2() != null){
            String result = match.winner(match.getPlayer1(), match.getPlayer2());
            match.updateScore(result);
            match.setPlayer1(null);
            match.setPlayer2(null);
            return match.getStatus();
        } else{
            return "Waiting for the players to select";
        }
    }

    @POST
    @Path("/{id}/player1")
    public String player1Choice(@PathParam("id") int id, @FormParam("Selection") String option){
        Game match = null;
    for (Game game : games) {
        if (game.getId() == id) {
            match = game;
        }
    }
        if (match == null) {
            return "No match found";
        }

    if (isValid(option)){
        match.setPlayer1(option);
        return "Player 1 move is " +option;
    } else return "Invalid option";

    }
    @POST
    @Path("/{id}/player2")
    public String player2Choice(@PathParam("id") int id, @FormParam("Selection") String option2){
        Game match = null;
        for (Game game : games) {
            if (game.getId() == id) {
                match = game;
            }
        }
        if (match == null) {
            return "No match found";
        }

        if (isValid(option2)){
            match.setPlayer2(option2);
            return "Player 2 move is " +option2;
        } else return "Invalid option";

    }


    public boolean isValid(String option){
        if (option.equals("rock") || option.equals("paper") || option.equals("scissors")){
            return true;
        } else {
            return false;
        }
    }
}
