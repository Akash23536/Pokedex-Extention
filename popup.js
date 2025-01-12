// API Base URL
const apiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// DOM Elements
const randomPokemonDiv = document.getElementById('random-pokemon-details');
const searchInput = document.getElementById('pokemon-name');
const datalist = document.getElementById('pokemon-list');
const searchBtn = document.getElementById('search-btn');
const refreshBtn = document.getElementById('refresh-btn');

// Function to fetch and display a Pokémon by ID or name
function displayPokemon(query) {
  fetch(`${apiBaseUrl}${query}`)
    .then(response => {
      if (!response.ok) throw new Error('Pokémon not found');
      return response.json();
    })
    .then(data => {
      // Ensure we have a high-resolution image
      const highResImage = data.sprites.other['official-artwork']
        ? data.sprites.other['official-artwork'].front_default
        : data.sprites.front_default;

      randomPokemonDiv.innerHTML = `
        <img src="${highResImage}" alt="${data.name}" class="pokemon-image">
         <h3>${data.name.toUpperCase()}</h3>
        <p><strong>Type:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>`;})
    .catch(error => {
      randomPokemonDiv.innerHTML = `<p>Pokémon not found. Try again.</p>`;
      console.error(error);
    });
}

// Function to fetch and display a random Pokémon
function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon IDs go from 1 to 898
  displayPokemon(randomId);
}

// Function to fetch and populate Pokémon names for autocomplete
function populatePokemonList() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
    .then(response => response.json())
    .then(data => {
      const options = data.results.map(pokemon => `<option value="${pokemon.name}"></option>`).join('');
      datalist.innerHTML = options;
    })
    .catch(error => console.error('Error fetching Pokémon list:', error));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  getRandomPokemon(); // Display a random Pokémon on load
  populatePokemonList(); // Populate autocomplete list
});
refreshBtn.addEventListener('click', getRandomPokemon); // Refresh Pokémon
searchBtn.addEventListener('click', () => {
  const name = searchInput.value.toLowerCase().trim();
  if (name) displayPokemon(name); // Search Pokémon and update upper section
});
