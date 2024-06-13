import { Actor, Animation, CollisionType, Color, Engine, Keys, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    // Propriedade do player
    private velocidade: number = 180

    // Configurações do player
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Config spritesheet player
        const PlayerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            },
            spacing: {
                originOffset: {
                    y: 8,
                }
            }
        })

        // Criar animações
        const duraçãoFrameAnimacao = 70;
        // 1- Idle
        // Idle Esquerda
        const leftIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(12, 1) },
                { graphic: PlayerSpriteSheet.getSprite(13, 1) },
                { graphic: PlayerSpriteSheet.getSprite(14, 1) },
                { graphic: PlayerSpriteSheet.getSprite(15, 1) },
                { graphic: PlayerSpriteSheet.getSprite(16, 1) },
                { graphic: PlayerSpriteSheet.getSprite(17, 1) },
            ],
            frameDuration: duraçãoFrameAnimacao
        })
        this.graphics.add("left-idle", leftIdle)

        // Idle Direita
        const rightIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(0, 1) },
                { graphic: PlayerSpriteSheet.getSprite(1, 1) },
                { graphic: PlayerSpriteSheet.getSprite(2, 1) },
                { graphic: PlayerSpriteSheet.getSprite(3, 1) },
                { graphic: PlayerSpriteSheet.getSprite(4, 1) },
                { graphic: PlayerSpriteSheet.getSprite(5, 1) },
            ],
            frameDuration: duraçãoFrameAnimacao
        })
        this.graphics.add("right-idle", rightIdle)

        // Idle up
        const upIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(6, 1) },
                { graphic: PlayerSpriteSheet.getSprite(7, 1) },
                { graphic: PlayerSpriteSheet.getSprite(8, 1) },
                { graphic: PlayerSpriteSheet.getSprite(9, 1) },
                { graphic: PlayerSpriteSheet.getSprite(10, 1) },
                { graphic: PlayerSpriteSheet.getSprite(11, 1) },
            ],
            frameDuration: duraçãoFrameAnimacao
        })
        this.graphics.add("up-idle", upIdle)

        // Idle down
        const downIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(18, 1) },
                { graphic: PlayerSpriteSheet.getSprite(19, 1) },
                { graphic: PlayerSpriteSheet.getSprite(20, 1) },
                { graphic: PlayerSpriteSheet.getSprite(21, 1) },
                { graphic: PlayerSpriteSheet.getSprite(22, 1) },
                { graphic: PlayerSpriteSheet.getSprite(23, 1) },
            ],
            frameDuration: duraçãoFrameAnimacao
        })
        this.graphics.add("down-idle", downIdle)
        
        // Config Player para monitorar evento "hold" do teclado
        engine.input.keyboard.on("hold", (event) => {
            // Detectar qual tecla está pressionada
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    // Mover para esquerda
                    // Define a velocidade x para negativa, que significa movimentar o playerr para a esquerda
                    this.vel.x = - this.velocidade
                    break;

                case Keys.Right:
                case Keys.D:
                    this.vel.x = this.velocidade
                    break;

                case Keys.Up:
                case Keys.W:
                    this.vel.y = -this.velocidade
                    break;

                case Keys.Down:
                case Keys.S:
                    this.vel.y = this.velocidade
                    break;

                default:
                    // Zera a velocidade do Player
                    // this.vel.x = 0
                    // this.vel.y = 0
                    break;
            }
        })

        // Configura o player para monitorar evento "release"
        engine.input.keyboard.on("release", (event) => {
            if (
                // Se o evento for as teclas:
                event.key == Keys.A ||
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                // Zera a velocidade horizontal
                this.vel.x = 0
            }

            if (
                // Se o evento for as teclas:
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ) {
                // Zera a velocidade vertical
                this.vel.y = 0
            }
        })
    }

}