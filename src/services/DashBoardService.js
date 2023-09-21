import { api } from "./api";

export async function get(){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/enfermeiro/listar');
    return result;
}

export async function cadastrarEnfermei(objeto){
   return await api.post('/enfermeiro/cadastrar', objeto);
}
export async function atualizar(id, objeto){
    return await api.put(`/enfermeiro/atualizar/${id}`, objeto);
}




export async function sessionValidate() {
  
}
