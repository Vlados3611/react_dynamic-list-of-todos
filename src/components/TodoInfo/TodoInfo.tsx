import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

import { TodoContext } from '../../TodoContext';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const { touchedTodo, openCurrentTodo } = useContext(TodoContext);

  const [touchedTodoInfo, setTouchTodoInfo] = useState<boolean>(false);

  useEffect(() => {
    if (!touchedTodo) {
      setTouchTodoInfo(touchedTodo);
    }
  }, [touchedTodo]);

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': touchedTodoInfo,
      })}
    >
      <td className="is-vcentered">{id}</td>
      {
        completed
          ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="is-vcentered" />
          )
      }
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-danger': !completed,
            'has-text-success': completed,
          })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            openCurrentTodo(todo);
            setTouchTodoInfo(true);
          }}
        >
          {
            touchedTodoInfo
              ? (
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              ) : (
                <span className="icon" data-cy={completed && 'iconCompleted'}>
                  <i className="far fa-eye" />
                </span>
              )
          }
        </button>
      </td>
    </tr>
  );
};
