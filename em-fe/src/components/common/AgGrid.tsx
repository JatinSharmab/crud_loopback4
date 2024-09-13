// src/components/CommonAgGrid.tsx

import React from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ColDef } from "@ag-grid-community/core";
import "./ag-grid-theme-builder.css"; 
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

interface CommonAgGridProps<T> {
  rowData: T[];
  columnDefs: ColDef<T>[];
  defaultColDef?: ColDef<T>;
  pagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: any;
  scrollbarWidth?: number; // Update type to number for better type safety
}

const AgGrid = <T extends object>({
  rowData,
  columnDefs,
  defaultColDef = { flex: 1 },
  pagination = true,
  paginationPageSize = 10,
  paginationPageSizeSelector = [10, 20, 30],
  scrollbarWidth = 8, // Default scrollbar width
}: CommonAgGridProps<T>) => {
  // Create custom styles for scrollbar
  const gridStyle = {
    width: "100%",
    height: "80%",
    "--scrollbar-width": `${scrollbarWidth}px`, // Set CSS variable for scrollbar width
  } as React.CSSProperties;

  return (
    <div
      // id={"myGrid"}
      // className={"ag-theme-quartz[.min].css"}
      className="ag-theme-quartz-dark"
      style={gridStyle}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        alwaysShowVerticalScroll={true}
        scrollbarWidth={50}

      />
    </div>
  );
};

export default AgGrid;
