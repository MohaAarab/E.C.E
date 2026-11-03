// Starts the app and listens to clicks.


import { renderScreen,displayPlayerError } from "./ui.js";
import { addPlayer } from "./players.js";

export { renderScreen };

const form=document.querySelector("#player-form");
const nickname=document.querySelector("#username_input");


form.addEventListener("submit",function(event){
    event.preventDefault();
    const playerNickname=nickname.value;
    const avatarInput=form.querySelector('input[name="avatar"]:checked')
    if(avatarInput === null) return;
    const playerAvatar=avatarInput.value

    const result=addPlayer(playerNickname,playerAvatar)
    if(result === "success"){

    }else if(result === "invalid"){
        displayPlayerError(result)
    }else if(result === "taken"){
        displayPlayerError(result)
    }
})