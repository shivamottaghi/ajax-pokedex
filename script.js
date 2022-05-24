

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
        let otherClass = 'pokeDetails';
        let row = createRow(otherClass);
        let columns = 'col-12 col-md-6';
        let colImg = createCol(columns);
        let imgTag = createImg(detailArr.sprites.other.home.front_default);
        colImg.appendChild(imgTag);
        let colDetails = createCol(columns);
        colDetails = addIdName(colDetails, detailArr);
        row.appendChild(colImg);
        row.appendChild(colDetails);
        parent.appendChild(row);
        detailRowCreation = true;
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
    const addIdName = (col , arr) => {
        let detailDiv = document.createElement('div');
        detailDiv.setAttribute('class', 'container details');
        let id = arr.id;
        let name = arr.name;
        let h1 = document.createElement('h1');
        h1.innerHTML = `Name : ${name.toUpperCase()}`
        let h2 = document.createElement('h2');
        h2.innerHTML = `ID : ${id}`;
        let row = createRow();
        row.appendChild(h1);
        row.appendChild(h2);
        detailDiv.appendChild(row);
        //detailDiv = addMoves(detailDiv, arr);
        col.appendChild(detailDiv);
        return col;
    }
    /*const addMoves = (parent, arr) => {

    }*/
})();