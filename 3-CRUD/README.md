# Exercice 3 - CRUD
Le CRUD est un acronyme qui signifie Create, Read, Update, Delete. <br/>
C'est un ensemble d'opérations basiques pour manipuler des données dans une base de données. <br/>

![img](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/3/crud-operations.png)
Chaques opérations correspond à une requête HTTP:
- Create: POST
- Read: GET
- Update: PUT ou PATCH
- Delete: DELETE

## Objectif
- Créer un CRUD pour la table `articles`

## Prérequis
- Avoir terminé l'exercice [Introduction](https://github.com/kbrdn1/fastify-api-exo/tree/main/1-Introduction)
- Avoir terminé l'exercice [BDD avec Docker](https://github.com/kbrdn1/fastify-api-exo/tree/main/2-BDD%20avec%20Docker)

## Créer un CRUD pour la table `articles`
- Installer la dépendance `@fastify/mysql` avec:
    ```bash
    npm i @fastify/mysql
    ```
- A l'aide de la [documentation de Fastify](https://fastify.dev/docs/latest/Guides/Database/) et de la [documentation de MySQL](https://www.npmjs.com/package/mysql2#using-prepared-statements) écrire le code pour créer la connexion à la base de données dans `index.js`
- Toujours dans `index.js`, en vous servant de la connexion a la base donnéeq, créer les routes suivantes:
    - GET `/articles` qui renvoie tous les articles 
    > Status: 200 (OK) ✅
    - GET `/articles/:id` qui renvoie un article
    > Status: 200 (OK) ✅ / 404 (Not Found) ❌ <br/>
    > 404 (Not Found) si l'article n'existe pas
    - POST `/articles` qui crée un article
    > Status: 201 (Created) ✅ / 400 (Bad Request) ❌ / 409 (Conflict) ❌ <br/>
    > 400 (Bad Request) si le titre ou le contenu est vide <br/>
    > 409 (Conflict) si le titre existe déjà
    - PUT `/articles/:id` qui modifie un article
    > Status: 200 (OK) ✅ / 400 (Bad Request) ❌ / 404 (Not Found) ❌ <br/>
    > 400 (Bad Request) si le titre ou le contenu est vide <br/>
    > 404 (Not Found) si l'article n'existe pas
    - DELETE `/articles/:id` qui supprime un article
    > Status: 200 (OK) ✅ / 404 (Not Found) ❌ <br/>
    > 404 (Not Found) si l'article n'existe pas

> ### Astuces
> 💡 Récupérer les données de la requête avec les methode `params` ou `query` et `body` de Fastify: [Request Doc](https://fastify.dev/docs/latest/Reference/Request/#request) <br/>
> 💡 Utiliser une requête préparée à l'aide de la methode `query` de la connexion à la base de données: [FirstQuery](https://github.com/sidorares/node-mysql2#first-query) <br/>
> 💡 Retourner les données au format JSON avec la methode `send` de Fastify: [Send](https://fastify.dev/docs/latest/Reference/Reply/#senddata) <br/>
> 💡 Utiliser la methode `code` de Fastify pour retourner le bon status: [Status](https://fastify.dev/docs/latest/Reference/Reply/#codestatuscode)<br/>

![img1](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/3/crud-operations-in-sql.jpg)
- Tester les routes avec Postman

## Astuces
Extension VSC pour Postman: [Postman.postman-for-vscode](https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode)
Alternative a Postman: [Insomnia](https://insomnia.rest/download), [Bruno](https://usebruno.com/)

## Bon courage !
