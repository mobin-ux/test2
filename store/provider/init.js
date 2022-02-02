import { $provider, setProvider } from ".";

$provider.on(setProvider, (_, provider) => provider);
