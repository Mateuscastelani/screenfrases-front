// URL base da sua API no Render
const baseURL = 'https://screenfrases-api.onrender.com';

// POST: Adicionar uma nova frase
export async function adicionarFrase(novaFrase) {
    try {
        const resposta = await fetch(`${baseURL}/series/frases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Converte o objeto JavaScript num texto JSON para o back-end
            body: JSON.stringify(novaFrase)
        });
        
        if (!resposta.ok) throw new Error('Erro ao adicionar a frase.');
        
        const dadosSalvos = await resposta.json();
        console.log('Frase adicionada com sucesso:', dadosSalvos);
        return dadosSalvos;
    } catch (erro) {
        console.error(erro);
    }
}

// PUT: Atualizar uma frase existente
export async function atualizarFrase(id, fraseAtualizada) {
    try {
        const resposta = await fetch(`${baseURL}/series/frases/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fraseAtualizada)
        });

        if (!resposta.ok) throw new Error('Erro ao atualizar a frase.');
        
        const dadosAtualizados = await resposta.json();
        console.log('Frase atualizada com sucesso:', dadosAtualizados);
        return dadosAtualizados;
    } catch (erro) {
        console.error(erro);
    }
}

// DELETE: Apagar (exclusão lógica)
export async function deletarFrase(id) {
    try {
        const resposta = await fetch(`${baseURL}/series/frases/${id}`, {
            method: 'DELETE'
        });

        if (!resposta.ok) throw new Error('Erro ao deletar a frase.');
        
        // O DELETE devolve 204 No Content, por isso não usamos resposta.json()
        console.log(`Frase com ID ${id} apagada com sucesso.`);
    } catch (erro) {
        console.error(erro);
    }
}