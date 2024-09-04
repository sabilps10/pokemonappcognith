export const mockPokemonList = {
    count: 1,
    next: "https://pokeapi.co/api/v2/pokemon?limit=1",
    previous: null,
    results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
    ]
};

export const mockPokemonCard = {
    name: 'bulbasaur',
    order: 1,
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    types: [
        { type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
        {
            type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' }
        }],
    sprites: {
        front_default: '',
        other: {
            'official-artwork': {
                front_default: 'https://pokeapi.co/media/sprites/pokemon/other/official-artwork/bulbasaur.png'
            }
        }
    }
};

export const mockDetailPokemon = {
    name: 'bulbasaur',
    order: 1,
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    types: [
        { type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
        {
            type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' }
        }],
    sprites: {
        front_default: 'https://pokeapi.co/media/sprites/pokemon/other/official-artwork/bulbasaur.png',
        'other': {
            'official-artwork': {
                front_default: 'https://pokeapi.co/media/sprites/pokemon/other/official-artwork/bulbasaur.png'
            }
        }
    },
    abilities: [{
        ability: {
            name: 'Overgrow',
            url: 'https://pokeapi.co/api/v2/ability/65/',
        },
        is_hidden: false,
        slot: 0
    }],
    stats: [{
        base_stat: 45,
        effort: 45,
        stat: {
            name: 'hp',
            url: 'https://pokeapi.co/api/v2/stat/1/'
        }
    }],
    height: 145,
    weight: 250
};

export const mockSpeciesPokemon = {
    flavor_text_entries: [
        {
            flavor_text: 'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
            language: {
                name: "en",
                url: "https://pokeapi.co/api/v2/language/9/"
            }
        }
    ],
    generation: { name: 'generation-i' },
    genera: [
        {
            genus: "Seed Pokémon",
            language: {
                name: "en",
                url: "https://pokeapi.co/api/v2/language/9/"
            }
        },
    ],
}

export const DataPokemonDetails = {
    name: '',
    order: 0,
    url: '',
    types: [{
        slot: 0,
        type: {
            name: '',
            url: '',
        }
    }],
    image: '',
    abilities: [{
        ability: {
            name: '',
            url: '',
        },
        is_hidden: false,
        slot: 0
    }],
    stats: [{
        base_stat: 0,
        effort: 0,
        stat: {
            name: '',
            url: ''
        }
    }],
    height: 0,
    weight: 0,

    description: '',
    generation: '',
    category: '',
}