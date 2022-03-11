import { useReducer, createContext } from 'react';

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES',
};
// @TODO: Arrow function not working
// Provider to initialize state
function StoreProvider({ children }) {
  const initialState = {
    latLong: '',
    coffeeStores: [],
  };

  const storeReducer = (state, action) => {
    switch (action.type) {
      case ACTION_TYPES.SET_LAT_LONG: {
        return {
          ...state,
          latLong: action.payload.latLong,
        };
      }
      case ACTION_TYPES.SET_COFFEE_STORES: {
        return {
          ...state,
          coffeeStores: action.payload.coffeeStores,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    // @TODO: Why?
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
