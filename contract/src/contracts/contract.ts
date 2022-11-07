import { ContractResult, PokemonState, PokemonAction } from './types/types';

import { SmartWeaveError } from "warp-contracts";
import { generateQuestion, postAnswer } from './actions/write/questions';

declare const ContractError;

export async function handle(state: PokemonState, action: PokemonAction): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'generateQuestion':
      return await generateQuestion(state, action)
    case 'postAnswer':
        return await postAnswer(state, action)    
    default:
      throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }
}

