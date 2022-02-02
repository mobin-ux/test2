import { $loading, setLoading, startLoading, stopLoading } from "./";

$loading.on(setLoading, (_, loading) => loading);
$loading.on(startLoading, () => true);
$loading.on(stopLoading, () => false);
