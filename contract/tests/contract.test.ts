import ArLocal from 'arlocal';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { LoggerFactory, Warp, WarpFactory, Contract } from 'warp-contracts';
import { PokemonState } from '../src/contracts/types/types';
import Pokemons from '../../app/src/assets/pokemons.json';
import fs from 'fs';
import path from 'path';
import jwk from '../.secrets/jwk.json';

jest.setTimeout(30000);

describe('Testing the Pokemon Game', () => {
  let ownerWallet: JWKInterface;
  let owner: string;

  let user2Wallet: JWKInterface;
  let user2: string;

  let arlocal: ArLocal;
  let warp: Warp;
  let game: Contract<PokemonState>;

  let contractSrc: string;
  let initialState;

  let contractId: string;

  beforeAll(async () => {
    //arlocal = new ArLocal(1820, false);
    //await arlocal.start();

    LoggerFactory.INST.logLevel('error');
    //LoggerFactory.INST.logLevel('debug', 'WasmContractHandlerApi');

    warp = WarpFactory.forMainnet();

    initialState = {
      pokemons: Pokemons,
      questions: []
    };

    contractSrc = fs.readFileSync(path.join(__dirname, '../dist/contract.js'), 'utf8');

    ({ contractTxId: contractId } = await warp.createContract.deploy({
      wallet: jwk,
      initState: JSON.stringify(initialState),
      src: contractSrc,
    }));
    console.log('Deployed contract: ', contractId);
    game = warp.contract<PokemonState>(contractId).connect(jwk);
  });

 
  it('should read Pokemon state', async () => {
    expect((await game.readState()).cachedValue.state).toEqual(initialState);
  });

  it('should generate question', async () => {    
    await game.writeInteraction({
      function: 'generateQuestion'
    }, {vrf: true});
    
    let questions = (await game.readState()).cachedValue.state.questions;
    expect(questions.length).toEqual(1);

    console.log(questions);
  });

  it('should post dummy answer', async () => {    
    console.log("Posting answer");
    await game.writeInteraction({
      function: 'postAnswer',
      questionId: 0,
      answer: "Dummy"
    });
    
    let question = (await game.readState()).cachedValue.state.questions[0];

    console.log(question);

    expect(question.answer).toEqual("Dummy");
    expect(question.isCorrect).toEqual(false);
  });

  it('should post correct answer', async () => {    
    let state = (await game.readState()).cachedValue.state;
    let question = state.questions[0];

    console.log(question);

    const correctAnswer = state.pokemons[question.pokemonId];

    console.log("Correct answer: " + correctAnswer);

    await game.writeInteraction({
      function: 'postAnswer',
      questionId: 0,
      answer: correctAnswer
    });

    await new Promise((r) => setTimeout(r, 2000));

    state = (await game.readState()).cachedValue.state;
    question = state.questions[0];

    console.log(question);
    
    expect(question.answer).toEqual(correctAnswer);
    expect(question.isCorrect).toEqual(true);
  });

});