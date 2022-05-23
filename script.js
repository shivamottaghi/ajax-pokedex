

(()=>{

    let detailRowCreation = false;

    document.getElementById('searchBtn').addEventListener('click' , ()=>{
        let pokemon = document.getElementById('pokeName').value ;
        fetchPokemons(pokemon);
    })

    /*______________Async Functions______________*/

    async function fetchPokemons (pokemon) {
        let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        let foundPokemon = await data.json();
        console.log(foundPokemon);
        displayPokeDetail(foundPokemon);
    }

    /*______________Other Functions______________*/


    const displayPokeDetail = (detailArr) => {
        if (detailRowCreation){
            removeExtraRows();
        }
        let parent = document.querySelector('.container');
        let row = document.createElement('div');
        row.setAttribute('class', 'row align-items-center');
        row.setAttribute('id' , 'pokeDetails')
        let colImg = document.createElement('div');
        colImg.setAttribute('class', 'col-12 col-md-3');
        let imgTag = document.createElement('img');
        imgTag.setAttribute('src', detailArr.sprites.front_default);
        colImg.appendChild(imgTag);
        row.appendChild(colImg);
        parent.appendChild(row);
        detailRowCreation = true;
    }

    const removeExtraRows = () => {
        let detailRow = document.querySelector('#pokeDetails');
        detailRow.remove();
    }
})();