package edu.fje.daw2.proyecto7_3;

public class Game {
    private int id;
    private String player1;
    private String player2;
    private int victory1;
    private int victory2;
    private int draw;

    // Constructor
    public Game(int id) {
        this.id = id;
        this.player1 = null;
        this.player2 = null;
        this.victory1 = 0;
        this.victory2 = 0;
        this.draw = 0;
    }

    // Getter para el ID
    public int getId() {
        return id;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }
    public void setPlayer2(String player2) {
        this.player2 = player2;
    }
    public String getPlayer1() {
        return player1;
    }
    public String getPlayer2() {
        return player2;
    }

    public String winner(String player1, String player2) {
        this.player1 = player1;
        this.player2 = player2;
        
        if (player1.equals(player2)) {
            return "draw";
        }
        switch (player1) {
            case "rock":
                return player2.equals("scissor") ? "victory" : "defeat";
            case "scissor":
                return player2.equals("paper") ? "victory" : "defeat";
            case "paper":
                return player2.equals("rock") ? "victory" : "defeat";
            default:
                return "invalid";  // En caso de un valor inválido
        }
    }
    public void updateScore(String winner) {
        switch (winner) {
            case "draw":
                this.draw++;
                break;
                case "victory":
                    this.victory1++;
                    break;
                    case "defeat":
                        this.victory2++;
                        break;
                        default:
                            break;
        }
    }

    public String getStatus() {
        return "player1" + ": " + victory1 + " - " + "player2" + ": " + victory2 + " - " + "draw: " + draw;
    }
}
