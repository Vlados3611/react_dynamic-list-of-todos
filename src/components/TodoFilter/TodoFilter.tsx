import React, { useContext } from 'react';

import { FilterType } from '../../enums/FilterType';

import { TodoContext } from '../../TodoContext';

const changeFilterType = (filterBy: string) => {
  switch (filterBy) {
    case FilterType.Active:
      return FilterType.Active;

    case FilterType.Completed:
      return FilterType.Completed;

    default:
      return FilterType.All;
  }
};

export const TodoFilter: React.FC = () => {
  const {
    filterTodo,
    searchTitle,
    setFilterTodo,
    setSearchTitle,
  } = useContext(TodoContext);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filterTodo}
            data-cy="statusSelect"
            onChange={(event) => {
              const { value } = event.target;

              setFilterTodo(() => changeFilterType(value));
            }}
          >
            {Object.values(FilterType).map((filterTypes) => (
              <option
                key={filterTypes}
                value={filterTypes}
              >
                {filterTypes}
              </option>
            ))}
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
