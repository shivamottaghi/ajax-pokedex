# ajax-pokedex
[Click here to open the published page](https://shivamottaghi.github.io/ajax-pokedex/)
## My Goals:
- You can search a pokémon by name and by ID
- Of said pokémon you need to show:
  - The ID-number
  - An image (sprite)
  - At least 4 "moves"
  - The previous evolution, only if it exists, along with their name and image.

---

### My to do list:
- [x] fetch the file from API
  - returns a file with pokemone names and url to fetch more info about each.<br>
*Realized that I need to fetch by name and ID there is no need to fetch all of the pokemons at the same time* 
- [x] change your code structure so that only fetch the pokemons needed.
  - [ ] catch and display error if pokemon not found.
- [x] display it on console
- [x] add search input into the html
  - [x] search by name function
  - [x] search by id function
  - [ ] add the information in html
    - [x] add the img
    - [x] add moves
    - [x] add ID number
    - [x] add name
    - [x] add the previous evolution
      - [x] fetch from another api
      - [ ] try to get access to at least one pokemon's evolution
  - [x] remove the previous pokemon which was found
- [ ] add buttons so user can choose what information they want to be shown about the Pokemon they're searching

#### Styling :
- [x] add bootstrap 
- [x] background for first and second row
- [x] add borders
- [ ] add shadows to elements with border

#### Exeptional pokemons:
- [x] wurmple
- [x] eevee
- [x] zacian
- [ ] 