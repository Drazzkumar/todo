import React from "react";

export default function Header({ searchText, handleSearch, isSearching }) {
  return (
    <div className="header">
      <div className="container clearfix">
        <h1>Todo App</h1>
        <div className={isSearching ? "search-input active" : "search-input"}>
          <i className="fa fa-search" />
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            autoComplete="off"
            spellCheck="false"
            autoCorrect="off"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}
