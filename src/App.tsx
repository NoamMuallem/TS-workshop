import "./App.css";
import { Autocomplete } from "./components/autocomplete";
import { Pokemon, pokemons } from "./pokemon";

const isStringContainsSearchTerm = (string: string, searchTerm: string) =>
  string.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

const getPokemonOptionLabel = (pokemon: Pokemon) => pokemon.name;
const getPokemonOptionID = (pokemon: Pokemon) =>
  pokemon.pokedexEntryNumber.toString();
const pokemonFilterFunction = (pokemon: Pokemon, searchTerm: string) =>
  isStringContainsSearchTerm(pokemon.name, searchTerm);
const onPokemonsSelected = (pokemon: Pokemon[] | Pokemon) => {
  const isArray = Array.isArray(pokemon);

  if (isArray) {
    //set array state
  }

  if (!isArray) {
    //set single state
  }
};

function App() {
  return (
    <div className="flex flex-col gap-4 justify-start items-start w-full h-full">
      <h1>My Awesome Pokemon Selector</h1>
      <Autocomplete
        options={pokemons}
        getOptionLabel={getPokemonOptionLabel}
        getOptionID={getPokemonOptionID}
        filterFunction={pokemonFilterFunction}
        isMulti={false}
        onChange={onPokemonsSelected}
      />
    </div>
  );
}

export default App;

// import { useState } from "react";
// import "./App.css";
// import { Autocomplete } from "./components/autocomplete";
//
// type Person = {
//   firstName: string;
//   lastName: string;
//   id: number;
// };
//
// const persons: Person[] = [
//   {
//     firstName: "Noam",
//     lastName: "Muallem",
//     id: 1,
//   },
//   {
//     firstName: "Harry",
//     lastName: "Potter",
//     id: 2,
//   },
//   {
//     firstName: "Ash",
//     lastName: "Katchamp",
//     id: 3,
//   },
//   {
//     firstName: "Brook",
//     lastName: "unknown",
//     id: 4,
//   },
// ];
//
// const isStringContainsSearchTerm = (string: string, searchTerm: string) =>
//   string.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
//
// const getPersonOptionLabel = (person: Person) =>
//   person.firstName + " " + person.lastName;
// const getPersonOptionID = (person: Person) => person.id.toString();
// const personFilterFunction = (person: Person, searchTerm: string) =>
//   isStringContainsSearchTerm(person.firstName, searchTerm) ||
//   isStringContainsSearchTerm(person.lastName, searchTerm);
//
// function App() {
//   const [selectedPersons, setSelectedPersons] = useState<Person[]>([]);
//   return (
//     <div className="flex flex-col gap-4 justify-start items-start w-full h-full">
//       <h1>My Awesome Pokemon Selector</h1>
//       <Autocomplete
//         options={persons}
//         getOptionLabel={getPersonOptionLabel}
//         getOptionID={getPersonOptionID}
//         filterFunction={personFilterFunction}
//         isMulti={true}
//         onChange={(value) => setSelectedPersons(value)}
//       />
//     </div>
//   );
// }
//
// export default App;
//
//
