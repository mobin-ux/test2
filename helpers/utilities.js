import supportedChains from "./chains";

export function maticPropelPrice(price, isPropel) {
  return isPropel ? (Number(price) / 10 ** 18).toFixed(0) : price;
}

export function getChainData(chainId) {
  if (!chainId) {
    return null;
  }
  const chainData = supportedChains.filter(
    (chain) => chain.chain_id === chainId
  )[0];
  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  const API_KEY = "6a38e41498d1463fa6606ca8b2772f6d";

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}
