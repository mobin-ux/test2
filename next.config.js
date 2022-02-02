module.exports = {
  images: {
    domains: ["ipfs.infura.io", "api-devnft.payrue.com", "api-nft.payrue.com"],
  },
  reactStrictMode: true,
  env: {
    backendUrl: process.env.BACKEND_URL,
    chainId: process.env.CHAIN_ID,
    oldNftMarketContractAddress: process.env.OLD_NFT_MARKET_CONTRACT_ADDRESS,
    nftContractAddress: process.env.NFT_CONTRACT_ADDRESS,
    propelTokenAddress: process.env.PROPEL_TOKEN_ADDRESS,
  },
};
