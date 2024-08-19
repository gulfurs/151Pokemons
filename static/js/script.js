document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/pokemon')
        .then(response => response.json())
        .then(data => {
            const pokemonGrid = document.getElementById('pokemon-grid');
            data.forEach(pokemon => {
                const pokemonBox = document.createElement('div');
                pokemonBox.classList.add('pokemon-box');

                const pokemonHeader = document.createElement('div');
                pokemonHeader.classList.add('pokemon-header');

                const pokemonName = document.createElement('div');
                pokemonName.classList.add('pokemon-name');
                pokemonName.textContent = pokemon.name;

                const index = document.createElement('div');
                index.classList.add('index');
                index.textContent = pokemon.id;

                pokemonHeader.appendChild(index);
                pokemonHeader.appendChild(pokemonName);

                const pokemonStats = document.createElement('div');
                pokemonStats.classList.add('pokemon-stats');

                const pokemonType1 = document.createElement('span');
                pokemonType1.classList.add('pokemon-type', `type-${pokemon.type1}`);
                pokemonType1.textContent = pokemon.type1;

                pokemonHeader.appendChild(pokemonType1);

                if (pokemon.type2) {
                    const pokemonType2 = document.createElement('span');
                    pokemonType2.classList.add('pokemon-type', `type-${pokemon.type2}`);
                    pokemonType2.textContent = pokemon.type2;
                    pokemonHeader.appendChild(pokemonType2);
                }

                const stats = [
                    `TTL: ${pokemon.total}`,
                    `HP: ${pokemon.hp}`,
                    `ATK: ${pokemon.attack} `,
                    `DEF: ${pokemon.defense} `,
                    `SPA: ${pokemon.sp_atk} `,
                    `SPD: ${pokemon.sp_def} `,
                    `SPE: ${pokemon.speed} `
                ];

                stats.forEach(stat => {
                    const statDiv = document.createElement('div');
                    statDiv.textContent = stat;
                    pokemonStats.appendChild(statDiv);
                });

                pokemonBox.appendChild(pokemonHeader);
                pokemonBox.appendChild(pokemonStats);
                pokemonGrid.appendChild(pokemonBox);
            });
        })
        .catch(error => console.error('Error fetching Pokémon data:', error));
});
