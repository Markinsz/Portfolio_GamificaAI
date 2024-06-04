import { Actor, Color, Engine, FadeInOut, Font, Keys, Label, Scene, TextAlign, Transition, vec } from "excalibur";
import { Resources } from "./resources";

export class welcomeScenes extends Scene {

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Black

        // configura objeto para ser a frase de Bem-Vindo
        let fraseBemVindo = new Label({
            text: "Bem Vindo ao Portfólio",
            width: 400,
            height: 50,
            pos: vec(engine.drawWidth / 2, 300),
            font: new Font({
                color: Color.White,
                size: 40,
                textAlign: TextAlign.Center,
                family: "Anta"
            })
        })

        // adicionar a frase na cena

        this.add(fraseBemVindo)

        // Configurando Actor do logo
        let actorLogo = new Actor({
            pos: vec(engine.halfDrawWidth, 430),
        })

        // Utilizar imagem do logo
        let imagemLogo = Resources.Logo.toSprite()

        // Aplicar zoom
        imagemLogo.scale = vec(0.4, 0.4)

        // configurar o actor para ser a imagem
        actorLogo.graphics.add(imagemLogo)

        this.add(actorLogo)

        // Adicionar frase piscando
        let start = new Label({
            text: "- Pressione \"Enter\" para iniciar -",
            pos: vec(engine.halfDrawWidth, 630),
            font: new Font({
                color: Color.White,
                size: 20,
                textAlign: TextAlign.Center,
                family: "Anta"
            })
        })

        // Adicionando Animações

        start.actions.repeatForever((repeat) => {
            repeat.fade(0, 800).fade(1, 800).delay(500)
        })


        // NÃO FAÇA A DE BAIXO (CRIMINOSO)
        //    let i = 0

        //     for(i = 0; i < 100000; i++) {
        //         start.actions.fade(0, 500)
        //         start.actions.fade(1, 500)
        //     }

        this.add(start)

        // Monitora o evento de tecla pressionada
        this.input.keyboard.on("press", (event) => {
            // Caso a tecla pressionada for "Enter", deve ir pra próxima cena
            if (event.key == Keys.Enter) {
                // Redireciona pra próxima cena
                engine.goToScene("history")
            }
        })
    }
}