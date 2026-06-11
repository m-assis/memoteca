import ui from "./ui.js"
import api from "./api.js"

// Centraliza os seletores e eventos quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();
    
    const formularioPensamento = document.getElementById("pensamento-form");
    const botaoCancelar = document.getElementById("botao-cancelar");

    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
    botaoCancelar.addEventListener("click", manipularCancelamento);
});

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;
    
    try {
        // 👇 NOVO: Verifica se há um ID para decidir entre editar ou salvar
        if (id) {
            // Se houver um ID, atualiza o pensamento existente
            await api.editarPensamento({ id, conteudo, autoria });
        } else {
            // Caso contrário, cria um novo pensamento
            await api.salvarPensamento({ conteudo, autoria });
        }
        
        // Limpa o formulário (e redefine o botão para "Adicionar")
        ui.limparFormulario(); 
        
        // Renderiza os pensamentos novamente após a edição ou salvamento
        await ui.renderizarPensamentos();
    }
    catch (error) {
        alert("Erro ao salvar ou editar pensamento");
    }
}

function manipularCancelamento() {
    ui.limparFormulario();
}