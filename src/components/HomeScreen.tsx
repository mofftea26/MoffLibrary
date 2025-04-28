import { FC } from "react";
import { Category } from "../App";

interface HomeScreenProps {
  setCategory: (category: Category) => void;
}

export const HomeScreen: FC<HomeScreenProps> = ({ setCategory }) => {
  return (
    <>
      <h1>Choose a Category</h1>
      <div className="button-grid">
        <button onClick={() => setCategory("GsapClub")}>GSAP Club</button>
        <button onClick={() => setCategory("UtilityHooks")}>
          Utility Hooks
        </button>
      </div>
    </>
  );
};
