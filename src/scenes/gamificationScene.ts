import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene {
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
        this.elementoTexto.classList.add("about_gamifica")

        // Adicionar titulo e paragrafo dentro da div
        this.elementoTexto.innerHTML = `<h2>Sobre o GamificaAI</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`

        let actorControl = new Actor({
            pos: vec(250, engine.halfDrawHeight + 75)
        })

        let imageControl = Resources.Control.toSprite()

        imageControl.scale = vec(1.5, 1.8)

        actorControl.graphics.add(imageControl)

        this.add(actorControl)

        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                // Criar Transição pro elemento texto 
                this.fadeOutElement(this.elementoTexto!)

                // Direcionar próxima cena
                engine.goToScene("exposicao")
            }
        })
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        // Remover elemento texto da tela
        this.elementoTexto?.remove()
    }
}