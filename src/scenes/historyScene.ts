import { Actor, Color, Engine, FadeInOut, Keys, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene {
    // Declaração do elemntoTexto
    elementoTexto?: HTMLElement

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#403f4c")

        // criar elemento com a descrição da empresa
        this.elementoTexto = document.createElement("div") as HTMLElement

        // Definir opacidade (1 = visísvel)
        this.elementoTexto.style.opacity = "1"

        // Inserir elemento no container_game
        let containerGame = document.querySelector(".container_game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        // Adicionar classe na div criada (elementoTexto)
        this.elementoTexto.classList.add("sobre_gamifica")

        // Adicionar titulo e paragrafo dentro da div
        this.elementoTexto.innerHTML = `<h2>Sobre o GamificaAI</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`

    let actorLogoV = new Actor ({
        pos: vec(925, engine.halfDrawHeight - 50)
    })

    let imageLogoV = Resources.LogoV.toSprite()

    imageLogoV.scale = vec(0.65, 0.65)

    actorLogoV.graphics.add(imageLogoV)

    this.add(actorLogoV)

    this.input.keyboard.on("press", (event) => {
    if(event.key == Keys.Enter) {
        // Direcionar próxima cena
        engine.goToScene("gamificacao")
    }
    })
    }
}