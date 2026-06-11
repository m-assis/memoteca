import api from "./api.js"

const ui = {
  limparFormulario() {
    document.getElementById("pensamento-form").reset();
  },

  async renderizarPensamentos() {
    const listaPensamentos = document.getElementById("lista-pensamentos")
    try {
        const pensamentos = await api.buscarPensamentos()
        // Uma pequena correção aqui: limpe a lista antes de renderizar para não duplicar!
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

    li.appendChild(iconeAspas)
    li.appendChild(pensamentoConteudo)
    li.appendChild(pensamentoAutoria)
    listaPensamentos.appendChild(li)
  },

  async manipularSubmissaoFormulario(event) {
    event.preventDefault(); // Impede a página de recarregar

    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    try {
        // Envia para a API salvar no servidor/db.json
        await api.salvarPensamento({ conteudo, autoria }); 
        
        // Limpa o formulário e atualiza a tela
        ui.limparFormulario();
        await ui.renderizarPensamentos(); 
    } catch {
        alert("Erro ao salvar o pensamento");
    }
  }
}

export default ui