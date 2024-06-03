import { Engine } from "excalibur";
import { welcomeScenes } from "./welcomeScenes";

const game = new Engine({
  width: 1200,
  height: 800,
  canvasElementId: "jogo"
})

game.addScene("bemvindo", new welcomeScenes())

game.start().then(() => {
  game.goToScene("bemvindo")
})