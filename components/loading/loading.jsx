import { useStore } from "effector-react";
import { $loading } from "../../store/loading";
import css from "./loading.module.scss";

const Loading = () => {
  const loading = useStore($loading);
  if (!loading) return null;
  return (
    <div className={css.loading}>
      <div className={css.overlay__spinner} />
    </div>
  );
};

export { Loading };
