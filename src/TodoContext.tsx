import { createContext } from 'react';
import { Todo } from './types/Todo';

type State = {
  todos: Todo[];
  currentTodo: Todo;
  touchedTodo: boolean;
  sortTodo: string;
  searchTitle: string;
  openCurrentTodo: (todo: Todo) => void;
  closeCurrentTodo: () => void;
  setSortTodo: (sortType: string) => void;
  setSearchTitle: (filterTitle: string) => void;
};

export const TodoContext = createContext<State>({
  todos: [],
  currentTodo: {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  },
  touchedTodo: false,
  sortTodo: '',
  searchTitle: '',
  openCurrentTodo: () => {},
  closeCurrentTodo: () => {},
  setSortTodo: () => {},
  setSearchTitle: () => {},
});
