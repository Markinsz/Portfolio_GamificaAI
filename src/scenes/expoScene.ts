import { Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/players";


export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }
    
    onInitialize(engine: Engine<any>): void {
        // Carregar o mapa
        let tiledMap = Resources.Mapa

        // Definir offset para renderização do mapa
        let offsetX = 138
        let offsetY = 100

        // Adicionar o mapa na cena
        tiledMap.addToScene(this, {
            pos: vec(offsetX, offsetY)
        })

        // Definir zoom da câmera para aumentar a vizualização
        this.camera.zoom = 1.4

        // Criação e config do Player
        let jogador = new Player()

        // Definir z-index do Player, útil se algum outro elemento ficar "por cima" do jogador
        jogador.z = 2

        // Add Player na cena
        this.add(jogador)
    }
}