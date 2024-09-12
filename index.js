const { select, input, checkbox } = require ('@inquirer/prompts')

let mensagem = "Bem-vindo ao App de Metas";

let meta = {
    value: 'Tomas 3L de água todos os dias',
    checked: false,
}

let metas = []

const cadastrarmeta = async () => {
    const meta = await input ({message: "Digite a meta"})

    if(meta.length ==0) {
        mensagem = 'A meta não pode ser vazia'
        return
    }

    metas.push(
        { value: meta, checked: false }
    )

    mensagem = "Meta cadastrada com sucesso!"
}

const listarmetas = async () => {
    const respostas = await checkbox ({
       message: "Use as setas para mudar de meta, Espaço para marcar ou desmarcar meta, e o Enter para finalizar essa etapa",
       choices: [...metas],
       instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem = 'Nenhuma meta selecionada!'
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })

    mensagem = 'Meta(s) marcada(s) como concluída(s)'
}

const metasrealizadas = async () => {
    const realizadas = metas.filter(() => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagem = 'Não existem metas realizadas! :('
        return
    }

    await select ({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasabertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length ==0) {
        mensagem = 'Não existem metas abertas! :)'
        return
    }

    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarmetas = async () => {
    const deletarmetas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itensadeletar = await checkbox({
        message: "Selecione um item para deletar",
        choices: [...metasdesmarcadas],
        instructions: false,
    })

    if(itensadeletar.length == 0) {
        console.log("Nenhum item para deletar!")
        return
    }

    itensadeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = 'Meta(s) deletada(s) com sucesso!'
}

const mostrarmensagem = () => {
    console.clear();

    if(mensagem !="") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {

    while(true){  
        mostrarmensagem()

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
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
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
                break
            case "listar":
                await listarmetas()
                break
            case "realizadas":
                await metasrealizadas()
                break
            case "abertas":
                await metasabertas()
                break
            case "deletar":
                await deletarmetas()
                break
            case ("sair"):
                console.log("Até a próxima! :D")
            return
        }
    }
}

start()