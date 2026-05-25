const URL_BASE = 'http://localhost:3000'

const api = {
    async buscarPensamentos() {
        try {
            //sem axios: const response = await fetch(`${URL_BASE}/pensamentos`)
            const response = await axios.get(`${URL_BASE}/pensamentos`) //com axios

            //sem axios: return response.json()
            return response.data //com axios
        }
        catch (error) {
            alert('Erro ao buscar pensamentos')
            throw error
        }
    },
    async salvarPensamento(pensamento) {
        try {            
            //sem axios: 
            //const response = await fetch(`${URL_BASE}/pensamentos`, {            
            //     method:'POST', 
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(pensamento)
            // })
            //return await response.json()

            //com axios:            
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
            //sem axios:
            // const response = await fetch(`${URL_BASE}/pensamentos/${id}`)
            // return await response.json()            

            //com axios:
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`)
            return await response.data
        }
        catch (error) {
            alert('Erro ao buscar pensamento por id')
            throw error
        }
    },
    async editarPensamento(pensamento) {
        try {
            //sem axios:
        //     const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
        //         method:'PUT', 
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(pensamento)
        //     })
        //     return await response.json()
        // }

        //com axios:
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
            //sem axios:
            // await fetch(`${URL_BASE}/pensamentos/${id}`, {
            //     method:'DELETE'
            // })

            //com axios:
            await axios.delete(`${URL_BASE}/pensamentos/${id}`)
        }
        catch (error) {
            throw error
        }
    }

}

export default api;