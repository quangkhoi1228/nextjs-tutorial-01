# Global State with Context + useReducer

## Overview

This implementation demonstrates how to manage global state in React applications using Context API combined with useReducer hook. This pattern provides a lightweight alternative to Redux for many use cases.

## Key Concepts

### 1. When to Use Context vs Redux?

#### Use Context + useReducer when:
- ✅ **Small to medium-sized applications**
- ✅ **Simple state management needs**
- ✅ **Team is familiar with React hooks**
- ✅ **No need for complex middleware**
- ✅ **Want to avoid external dependencies**
- ✅ **State updates are straightforward**
- ✅ **Need to share state across components**

#### Use Redux when:
- 🔴 **Large, complex applications**
- 🔴 **Need powerful dev tools**
- 🔴 **Complex state logic**
- 🔴 **Need middleware (thunks, sagas)**
- 🔴 **Team prefers explicit state management**
- 🔴 **Need time-travel debugging**
- 🔴 **Multiple teams working on the same codebase**

## Architecture Pattern

### 1. AppProvider (Global State Container)

```typescript
// AppContext.tsx
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
```

### 2. State Structure

```typescript
interface AppState {
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
```

### 3. Action Types

```typescript
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
```

### 4. Reducer Pattern

```typescript
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    
    // ... more cases
    
    default:
      return state;
  }
}
```

## Usage Patterns

### 1. Basic Usage

```typescript
import { useApp } from '../hooks/AppContext';

function MyComponent() {
  const { state, dispatch } = useApp();
  
  const handleLogin = () => {
    dispatch({ type: 'LOGIN', payload: userData });
  };
  
  return (
    <div>
      {state.isAuthenticated ? 'Welcome!' : 'Please login'}
    </div>
  );
}
```

### 2. Selector Hooks (Performance Optimization)

```typescript
// Custom hooks for specific state slices
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
```

### 3. Component Usage with Selectors

```typescript
function TodoList() {
  const { todos, loading, dispatch } = useTodos();
  
  const handleAddTodo = (todo: Todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };
  
  return (
    <div>
      {loading ? 'Loading...' : todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}
```

## Best Practices

### 1. Action Naming Convention
- Use descriptive action types: `'SET_USER_PROFILE'` instead of `'SET_USER'`
- Group related actions: `'TODO_ADD'`, `'TODO_UPDATE'`, `'TODO_DELETE'`
- Use consistent naming patterns

### 2. State Immutability
```typescript
// ✅ Good - Create new object
case 'UPDATE_USER':
  return {
    ...state,
    user: state.user ? { ...state.user, ...action.payload } : null,
  };

// ❌ Bad - Mutate existing object
case 'UPDATE_USER':
  state.user = { ...state.user, ...action.payload };
  return state;
```

### 3. Error Handling
```typescript
case 'SET_ERROR':
  return {
    ...state,
    error: action.payload,
    loading: false, // Reset loading state on error
  };
```

### 4. Loading States
```typescript
case 'SET_LOADING':
  return {
    ...state,
    loading: action.payload,
    error: action.payload ? null : state.error, // Clear errors when loading starts
  };
```

## Performance Considerations

### 1. Memoization
```typescript
import { useMemo } from 'react';

function ExpensiveComponent() {
  const { todos } = useTodos();
  
  const completedTodos = useMemo(() => 
    todos.filter(todo => todo.completed), 
    [todos]
  );
  
  return <div>{completedTodos.length} completed</div>;
}
```

### 2. Selective Re-renders
```typescript
// Use specific selectors instead of full state
const { user } = useUser(); // Only re-renders when user changes
// Instead of:
// const { state } = useApp(); // Re-renders on any state change
```

## Comparison with Redux

| Feature | Context + useReducer | Redux |
|---------|---------------------|-------|
| Bundle Size | Small (built-in) | Larger (external) |
| Learning Curve | Low (React native) | Medium |
| Dev Tools | Basic | Advanced |
| Middleware | Limited | Extensive |
| Performance | Good for small apps | Optimized for large apps |
| Boilerplate | Minimal | More verbose |
| TypeScript | Excellent | Good |

## Migration Path

### From useState to useReducer
```typescript
// Before: Multiple useState
const [user, setUser] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loading, setLoading] = useState(false);

// After: Single useReducer
const [state, dispatch] = useReducer(appReducer, initialState);
```

### From Props Drilling to Context
```typescript
// Before: Props drilling
<App>
  <Header user={user} />
  <Sidebar user={user} />
  <Main user={user} />
</App>

// After: Context
<AppProvider>
  <App>
    <Header />
    <Sidebar />
    <Main />
  </App>
</AppProvider>
```

## Testing

### 1. Reducer Testing
```typescript
describe('appReducer', () => {
  it('should handle LOGIN action', () => {
    const initialState = { user: null, isAuthenticated: false };
    const user = { id: '1', name: 'John' };
    const action = { type: 'LOGIN', payload: user };
    
    const newState = appReducer(initialState, action);
    
    expect(newState.user).toEqual(user);
    expect(newState.isAuthenticated).toBe(true);
  });
});
```

### 2. Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import { AppProvider } from '../hooks/AppContext';

test('renders user info when authenticated', () => {
  render(
    <AppProvider>
      <UserComponent />
    </AppProvider>
  );
  
  // Test component behavior
});
```

## Conclusion

Context + useReducer provides a powerful, lightweight solution for global state management in React applications. It's particularly well-suited for:

- Small to medium applications
- Teams familiar with React hooks
- Projects where you want to minimize dependencies
- Applications with straightforward state logic

For larger applications with complex requirements, Redux remains a solid choice with its ecosystem and tooling. 