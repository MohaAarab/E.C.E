
// Game rules only; never touches the DOM.

// Returns the camp
function getCamp(roundNumber) {
  if (roundNumber >= 1 && roundNumber <= 3) return "empereur";
  if (roundNumber >= 4 && roundNumber <= 6) return "esclave";
  if (roundNumber >= 7 && roundNumber <= 9) return "empereur";
  if (roundNumber >= 10 && roundNumber <= 12) return "esclave";
}

// Creates the 5 cards for one player
function createHand(camp) {
  let hand = ["citoyen", "citoyen", "citoyen", "citoyen"];
  hand.push(camp);
  return hand;
}

// Creates both players' hands
function createHands(camp) {
  let playerHand;
  let computerHand;

  if (camp === "empereur") {
    playerHand = createHand("empereur");
    computerHand = createHand("esclave");
  } else {
    playerHand = createHand("esclave");
    computerHand = createHand("empereur");
  }

  return { playerHand, computerHand };
}

// Shuffles
function shuffleHand(hand) {
  let handsCopy = [...hand];

  for (let i = handsCopy.length - 1; i > 0; i--) {
    let r = Math.floor(Math.random() * (i + 1));

    let temp = handsCopy[i];
    handsCopy[i] = handsCopy[r];
    handsCopy[r] = temp;
  }

  return handsCopy;
}

// Compares two cards
function duel(cardPlayer, cardComputer) {
  if (cardPlayer === "citoyen" && cardComputer === "citoyen") {
    return "égalité";
  } else if (
    cardPlayer === "empereur" &&
    cardComputer === "citoyen"
  ) {
    return "victoire";
  } else if (
    cardPlayer === "citoyen" &&
    cardComputer === "esclave"
  ) {
    return "victoire";
  } else if (
    cardPlayer === "esclave" &&
    cardComputer === "empereur"
  ) {
    return "victoire";
  } else {
    return "défaite";
  }
}

// Removes a played card
function removeCard(hand, index) {
  const newHand = [...hand];
  newHand.splice(index, 1);
  return newHand;
}

// Returns a random card index
const getRandomCardIndex = (hand) =>
  Math.floor(Math.random() * hand.length);

// Creates shuffled hands for a round
function createRoundHands(camp) {
  const { playerHand, computerHand } = createHands(camp);

  return {
    playerHand,
    computerHand: shuffleHand(computerHand),
  };
}

// Plays one duel
export function playDuel(playerHand, computerHand, playerIndex) {
  const playerCard = playerHand[playerIndex];

  const computerIndex = getRandomCardIndex(computerHand);
  const computerCard = computerHand[computerIndex];

  const result = duel(playerCard, computerCard);

  const playerNewHand = removeCard(playerHand, playerIndex);
  const computerNewHand = removeCard(computerHand, computerIndex);

  return {
    playerCard,
    computerCard,
    result,
    playerNewHand,
    computerNewHand,
  };
}

// Calculates points according to the winning camp
function calculateRoundPoints(camp) {
  if (camp === "empereur") return 1;
  if (camp === "esclave") return 5;
  return 0;
}

// Updates the score after a round
export function updateScore(score, camp, winner) {
  if (winner === "draw") return score;

  let winnerCamp = camp;

  if (winner === "computer") {
    if (camp === "empereur") {
      winnerCamp = "esclave";
    } else {
      winnerCamp = "empereur";
    }
  }

  const points = calculateRoundPoints(winnerCamp);

  return {
    ...score,
    [winner]: score[winner] + points,
  };
}

// Checks whether the round has a winner
export function resolveRound(result, playerHand) {
  if (result === "victoire") return "player";
  if (result === "défaite") return "computer";

  if (playerHand.length === 0) return "draw";

  return null;
}

// Returns the current group
const getGroup = (roundNumber) => Math.ceil(roundNumber / 3);

// Checks whether all rounds are finished
const isGameFinished = (roundNumber) => roundNumber > 12;

// Determines the  winner
function getGameResult(score) {
  if (score.player > score.computer) return "player";
  if (score.player < score.computer) return "computer";
  return "draw";
}

// Starts the next round or finishes the game
export function startNextRound(gameState) {
  const nextRound = gameState.roundNumber + 1;

  if (isGameFinished(nextRound)) {
    return {
      ...gameState,
      status: "finished",
      winner: getGameResult(gameState.score),
    };
  }

  const camp = getCamp(nextRound);
  const { playerHand, computerHand } = createRoundHands(camp);

  return {
    ...gameState,
    roundNumber: nextRound,
    group: getGroup(nextRound),
    camp,
    playerHand,
    computerHand,
    duelNb: 1,
    roundWinner: null,
    status: "playing",
  };
}

// Creates a new game
export function createGame() {
  const camp = getCamp(1);
  const { playerHand, computerHand } = createRoundHands(camp);

  return {
    roundNumber: 1,
    group: 1,
    camp,
    playerHand,
    computerHand,
    duelNb: 1,
    score: {
      player: 0,
      computer: 0,
    },
    roundWinner: null,
    status: "playing",
    winner: null,
  };
}
