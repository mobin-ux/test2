import { $session, setSession } from "./";
import { fetchProfileFX } from "../profile/profile";

$session
  .on(setSession, (_, session) => session)
  .on(fetchProfileFX.fail, () => {
    sessionStorage.clear();
    localStorage.clear();
    return "";
  });
