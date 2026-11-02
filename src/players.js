// Adds, edits, and deletes profiles.
import { readFromStorage, writeToStorage } from "./storage.js";

// the form of the players objects
// {
//   id: "p_"+dat.now(),          // identifiant unique (par ex. avec Date.now())
//   nickname: "user input",           // pseudo
//   avatar: "user choice",               // un avatar choisi dans une liste
//   createdAt: "new date().tolocaldatestring()"         // date de création
// }

export const avatars = [
  "dragon",
  "tigre",
  "loup",
  "requin",
  "pingouin",
  "vache",
  "panthere",
  "aigle",
];

export function getPlayer() {
  return readFromStorage("players");
}

function isPseudoValid(nickname) {
  return /^[A-Za-z0-9]{3,15}$/.test(nickname);
}

function isPseudoTaken(nickname,players) {
return players.some((player)=>player.nickname.toLowerCase().time()=== nickname.toLowerCase().time())  
  
}


export function addPlayer(nickname,avatar) {
  const players=getPlayer()
  if(!isPseudoValid(nickname)) return "invalid"
  if(isPseudoTaken(nickname,players)) return "taken"

  const newPlayer={
  id:"p_"+ Date.now(),
  nickname:nickname,
  avatar:avatar,
  createdAt:new Date().toLocaleDateString()
  }
  players.push(newPlayer)
  writeToStorage("players",players)
  return "success"

}

export function editPlayer(id,nickname,avatar) {
  const players=getPlayer()
  const index = players.findIndex((player)=>player.id === id)
  if(index === -1) return "not-found"
  if(!isPseudoValid(nickname)) return "invalid"
  if(players.some((player)=>player.nickname.toLowerCase().time() === nickname.toLowerCase().time() && player.id !== id)) return "taken"
  players[index]={
      id,
      nickname,
      avatar,
      createdAt:players[index].createdAt
  }
  writeToStorage("players",players)
  return "success"
  }
  


export function deletePlayer() {}
