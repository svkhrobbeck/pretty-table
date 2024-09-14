# pretty-table

A nice little npm package that can print table to the console

## Installation

`npm i @yasudoro/pretty-table`  
or  
`yarn add @yasudoro/pretty-table`

## Usage

```javascript
const PrettyTable = require("pretty-table");

const table = new PrettyTable([
  {
    name: "Jane Doe",
    age: 29
  },
  {
    name: "John Smith",
    age: 12
  }
]);

table.print();

//Outputs the following to CLI:

╔═════════════════╦═════╗
║name             ║ age ║
╠═════════════════╬═════╣
║Kurosaki Ichigo  ║ 17  ║
║Sosuke Aizen     ║ 34  ║
╚═════════════════╩═════╝
```
