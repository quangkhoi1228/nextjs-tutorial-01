import React, { createContext, useContext, useReducer, ReactNode } from "react";

// ===== TYPES =====
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Todo state
  todos: Todo[];
  loading: boolean;
  error: string | null;
  
  // UI state
  sidebarOpen: boolean;
  currentPage: string;
  
  // Counter state (for demo)
  counter: number;
}

// ===== ACTION TYPES =====
export type AppAction =
  // User actions
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  
  // Todo actions
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  
  // UI actions
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_CURRENT_PAGE'; payload: string }
  
  // Counter actions
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET_COUNTER' };

// ===== INITIAL STATE =====
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  todos: [],
  loading: false,
  error: null,
  sidebarOpen: false,
  currentPage: 'home',
  counter: 0,
};

// ===== REDUCER =====
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // User actions
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    
    // Todo actions
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: null,
      };
    
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    
    // UI actions
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
    
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    
    // Counter actions
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
      };
    
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1,
      };
    
    case 'RESET_COUNTER':
      return {
        ...state,
        counter: 0,
      };
    
    default:
      return state;
  }
}

// ===== CONTEXT =====
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ===== PROVIDER =====
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// ===== HOOK =====
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// ===== SELECTOR HOOKS (for better performance) =====
export function useUser() {
  const { state } = useApp();
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  };
}

export function useTodos() {
  const { state, dispatch } = useApp();
  return {
    todos: state.todos,
    loading: state.loading,
    error: state.error,
    dispatch,
  };
}

export function useUI() {
  const { state, dispatch } = useApp();
  return {
    sidebarOpen: state.sidebarOpen,
    currentPage: state.currentPage,
    dispatch,
  };
}

export function useCounter() {
  const { state, dispatch } = useApp();
  return {
    counter: state.counter,
    dispatch,
  };
} 