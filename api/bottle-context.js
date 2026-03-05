import { createContext, useReducer } from "react";

export const BottlesContext = createContext({
  bottles: [],
  setBottles: (bottles) => () => {},
  addBottle: ({ designation, vintage, date, type }) => {},
  deleteBottle: (id) => {},
  updateBottle: (id, { designation, vintage, date, type }) => {},
});

function bottlesReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const updatableBottleIndex = state.findIndex(
        (bottle) => bottle.id === action.payload.id,
      );
      const updatableBottle = state[updatableBottleIndex];
      const updatedItem = { ...updatableBottle, ...action.payload.data };
      const updatedBottles = [...state];
      updatedBottles[updatableBottleIndex] = updatedItem;
      return updatedBottles;
    case "DELETE":
      return state.filter((bottle) => bottle.id !== action.payload);
    default:
      return state;
  }
}

function BottlesContextProvider({ children }) {
  const [bottleState, dispatch] = useReducer(bottlesReducer, []);

  function setBottles(bottles) {

    dispatch({ type: "SET", payload: bottles });
  }

  function addBottle(bottleData) {
    dispatch({ type: "ADD", payload: bottleData });
  }

  function deleteBottle(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateBottle(id, bottleData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: bottleData } });
  }

  const value = {
    bottles: bottleState,
    setBottles: setBottles,
    addBottle: addBottle,
    deleteBottle: deleteBottle,
    updateBottle: updateBottle,
  };

  return (
    <BottlesContext.Provider value={value}>{children}</BottlesContext.Provider>
  );
}

export default BottlesContextProvider;
