import { createContext } from 'react';
import { Todo } from './types/Todo';
import { FilterType } from './enums/FilterType';

type State = {
  todos: Todo[];
  currentTodo: Todo;
  touchedTodo: boolean;
  filterTodo: FilterType;
  searchTitle: string;
  openCurrentTodo: (todo: Todo) => void;
  closeCurrentTodo: () => void;
  setFilterTodo: (callback: () => FilterType) => void;
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
  filterTodo: FilterType.All,
  searchTitle: '',
  openCurrentTodo: () => {},
  closeCurrentTodo: () => {},
  setFilterTodo: () => {},
  setSearchTitle: () => {},
});
