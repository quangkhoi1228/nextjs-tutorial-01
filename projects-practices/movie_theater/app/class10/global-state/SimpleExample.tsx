"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// ===== SIMPLE COUNTER EXAMPLE =====

// 1. Define State Type
interface CounterState {
  count: number;
  lastUpdated: string | null;
}

// 2. Define Action Types
type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_COUNT'; payload: number };

// 3. Initial State
const initialState: CounterState = {
  count: 0,
  lastUpdated: null,
};

// 4. Reducer Function
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
        lastUpdated: new Date().toISOString(),
      };
    
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
        lastUpdated: new Date().toISOString(),
      };
    
    case 'RESET':
      return {
        ...state,
        count: 0,
        lastUpdated: new Date().toISOString(),
      };
    
    case 'SET_COUNT':
      return {
        ...state,
        count: action.payload,
        lastUpdated: new Date().toISOString(),
      };
    
    default:
      return state;
  }
}

// 5. Context
interface CounterContextType {
  state: CounterState;
  dispatch: React.Dispatch<CounterAction>;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

// 6. Provider
export function CounterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// 7. Hook
function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider');
  }
  return context;
}

// ===== COMPONENTS =====

function CounterDisplay() {
  const { state } = useCounter();

  return (
    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        Counter: {state.count}
      </h3>
      {state.lastUpdated && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Last updated: {new Date(state.lastUpdated).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}

function CounterControls() {
  const { dispatch } = useCounter();

  return (
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => dispatch({ type: 'DECREMENT' })}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        -
      </button>
      
      <button
        onClick={() => dispatch({ type: 'INCREMENT' })}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        +
      </button>
      
      <button
        onClick={() => dispatch({ type: 'RESET' })}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
      >
        Reset
      </button>
      
      <button
        onClick={() => dispatch({ type: 'SET_COUNT', payload: 10 })}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Set to 10
      </button>
    </div>
  );
}

function CounterHistory() {
  const { state } = useCounter();

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h4 className="font-medium mb-2 text-gray-900 dark:text-white">
        State History
      </h4>
      <pre className="text-xs text-gray-600 dark:text-gray-300 font-mono">
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
}

// ===== MAIN COMPONENT =====
export default function SimpleExample() {
  return (
    <CounterProvider>
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Simple Context + useReducer Example
        </h2>
        
        <CounterDisplay />
        
        <div className="mt-4">
          <CounterControls />
        </div>
        
        <CounterHistory />
        
        {/* Explanation */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
            Pattern Explanation:
          </h3>
          <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>1. Define state interface and action types</li>
            <li>2. Create reducer function with switch cases</li>
            <li>3. Set up Context with Provider</li>
            <li>4. Create custom hook for easy access</li>
            <li>5. Use dispatch to update state</li>
          </ol>
        </div>
      </div>
    </CounterProvider>
  );
} 