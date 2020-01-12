var google = require("google");
var fs = require("fs");

const candidates = require("../results/rfs-bios.json");

const list = Object.values(candidates)

// google.resultsPerPage = 5;
const results = {};

function searchCandidate(candidate) {
  return new Promise(r => {
    google(`${candidate.name} ${candidate.office}`, function(err, res) {

      candidate.google = res.url;
      console.log(candidate.name);
      r();
    });
  });
}



(async function main() {
  // for (const candidate of list) {
  //   await searchCandidate(candidate);
  // }
  await Promise.all(list.map(searchCandidate))
  fs.writeFileSync("./results/rfs-bios.json", JSON.stringify(candidates, null, 2));
})()