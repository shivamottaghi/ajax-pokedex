

(()=>{

    let detailRowCreation = false;
    /*test();
    async function test (){
        let data = await fetch('https://pokeapi.co/api/v2/evolution-chain/1/');
        let response = await data.json();
        console.log(response);
        console.log(response.chain);
        console.log(response.chain.evolves_to);
        console.log(response.chain.evolves_to[0].species.name);
    }*/

    document.getElementById('searchBtn').addEventListener('click' , ()=>{
        let pokemon = document.getElementById('pokeName').value ;
        fetchPokemons(pokemon);
    })

    /*______________Async Functions______________*/

    async function fetchPokemons (pokemon) {
        let data1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        let foundPokemon = await data1.json();
        let evoUrl = await getEvoUrl(foundPokemon);
        let data2 = await fetch(`${evoUrl}`);
        let evoChain = await data2.json();
        console.log(evoChain);
        displayPokeDetail(foundPokemon);
    }

    /*______________Other Functions______________*/
    async function getEvoUrl (pokemon){
        console.log(pokemon)
        let speciesUrl = pokemon.species.url;
        console.log(speciesUrl);
        let data = await fetch(speciesUrl);
        let species = await data.json();
        let evoUrl = species.evolution_chain.url;
        console.log(evoUrl);
        return evoUrl;

    }
    const displayPokeDetail = (detailArr) => {
        if (detailRowCreation){
            removeExtraRows();
        }
        let parent = document.querySelector('.container');
        let otherClass = 'pokeDetails';
        let row = createRow(otherClass);
        let columns = 'col-12 col-md-6';
        let colImg = createCol(columns);
        let imgTag = createImg(detailArr.sprites.other.home.front_default);
        colImg.appendChild(imgTag);
        let colDetails = createCol(columns);
        let detailContainer = createContainer();
        detailContainer.classList.add('details')
        detailContainer = addIdName(detailContainer , detailArr);
        detailContainer = addMoves(detailContainer, detailArr);
        colDetails.appendChild(detailContainer);
        row.appendChild(colImg);
        row.appendChild(colDetails);
        parent.appendChild(row);
        detailRowCreation = true;
    }
    const createContainer = () => {
        let container = document.createElement('div');
        container.setAttribute('class', 'container');
        return container;
    }
    const removeExtraRows = () => {
        let detailRow = document.querySelectorAll('.pokeDetails');
        detailRow.forEach(el => el.remove());
    }

    const createRow = (otherClass) => {
        let row = document.createElement('div');
        row.setAttribute('class', `row align-items-center ${otherClass}`);
        return row;
    }
    const createCol = (columns) => {
        let col = document.createElement('div');
        col.setAttribute('class', `${columns} text-center`);
        return col;
    }
    const createImg = (url) => {
        let img =  document.createElement('img');
        img.setAttribute('src', url);
        img.setAttribute('id', 'pokeImg');
        img.setAttribute('class', 'shadow');
        img.height = 250;
        return img;
    }
    const addIdName = (parent , arr) => {
        let id = arr.id;
        let name = arr.name;
        let h3 = document.createElement('h3');
        h3.innerHTML = `Name : ${name.toUpperCase()}`
        let h4 = document.createElement('h4');
        h4.innerHTML = `ID : ${id}`;
        let row = createRow('');
        row.appendChild(h3);
        row.appendChild(h4);
        parent.appendChild(row);
        return parent;
    }
    const addMoves = (parent, arr) => {
        let row = createRow('');
        let h6 = document.createElement('h6');
        h6.innerHTML= 'Moves :'
        let mymoves = [];
        for (let i = 0 ; i < 4; i++){
            mymoves.push(arr.moves[i].move.name);
        }
        let moveList = createUl(mymoves);
        row.appendChild(h6);
        row.appendChild(moveList);
        parent.appendChild(row);
        //console.log(mymoves);
        return parent;
    }
    const createUl = (moves) => {
        let ul = document.createElement('ul')
        ul.setAttribute('class', 'list-unstyled')
        for (let i = 0; i < moves.length ; i ++){
            let li = document.createElement('li')
            li.innerHTML = `${moves[i]}`;
            ul.appendChild(li);
        }
        return ul;
    }
})();