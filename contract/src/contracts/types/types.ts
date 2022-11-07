export interface PokemonState {
  questions: Question[];
  pokemons: {};
}

export interface Question {
  id: number;
  creator: string;
  pokemonId: number;
  candidates: string[];
  answer: string;
  isCorrect: boolean;
}

export interface PokemonAction {
  input: PokemonInput;
  caller: string;
}

export interface PokemonAction {
  input: PokemonInput;
  caller: string;
}

export interface PokemonInput {
  function: PokemonFunction;
  questionId: number;
  answer: string;
}

export type PokemonResult = Question;

export type PokemonFunction = 'generateQuestion' | 'postAnswer';

export type ContractResult = { state: PokemonState } | { result: PokemonState };