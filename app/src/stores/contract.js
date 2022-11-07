import { defineStore } from 'pinia';
import { WarpFactory } from 'warp-contracts/web';
import { createToast } from 'mosha-vue-toastify';
import { contractId } from '../constants.js';
import { evmSignature, EvmSignatureVerificationPlugin } from 'warp-signature';
import MetaMaskOnboarding from '@metamask/onboarding';
import Pokemons from '../assets/pokemons.json';
import { useToast } from "vue-toastification";
const toast = useToast();


export const useContractStore = defineStore('contract', {
  state: () => {
    return {
      contractState: [],
      contractId: contractId,
      warp: null,
      contract: null,
      wallet: null,
      questionId: 0,
      pokemonId: 0,
      address: "",
      questionCount: 0, 
      correctCount: 0,
      pokemons: Pokemons
    };
  },
  actions: {
    async initWarp() {
      this.warp = await WarpFactory.forMainnet().use(new EvmSignatureVerificationPlugin());
    },

    async getContract() {
      this.contract = await this.warp.contract(this.contractId);
      const { cachedValue } = await this.contract.readState();
      this.contractState = cachedValue.state;
    },

    async generateQuestion() {
      console.log("Generating question");

      await this.contract.writeInteraction({
        function: 'generateQuestion'
      }, {vrf: true});

      const state = await this.contract.readState();
      const questions = state.cachedValue.state.questions;
      const lastQuestion = questions[questions.length-1]; 
      console.log(lastQuestion);
      this.questionId = lastQuestion.id;
      this.pokemonId = lastQuestion.pokemonId;
      this.answers = lastQuestion.candidates;     
      
      this.questionCount = questions.reduce((acc, question) => {
          return acc + (question.creator === this.address? 1: 0);
      }, 0);

      this.correctCount = questions.reduce((acc, question) => {
        return acc + (question.creator === this.address && question.isCorrect ? 1: 0);
    }, 0);

    },

    async postAnswer(answer) {
      console.log("Posting answer: " + answer);

      await this.contract.writeInteraction({
        function: 'postAnswer',
        questionId: this.questionId,
        answer: answer
      });
  
      await new Promise((r) => setTimeout(r, 1000));

      const state = await this.contract.readState();
      const questions = state.cachedValue.state.questions;
      const lastQuestion = questions[questions.length-1];

      console.log("Question with answer:");
      console.log(lastQuestion);

      if (lastQuestion.isCorrect) {
        toast.success("Bravo, my name is " + answer);
      } else {
        toast.error("I'm not that Pokemon :(")
      }


      await this.generateQuestion();
    },

    async connectWallet() {
      if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
        createToast('Wallet not detected. Please install Metamask.', {
          type: 'danger',
        });
        return;
      }

      await this.contract.connect({
        signer: evmSignature,
        signatureType: 'ethereum',
      });
      createToast('Conntected!', {
        type: 'success',
      });
    },

    async connectLocalWallet() {
      console.log("Connecting local wallet...");
      
      let jwk = localStorage.getItem('jwk');
      if (!jwk) {
        jwk = JSON.stringify(await this.warp.arweave.wallets.generate());
        localStorage.setItem('jwk', jwk);
      }        
      const wallet = JSON.parse(jwk);
      await this.contract.connect(wallet);
      this.address = await this.warp.arweave.wallets.jwkToAddress(wallet);
    }

    
  },
});
