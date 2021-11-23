import React from "react";
import { useGlobalFilter } from "react-table";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Search:{" "}
      <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  );
};
