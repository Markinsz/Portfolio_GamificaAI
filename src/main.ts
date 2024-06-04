import { Engine, FadeInOut } from "excalibur";
import { welcomeScenes } from "./welcomeScenes";
import { loader } from "./resources";
import { historyScene } from "./historyScenes";

const game = new Engine({
  width: 1200,
  height: 800,
  canvasElementId: "jogo"
})

game.addScene("bemvindo", new welcomeScenes())
game.addScene("history", new historyScene())

game.start(loader).then(() => {
  game.goToScene("bemvindo", {
    sourceOut: new FadeInOut({duration: 1000})
  })
})