const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const details = document.getElementById("details");

const maxRecords = 1;
const limit = 1;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
    <a href="Pokemon.html">
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}</ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
        </li>
        </a>
    `;
}

//TODO: Ao evento do clique criar um função que leve aos detalhes do pokemon "clicado".


function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml; // Adicionando mais um elemento à Lista.
  });
}

loadPokemonItens(offset, limit);


// TODO: ajustar aqui para funcionalidade correta do botão home.
loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
