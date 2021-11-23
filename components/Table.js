import { useTable } from "react-table";
import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";

import { COLUMNS } from "./columns";
import "./Table.css";

export const Table = () => {
  const [companies, setCompanies] = useState([]);
  const columns = useMemo(() => COLUMNS, []); // use memo to ensure the data aren't recreated on every render

  useEffect(() => {
    axios
      .get(
        "https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=I0R8K64CG3EHARV6"
      )
      .then((res) => {
        setCompanies(JSON.parse(res.data)); // set the state
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //creating table instance
  const tableInstance = useTable({
    columns,
    data: companies,
  });

  //destructuring properties and methods from table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups, //column heading info
    rows, //array
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(
          (
            headerGroup //access to individual header group
          ) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(
                (
                  column //access to each column
                ) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                )
              )}
            </tr>
          )
        )}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                //access to the individual row cell
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
