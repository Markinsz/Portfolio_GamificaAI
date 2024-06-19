import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/players";
import { npc } from "../actors/npc";


export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }
    
    onInitialize(engine: Engine<any>): void {
        // Modo debug
        // engine.toggleDebug()

        // Carregar bgm (background music)
        let bgm = Resources.RitmadaBGM

        // configurar musica
        bgm.loop = true
        bgm.play(0.5)

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
        this.camera.zoom = 2

        // Definir ponto de spawn do Player
        let spawnPoint = tiledMap.getObjectsByName("player_spawn")[0]

        // Criação e config do Player
        let jogador = new Player(vec(spawnPoint.x + offsetX, spawnPoint.y + offsetY))

        // Definir z-index do Player, útil se algum outro elemento ficar "por cima" do jogador
        jogador.z = 1

        // Add Player na cena
        this.add(jogador)

        // Definindo spawn de npc
        let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
        let npcSpawnPointB = tiledMap.getObjectsByName("npc_b")[0]
        let npcSpawnPointC = tiledMap.getObjectsByName("npc_c")[0]

        // configurar npc's
        let npcA = new npc(
            vec(npcSpawnPointA.x + offsetX, npcSpawnPointC.y + offsetY),
            "npcA",
            "a"
        )
        let npcB = new npc(
            vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsetY),
            "npcB",
            "b"         
        )
        let npcC = new npc(
            vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY),
            "npcC",
            "c"         
        )

        // Add npc's
        this.add(npcA)
        this.add(npcB)
        this.add(npcC)

        // Focar câmera no Player
        this.camera.strategy.lockToActor(jogador)
        
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