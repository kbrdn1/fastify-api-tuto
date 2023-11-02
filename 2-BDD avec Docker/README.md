# Exercice 2 - BDD avec Docker
Docker est un outil qui permet de créer des containers. <br/>
Un container est un environnement virtuel qui permet d'isoler une application et ses dépendances. C'est un peu comme une machine virtuelle mais en plus léger. <br/>

Docker permet de créer des containers à partir d'images.<br/>
Une image est un modèle qui permet de créer des containers. Il existe des images pour tous les types d'applications. <br/>

[Docker Hub](https://hub.docker.com/) est un site qui permet de stocker et de partager des images. <br/>

Docker permet de créer des containers à partir de fichier `Dockerfile`. <br/>
Un Dockerfile est un fichier qui contient les instructions pour créer une image. <br/>

Docker permet de créer des containers à partir de fichier `docker-compose.yml`. <br/>
Un docker-compose est un fichier qui contient les instructions pour créer plusieurs containers. <br/>

## Objectif
- Créer un container Docker pour une base de données MySQL
- Créer un container Docker pour PhpMyAdmin
- Créer une base de données
- Créer une table

## Prérequis
- Créer un compte [Docker Hub](https://hub.docker.com/) (gratuit) et installer l'application
- Installer [Docker Desktop](https://www.docker.com/products/docker-desktop) (gratuit)
> :warning: Sur Windows, il faut activer la virtualisation dans le BIOS ou utiliser WSL2 <br/>
> Pour vérifier que Docker est bien installé, ouvrir le terminal et taper `docker -v` et `docker-compose -v`

## Créer un container Docker pour une base de données MySQL
- A la racine du projet, créer un fichier `docker-compose.yml`
- Dans ce fichier, ajouter les lignes suivantes:
    ```yml
    version: '3.8' # Version de docker-compose (https://docs.docker.com/compose/compose-file/compose-versioning/)

    services:
        db: # Nom du container
            image: mysql:8.0.25 # Version de l'image (https://hub.docker.com/_/mysql)
            container_name: db # Nom du container
            restart: always # Redémarrer le container si il s'arrête
            environment: # Variables d'environnement
                MYSQL_ROOT_PASSWORD: root
                MYSQL_DATABASE: fastify
                MYSQL_USER: fastify
                MYSQL_PASSWORD: fastify
            ports:
                - 3306:3306 # Port du container:port de la machine
            volumes: # Dossiers partagés permettant de persister les données en dehors du container
                - ./docker/mysql:/var/lib/mysql # Dossier du container:Dossier de la machine
    ```
- Ouvrir le terminal et taper `docker-compose up -d` pour lancé le container <br/>
![img1](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/2/mysql-container/docker-compose-up.png)
> :warning: Si le container ne se lance pas, vérifier que le port `3306` n'est pas déjà utilisé, sinon changer le port du container
- Pour vérifier que le container est bien lancé, taper `docker ps` <br/>
![img2](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/2/mysql-container/docker-ps.png)
- Aller sur [Docker Desktop](https://www.docker.com/products/docker-desktop), vérifier que le container est bien lancé dans l'onglet `Containers` <br/>
![img3](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/2/mysql-container/docker-containers-tab.png)
- Pour arrêter le container, taper `docker-compose down` <br/>
![img4](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/2/mysql-container/docker-compose-down.png)

## Créer un container Docker pour PhpMyAdmin
- Dans le fichier `docker-compose.yml`, ajouter les lignes suivantes:
    ```yml
    phpmyadmin:
        image: phpmyadmin/phpmyadmin # Version de l'image (https://hub.docker.com/r/phpmyadmin/phpmyadmin)
        container_name: phpmyadmin # Nom du container
        restart: always # Redémarrer le container si il s'arrête
        environment: # Variables d'environnement
            PMA_HOST: db # Nom du container de la base de données
            PMA_PORT: 3306 # Port du container de la base de données
            MYSQL_ROOT_PASSWORD: root
        ports:
            - 8080:80 # Port du container:port de la machine
        depends_on: # Dépendance du container, le container de la base de données doit être lancé avant
            - db
    ```
- Ouvrir le terminal et taper `docker-compose up -d` pour lancé les containers <br/>
![img5](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/2/mysql-container/docker-compose-up.png)
> :warning: Si le container ne se lance pas, vérifier que le port `8080` n'est pas déjà utilisé, sinon changer le port du container
- Aller sur [Docker Desktop](https://www.docker.com/products/docker-desktop), vérifier que les containers sont bien lancés dans l'onglet `Containers` <br/>
![img6](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/2/mysql-container/docker-containers-tab.png)
- Aller sur PhpMyAdmin depuis [Docker Desktop](https://www.docker.com/products/docker-desktop) ou sur [http://localhost:8080](http://localhost:8080)
- Se connecter avec les identifiants de la base de données
> les identifiants sont ceux du fichier `docker-compose.yml` <br/> user: `fastify`, password: `fastify`
- Vérifier que la base de données `fastify` est bien créée

## Créer une base de données
- Créer un dossier `database` à la racine du projet
- Créer un fichier `init.sql` dans le dossier `database`
- Dans ce fichier, ajouter le script SQL permettant de créer une table `articles` avec les champs suivants:
    | Nom | Type | Taille | Null | Default | Index |
    | --- | ---- | ------ | ---- | ------- | ----- |
    | id | int | 11 | Non | Aucun | PRIMARY |
    | title | varchar | 255 | Non | Aucun | Aucun |
    | banner | varchar | 255 | Non | Aucun | Aucun |
    | content | text |  | Non | Aucun | Aucun |
    | created_at | datetime |  | Non | CURRENT_TIMESTAMP | Aucun |
    | updated_at | datetime |  | Non | CURRENT_TIMESTAMP | Aucun |
- Dans PhpMyAdmin, aller la base de données `fastify` puis dans l'onglet `Importer`
- Sélectionner le fichier `init.sql` et cliquer sur le bouton `Importer`
- Vérifier que la table `articles` a correctement été créée
![img7](https://raw.githubusercontent.com/kbrdn1/fastify-api-exo/main/assets/2/pma-container/pma-articles-table.png)

## Astuces
Extension VSC pour Docker: [ms-azuretools.vscode-docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) <br/>
Extension VSC pour la coloration syntaxique des fichiers `docker-compose.yml`: [redhat.vscode-yaml](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) <br/>