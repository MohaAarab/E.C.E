# ⚔️ E.C.E. — Empereur, Citoyen, Esclave

A strategic card game where you challenge the computer in a battle of logic, luck, and strategy.

## 📖 About the Project

**E.C.E. (Empereur, Citoyen, Esclave)** is a browser-based card game developed using HTML, CSS, Tailwind CSS, and JavaScript.

The player competes against the computer through a series of duels. Each match consists of 12 rounds, with different camps, card combinations, and scoring rules.

The project focuses on practicing JavaScript fundamentals, DOM manipulation, modular development, and browser storage.

## 🎮 Game Rules

Each round gives both the player and the computer a hand of 5 cards:

- 4 Citizen cards
- 1 Special card (Emperor or Slave)

### Card interactions

| Player's Card | Computer's Card | Result |
|---|---|---|
| Emperor | Citizen | Victory |
| Citizen | Slave | Victory |
| Slave | Emperor | Victory |
| Citizen | Citizen | Draw |
| Other combinations | | Defeat |

### Scoring System

- **Emperor camp:** 1 point per winning round.
- **Slave camp:** 5 points per winning round.
- **Draw:** No points awarded.

### Match Structure

A complete match contains 12 rounds divided into 4 groups:

| Rounds | Camp |
|---|---|
| 1–3 | Emperor |
| 4–6 | Slave |
| 7–9 | Emperor |
| 10–12 | Slave |

At the end of the 12 rounds, the player with the highest score wins.

## ✨ Features

- Player profile management.
- Avatar selection.
- Player versus computer gameplay.
- Randomized computer card selection.
- Automatic round and score management.
- 12-round match system.
- Final match results.
- Game history saved in LocalStorage.
- Search and filter game history.
- Delete saved game records.
- Responsive user interface.

## 🛠️ Technologies

- **HTML5** — Application structure.
- **CSS3** — Custom styling.
- **Tailwind CSS** — Utility-first styling.
- **JavaScript (ES6+)** — Game logic and application functionality.
- **LocalStorage** — Persistent storage for player profiles and game history.
- **Git & GitHub** — Version control and collaboration.

## 📂 Project Structure

```text
E.C.E/
│
├── index.html
├── jouer.html
├── historique.html
│
├── src/
│   ├── js/
│   │   ├── game.js
│   │   ├── players.js
│   │   ├── storage.js
│   │   ├── ui.js
│   │   ├── ui-jouer.js
│   │   ├── ui-history.js
│   │   ├── main.js
│   │   └── main-history.js
│   │
│   └── imgs/
│
├── dist/
│   └── output.css
│
└── README.md
```

## 💾 Data Storage

The application uses the browser's **LocalStorage** to store:

- Player profiles.
- Active player information.
- Completed game records.

No external database or backend server is required.

## 🎯 Learning Objectives

This project was developed to practice:

- JavaScript modules and code organization.
- Functions, arrays, objects, and array methods.
- Game logic and conditional statements.
- DOM manipulation and event handling.
- LocalStorage data management.
- Separating application logic from UI rendering.
- Git branching, commits, and team collaboration.

## 👨‍💻 Contributors

Developed as part of a web development learning project at **YouCode**.

## Links

Planification:  https://trello.com/b/zpcOOmLH/sprint-2-breif-2
GitHub pages: https://mohaaarab.github.io/E.C.E/index.html

---

*E.C.E. — Choose your card. Challenge your opponent. Claim victory.*
