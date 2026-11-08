// Starts the app and listens to clicks.

import { displayActivePlayer, renderGame } from "./ui-jouer.js";
import { createGame } from "./game.js";
// import { addPlayer, editPlayer,deletePlayer, getPlayer,selectPlayler} from "./players.js";

displayActivePlayer()
renderGame(createGame())

  
