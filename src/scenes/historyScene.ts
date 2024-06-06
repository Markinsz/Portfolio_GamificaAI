import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene {
    // Declaração do elemntoTexto
    elementoTexto?: HTMLElement

    // Método para esmaecer um elemnto HTML
    fadeOutElement(elemento: HTMLElement) {
        // Pegar opacidade do elemento HTML
        let opacidade = parseFloat(elemento.style.opacity)

        // Repetir diminuição da opacidade
        setInterval(() => {

            // Se o elemento estiver visível (opacidade > 0)
            if (opacidade > 0) {
                // Diminui a opacidade
                opacidade -= 0.01

                // Atualiza a opacidade do elemento
                elemento.style.opacity = opacidade.toString()
            }

        }, 10)
    }

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
        this.elementoTexto.innerHTML = `<h2>O que é Gamificação?</h2>
        <p>Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.</p>`

        let actorLogoV = new Actor({
            pos: vec(925, engine.halfDrawHeight - 50)
        })

        let imageLogoV = Resources.LogoV.toSprite()

        imageLogoV.scale = vec(0.65, 0.65)

        actorLogoV.graphics.add(imageLogoV)

        this.add(actorLogoV)

        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                // Criar Transição pro elemento texto 
                this.fadeOutElement(this.elementoTexto!)

                // Direcionar próxima cena
                engine.goToScene("gamificacao")
            }
        })
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        // Remover elemento texto da tela
        this.elementoTexto?.remove()
    }
}