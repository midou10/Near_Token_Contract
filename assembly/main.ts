import { context, logging, storage } from "near-sdk-as";
// available class: context, storage, logging, base58, base64, 
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { TextMessage } from "./model";

const DEFAULT_MESSAGE = "Hello"

export function welcome(account_id: string): TextMessage {
  logging.log("simple welcome test");
  let message = new TextMessage();
  let greetingPrefix = storage.get<string>(account_id);
  if (!greetingPrefix) {
    greetingPrefix = DEFAULT_MESSAGE;
  }
  const s = printString(account_id);
  message.text = greetingPrefix + " " + s;
  return message;
}

export function setGreeting(message: string): void {
  storage.set(context.sender, message);
}

function printString(s: string): string {
  return s;
}

// Our Delegator smart contract can make use of the following functionality

// viewMethods
// 1. get total amount staked in the validator's contract (general info)
// 2. get total amount staked in the validator's contract by the user (personalized info)

// changeMethods
// 1. deposit amount from sender wallet into the validator's contract
//    stake (lock) amount deposited, which should be instant, into the validator's contract

// 2. unstake (unlock) any amount up to deposited amount, which should take 3 epochs
//    from the validator's contract, and then, withdraw to the user's wallet