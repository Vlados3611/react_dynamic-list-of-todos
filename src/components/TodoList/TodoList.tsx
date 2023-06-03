import React, {
  useMemo,
  useCallback,
  useContext,
} from 'react';

import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoContext } from '../../TodoContext';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../enums/FilterType';

export const TodoList: React.FC = () => {
  const {
    todos,
    filterTodo,
    searchTitle,
  } = useContext(TodoContext);

  const filterTodoBy = useCallback(
    (todosList: Todo[], filterByType: string, filterBySearch): Todo[] => {
      const filteredTodos = todosList.filter((todo) => (
        todo.title.toLowerCase().includes(filterBySearch.toLowerCase())
      ));

      switch (filterByType) {
        case FilterType.Active:
          return filteredTodos.filter((todo: Todo) => !todo.completed);

        case FilterType.Completed:
          return filteredTodos.filter((todo: Todo) => todo.completed);

        default:
          return filteredTodos;
      }
    }, [filterTodo, searchTitle],
  );

  const filteredTodos = useMemo(() => {
    return filterTodoBy(todos, filterTodo, searchTitle);
  }, [filterTodo, searchTitle]);

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
