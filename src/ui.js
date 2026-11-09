// Handles everything displayed on screen.
// import { createGame } from "./game.js";
import {getPlayer ,getActivePlayer } from "./players.js";
// import { filterGames, saveGame, searchGames } from "./history.js";



export function formDisplay() {
    const text1=document.querySelector("#text-1")
    const players_cards=document.querySelector("#players_cards")
    const profil_add=document.querySelector("#profil-add")
    const player_form_section=document.querySelector("#player-form-section")

    players_cards.classList.add("hidden")
    text1.classList.add("hidden")
    profil_add.classList.add("hidden")
    player_form_section.classList.remove("hidden")


}

export function editProfilFormDisplay() {
    const text1=document.querySelector("#text-1")
    const players_cards=document.querySelector("#players_cards")
    const profil_add=document.querySelector("#profil-add")
    const player_form_section=document.querySelector("#player-form-section")
    const form_title=document.querySelector("#form-title")
    const dir=document.querySelector("#dir")

    players_cards.classList.add("hidden")
    text1.classList.add("hidden")
    profil_add.classList.add("hidden")
    player_form_section.classList.remove("hidden")
    form_title.textContent="Modifier le profil"
    dir.textContent="PROFILS / MODIFIER PROFIL"


}

export function formHide(){
    const text1=document.querySelector("#text-1")
    const players_cards=document.querySelector("#players_cards")
    const profil_add=document.querySelector("#profil-add")
    const player_form_section=document.querySelector("#player-form-section")

    text1.classList.remove("hidden")
    profil_add.classList.remove("hidden")
    player_form_section.classList.add("hidden")
    players_cards.classList.remove("hidden")

    
}


export function profilesRender (){
    const players=getPlayer()
    const activePlayer=getActivePlayer()
    const playersContainer = document.querySelector("#players_cards")
    const act_player = document.querySelector("#act-player");
    playersContainer.innerHTML=""

    players.forEach(player => {
        const isActive=activePlayer && activePlayer.id === player.id
        
        const html=`
    <div data-id="${player.id}" class="player-profil bg-surface border border-empereur rounded-xl p-4 mb-2">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full border border-empereur flex items-center justify-center"><img src="src/imgs/${player.avatar}.svg" alt="${player.avatar}" >

        </div>class
        <div class="flex-1">
          <h3 class="font-semibold">${player.nickname}</h3>
          <p class="text-xs text-secondaire">0 parties jouées</p>
        </div>
        <span class="text-empereur"></span>
      </div>


      <div class="flex justify-between text-xs mt-3">
        <span class="text-secondaire">0 victoires au compteur</span>

        <span class="text-empereur font-semibold">${isActive ? "PROFIL SÉLECTIONNÉ" :""}</span>
      </div>

      <div class="grid grid-cols-3 gap-2 mt-3 text-sm">
        <button class="chose-btn py-2 rounded-md border ${
            isActive ?
            "border-empereur text-empereur bg-empereur/10" :
            "bg-surface-elevee border-bordure"}">Choisi</button>
        <button class="edit-btn  py-2 rounded-md bg-surface-elevee border border-bordure">Modifier</button>
        <button class="delete-btn py-2 rounded-md bg-surface-elevee border border-bordure text-esclave">Supprimer</button>
      </div>
    </div>
        `
        playersContainer.innerHTML+=html;
        isActive ? act_player.textContent=`${player.nickname}` : ""
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

