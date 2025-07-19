"use client";
import React, { useState } from "react";
import { useApp, useUser, useTodos, useUI, useCounter } from "../hooks/AppContext";
import ThemeToggle from "../components/ThemeToggle";

// ===== USER MANAGEMENT COMPONENT =====
function UserManagement() {
  const { user, isAuthenticated } = useUser();
  const { dispatch } = useApp();

  const handleLogin = () => {
    const mockUser = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin" as const,
    };
    dispatch({ type: "LOGIN", payload: mockUser });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleUpdateUser = () => {
    if (user) {
      dispatch({
        type: "UPDATE_USER",
        payload: { name: "Updated " + user.name },
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        User Management
      </h3>
      
      {isAuthenticated ? (
        <div className="space-y-3">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdateUser}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Update Name
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-3">Not logged in</p>
          <button
            onClick={handleLogin}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

// ===== TODO MANAGEMENT COMPONENT =====
function TodoManagement() {
  const { todos, loading, error, dispatch } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = {
        id: Date.now().toString(),
        title: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      dispatch({ type: "ADD_TODO", payload: todo });
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleLoadTodos = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    // Simulate API call
    setTimeout(() => {
      const mockTodos = [
        { id: "1", title: "Learn React", completed: true, createdAt: new Date() },
        { id: "2", title: "Build Todo App", completed: false, createdAt: new Date() },
        { id: "3", title: "Deploy to Production", completed: false, createdAt: new Date() },
      ];
      dispatch({ type: "SET_TODOS", payload: mockTodos });
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Todo Management
      </h3>

      <div className="mb-4">
        <button
          onClick={handleLoadTodos}
          disabled={loading}
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load Sample Todos"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo..."
            className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="rounded"
              />
              <span
                className={`text-sm ${
                  todo.completed
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {todos.length === 0 && !loading && (
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
}

// ===== COUNTER COMPONENT =====
function Counter() {
  const { counter, dispatch } = useCounter();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Counter
      </h3>
      
      <div className="text-center mb-4">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {counter}
        </span>
      </div>
      
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          -
        </button>
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: "RESET_COUNTER" })}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// ===== UI STATE COMPONENT =====
function UIState() {
  const { sidebarOpen, currentPage, dispatch } = useUI();

  const pages = ["home", "dashboard", "profile", "settings"];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        UI State
      </h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Sidebar: {sidebarOpen ? "Open" : "Closed"}
          </p>
          <button
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Toggle Sidebar
          </button>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Current Page: {currentPage}
          </p>
          <div className="flex gap-1 flex-wrap">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => dispatch({ type: "SET_CURRENT_PAGE", payload: page })}
                className={`px-2 py-1 text-xs rounded transition ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== STATE DEBUGGER =====
function StateDebugger() {
  const { state } = useApp();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        State Debugger
      </h3>
      
      <div className="text-xs text-gray-600 dark:text-gray-300 font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded overflow-auto max-h-40">
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}

// ===== MAIN PAGE =====
export default function GlobalStatePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Global State with Context + useReducer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Demonstrating when to use Context vs Redux and how to manage global state effectively
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UserManagement />
          <TodoManagement />
          <Counter />
          <UIState />
          <div className="md:col-span-2 lg:col-span-3">
            <StateDebugger />
          </div>
        </div>

        {/* When to use Context vs Redux */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            When to use Context vs Redux?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-green-600 dark:text-green-400">
                Use Context + useReducer when:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Small to medium-sized applications</li>
                <li>• Simple state management needs</li>
                <li>• Team is familiar with React hooks</li>
                <li>• No need for complex middleware</li>
                <li>• Want to avoid external dependencies</li>
                <li>• State updates are straightforward</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 text-blue-600 dark:text-blue-400">
                Use Redux when:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Large, complex applications</li>
                <li>• Need powerful dev tools</li>
                <li>• Complex state logic</li>
                <li>• Need middleware (thunks, sagas)</li>
                <li>• Team prefers explicit state management</li>
                <li>• Need time-travel debugging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 