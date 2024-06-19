import { Actor, Color, Engine, FadeInOut, Scene, SceneActivationContext, Sprite, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetoInteracao: any
    private elementoTexto?: HTMLElement
    private Counter?: Actor
    private listaImagens?: Sprite[]

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        // Criar descrição dos cases
        this.elementoTexto = document.createElement("div") as HTMLElement
        this.elementoTexto.classList.add("texto-case")

        // Adicionar elemento ao Container grid
        let containerGame = document.querySelector(".container_game")
        containerGame?.appendChild(this.elementoTexto)
        
        this.Counter = new Actor({
            pos:vec(engine.drawWidth - 300, engine.halfDrawHeight - 50)
        })

        let imagemCounterA = Resources.NPCaCounter.toSprite()
        let imagemCounterB = Resources.NPCbCounter.toSprite()
        let imagemCounterC = Resources.NPCcCounter.toSprite()

        this.listaImagens = [imagemCounterA, imagemCounterB, imagemCounterC]
        }

    onActivate(context: SceneActivationContext<unknown>): void {
        // Pegar dados da cena passada
        this.objetoInteracao = context.data
        
        this.elementoTexto!.style.opacity = "1"

        // Se for a mesa A
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_a") {
            this.elementoTexto!.innerHTML = `<h2>Gamificação na Educação</h2>
            <h3>Transformando o Aprendizado em uma Jornada de Aventura</h3>
            <p>Após um ano de implementação da "Jornada dos Heróis do Conhecimento", a Escola ABC observou um aumento significativo no engajamento dos alunos, com mais de 80% dos estudantes relatando maior motivação para aprender. O desempenho acadêmico melhorou em todas as disciplinas, especialmente nas áreas de Matemática e Ciências, que registraram um aumento de 20% nas notas médias. Além disso, os problemas de disciplina diminuíram em 30%, mostrando um ambiente escolar mais positivo e colaborativo.</p>`

            // Inserir Sprite no Actor da mesa A
            this.Counter?.graphics.add(this.listaImagens![0])

            // mudar zoom da imagem
            this.Counter!.graphics.current!.scale = vec(1.5, 1.5)
        }

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_b") {
            this.elementoTexto!.innerHTML = `<h2>Gamificação no Ambiente Corporativo</h2>
            <h3> Melhorando o Desempenho e o Engajamento dos Funcionários </h3>
            <p>Após seis meses de implementação dos "Desafios Corporativos XYZ", a empresa observou um aumento de 25% na produtividade geral dos funcionários. O engajamento dos colaboradores também melhorou significativamente, com uma participação de 90% nos desafios propostos. A colaboração entre departamentos aumentou, resultando em soluções mais inovadoras e eficientes para os projetos. Além disso, a satisfação dos funcionários subiu 30%, e a rotatividade caiu 15%.</p>`
       
            // Inserir Sprite no Actor da mesa B
            this.Counter?.graphics.add(this.listaImagens![1])

            this.Counter!.graphics.current!.scale = vec(1.5, 1.5)
        }

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_c") {
            this.elementoTexto!.innerHTML = `<h2>Gamificação na Saúde</h2>
            <h3>  Incentivando Hábitos Saudáveis com o Programa "Vida Ativa" </h3>
            <p>Após um ano de implementação do programa "Vida Ativa", a Clínica Saúde+ observou um aumento significativo na adesão dos pacientes aos tratamentos, com uma taxa de adesão de 85%. Os pacientes relataram uma melhora na qualidade de vida e maior motivação para seguir hábitos saudáveis. Além disso, os resultados clínicos mostraram uma redução de 20% nos indicadores de risco de doenças crônicas. A interação na comunidade online também foi um sucesso, com mais de 70% dos pacientes ativos participando regularmente.</p>`
        
            // Inserir Sprite no Actor da mesa C
            this.Counter?.graphics.add(this.listaImagens![2])

            this.Counter!.graphics.current!.scale = vec(1.5, 1.5)
        }

        // Adicionar actor da imagem na tela
        this.add(this.Counter!)
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementoTexto!.style.opacity = "0"
    }
}