import ui from "./ui.js"
import api from "./api.js"

// Centraliza os seletores e eventos quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();
    
    const formularioPensamento = document.getElementById("pensamento-form");
    const botaoCancelar = document.getElementById("botao-cancelar");

    // Agora o JavaScript vai encontrar as funções perfeitamente abaixo
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
    botaoCancelar.addEventListener("click", manipularCancelamento);
});

async function manipularSubmissaoFormulario(event) {
    event.preventDefault(); // Removido o preventDefault duplicado que estava aqui
    
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;
    
    try {
        await api.salvarPensamento({ conteudo, autoria });
        
        // Limpa o formulário após salvar com sucesso
        ui.limparFormulario(); 
        
        // Atualiza a lista na tela
        ui.renderizarPensamentos();
    }
    catch (error) {
        alert("Erro ao salvar pensamento");
    }
}

function manipularCancelamento() {
    ui.limparFormulario();
}