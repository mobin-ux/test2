import { $chainId, setChainId } from "./";

$chainId.on(setChainId, (_, chainId) => chainId);
