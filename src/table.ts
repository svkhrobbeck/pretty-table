import { getColumns, getPadConfig } from "./utils";

type TableRow = { [key: string]: string | number | undefined };

export class PrettyTable {
  private table: TableRow[];

  constructor(init: TableRow[]) {
    this.table = init;
  }

  private getColumns(): string[] {
    return getColumns(this.table);
  }

  private getPadConfig(): { [key: string]: number } {
    return getPadConfig(this.table, this.getColumns());
  }

  private getHeader(): string {
    const padConfig = this.getPadConfig();
    const columns = this.getColumns();
    const paddedCols = columns.map(col => col.padEnd(padConfig[col]));
    const lines = paddedCols.map(col => "═".repeat(col.length));
    return `╔${lines.join("╦")}╗\n║${paddedCols.join("║")}║\n╠${lines.join("╬")}╣`;
  }

  private getBody(): string {
    const padConfig = this.getPadConfig();
    const columns = this.getColumns();
    return (
      this.table
        .map(row => `║${columns.map(col => String(row[col] ?? "-").padEnd(padConfig[col])).join("║")}`)
        .join("║\n") + "║"
    );
  }

  private getFooter(): string {
    const padConfig = this.getPadConfig();
    const columns = this.getColumns();
    const lines = columns.map(col => "═".repeat(padConfig[col]));
    return `╚${lines.join("╩")}╝`;
  }

  public getTable(): string {
    return `${this.getHeader()}\n${this.getBody()}\n${this.getFooter()}`;
  }

  public print(): void {
    console.log(this.getTable());
  }
}
