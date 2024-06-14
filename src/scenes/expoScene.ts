import { Actor, Animation, CollisionType, Color, Engine, FadeInOut, Graphic, Scene, SpriteSheet, Transition, vec } from "excalibur";
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
    engine.toggleDebug()

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
            vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY),
            "npcA"            
        )

        const NPCaSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.NPCaSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            },
        })

        const downIdleA = new Animation({
            frames: [
                { graphic: NPCaSpriteSheet.getSprite(18, 1) },
                { graphic: NPCaSpriteSheet.getSprite(19, 1) },
                { graphic: NPCaSpriteSheet.getSprite(20, 1) },
                { graphic: NPCaSpriteSheet.getSprite(21, 1) },
                { graphic: NPCaSpriteSheet.getSprite(22, 1) },
                { graphic: NPCaSpriteSheet.getSprite(23, 1) },
            ],
            frameDuration: 150
        })
        npcA.graphics.add("down-idle-a", downIdleA)

        npcA.graphics.use(downIdleA)

        let npcB = new npc(
            vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsetY),
            "npcB"
        )

        const NPCbSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.NPCbSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            }, 
        })

        const downIdleB = new Animation({
            frames: [
                { graphic: NPCbSpriteSheet.getSprite(18, 1) },
                { graphic: NPCbSpriteSheet.getSprite(19, 1) },
                { graphic: NPCbSpriteSheet.getSprite(20, 1) },
                { graphic: NPCbSpriteSheet.getSprite(21, 1) },
                { graphic: NPCbSpriteSheet.getSprite(22, 1) },
                { graphic: NPCbSpriteSheet.getSprite(23, 1) },
            ],
            frameDuration: 150
        })
        npcB.graphics.add("down-idle-b", downIdleB)

        npcB.graphics.use(downIdleB)

        let npcC = new npc(
            vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY),
            "npcC"
        )

        const NPCcSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.NPCcSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            }, 
        })

        const downIdleC = new Animation({
            frames: [
                { graphic: NPCcSpriteSheet.getSprite(18, 1) },
                { graphic: NPCcSpriteSheet.getSprite(19, 1) },
                { graphic: NPCcSpriteSheet.getSprite(20, 1) },
                { graphic: NPCcSpriteSheet.getSprite(21, 1) },
                { graphic: NPCcSpriteSheet.getSprite(22, 1) },
                { graphic: NPCcSpriteSheet.getSprite(23, 1) },
            ],
            frameDuration: 150
        })
        npcC.graphics.add("down-idle-c", downIdleC)

        npcC.graphics.use(downIdleC)

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