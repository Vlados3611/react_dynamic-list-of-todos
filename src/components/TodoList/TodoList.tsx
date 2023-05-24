import React, {
  useMemo,
  useCallback,
  useContext,
} from 'react';

import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoContext } from '../../TodoContext';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const {
    todos,
    sortTodo,
    searchTitle,
  } = useContext(TodoContext);

  const sortTodoBy = useCallback(
    (todosList: Todo[], sortBy: string, filterTodos): Todo[] => {
      const filteredTodos = todosList.filter((todo) => (
        todo.title.toLowerCase().includes(filterTodos.toLowerCase())
      ));

      switch (sortBy) {
        case 'active':
          return filteredTodos.filter((todo: Todo) => !todo.completed);

        case 'completed':
          return filteredTodos.filter((todo: Todo) => todo.completed);

        default:
          return filteredTodos;
      }
    }, [sortTodo, searchTitle],
  );

  const filteredTodos = useMemo(() => {
    return sortTodoBy(todos, sortTodo, searchTitle);
  }, [sortTodo, searchTitle]);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map((todo) => (
          <TodoInfo
            todo={todo}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
};
