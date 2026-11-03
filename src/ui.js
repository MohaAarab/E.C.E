// Handles everything displayed on screen.
import { createGame } from "./game.js";
import { addPlayer, deletePlayer, editPlayer } from "./players.js";
import { filterGames, saveGame, searchGames } from "./history.js";

export function renderScreen() {}

function profilesRender (){}

const error=document.querySelector("#error_pseudo");

export function displayPlayerError(status){
    if(status === "invalid"){
        error.textContent="Le pseudo doit contenir entre 3 et 15 caractères (lettres et chiffres uniquement)."
    }else if(status === "taken"){
        error.textContent="Ce pseudo est déjà pris."
    }
}