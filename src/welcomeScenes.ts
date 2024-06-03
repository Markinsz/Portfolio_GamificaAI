import { Color, Engine, Font, Label, Scene, TextAlign, vec } from "excalibur";

export class welcomeScenes extends Scene {
    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.DarkGray

        // configura objeto para ser a frase de Bem-Vindo
        let fraseBemVindo = new Label({
            text: "Bem Vindo ao Portfólio",
            width: 400,
            height: 50,
            pos: vec(engine.drawWidth / 2, 300),
            font: new Font({
                color: Color.White,
                size: 40,
                textAlign: TextAlign.Center
            })
        })

        // adicionar a frase na cena

        this.add(fraseBemVindo)
    }
}