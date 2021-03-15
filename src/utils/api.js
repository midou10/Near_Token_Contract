// utility functions for JSON-RPC calls
import { formatNearAmount } from 'near-api-js/src/utils/format'; 

export async function getWalletBalance (wallet) {
  const userWalletState = await walletAccount.account().state();
  return formatNearAmount(userWalletState.amount);
}

export function getAccountId (wallet) {
  return wallet.getAccountId();
}

export function fetchDelegations (accountId) {
  // TODO
}
