const bios = require("../results/rfs-bios")
const fs = require('fs')


const formatted = Object.values(bios).slice(0,300).map(bio => `
### ${bio.name} - ${bio.office}
| | |
| -- | -- |
| ![](${bio.image}) | ${bio.bio.split("\n").join(" <br><br> ")} |
`)

// console.log(formatted.join(''))

fs.writeFileSync("./results/rfs-bios.md", formatted.join(''));
