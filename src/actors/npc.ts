import { Actor, Animation, CollisionType, SpriteSheet, Vector, vec } from "excalibur"
import { Resources } from "../resources"

export class npc extends Actor {
    constructor (posicao: Vector, nome: string, npc: string) {
        super ({
            pos: posicao,
            width: 32,
            height: 32,
            name: nome,

            collisionType: CollisionType.Fixed,
        })

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
        this.graphics.add("down-idle-a", downIdleA)


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
        this.graphics.add("down-idle-b", downIdleB)


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
        this.graphics.add("down-idle-c", downIdleC)

        this.graphics.use("down-idle-"+npc)
    }
}