# Exercice 1 - Introduction

## Objectif
- Créer un serveur Fastify
- Créer une route GET `/home` qui renvoie `Hello Word`
- Tester mon API avec Postman

## Prérequis
- Créer un compte [Postman](https://postman.com/downloads) (gratuit) et installer l'application

## Démarer mon API

- Créer un dossier et l'ouvrir avec VSC
- Créer un fichier `index.js`
- Ouvrir le terminal et initialiser le projet avec:
    ```bash
    npm init -y
    ```
- Intaller Fastify et Nodemon `npm i fastify nodemon`
- Dans le fichier `package.json` ajouter la ligne `"start": "nodemon index.js"` dans la partie `scripts`
- Dans le fichier `package.json` ajouter la ligne `"type": "module"` dans la partie `type`
- Avec l'aide la [documentation de Fastify](https://fastify.dev/docs/latest/Guides/Getting-Started/) écrire le code pour initialiser ton serveur sur le port `3000` (API) dans `index.js`
- Démarer ton serveur avec:
    ```bash
    npm run start
    ```
- Créer une route GET `/home` qui renvoie `Hello Word`

## Tester mon API
- Ouvrir Postman et créer un nouveau workspace, sélectionner `Blank Workspace` <br/>
    ![img1](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/1/test-my-API/postman-create-workspace.png)
    ![img2](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/1/test-my-API/postman-create-workspace-2.png)

- Créer une nouvelle collection dans ce nouveau workspace <br/>
    ![img3](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/1/test-my-API/postman-create-collection.png)
- Créer une nouvelle requête GET `/home` et l'envoyer <br/>
    ![img4](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/1/test-my-API/postman-result.png)

## A toi de jouer !