const bios = require("../results/rfs-bios")
const fs = require('fs')


const formatted = Object.values(bios).slice(0,300).map(bio => `
### ${bio.name}
<img  height="300" src="${bio.image}"></img>

#### ${bio.office}

${bio.bio.split("\n").join("\n\n")}

[Facebook](${bio.facebook}) - [Twitter](${bio.twitter})

---
`)


fs.writeFileSync("./results/rfs-bios.md", formatted.join(''));
