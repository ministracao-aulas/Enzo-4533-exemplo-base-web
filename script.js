const tituloContainer = document.querySelector('[data-name="titulo"]');
const ingredientesContainer = document.querySelector('[data-name="ingredientes"]');
const receitasContainer = document.querySelector('[data-name="receitas"]');
const modoDePreparoContainer = document.querySelector('[data-name="modo-de-preparo"]');

const apiReceitas = {
    modificadorIngredientes(ing) {
        return ing.split(',').filter(i => i).map(i => i.trim());
    },
    modificadorPreparo(texto) {
        // Usa expressão regular para encontrar os itens da lista
        const itens = texto.match(/\d+\.\s(.+?)(?=\d+\.|\Z)/g).map(item => item.replace(/^\d+\.\s/, ''));
        return itens;
    },
    modificadorReceita(receita) {
        receita.titulo = receita.receita;
        receita.ingredientes = this.modificadorIngredientes(receita.ingredientes);
        receita.itens_preparo = this.modificadorPreparo(receita.modo_preparo);
        return receita;
    },
    async todasAsReceitas() {
        try {
            let receitas = await(await fetch('https://api-receitas-pi.vercel.app/receitas/todas')).json();
            receitas = receitas.map(receita => this.modificadorReceita(receita));

            return receitas;
        } catch (error) {
            return []
        }
    },
    async show(id) {
        try {
            let receita = await(await fetch(`https://api-receitas-pi.vercel.app/receitas/${id}`)).json();
            return this.modificadorReceita(receita);
        } catch (error) {
            return null;
        }
    },
}

async function mostrarReceita(receitaId = null) {
    if (!receitaId) {
        return;
    }

    const receita = await apiReceitas.show(receitaId);

    const titulo = receita.titulo;
    const ingredientes = receita.ingredientes;
    const itensPreparo = receita.itens_preparo;

    tituloContainer.innerText = titulo;

    ingredientesContainer.innerHTML = '';
    ingredientes.forEach((ingrediente) => {
        const element = document.createElement('li');

        // element.innerHTML = `👍🏻 ${ingrediente}`;
        element.innerText = `👍🏻 ${ingrediente}`;

        ingredientesContainer.appendChild(element);
    });

    modoDePreparoContainer.innerHTML = '';
    itensPreparo.forEach((item) => {
        const element = document.createElement('li');
        element.innerText = `👍🏻 ${item}`;

        modoDePreparoContainer.appendChild(element);
    });

    window.scrollTo(0, 0, { behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', async (event) => {
    receitasContainer.innerHTML = '';
    let _receitas = await apiReceitas.todasAsReceitas();
    _receitas?.forEach(receita => {
        const element = document.createElement('li');

        element.innerHTML = `${receita.titulo} <button type="button" data-receita-id="${receita?.id}">Ver receita #${receita?.id}</button>`;

        receitasContainer.appendChild(element);
    });

    document.querySelectorAll('button[type="button"][data-receita-id]').forEach(btn => {
        btn.addEventListener('click', ev => {
            let receitaId = Number(ev.target.dataset.receitaId);

            if (!receitaId || isNaN(receitaId)) {
                return;
            }

            mostrarReceita(receitaId);
        })
    })
});
