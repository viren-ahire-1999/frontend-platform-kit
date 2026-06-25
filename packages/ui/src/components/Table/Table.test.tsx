import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table, type Column } from "./Table";

interface Row {
  id: string;
  name: string;
}

const columns: Column<Row>[] = [{ key: "name", header: "Name" }];

describe("Table", () => {
  it("renders a row per data item", () => {
    render(
      <Table<Row>
        columns={columns}
        data={[{ id: "1", name: "Ada" }]}
        getRowKey={(row) => row.id}
      />
    );
    expect(screen.getByText("Ada")).toBeInTheDocument();
  });

  it("shows the empty message when there is no data", () => {
    render(
      <Table<Row>
        columns={columns}
        data={[]}
        getRowKey={(row) => row.id}
        emptyMessage="Nothing here"
      />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});
