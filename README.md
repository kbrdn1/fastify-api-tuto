# Fastify API Exo

[Postman](https://postman.com/downloads)

## Démarer mon API

1. Créer un dossier et l'ouvrir avec VSC
2. Créer un fichier `index.js`
3. Ouvrir le terminal et initialiser le projet avec `npm init -y`
4. Intaller Fastify et Nodemon `npm i fastify nodemon`
5. Dans le fichier `package.json` ajouter la ligne `"start": "nodemon index.js"` dans la partie `scripts`
6. Dans le fichier `package.json` ajouter la ligne `"type": "module"` dans la partie `type`
7. Avec l'aide la docs de Fastify écrire le code pour initialiser ton serveur sur le port `3000` (API) dans `index.js`
Lien de la doc: `https://fastify.dev/docs/latest/Guides/Getting-Started/`
8. Démarer ton serveur avec `npm run start`
9. Créer une route GET `/home` qui renvoie `Hello Word`

## Tester mon API
1. Ouvrir Postman et créer un nouveau workspace, sélectionner `Blank Workspace`
[img1](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/img-exo/test-my-api/postman-create-workspace.png)
[img2](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/img-exo/test-my-api/postman-create-workspace-2.png)
2. Créer une nouvelle collection
[img3](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/img-exo/test-my-api/postman-create-collection.png)
3. Créer une nouvelle requête GET `/home` et l'envoyer
[img4](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/img-exo/test-my-api/postman-result.png)

## A toi de jouer !