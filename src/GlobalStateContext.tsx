import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define your global state type and initial state here
type GlobalState = {
  // Define your global state properties here
};

// Define your action types and action creators here
type Action = {
  type: string;
  payload?: any;
};

const initialState: GlobalState = {
  // Initialize your global state properties here
};

// Create a context for your global state
const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Define your reducer function here
const globalStateReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    // Handle different action types here
    default:
      return state;
  }
};

// Create a GlobalStateProvider component
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Create a custom hook to access the global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
