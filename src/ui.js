// Handles everything displayed on screen.
import { createGame } from "./game.js";
import { addPlayer, deletePlayer, editPlayer,getPlayer } from "./players.js";
import { filterGames, saveGame, searchGames } from "./history.js";

export function renderScreen() {}

export function profilesRender (){
    const players=getPlayer()
    const playersContainer=document.querySelector("#players_cards")
    playersContainer.innerHTML=""
    players.forEach(player => {
        const html=`
    <div class="bg-surface border border-empereur rounded-xl p-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full border border-empereur flex items-center justify-center">${player.avatar}
        </div>
        <div class="flex-1">
          <h3 class="font-semibold">${player.nickname}</h3>
          <p class="text-xs text-secondaire">24 parties jouées</p>
        </div>
        <span class="text-empereur"></span>
      </div>


      <div class="flex justify-between text-xs mt-3">
        <span class="text-secondaire">14 victoires au compteur</span>
        <span class="text-empereur font-semibold">PROFIL SÉLECTIONNÉ</span>
      </div>

      <div class="grid grid-cols-3 gap-2 mt-3 text-sm">
        <button class="py-2 rounded-md border border-empereur text-empereur bg-empereur/10">Choisi</button>
        <button class="py-2 rounded-md bg-surface-elevee border border-bordure">Modifier</button>
        <button class="py-2 rounded-md bg-surface-elevee border border-bordure text-esclave">Supprimer</button>
      </div>
    </div>
        `
        playersContainer.innerHTML+=html;
        
        
    });

}


export function displayPlayerError(status){
    const error=document.querySelector("#error_pseudo");
    if(status === "invalid"){
        error.textContent="Le pseudo doit contenir entre 3 et 15 caractères (lettres et chiffres uniquement)."
    }else if(status === "taken"){
        error.textContent="Ce pseudo est déjà pris."
    }else if(status === "success"){
        error.textContent=""
    }
}
export function resetForm(form){
    form.reset()
}