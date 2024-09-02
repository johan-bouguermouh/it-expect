# it-expect

## La stratégie de recette

**documentation**: https://www.conseilorga.com/tests-recettes-projets-systeme-dinformations-etape-delicate/

## Le Cahier des Recettes

### Couvrir le CRUD sur le UserService

### 1. Objectif

L'objectif est de tester exhaustivement toutes les fonctionnalités du UserService, qui est un service de gestion des utilisateurs indépendant du service d'authentification. Nous nous concentrerons sur la couverture complète des méthodes CRUD (create, findAll, findOne, update, delete), en veillant à tester à la fois les chemins positifs (cas où les opérations réussissent) et les chemins négatifs (cas d'erreurs ou d'échecs).

### 2. Portée des tests

#### Les tests incluront :

- [x] **Tests unitaires** : Vérifieront les fonctionnalités isolées du UserService en utilisant des mocks pour les dépendances.

| **Catégorie**       | **Méthode** | **Description du Test**                                                            | **Cas Positifs**                                                                             | **Cas Négatifs**                                                                                        |
| ------------------- | ----------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Tests Unitaires** | `create`    | Vérifier que le mot de passe est haché avant de sauvegarder l'utilisateur.         | Le mot de passe est correctement haché et l'utilisateur est créé avec succès.                | Échec si le mot de passe n'est pas haché ou les données sont incomplètes (ex. email manquant).          |
|                     |             | Vérifier que l'utilisateur est créé avec succès et renvoyé.                        | Un objet utilisateur est renvoyé avec toutes les propriétés attendues.                       | Échec si les données de l'utilisateur sont non valides (ex. format de l'email incorrect).               |
|                     | `findAll`   | Vérifier que tous les utilisateurs sont retournés.                                 | Un tableau d'utilisateurs est retourné lorsque la base de données contient des utilisateurs. | Un tableau vide est retourné lorsque la base de données ne contient pas d'utilisateurs.                 |
|                     |             | Vérifier la gestion des erreurs lors de l'échec de connexion à la base de données. | N/A                                                                                          | Erreur levée lorsque la connexion à la base de données échoue.                                          |
|                     | `findOne`   | Vérifier que l'utilisateur est retourné pour un ID valide.                         | L'utilisateur correspondant à l'ID est renvoyé.                                              | `null` est renvoyé lorsqu'aucun utilisateur n'est trouvé avec l'ID donné. Erreur pour un ID non valide. |
|                     | `update`    | Vérifier que l'objet`UpdateResult` est retourné après la mise à jour.              | `UpdateResult` est renvoyé après la mise à jour de l'utilisateur avec succès.                | Échec si l'utilisateur n'existe pas ou si les données de mise à jour sont invalides.                    |
|                     | `delete`    | Vérifier que l'objet`UpdateResult` est retourné après la suppression.              | `UpdateResult` est renvoyé après la suppression réussie de l'utilisateur.                    | Échec si l'utilisateur n'existe pas ou si un ID non valide est fourni.                                  |

## Couvrir le CRUD sur le UserRepository

### 1. Objectif

L'objectif est de tester exhaustivement toutes les fonctionnalités du UserService, qui est un service de gestion des utilisateurs indépendant du service d'authentification. Nous nous concentrerons sur la couverture complète des méthodes CRUD (create, findAll, findOne, update, delete), en veillant à tester à la fois les chemins positifs (cas où les opérations réussissent) et les chemins négatifs (cas d'erreurs ou d'échecs).

### 2. Portée des tests

Repository

#### Les tests incluront :

- [x] **Tests unitaires** : Vérifieront les fonctionnalités isolées du UserRepository en utilisant des mocks pour les dépendances.

| **Catégorie**       | **Méthode** | **Description du Test**                                                                                                                                                        | **Cas Positifs**                                                                             | **Cas Négatifs**                                                                                        |
| ------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Tests Unitaires** | `save`      | Verfie que la fonction créer une nouvelle entrée correspondante à l'entité                                                                                                     | Le mot de passe est correctement haché et l'utilisateur est créé avec succès.                | Échec si le mot de passe n'est pas haché ou les données sont incomplètes (ex. email manquant).          |
|                     |             |                                                                                                                                                                                |                                                                                              |                                                                                                         |
|                     | `find`      | Verfie que la fonction créer une nouvelle entrée correspondante à l'entité avec tous les utilisateurs sont retournés.                                                          | Un tableau d'utilisateurs est retourné lorsque la base de données contient des utilisateurs. | Un tableau vide est retourné lorsque la base de données ne contient pas d'utilisateurs.                 |
|                     |             |                                                                                                                                                                                |                                                                                              |                                                                                                         |
|                     | `findOne`   | Verfie que la fonction créer une nouvelle entrée correspondante à l'entité avec tous les utilisateurs sont retournésVérifier que l'utilisateur est retourné pour un ID valide. | L'utilisateur correspondant à l'ID est renvoyé.                                              | `null` est renvoyé lorsqu'aucun utilisateur n'est trouvé avec l'ID donné. Erreur pour un ID non valide. |
|                     | `update`    | Vérifier que le champs à bien été modifier`                                                                                                                                    | `UpdateResult` est renvoyé après la mise à jour de l'utilisateur avec succès.                | Échec si l'utilisateur n'existe pas ou si les données de mise à jour sont invalides.                    |
|                     | `delete`    | Vérifie que le champ cible à bien été surpprimé                                                                                                                                | `UpdateResult` est renvoyé après la suppression réussie de l'utilisateur.                    | Échec si l'utilisateur n'existe pas ou si un ID non valide est fourni.                                  |

### Test 2n2

| Nom du stest            | Description                                                | Attente                                                                          |
| ----------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Table Should Be Present | Aller sur l'index                                          | L'index est bien présent est chargé                                              |
|                         | Verfier la présence de la table                            | La table est présente                                                            |
|                         | Les deux premier utilisateur en base de donnée son présent | Les données doivent être conforme à la BDD                                       |
| Should be user detail   | se rendre sur la page /users/[`id`]                        | Le titre doit comprend l'id de l'utilisateur                                     |
|                         | Un formulaire doit être présent                            | Le formulaire comprend les inputs avec par défault la value liée à l'utilisateur |
