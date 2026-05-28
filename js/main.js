import ui from "./ui.js"
import api from "./api.js"

const pensamentosSet = new Set()

async function adicionarChaveAoPensamento(){
  try{
    const pensamentos = await api.buscarPensamentos()
    pensamentos.forEach(pensamento => {
      const chavePensamento = `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`
      pensamentosSet.add(chavePensamento)
    })
  }
  catch(error){
    alert('Erro ao adicionar chave ao pensamento')
  }
}


function removerEspaços(string){
  return string.replaceAll(/\s+/g, '')
}

const regexConteudo = /^[\p{L}\s.,!?;:()'"\-]{10,}$/u

function validarConteudo(conteudo) {
  return regexConteudo.test(conteudo)
}

const regexAutoria = /^[\p{L}\s]{3,30}$/u

function validarAutoria(autoria) {
  return regexAutoria.test(autoria)
}

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarPensamentos()
  adicionarChaveAoPensamento()

  const formularioPensamento = document.getElementById("pensamento-form")
  const botaoCancelar = document.getElementById("botao-cancelar")
  const inputBusca = document.getElementById("campo-busca")


  formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
  botaoCancelar.addEventListener("click", manipularCancelamento)
  inputBusca.addEventListener("input", manipularBusca)
})

async function manipularSubmissaoFormulario(event) {
  event.preventDefault()
  const id = document.getElementById("pensamento-id").value
  const conteudo = document.getElementById("pensamento-conteudo").value
  const autoria = document.getElementById("pensamento-autoria").value
  const data = document.getElementById("pensamento-data").value

  const conteudoSemEspaços = removerEspaços(conteudo)
  const autoriaSemEspaços = removerEspaços(autoria)

  if (!conteudoSemEspaços || !autoriaSemEspaços || !data) {
    alert("Todos os campos são obrigatórios. Somente espaços em branco ou campos vazios não são considerados preenchimentos válidos.")
    return
  }

  const chaveNovoPensamento = `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`

  if (pensamentosSet.has(chaveNovoPensamento)) {
    alert("Já existe um pensamento com o mesmo conteúdo e autoria. Por favor, insira um pensamento diferente.")
    return
  }

  if (!validarConteudo(conteudo)) {
    alert("O conteúdo deve conter no mínimo 10 caracteres e aceitar apenas letras, espaços e pontuação comum (.,!?;:()'\"-).")
    return
  }

  if (!validarAutoria(autoria)) {
    alert("A autoria deve conter entre 3 e 30 caracteres, aceitando apenas letras e espaços.")
    return
  }

  if (!validarData(data)) {
    alert("Não é permitido o cadastro de datas futuras. Selecione outra data.")
    return
  }

  try {
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria, data })
    } else {
      await api.salvarPensamento({ conteudo, autoria, data })
    }
    ui.renderizarPensamentos()
  } catch {
    alert("Erro ao salvar pensamento")
  }
}

function manipularCancelamento() {
  ui.limparFormulario()
}

async function manipularBusca() {
  const termoBusca = document.getElementById("campo-busca").value
  try {
    const pensamentosFiltrados = await api.buscarPensamentosPorTermo(termoBusca)
    ui.renderizarPensamentos(pensamentosFiltrados)
    //console.log(pensamentosFiltrados)
  } catch (error) {
    alert("Erro ao realizar busca")
  }
}

function validarData(data){
  const dataAtual = new Date();
  const dataInserida = new Date(data);
  return dataInserida <= dataAtual;
}