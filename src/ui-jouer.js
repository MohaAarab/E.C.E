import { getActivePlayer } from "./players.js";

import { playDuel,resolveRound,updateScore,startNextRound } from "./game.js";

const act_player = document.querySelector("#player-name");
const round_number = document.querySelector("#round-current");
const Group = document.querySelector("#group-current");
const Camp = document.querySelector("#player-side");
const playerScore = document.querySelector("#score-player");
const computerScore = document.querySelector("#score-computer");
const computerHandContainer = document.querySelector("#computer-hand");
const playerHandContainer = document.querySelector("#player-hand");
let selectedCardIndex = null;
let currentPlayerHand = [];
let currentComputerHand = [];
let currentGameState = null;
const playerSlot = document.querySelector("#player-slot");
const playButton = document.querySelector("#play-card");
const computerSlot = document.querySelector("#computer-slot");


export function displayActivePlayer() {
  const activePlayer = getActivePlayer();

  if (!activePlayer) {
    act_player.textContent = "Aucun profil sélectionné";
    return;
  }

  act_player.textContent = activePlayer.nickname;
}


export function renderGame(gameState) {
  currentGameState = gameState;

  const { roundNumber, group, camp, score } = gameState;

  round_number.textContent = roundNumber;
  Group.textContent = group;
  Camp.textContent = camp.charAt(0).toUpperCase() + camp.slice(1);

  playerScore.textContent = score.player;
  computerScore.textContent = score.computer;

  renderPlayerHand(gameState.playerHand);
  renderComputerHand(gameState.computerHand);
}

function renderPlayerHand(playerHand) {
  currentPlayerHand = playerHand;
  selectedCardIndex = null;
  playerSlot.innerHTML = "+";

  playerHandContainer.innerHTML = "";

  playerHand.forEach((card, index) => {
    let image;

    if (card === "empereur") {
      image = "./src/imgs/empereur.webp";
    } else if (card === "esclave") {
      image = "./src/imgs/esclave.webp";
    } else {
      image = "./src/imgs/citoyen.webp";
    }

    const html = `
      <button
        data-index="${index}"
        class="h-20 rounded-lg border-2 border-pioche bg-surface-elevee text-empereur flex flex-col items-center justify-center gap-1"
      >
        <img src="${image}" alt="${card}" class="w-16 h-18">
        
      </button>
    `;

    playerHandContainer.innerHTML += html;
  });
}

function renderComputerHand(computerHand) {
  currentComputerHand = computerHand;
  computerHandContainer.innerHTML = "";

  computerHand.forEach((card,index) => {

    const html = `
      <div data-id="${index}" class="h-16 rounded-lg bg-surface-elevee border border-bordure flex items-center justify-center text-empereur"><img src="src/imgs/pc.svg" alt="pc"></div>
    `;

    computerHandContainer.innerHTML += html;
  });
}


function selectCard(event) {
  const button = event.target.closest("button");

  if (!button || !playerHandContainer.contains(button)) return;

  selectedCardIndex = Number(button.dataset.index);

  const selectedCard = currentPlayerHand[selectedCardIndex];

  playerHandContainer.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("border-2", "border-pioche");
    btn.classList.add("border");
  });

  button.classList.remove("border");
  button.classList.add("border-2", "border-pioche");

  playerSlot.innerHTML = `
    <img
      src="./src/imgs/${selectedCard}.webp"
      alt="${selectedCard}"
      class="w-22 h-30"
    >
  `;
}

playerHandContainer.addEventListener("click", selectCard);



function handlePlayCard() {
  if (!currentGameState) return;
  if (currentGameState.status === "round-finished") {
    currentGameState = startNextRound(currentGameState);
    renderGame(currentGameState);

    playerSlot.innerHTML = "+";
    computerSlot.innerHTML = "";
    document.querySelector("#turn-title").textContent = "Nouveau duel";
    document.querySelector("#turn-message").textContent = "";
    return;
  }

  if (selectedCardIndex === null) return;
  const result = playDuel(
    currentPlayerHand,
    currentComputerHand,
    selectedCardIndex
  );

  currentGameState.playerHand = result.playerNewHand;
  currentGameState.computerHand = result.computerNewHand;

  const winner = resolveRound(result.result, result.playerNewHand);

  currentGameState.duelNb++;

  if (winner !== null) {
    currentGameState.roundWinner = winner;

    currentGameState.score = updateScore(
      currentGameState.score,
      currentGameState.camp,
      winner
    );
    currentGameState.status = "round-finished";
  }
  renderGame(currentGameState);
  playerSlot.innerHTML = `
    <img src="./src/imgs/${result.playerCard}.webp"
      alt="${result.playerCard}" class="w-24 h-28">
  `;

  computerSlot.innerHTML = `
    <img src="./src/imgs/${result.computerCard}.webp"
      alt="${result.computerCard}" class="w-24 h-28">
  `;

  const turnTitle = document.querySelector("#turn-title");
  const turnMessage = document.querySelector("#turn-message");
  turnTitle.textContent = result.result.toUpperCase();
  
  if (winner === "player") {
    turnMessage.textContent = "Vous avez gagné cette manche !";
  } else if (winner === "computer") {
    turnMessage.textContent = "L'ordinateur a gagné cette manche !";
  } else if (winner === "draw") {
    turnMessage.textContent = "Égalité ! Aucun point gagné.";
  } else {
    turnMessage.textContent = "Continuez la manche.";
  }

  if (winner !== null) {
    playerSlot.innerHTML = "+";
    computerSlot.innerHTML = "";
  }
};

playButton.addEventListener("click", handlePlayCard);

function displayGameResult() {
  const title = document.querySelector("#turn-title");
  const message = document.querySelector("#turn-message");

  if (currentGameState.winner === "player") {
    title.textContent = "VICTOIRE FINALE";
  } else if (currentGameState.winner === "computer") {
    title.textContent = "DÉFAITE FINALE";
  } else {
    title.textContent = "ÉGALITÉ FINALE";
  }

  message.textContent =
    `Score final : ${currentGameState.score.player} - ${currentGameState.score.computer}`;
}
playButton.addEventListener("click", handlePlayCard);