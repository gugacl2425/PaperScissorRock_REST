package edu.fje.daw2.proyecto7_3;

import okhttp3.*;

import java.io.IOException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        OkHttpClient client = new OkHttpClient();
        Scanner entrada = new Scanner(System.in);
        boolean finalitzar = false;

        int gameId = -1;

        while (!finalitzar) {
            System.out.println("MENU");
            System.out.println("1. Crear nuevo juego");
            System.out.println("2. Hacer jugada jugador 1");
            System.out.println("3. Hacer jugada jugador 2");
            System.out.println("4. Ver estado del juego");
            System.out.println("5. Salir");
            System.out.print("Elige una opción: ");

            int choice = entrada.nextInt();
            entrada.nextLine(); // Limpiar el buffer

            switch (choice) {
                case 1:
                    // Crear un nuevo juego
                    gameId = createGame(client);
                    break;
                case 2:
                    // Hacer jugada para jugador 1
                    if (gameId == -1) {
                        System.out.println("Debes crear un juego primero.");
                        break;
                    }
                    playerChoice(client, gameId, 1);
                    break;
                case 3:
                    // Hacer jugada para jugador 2
                    if (gameId == -1) {
                        System.out.println("Debes crear un juego primero.");
                        break;
                    }
                    playerChoice(client, gameId, 2);
                    break;
                case 4:
                    // Consultar estado del juego
                    if (gameId == -1) {
                        System.out.println("Debes crear un juego primero.");
                        break;
                    }
                    getStatus(client, gameId);
                    break;
                case 5:
                    // Salir del juego
                    finalitzar = true;
                    break;
                default:
                    System.out.println("Opción incorrecta.");
                    break;
            }
        }

        entrada.close();
        System.out.println("Cerrando el programa...");
    }

    private static int createGame(OkHttpClient client) {
        // URL base corregida
        String url = "http://localhost:8080/Proyecto7_3_war_exploded/api/createMatch";

        Request request = new Request.Builder()
                .url(url)
                .post(RequestBody.create("", null))
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                System.out.println("Error en la respuesta del servidor: " + response.code());
                return -1;
            }

            String responseBody = response.body().string();
            System.out.println("Respuesta del servidor: " + responseBody);

            // Extraer el ID del texto de respuesta
            try {
                String[] parts = responseBody.split("ID: ");
                int gameId = Integer.parseInt(parts[1].trim());
                System.out.println("Juego creado con ID: " + gameId);
                return gameId;
            } catch (Exception e) {
                System.out.println("Error al procesar la respuesta: " + responseBody);
                return -1;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return -1;
    }

    // Método para realizar una jugada
    private static void playerChoice(OkHttpClient client, int gameId, int player) {
        Scanner input = new Scanner(System.in);
        System.out.print("Introduce la jugada (rock, paper, scissors): ");
        String choice = input.nextLine();

        // URL ajustada con el contexto del servidor
        String url = "http://localhost:8080/Proyecto7_3_war_exploded/api/" + gameId + "/player" + player;

        RequestBody body = new FormBody.Builder()
                .add("Selection", choice)
                .build();
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            System.out.println("Respuesta del servidor: " + response.body().string());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Método para obtener el estado del juego
    private static void getStatus(OkHttpClient client, int gameId) {
        // URL ajustada con el contexto del servidor
        String url = "http://localhost:8080/Proyecto7_3_war_exploded/api/" + gameId + "/status";
        Request request = new Request.Builder()
                .url(url)
                .get()
                .build();

        try (Response response = client.newCall(request).execute()) {
            System.out.println("Estado del juego: " + response.body().string());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
