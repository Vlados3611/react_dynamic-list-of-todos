import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { TodoContext } from '../../TodoContext';

import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const {
    currentTodo,
    touchedTodo,
    closeCurrentTodo,
  } = useContext(TodoContext);

  const [user, setUser] = useState<User>({
    id: 1,
    name: 'Name is not found',
    email: 'Email is not found',
    phone: 'Phone is not found',
  });
  const [openTodo, setOpenTodo] = useState<boolean>(false);

  const getCurrentUser = async (userId: number) => {
    setOpenTodo(false);
    try {
      const foundUser = await getUser(userId);

      setUser(foundUser);
      setOpenTodo(true);
    } catch {
      setOpenTodo(true);
    }
  };

  useEffect(() => {
    if (touchedTodo) {
      getCurrentUser(currentTodo.userId);
    }
  }, [touchedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!openTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeCurrentTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-danger': !currentTodo.completed,
                  'has-text-success': currentTodo.completed,
                })}
              >
                {
                  currentTodo.completed
                    ? 'Done'
                    : 'Planned'
                }
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
