type TableRow = { [key: string]: string | number | undefined };

// Utility to get unique columns from the table data
export function getColumns(table: TableRow[]): string[] {
  return Array.from(new Set(table.reduce<string[]>((acc, curr) => acc.concat(Object.keys(curr)), [])));
}

// Utility to get padding configuration based on the longest string in each column
export function getPadConfig(table: TableRow[], columns: string[]): { [key: string]: number } {
  return columns.reduce((acc, col) => {
    const maxColLength = Math.max(
      col.length,
      ...table.map(row => (row[col] ? String(row[col]).length : 0))
    );
    return { ...acc, [col]: maxColLength };
  }, {} as { [key: string]: number });
}
