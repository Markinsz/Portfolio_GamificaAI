import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
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
        jogador.z = 1

        // Add Player na cena
        this.add(jogador)

        // Add colisão com cada objeto
        // Pegar a camada de objetos colisores
        let camadaObjetoColisores = tiledMap.getObjectLayers("ObjetosColisores") [0]

        console.log(camadaObjetoColisores);

        // Percorrer objetos com foreach e para cada objeto, renderizar um actor
        camadaObjetoColisores.objects.forEach(objeto => {
            const objetoAtual = new Actor({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsetY + (objeto.tiledObject.height! / 2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed,
            })

            // Adicionar o colisor do objeto na cena
            this.add(objetoAtual)
        })
    }
}