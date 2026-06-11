// js/api.js

const api = {
  async buscarPensamentos() {
    try {
      const response = await fetch('http://localhost:3000/pensamentos')
      return await response.json()
    }
    catch (error) {
      alert('Erro ao buscar pensamentos')
      throw error
    }
  },

  async salvarPensamento(pensamento) {
    try {
      const response = await fetch('http://localhost:3000/pensamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pensamento)
      })
      return await response.json()
    }
    catch (error) {
      alert('Erro ao salvar pensamento')
      throw error
    }
  },

  // 👇 NOVO MÉTODO: Busca um pensamento específico pelo ID
  async buscarPensamentoPorId(id) {
    try {
      const response = await fetch(`http://localhost:3000/pensamentos/${id}`)
      return await response.json()
    }
    catch (error) {
      alert('Erro ao buscar pensamento')
      throw error
    }
  },

  // 👇 NOVO MÉTODO: Atualiza um pensamento existente usando o método PUT
  async editarPensamento(pensamento) {
    try {
      const response = await fetch(`http://localhost:3000/pensamentos/${pensamento.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pensamento)
      })
      return await response.json()
    }
    catch (error) {
      alert('Erro ao editar pensamento')
      throw error
    }
  }
}

export default api;