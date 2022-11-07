import { LoggerFactory, SmartWeaveError } from 'warp-contracts';
import { ContractResult, PokemonAction, PokemonState, Question } from '../../types/types';

declare const ContractError;

export const generateQuestion = async (
  state: PokemonState,
  { caller, input }: PokemonAction
): Promise<ContractResult> => {
  let MAX = Object.keys(state.pokemons).length+1;  

  let pokemonId = SmartWeave.vrf.randomInt(MAX);
  let correctSlot = SmartWeave.vrf.randomInt(4)-1;
  let candidates = [];

  for(let i=0;i<4;i++) {
    if (i == correctSlot) {
        candidates.push(state.pokemons[pokemonId]);
    } else {
        let candidateId = pokemonId + 100*(i+1);
        if (candidateId>MAX) {
            candidateId = candidateId - MAX;
        }
        candidates.push(state.pokemons[candidateId]);
    }
  }
  
  let question: Question = {
    id: state.questions.length,
    creator: caller,
    pokemonId: pokemonId,
    candidates: candidates
  };
  state.questions.push(question);
  return { state };
};

export const postAnswer = async (
    state: PokemonState,
    { caller, input }: PokemonAction
  ): Promise<ContractResult> => {
    
    let pokemonId = state.questions[input.questionId].pokemonId;
    let correctAnswer = state.pokemons[pokemonId];
    state.questions[input.questionId].answer = input.answer;
    state.questions[input.questionId].isCorrect = ( correctAnswer == input.answer);

    return { state };
  };
