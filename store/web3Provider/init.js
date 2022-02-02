import { $web3Provider, setWeb3Provider } from ".";

$web3Provider.on(setWeb3Provider, (_, web3Provider) => web3Provider);
