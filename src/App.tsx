/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoContext } from './TodoContext';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });
  const [touchedTodo, setTouchTodo] = useState<boolean>(false);
  const [sortTodo, setSortTodo] = useState<string>('');
  const [searchTitle, setSearchTitle] = useState<string>('');

  const openCurrentTodo = (todo: Todo) => {
    setCurrentTodo(todo);
    setTouchTodo(true);
  };

  const closeCurrentTodo = () => {
    setTouchTodo(false);
  };

  const getTodosAPI = async (loadedFunction: any) => {
    setIsLoaded(false);
    try {
      const initialTodos = await loadedFunction();

      setTodos(initialTodos);
      setIsLoaded(true);
    } catch {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    getTodosAPI(getTodos);
  }, []);

  return (
    <>
      <TodoContext.Provider value={{
        todos,
        currentTodo,
        touchedTodo,
        sortTodo,
        searchTitle,
        openCurrentTodo,
        closeCurrentTodo,
        setSortTodo,
        setSearchTitle,
      }}
      >
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>
              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                {
                  !isLoaded
                    ? (
                      <Loader />
                    ) : (
                      <TodoList />
                    )
                }
              </div>
            </div>
          </div>
        </div>
        {touchedTodo && <TodoModal />}
      </TodoContext.Provider>
    </>
  );
};
