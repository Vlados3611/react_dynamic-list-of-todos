import React, { useContext } from 'react';

import { TodoContext } from '../../TodoContext';

export const TodoFilter: React.FC = () => {
  const {
    sortTodo,
    searchTitle,
    setSortTodo,
    setSearchTitle,
  } = useContext(TodoContext);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={sortTodo}
            data-cy="statusSelect"
            onChange={(event) => {
              setSortTodo(event.target.value);
            }}
          >
            <option value="all">
              All
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchTitle}
          onChange={(event) => {
            setSearchTitle(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchTitle && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchTitle('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
