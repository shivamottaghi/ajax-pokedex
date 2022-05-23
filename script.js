

(()=>{
    fetchPokemons();
    async function fetchPokemons () {
        let data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        let pokeArr = await data.json();
        console.log(pokeArr);
    }





})();