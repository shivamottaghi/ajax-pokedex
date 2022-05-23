

(()=>{
    fetchPokemons();
    /*______________Async Functions______________*/
    async function fetchPokemons () {
        let data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        let pokeArr = await data.json();
        console.log(pokeArr);
         main(pokeArr.results);
    }
    async function fetchInfoPoke (url) {
        let info = await fetch(`${url}`);
        let detailArr = await info.json();
        console.log(detailArr);
    }
    /*______________Other Functions______________*/
    const main = (pokeArr) => {
        document.getElementById('searchBtn').addEventListener('click',()=>{
            searchByName(pokeArr);
        })

    }
    const searchByName = (pokeArr) => {
        let pokToFind = document.getElementById('pokeName').value;
        //console.log(pokToFind)
        let found = pokeArr.find( el => el.name == pokToFind );
        fetchInfoPoke(found.url);
    }



})();