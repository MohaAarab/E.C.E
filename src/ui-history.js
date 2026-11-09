import { getActivePlayer } from "./players.js";




const act_player = document.querySelector("#player-name");
const historyList = document.querySelector("#history-list");
const gamesCount = document.querySelector("#games-count");
const searchInput = document.querySelector("#history-search");
const resultFilters = document.querySelector("#filter-result");
const dateFilters = document.querySelector("#filter-date");
let currentResult = "all";
let currentDate = "all";

export function displayActivePlayer() {
  const activePlayer = getActivePlayer();

  if (!activePlayer) {
    act_player.textContent = "Aucun profil sélectionné";
    return;
  }

  act_player.textContent = activePlayer.nickname;
}

// Temporary history data
let historyGames = [];

// Formats the date
function formatGameDate(date) {
  return new Date(date).toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Displays the history cards
function renderHistory(games) {
  gamesCount.textContent = games.length;

  if (games.length === 0) {
    historyList.innerHTML = `
      <p class="text-center text-sm text-secondaire py-8">
        Aucune partie trouvée.
      </p>
    `;
    return;
  }

  historyList.innerHTML = games.map((game) => {
    let resultLabel = "Égalité";
    let resultClass = "text-secondaire bg-surface border-bordure";

    if (game.result === "victory") {
      resultLabel = "Victoire";
      resultClass = "text-victoire bg-victoire/15 border-victoire/30";
    } else if (game.result === "defeat") {
      resultLabel = "Défaite";
      resultClass = "text-esclave bg-esclave/15 border-esclave/30";
    }

    return `
      <div class="bg-surface border border-bordure rounded-xl p-4">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">${game.playerName}</h3>

          <span class="text-xs rounded-full px-3 py-1 border ${resultClass}">
            ${resultLabel}
          </span>
        </div>

        <div class="flex items-end justify-between mt-3">
          <div>
            <p class="text-[11px] text-secondaire">
              ${formatGameDate(game.date)}
            </p>

            <p class="mt-1">
              <span class="font-titre text-xl font-bold">
                ${game.playerScore} – ${game.computerScore}
              </span>
              <span class="text-[11px] text-secondaire ml-1">
                contre l'ordinateur
              </span>
            </p>
          </div>

          <button
            data-id="${game.id}"
            class="delete-game p-2 text-secondaire hover:text-esclave"
            aria-label="Supprimer cette partie"
          >
            Supprimer
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// Filters the games
function filterHistory() {
  const searchValue = searchInput.value.toLowerCase();

  let filteredGames = historyGames.filter((game) => {
    const matchesName = game.playerName.toLowerCase().includes(searchValue);

    const matchesResult =
      currentResult === "all" || game.result === currentResult;

    let matchesDate = true;
    const gameDate = new Date(game.date);
    const today = new Date();

    if (currentDate === "today") {
      matchesDate = gameDate.toDateString() === today.toDateString();
    } else if (currentDate === "week") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      matchesDate = gameDate >= sevenDaysAgo && gameDate <= today;
    }

    return matchesName && matchesResult && matchesDate;
  });

  renderHistory(filteredGames);
}

export function setHistoryGames(games) {
  historyGames = games;
  filterHistory();
}

// Search
searchInput.addEventListener("input", filterHistory);

// Result filters
resultFilters.addEventListener("click", (event) => {
  const buttons = resultFilters.querySelectorAll("button");
  const clickedButton = event.target.closest("button");

  if (!clickedButton) return;

  const index = [...buttons].indexOf(clickedButton);

  const results = ["all", "victory", "defeat", "draw"];
  currentResult = results[index];

  buttons.forEach((button) => {
    button.className =
      "px-3 py-1.5 rounded-md border border-bordure bg-surface text-secondaire";
  });

  clickedButton.className =
    "px-3 py-1.5 rounded-md border border-empereur text-empereur bg-empereur/10";

  filterHistory();
});
// Date filters
dateFilters.addEventListener("click", (event) => {
  const buttons = dateFilters.querySelectorAll("button");
  const clickedButton = event.target.closest("button");

  if (!clickedButton) return;

  const index = [...buttons].indexOf(clickedButton);

  const dates = ["today", "week", "all"];
  currentDate = dates[index];

  buttons.forEach((button) => {
    button.className =
      "px-3 py-1.5 rounded-md border border-bordure bg-surface text-secondaire";
  });

  clickedButton.className =
    "px-3 py-1.5 rounded-md border border-empereur text-empereur bg-empereur/10";

  filterHistory();
});



// Initial rendering
filterHistory();
