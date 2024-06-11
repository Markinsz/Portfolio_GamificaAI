import { Actor, Color, Engine, Keys, vec } from "excalibur";

export class Player extends Actor {
    // Propriedade do player
    private velocidade: number = 180

    // Configurações do player
    constructor() {
        super({
            pos: vec(600, 600),
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red
        })
    }

    onInitialize(engine: Engine<any>): void {
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