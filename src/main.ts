import { Engine, FadeInOut } from "excalibur";
import { welcomeScenes } from "./scenes/welcomeScene";
import { loader } from "./resources";
import { historyScene } from "./scenes/historyScene";
import { gamificationScene } from "./scenes/gamificationScene";

const game = new Engine({
  width: 1200,
  height: 800,
  canvasElementId: "jogo"
})

game.addScene("bemvindo", new welcomeScenes())
game.addScene("history", new historyScene())
game.addScene("gamificacao", new gamificationScene())

game.start(loader).then(() => {
  game.goToScene("history", {
    sourceOut: new FadeInOut({duration: 1000})
  })
})