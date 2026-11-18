import getDados from './getDados.js';
import { adicionarFrase, atualizarFrase, deletarFrase } from './gerenciarDados.js';

const form = document.getElementById('form-frase');
const tabelaCorpo = document.getElementById('tabela-corpo');
const btnSubmit = form.querySelector('button[type="submit"]');

// Guarda o ID quando estivermos no modo de edição
let idEmEdicao = null;

// 1. READ: Busca todas as frases ativas e preenche a tabela
async function carregarTabela() {
    tabelaCorpo.innerHTML = '<tr><td colspan="4">Carregando frases...</td></tr>';

    const frases = await getDados('/series/frases/todas');
    tabelaCorpo.innerHTML = '';

    if (!frases || frases.length === 0) {
        tabelaCorpo.innerHTML = '<tr><td colspan="4">Nenhuma frase cadastrada.</td></tr>';
        return;
    }

    frases.forEach(frase => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.2)';

        tr.innerHTML = `
            <td style="padding: 10px 0;">${frase.id}</td>
            <td>${frase.titulo}</td>
            <td>${frase.personagem}</td>
            <td>
                <button class="btn-editar" style="cursor:pointer; margin-right: 8px;">Editar</button>
                <button class="btn-apagar" style="cursor:pointer; color: #ff6b6b;">Apagar</button>
            </td>
        `;
        // botão Editar: joga os dados da linha de volta para o formulário
        tr.querySelector('.btn-editar').addEventListener('click', () => {
            document.getElementById('titulo').value = frase.titulo;
            document.getElementById('frase').value = frase.frase;
            document.getElementById('personagem').value = frase.personagem;
            document.getElementById('poster').value = frase.poster;
            
            idEmEdicao = frase.id;
            btnSubmit.textContent = 'Atualizar Frase';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // botão Apagar: chama a exclusão lógica
        tr.querySelector('.btn-apagar').addEventListener('click', async () => {
            if (confirm(`Deseja realmente apagar a frase de "${frase.titulo}"?`)) {
                await deletarFrase(frase.id);
                carregarTabela();
            }
        });

        tabelaCorpo.appendChild(tr);
    });
}

// 2. CREATE e UPDATE: Envia o formulário
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que a página recarregue

    const dadosFrase = {
        titulo: document.getElementById('titulo').value,
        frase: document.getElementById('frase').value,
        personagem: document.getElementById('personagem').value,
        poster: document.getElementById('poster').value
    };

    if (idEmEdicao) {
        await atualizarFrase(idEmEdicao, dadosFrase);
        idEmEdicao = null;
        btnSubmit.textContent = 'Salvar Frase';
    } else {
        await adicionarFrase(dadosFrase);
    }

    form.reset();
    carregarTabela();
});

// Carrega a lista 
carregarTabela();