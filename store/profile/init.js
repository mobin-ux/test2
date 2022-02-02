import { $profile, fetchProfileFX, getProfile, profileGate } from "./profile";
import axios from "axios";
import { forward } from "effector/effector.umd";
import { $session } from "../session";
import { startLoading, stopLoading } from "../loading";

const backendUrl = process.env.backendUrl;

fetchProfileFX.use(async () => {
  axios.defaults.headers.session = sessionStorage.getItem("session");
  const { data } = await axios.get(`${backendUrl}/wallets/my-profile`);
  return data;
});

$profile.on(fetchProfileFX.doneData, (_, profile) => profile);

forward({
  from: profileGate.open,
  to: fetchProfileFX,
});

forward({
  from: $session,
  to: fetchProfileFX,
});

forward({
  from: getProfile,
  to: fetchProfileFX,
});


