// 👉 Constante URL_BASE com o valor exato solicitado
const URL_BASE = "http://localhost:3000";

const api = {
  async buscarPensamentos() {
    try {
      // Usando template string para juntar a URL_BASE com o caminho específico
      const response = await axios.get(`${URL_BASE}/pensamentos`)
      return await response.data
    }
    catch (error) {
      alert('Erro ao buscar pensamentos')
      throw error
    }
  },

  async salvarPensamento(pensamento) {
    try {
      const response = await axios.post(`${URL_BASE}/pensamentos`, pensamento)
      return await response.data
    }
    catch (error) {
      alert('Erro ao salvar pensamento')
      throw error
    }
  },

  async buscarPensamentoPorId(id) {
    try {
      const response = await axios.get(`${URL_BASE}/pensamentos/${id}`)
      return await response.data
    }
    catch (error) {
      alert('Erro ao buscar pensamento')
      throw error
    }
  },

  async editarPensamento(pensamento) {
    try {
      const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento)
      return await response.data
    }
    catch (error) {
      alert('Erro ao editar pensamento')
      throw error
    }
  },

  async excluirPensamento(id) {
    try {
      await axios.delete(`${URL_BASE}/pensamentos/${id}`)
    }
        method: 'DELETE'
      });
    }
    catch (error) {
      alert('Erro ao excluir pensamento')
      throw error
    }
  }
}

export default api;