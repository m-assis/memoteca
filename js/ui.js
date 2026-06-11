// js/ui.js
import api from "./api.js"

const ui = {
  limparFormulario() {
    document.getElementById("pensamento-form").reset();
    
    // Boa prática: Garante que o botão volte a dizer "Adicionar" ao limpar ou cancelar
    const botaoSalvar = document.getElementById("botao-salvar");
    if (botaoSalvar) botaoSalvar.textContent = "Adicionar";
  },

  async renderizarPensamentos() {
    const listaPensamentos = document.getElementById("lista-pensamentos")
    try {
        const pensamentos = await api.buscarPensamentos()
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

    const pensamentoConteudo = document.createElement("div")
    pensamentoConteudo.textContent = pensamento.conteudo
    pensamentoConteudo.classList.add("pensamento-conteudo")

    const pensamentoAutoria = document.createElement("div")
    pensamentoAutoria.textContent = pensamento.autoria
    pensamentoAutoria.classList.add("pensamento-autoria")

    // Container para os botões de ação do card
    const containerBotoes = document.createElement("div")
    containerBotoes.classList.add("conteudo-botoes")

    // Criação do botão de edição com a classe "botao-editar"
    const botaoEditar = document.createElement("button")
    botaoEditar.classList.add("botao-editar")
    
    // Adiciona o ícone de edição ao botão
    const iconeEditar = document.createElement("img")
    iconeEditar.src = "assets/imagens/icone-editar.png"
    iconeEditar.alt = "Editar pensamento"

    // Monta o botão de edição
    botaoEditar.appendChild(iconeEditar)
    containerBotoes.appendChild(botaoEditar)

    // 👇 ALTERADO: Uso da propriedade onclick em vez de addEventListener
    botaoEditar.onclick = () => {
      ui.preencherFormulario(pensamento)
    }

    // Insere os elementos na ordem correta dentro da tag <li>
    li.appendChild(iconeAspas)
    li.appendChild(pensamentoConteudo)
    li.appendChild(pensamentoAutoria)
    li.appendChild(containerBotoes)
    
    listaPensamentos.appendChild(li)
  },

  // Alimenta o formulário com o pensamento selecionado
  preencherFormulario(pensamento) {
    document.getElementById("pensamento-id").value = pensamento.id
    document.getElementById("pensamento-conteudo").value = pensamento.conteudo
    document.getElementById("pensamento-autoria").value = pensamento.autoria
    
    // Altera o texto do botão para indicar o modo de edição
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