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
    name: "Kurosaki Ichigo",
    age: 17
  },
  {
    name: "Sosuke Aizen",
    age: 34
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
