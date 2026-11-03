// Game rules only; never touches the DOM.


// export function createGame() {}

function createHand(camp) {

    let hand=["citoyen", "citoyen", "citoyen", "citoyen"]

    if(camp === "empereur" || camp === "esclave"){
        hand.push(camp)
        return hand
    }
}

function createHands(camp){
    let playerHand;
    let computerHand;
    if(camp === "empereur" ){
        playerHand=createHand("empereur")
        computerHand=createHand("esclave")
        return {playerHand,computerHand}
    }else{
        playerHand=createHand("esclave")
        computerHand=createHand("empereur")
        return {playerHand,computerHand}
    }
}
const {playerHand,computerHand}=createHands("esclave")

const arr=["citoyen", "citoyen", "citoyen", "citoyen", "empereur"]

function shuffleHand(hand){
    const handsCopy=[...hand]
    let r= Math.floor(Math.random() * handsCopy.length);
    const temp=handsCopy[r]
    handsCopy[r]=handsCopy[handsCopy.length-1]
    handsCopy[handsCopy.length-1]=temp
    return handsCopy
}

function duel(cardPlayer,cardComputer){

    if(cardPlayer === "citoyen" && cardComputer === "citoyen") return "égalité";
    else if(cardPlayer === "empereur" && cardComputer === "citoyen") return "victoire";
    else if(cardPlayer === "citoyen" && cardComputer === "esclave") return "victoire";
    else if(cardPlayer === "esclave" && cardComputer === "empereur") return "victoire";
    else return "défaite"
}


const cards = ["empereur", "citoyen", "esclave"];

cards.forEach(cardPlayer => {
    cards.forEach(cardComputer => {

        const result = duel(cardPlayer, cardComputer);

        console.log(
            `Player: ${cardPlayer} | Computer: ${cardComputer} | Result: ${result}`
        );

    });
});