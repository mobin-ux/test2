import { $traded, fetchTradedFx, tradedGate, getTraded } from ".";
import { backendUrl } from "../../hooks/useAPI";
import { forward } from "effector";
import axios from "axios";

fetchTradedFx.use(async () => {
  axios.defaults.headers.session = sessionStorage.getItem("session");
  const { data } = await axios.get(`${backendUrl}/history-items/200`);
  return data;
});

$traded.on(fetchTradedFx.doneData, (_, tradeds) => tradeds);

forward({
  from: tradedGate.open,
  to: fetchTradedFx,
});

forward({
  from: getTraded,
  to: fetchTradedFx,
});
