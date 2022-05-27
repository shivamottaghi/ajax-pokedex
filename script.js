

(()=>{

    let detailRowCreation = false;
    document.getElementById('searchBtn').addEventListener('click' , ()=>{
        let pokemon = document.getElementById('pokeName').value ;
        pokemon = pokemon.toLowerCase();
        fetchPokemons(pokemon);
    })

    /*______________Async Functions______________*/

    async function fetchPokemons (pokemon) {
        let data1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        let foundPokemon = await data1.json();
        let evoUrl = await getEvoUrl(foundPokemon);
        let data2 = await fetch(`${evoUrl}`);
        let evoChain = await data2.json();
        let chainOfEvoArr = await findEvoImageAndName(evoChain.chain);
        console.log(chainOfEvoArr);
        //console.log(foundPokemon);
        displayPokeDetail(foundPokemon);
        if (chainOfEvoArr.length){
            displayChainOfEvo(chainOfEvoArr);
        }
    }
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
    async function findEvoImageAndName (chain) {
        let secondexists = chain.evolves_to.length;
        console.log(secondexists);
        let chainOfEvoArr = [];
/*        if (secondexists && secondexists < 2){
            let thirdexists = chain.evolves_to[0].evolves_to.length;
            console.log(thirdexists);
            let first = await fetchForTheChain(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}`);
            chainOfEvoArr = pushImageAndName(first , chainOfEvoArr );
            let second = await  fetchForTheChain(`https://pokeapi.co/api/v2/pokemon/${chain.evolves_to[0].species.name}`);
            chainOfEvoArr = pushImageAndName(second , chainOfEvoArr );
            if (thirdexists){
                let third = await fetchForTheChain(`https://pokeapi.co/api/v2/pokemon/${chain.evolves_to[0].evolves_to[0].species.name}`);
                chainOfEvoArr = pushImageAndName(third , chainOfEvoArr);
            }
        }else */if (secondexists /*&& secondexists > 1*/){
            // Get the first one anyway
            let first = await fetchForTheChain(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}`);
            chainOfEvoArr = pushImageAndName(first , chainOfEvoArr );
            for (let i = 0 ; i < secondexists; i ++){
                let second = await  fetchForTheChain(`https://pokeapi.co/api/v2/pokemon/${chain.evolves_to[i].species.name}`);
                console.log(second);
                chainOfEvoArr = pushImageAndName(second , chainOfEvoArr );
                let thirdexists = chain.evolves_to[i].evolves_to.length;
                console.log('inside loop , third exist?' + thirdexists)
                if (thirdexists){
                    for (let j=0; j < thirdexists ; j++){
                        let third = await fetchForTheChain(`https://pokeapi.co/api/v2/pokemon/${chain.evolves_to[i].evolves_to[j].species.name}`);
                        chainOfEvoArr = pushImageAndName(third , chainOfEvoArr);
                    }
                }
            }
        }
        return chainOfEvoArr;
    }
    async function fetchForTheChain (url){
        let data = await fetch(url);
        let response = await data.json();
        return response;
    }
    /*______________Other Functions______________*/
    const pushImageAndName = (jsonobj , arr) => {
        let newObj = {'name' :  jsonobj.name , 'url': jsonobj.sprites.other.home.front_default};
        //console.log(newObj)
        arr.push(newObj);
        //console.log(arr)
        return arr;
    }
    const displayChainOfEvo = (arr) => {
        let parent = document.querySelector('.container');
        let row = createRow('pokeDetails');
        for (let i = 0 ; i < arr.length; i++){
            let col = createCol('col-12 col-md-4');
            let name = document.createElement('h4');
            name.innerHTML = arr[i].name;
            let img = createImg(arr[i].url);
            col.appendChild(name);
            col.appendChild(img);
            row.appendChild(col);
        }
        parent.appendChild(row);
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
        // img.setAttribute('id', 'pokeImg');
        img.setAttribute('class', 'shadow pokeImg');
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