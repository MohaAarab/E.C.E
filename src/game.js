// Game rules only; never touches the DOM.

// export function createGame() {}

function getCamp(roundNumber){
  if(roundNumber>=1 && roundNumber<=3) return "empereur"
  if(roundNumber>=4 && roundNumber<=6) return "esclave"
  if(roundNumber>=7 && roundNumber<=9) return "empereur"
  if(roundNumber>=10 && roundNumber<=12) return "esclave"
}

function createHand(camp) {
  let hand = ["citoyen", "citoyen", "citoyen", "citoyen"];

  if (camp === "empereur" || camp === "esclave") {
    hand.push(camp);
    return hand;
  }
}

function createHands(camp) {
  let playerHand;
  let computerHand;
  if (camp === "empereur") {
    playerHand = createHand("empereur");
    computerHand = createHand("esclave");
    return { playerHand, computerHand };
  } else {
    playerHand = createHand("esclave");
    computerHand = createHand("empereur");
    return { playerHand, computerHand };
  }
}
// const { playerHand, computerHand } = createHands("esclave");


function shuffleHand(hand) {
  let handsCopy = [...hand];
  let r = Math.floor(Math.random() * handsCopy.length);
  const temp = handsCopy[r];
  handsCopy[r] = handsCopy[handsCopy.length - 1];
  handsCopy[handsCopy.length - 1] = temp;
  return handsCopy;
}


function duel(cardPlayer, cardComputer) {
  if (cardPlayer === "citoyen" && cardComputer === "citoyen") return "égalité";
  else if (cardPlayer === "empereur" && cardComputer === "citoyen")
    return "victoire";
  else if (cardPlayer === "citoyen" && cardComputer === "esclave")
    return "victoire";
  else if (cardPlayer === "esclave" && cardComputer === "empereur")
    return "victoire";
  else return "défaite";
}

function removeCard(hand, index) {
  const newHand = [...hand];
  newHand.splice(index, 1);
  return newHand;
}

const getRandomCardIndex=(hand)=>Math.floor(Math.random() * hand.length);

// should i add the condition on this function to handel the rounds
function createRoundHands(camp){
    const { playerHand, computerHand }=createHands(camp)

    return{
        playerHand,
        computerHand:shuffleHand(computerHand)
    }
}



function playDuel(playerHand,computerHand,playerIndex){
  const playerCard=playerHand[playerIndex];
  const computerIndex=getRandomCardIndex(computerHand)
  const computerCard=computerHand[computerIndex];

  const result=duel(playerCard,computerCard);
  const playerNewHand=removeCard(playerHand,playerIndex)
  const computerNewHand=removeCard(computerHand,computerIndex)

  return {playerCard,computerCard,result,playerNewHand,computerNewHand}
}

function calculateRoundPoints(camp,result){
  let score=0
  if(camp==="empereur" && result==="victoire") score++;
  if(camp==="esclave" && result==="victoire") score+=5;
  return score;
  
}

// this is not the done version the playerindex is fixed for the entire function 
function playRound(camp,playerHand,computerHand,playerIndex){
  let duelCount = 0;
  let history = []
  let winner = null;

  while (duelCount<5 && winner===null){
    const duelResult= playDuel(playerHand,computerHand,playerIndex)

    playerHand=duelResult.playerNewHand
    computerHand=duelResult.computerNewHand
    duelCount++

    history.push({            
            playerCard: duelResult.playerCard,
            computerCard: duelResult.computerCard,
            result: duelResult.result
          })

        if (duelResult.result === "victoire") {
            winner = "player";
        } else if (duelResult.result === "défaite") {
            winner = "computer";
        }

        if (winner !== null) break;
    }

    const points = calculateRoundPoints(camp, winner === "player" ? "victoire" : "défaite");

    return {winner,points,duelCount,history,playerHand,computerHand}

  }
 
