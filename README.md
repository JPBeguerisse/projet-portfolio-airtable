# 🎓 Projet Portfolio - ESGI 5IW2

Ce projet permet de créer un portfolio pour présenter les projets étudiants de la filière Ingénierie du Web, avec une interface publique et une interface administrateur.

- **Interface publique** pour la consultation des projets publiés
- **Interface administrateur** pour la gestion du contenu

---

## 📁 Structure du projet

- `admin/` – Interface d’administration (ajout, modification, commenter, suppression de projets, étudiants, statistiques, etc.)
- `portfolio/` – Interface publique pour consulter les projets publiés

---

## 🚀 Installation du projet

1. Cloner le projet :

```bash
git clone https://github.com/JPBeguerisse/projet-portfolio-airtable.git

cd projet-portfolio-airtable
```


2. Installer les dépendances admin :

```bash
cd admin
npm install
npm run dev

lancer sur:  http://localhost:5174


```

---

3. Installer les dépendances portfolio :

```bash
cd portfolio
npm install
npm run dev

lancer sur:  http://localhost:5173

```

---

## 🔐 Variables d’environnement

Créer un fichier `.env` dans **admin/** et **portfolio/** :

```env
VITE_AIRTABLE_API_KEY=CLE_PRIVEE
VITE_AIRTABLE_BASE_ID=BASE_ID
```

---

## 👨‍💻 Fonctionnalités principales

Création / modification / suppression de projets
Commneter un project
Ajout d'étudiants liés à des projets
Téléversement d'images via Cloudinary
Statistiques générales (nombre de projets, total de likes)
Système de like sur les projets
Authentification sécurisée pour l'admin
Recherches de projets par mots-clés
Interface publique pour visualiser uniquement les projets visibles

---

## 🧰 Technologies utilisées

- React + Vite
- Tailwind CSS
- React Hook Form + Zod
- Airtable (base de données)
- Cloudinary (upload d’images)
- Axios
- React Toastify

---

## compte test admin

email: test@mail.com 
password: test

---

## 👥 Membres du groupe

- Jean Pierre BEGUERISSE
- Ilyesse HAMCHERIF
```

