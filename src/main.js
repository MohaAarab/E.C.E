// Starts the app and listens to clicks.

import { formDisplay, displayPlayerError, resetForm , profilesRender,formHide,editProfilFormDisplay} from "./ui.js";
import { addPlayer, editPlayer,deletePlayer, getPlayer } from "./players.js";

export { formDisplay };

  profilesRender()


  // elements declaration 
  const form = document.querySelector("#player-form");
  const nickname = document.querySelector("#username_input");
  const add_btn=document.querySelector("#profil-add")
  const cancel_btn=document.querySelector("#cancel-player")
  // const edit_btn=document.querySelector(".edit-btn")
  // const delete_btn=document.querySelector(".delete-btn")
  const players_cards=document.querySelector("#players_cards")
  let editingPlayerId = null;


  // event listner for the add profile button
  add_btn.addEventListener("click",()=>{
    formDisplay(),
    editingPlayerId=null;
  })

  // event listner for the cancel btn on the form
  cancel_btn.addEventListener("click",()=>{
    formHide()
    editingPlayerId=null;
  })


  // event listner for the submit button
  form.addEventListener("submit", function (event) {
  event.preventDefault();
  const playerNickname = nickname.value;
  const avatarInput = form.querySelector('input[name="avatar"]:checked');
  if (avatarInput === null) return;
  const playerAvatar = avatarInput.value;

  let result;
  if(editingPlayerId!== null) result=editPlayer(editingPlayerId,playerNickname,playerAvatar)
  else result=addPlayer(playerNickname, playerAvatar);



  if (result === "invalid" || result === "taken") displayPlayerError(result);
  else if (result === "success") {
    editingPlayerId=null
    displayPlayerError(result);
    resetForm(form);
    formHide()
    profilesRender();
  }
  });


    // event listner for the edit btn
  players_cards.addEventListener("click",(event)=>{
    const editBtn=event.target.closest(".edit-btn")
    if(!editBtn) return

    const clicked=editBtn.closest(".player-profil")
    if(!clicked) return

    editingPlayerId=clicked.dataset.id
    const player=getPlayer().find(player=>player.id === editingPlayerId)
    if(!player) return 

    nickname.value = player.nickname
    const avatarInput = form.querySelector(`input[name="avatar"][value="${player.avatar}"]`);
    if(avatarInput) avatarInput.checked=true

    editProfilFormDisplay()
  })
  
  // event listner for the delete btn 
  players_cards.addEventListener("click",(event)=>{
    const deleteBtn=event.target.closest(".delete-btn")
    if(!deleteBtn) return

    const clicked=deleteBtn.closest(".player-profil")
    if(!clicked) return

    const id=clicked.dataset.id

    deletePlayer(id)
    profilesRender()
  })

