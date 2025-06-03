const tituloContainer = document.querySelector('[data-name="titulo"]');
const ingredientesContainer = document.querySelector('[data-name="ingredientes"]');
const modoDePreparoContainer = document.querySelector('[data-name="modo-de-preparo"]');

const titulo = 'Receita de Bolo de Fubá';
const ingredientes = ['1 ovo', '1 xícara de leite', '1 colher de sopa de manteiga'];

const itensPreparo = ['Bata o ovo e o leite', 'Coloque em uma forma untada', 'Leve ao forno por 40 minutos'];

tituloContainer.innerText = titulo;
ingredientes.forEach((ingrediente) => {
    const element = document.createElement('li');

    // element.innerHTML = `👍🏻 ${ingrediente}`;
    element.innerText = `👍🏻 ${ingrediente}`;

    ingredientesContainer.appendChild(element);
});

itensPreparo.forEach((item) => {
    const element = document.createElement('li');
    element.innerText = `👍🏻 ${item}`;

    modoDePreparoContainer.appendChild(element);
});
