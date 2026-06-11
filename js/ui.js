
import api from "./api.js"

const ui = {
  limparFormulario() {
    document.getElementById("pensamento-form").reset();
    
    const botaoSalvar = document.getElementById("botao-salvar");
    if (botaoSalvar) botaoSalvar.textContent = "Adicionar";
  },

  async renderizarPensamentos() {
    const listaPensamentos = document.getElementById("lista-pensamentos")
    try {
        const pensamentos = await api.buscarPensamentos()
        
        // 👉 Garante que a lista de pensamentos seja limpa antes de renderizá-la
        listaPensamentos.innerHTML = ""; 
        
        pensamentos.forEach(ui.adicionarPensamentoNaLista)
    }
    catch {
        alert('Erro ao renderizar pensamentos')
    }
  },
    
  adicionarPensamentoNaLista(pensamento) {
    const listaPensamentos = document.getElementById("lista-pensamentos")
    const li = document.createElement("li")
    li.setAttribute("data-id", pensamento.id)
    li.classList.add("li-pensamento")

    const iconeAspas = document.createElement("img")
    iconeAspas.src = "assets/imagens/aspas-azuis.png"
    iconeAspas.alt = "Aspas azuis"
    iconeAspas.classList.add("icone-aspas")

    const pensamientoConteudo = document.createElement("div")
    pensamentoConteudo.textContent = pensamento.conteudo
    pensamentoConteudo.classList.add("pensamento-conteudo")

    const pensamentoAutoria = document.createElement("div")
    pensamentoAutoria.textContent = pensamento.autoria
    pensamentoAutoria.classList.add("pensamento-autoria")

    // Container para os botões de ação do card
    const containerBotoes = document.createElement("div")
    containerBotoes.classList.add("conteudo-botoes")

    // Criação do botão de edição
    const botaoEditar = document.createElement("button")
    botaoEditar.classList.add("botao-editar")
    
    const iconeEditar = document.createElement("img")
    iconeEditar.src = "assets/imagens/icone-editar.png"
    iconeEditar.alt = "Editar pensamento"

    botaoEditar.appendChild(iconeEditar)
    containerBotoes.appendChild(botaoEditar)

    botaoEditar.onclick = () => {
      ui.preencherFormulario(pensamento)
    }

    // 👇 NOVO: Criação do botão de exclusão com a classe "botao-excluir"
    const botaoExcluir = document.createElement("button")
    botaoExcluir.classList.add("botao-excluir")

    // 👇 NOVO: Adiciona o ícone de exclusão ao botão
    const iconeExcluir = document.createElement("img")
    iconeExcluir.src = "assets/imagens/icone-excluir.png" // Ajuste o caminho se necessário
    iconeExcluir.alt = "Excluir pensamento"

    botaoExcluir.appendChild(iconeExcluir)
    containerBotoes.appendChild(botaoExcluir)

    // 👇 NOVO: Ação assíncrona com try/catch para excluir o pensamento ao clicar
    botaoExcluir.onclick = async () => {
      try {
        await api.excluirPensamento(pensamento.id)
        await ui.renderizarPensamentos()
      } catch {
        alert("Erro ao excluir pensamento")
      }
    }

    // Insere os elementos na ordem correta dentro da tag <li>
    li.appendChild(iconeAspas)
    li.appendChild(pensamentoConteudo)
    li.appendChild(pensamentoAutoria)
    li.appendChild(containerBotoes) // O container agora leva os botões de editar e excluir
    
    listaPensamentos.appendChild(li)
  },

  // Alimenta o formulário com o pensamento selecionado
  preencherFormulario(pensamento) {
    document.getElementById("pensamento-id").value = pensamento.id
    document.getElementById("pensamento-conteudo").value = pensamento.conteudo
    document.getElementById("pensamento-autoria").value = pensamento.autoria
    
    const botaoSalvar = document.getElementById("botao-salvar")
    botaoSalvar.textContent = "Salvar"
  },

  async manipularSubmissaoFormulario(event) {
    event.preventDefault();

    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    try {
        await api.salvarPensamento({ conteudo, autoria }); 
        ui.limparFormulario();
        await ui.renderizarPensamentos(); 
    } catch {
        alert("Erro ao salvar o pensamento");
    }
  }
}

export default ui