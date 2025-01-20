package edu.fje.daw2.proyecto7_3;

import okhttp3.*;

import java.io.IOException;

public class GameRestClient {

    private static final String BASE_URL = "http://localhost:8080/api/createMatch";
    private static final OkHttpClient client = new OkHttpClient();

    public static void main(String[] args) {
        try {
            // Crear un nuevo juego
            String gameId = createGame();
            System.out.println("Juego creado con ID: " + gameId);

            // Realizar las selecciones de los jugadores
            makeMove(gameId, "player1", "rock");
            makeMove(gameId, "player2", "scissors");

            // Consultar el estado del juego
            String status = getGameStatus(gameId);
            System.out.println("Estado del juego: " + status);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static String createGame() throws IOException {
        Request request = new Request.Builder()
                .url(BASE_URL)
                .post(RequestBody.create(new byte[0])) // Cuerpo vacío para el POST
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Error en la creación del juego: " + response);
            String responseBody = response.body().string();
            System.out.println("Respuesta: " + responseBody);
            return responseBody.split(":")[1].trim(); // Extrae el ID del juego
        }
    }

    private static void makeMove(String gameId, String player, String move) throws IOException {
        String url = BASE_URL + "/" + gameId + "/" + player;

        RequestBody body = new FormBody.Builder()
                .add("Selection", move)
                .build();

        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Error al enviar movimiento: " + response);
            System.out.println("Respuesta: " + response.body().string());
        }
    }

    private static String getGameStatus(String gameId) throws IOException {
        String url = BASE_URL + "/" + gameId + "/status";

        Request request = new Request.Builder()
                .url(url)
                .get()
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Error al consultar estado: " + response);
            return response.body().string();
        }
    }
}
