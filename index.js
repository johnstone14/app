const { select, input, checkbox } = require ('@inquirer/prompts')
const { EMPTY_SUBSCRIPTION } = require('rxjs/internal/Subscription')

let meta = {
    value: 'Tomas 3L de água todos os dias',
    checked: false,
}

let metas = []

const cadastrarmeta = async () => {
    const meta = await input ({message: "Digite a meta"})

    if(meta.length ==0) {
        console.log('A meta não pode ser vazia')
        return
    }

    metas.push({
        value: meta, checked: false
    })
}

const listarmetas = async () => {
    const respostas = await checkbox ({
       message: "Use as setas para mudar de meta, Espaço para marcar ou desmarcar meta, e o Enter para finalizar essa etapa",
       choices: [...metas],
       instructions: false
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada!")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })

    console.log('Meta(s) marcada(s) como concluída(s)')
}

const metasrealizadas = async () => {
    const realizadas = metas.filter(() => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log('Não existem metas realizadas! :(')
        return
    }

    await select ({
        message: "Metas realizadas",
        choices: [...realizadas]
    })
}

const start = async () => {

    while(true){  

        const opcao = await select ({
            message: "Menu >",
            choices:[
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]

        })

        switch (opcao) {

            case "cadastrar":
                await cadastrarmeta()
                console.log(metas)
                break
            case "listar":
                await listarmetas()
                break
            case "metasrealizadas":
                await metasrealizadas()
                break
            case ("sair"):
                console.log("Até a próxima! :D")
            return
        }
    }
}

start()