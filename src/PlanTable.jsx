import React, { useState } from "react";

export default function PlanTable() {
  const [rows, setRows] = useState([
    {
      month: "January",
      openingStock: 500,
      sales: 300,
      incoming: 200,
    },
    {
      month: "February",
      openingStock: 400,
      sales: 250,
      incoming: 0,
    },
  ]);

  const updateCell = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = Number(value);

    // auto-calculated fields
    updated[index].closingStock =
      updated[index].openingStock + updated[index].incoming - updated[index].sales;

    updated[index].coverage =
      updated[index].sales > 0
        ? (updated[index].closingStock / updated[index].sales).toFixed(1)
        : "-";

    setRows(updated);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 Plan Calculation Table</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", marginTop: 20, minWidth: 700 }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th>Month</th>
            <th>Opening Stock</th>
            <th>Sales</th>
            <th>Incoming</th>
            <th>Closing Stock</th>
            <th>Coverage (months)</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.month}</td>

              <td>
                <input
                  type="number"
                  value={row.openingStock}
                  onChange={(e) => updateCell(index, "openingStock", e.target.value)}
                  style={{ width: 80 }}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={row.sales}
                  onChange={(e) => updateCell(index, "sales", e.target.value)}
                  style={{ width: 80 }}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={row.incoming}
                  onChange={(e) => updateCell(index, "incoming", e.target.value)}
                  style={{ width: 80 }}
                />
              </td>

              <td>{row.closingStock ?? "-"}</td>
              <td>{row.coverage ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
