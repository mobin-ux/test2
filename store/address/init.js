import { $address, setAddress } from "./";

$address.on(setAddress, (_, address) => address);
