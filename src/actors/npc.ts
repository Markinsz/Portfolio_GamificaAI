import { Actor, CollisionType, Vector } from "excalibur"

export class npc extends Actor {
    constructor (posicao: Vector, nome: string) {
        super ({
            pos: posicao,
            width: 32,
            height: 32,
            name: nome,
            collisionType: CollisionType.Fixed,
            z: 2
        })
    }
}