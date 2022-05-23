

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
        let row = createRow();
        let colImg = createCol();
        let imgTag = createImg(detailArr.sprites.other.home.front_default);
        colImg.appendChild(imgTag);
        let colDetails = createCol();
        colDetails = addDetails(colDetails, detailArr);
        row.appendChild(colImg);
        row.appendChild(colDetails);
        parent.appendChild(row);
        detailRowCreation = true;
    }

    const removeExtraRows = () => {
        let detailRow = document.querySelector('#pokeDetails');
        detailRow.remove();
    }

    const createRow = () => {
        let row = document.createElement('div');
        row.setAttribute('class', 'row align-items-center pokeDetails');
        return row;
    }
    const createCol = () => {
        let col = document.createElement('div');
        col.setAttribute('class', 'col-12 col-md-6 text-center');
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
    const addDetails = (col , arr) => {
        col.setAttribute('id', 'details');
        col.classList.add('shadow');
        let id = arr.id;
        let name = arr.name;
        let h1 = document.createElement('h1');
        h1.innerHTML = `Name : ${name.toUpperCase()}`
        let h2 = document.createElement('h2');
        h2.innerHTML = id;
        col.appendChild(h1);
        col.appendChild(h2);
        return col;
    }
})();