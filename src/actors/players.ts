import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Side, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    // Propriedade do player
    private velocidade: number = 180

    private temObjetoProximo: boolean = false
    private ultimoColisor?: Collider

    // Configurações do player
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32  ,
            name: "Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active,
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
            // spacing: {
            //     // originOffset: {
            //     //     y: 8,
            //     // }
            // }
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
            frameDuration: 150
        })
        this.graphics.add("left-idle", leftIdle)


        // Andando Esquerda
        const leftwalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(12, 2) },
                { graphic: PlayerSpriteSheet.getSprite(13, 2) },
                { graphic: PlayerSpriteSheet.getSprite(14, 2) },
                { graphic: PlayerSpriteSheet.getSprite(15, 2) },
                { graphic: PlayerSpriteSheet.getSprite(16, 2) },
                { graphic: PlayerSpriteSheet.getSprite(17, 2) },
            ],
            frameDuration: duraçãoFrameAnimacao
        })
        this.graphics.add("left-walk", leftwalk)

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
            frameDuration: 150
        })
        this.graphics.add("right-idle", rightIdle)

        // Andando Direita
        const rightWalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(0, 2) },
                { graphic: PlayerSpriteSheet.getSprite(1, 2) },
                { graphic: PlayerSpriteSheet.getSprite(2, 2) },
                { graphic: PlayerSpriteSheet.getSprite(3, 2) },
                { graphic: PlayerSpriteSheet.getSprite(4, 2) },
                { graphic: PlayerSpriteSheet.getSprite(5, 2) },
            ],
            frameDuration: duraçãoFrameAnimacao
        })
        this.graphics.add("right-walk", rightWalk)

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
            frameDuration: 150
        })
        this.graphics.add("up-idle", upIdle)

        // Andando up
        const upWalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(6, 2) },
                { graphic: PlayerSpriteSheet.getSprite(7, 2) },
                { graphic: PlayerSpriteSheet.getSprite(8, 2) },
                { graphic: PlayerSpriteSheet.getSprite(9, 2) },
                { graphic: PlayerSpriteSheet.getSprite(10, 2) },
                { graphic: PlayerSpriteSheet.getSprite(11, 2) },
            ],
            frameDuration: duraçãoFrameAnimacao
        })
        this.graphics.add("up-walk", upWalk)

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
            frameDuration: 150
        })
        this.graphics.add("down-idle", downIdle)
        
        // Andando down
        const downWalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(18, 2) },
                { graphic: PlayerSpriteSheet.getSprite(19, 2) },
                { graphic: PlayerSpriteSheet.getSprite(20, 2) },
                { graphic: PlayerSpriteSheet.getSprite(21, 2) },
                { graphic: PlayerSpriteSheet.getSprite(22, 2) },
                { graphic: PlayerSpriteSheet.getSprite(23, 2) },
            ],
            frameDuration: duraçãoFrameAnimacao
        })
        this.graphics.add("down-walk", downWalk)

        this.graphics.use(downIdle)
        
        // Config Player para monitorar evento "hold" do teclado
        engine.input.keyboard.on("hold", (event) => {
            // Detectar qual tecla está pressionada
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    // Mover para esquerda
                    // Define a velocidade x para negativa, que significa movimentar o playerr para a esquerda
                    this.vel.x = - this.velocidade
                    this.graphics.use(leftwalk)
                    break;

                case Keys.Right:
                case Keys.D:
                    this.vel.x = this.velocidade
                    this.graphics.use(rightWalk)
                    break;

                case Keys.Up:
                case Keys.W:
                    this.vel.y = -this.velocidade
                    this.graphics.use(upWalk)
                    break;

                case Keys.Down:
                case Keys.S:
                    this.vel.y = this.velocidade
                    this.graphics.use(downWalk)
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
                event.key == Keys.Left
            ) {
                // Zera a velocidade horizontal
                this.vel.x = 0
                this.graphics.use(leftIdle)
            }

            if (
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                // Zera a velocidade horizontal
                this.vel.x = 0
                this.graphics.use(rightIdle)
            }

            if (
                // Se o evento for as teclas:
                event.key == Keys.W ||
                event.key == Keys.Up
            ) {
                // Zera a velocidade vertical
                this.vel.y = 0
                this.graphics.use(upIdle)
            }

            if (
                event.key == Keys.S ||
                event.key == Keys.Down
            ) {
                // Zera a velocidade vertical
                this.vel.y = 0
                this.graphics.use(downIdle)
            }
        })
    }

    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // indicar que tem um objeto próximo
        this.temObjetoProximo = true
        
        // Registrar o ultimo objeto colidido
        this.ultimoColisor = other
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        // Detectar se o player está distante do ultimo objeto colidido
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 40) {
            // Marcar que o objeto não está próximio
            this.temObjetoProximo = false
            
            console.log("Está longe")
        }
    }
}

