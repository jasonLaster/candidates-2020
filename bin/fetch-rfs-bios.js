const HCCrawler = require("headless-chrome-crawler");
const candidates = require("../results/rfs-list");
const fs = require('fs')

let results = {};
let count = 1;
(async () => {
  const crawler = await HCCrawler.launch({
    evaluatePage: (a,b,c) => {
      function t(selector) {
        return $(selector)
          .text()
          .trim();
      }

      function l(selector, index = 0) {
        return $(selector)[index] ? $(selector)[index].href : ""
      }

      return {
      	url: location.href,
        name: t(".candidate__name"),
        office: t(".candidate__office-state"),
        bio: t(".candidate__bio"),
        image: $('.col-sm-6.content-area img')[0].src,
        facebook: l('.col-sm-6 .social-links__link a', 0),
        twitter: l('.col-sm-6 .social-links__link a', 1),
        support: l('.candidate__bio h2 a', 0),
        actblue: '',
      };
    },
    onSuccess: ({ result }) => {
      results[result.url] = result;
      console.log(`${count++}: ${result.url} -- ${result.support}`)
    },
    onError: (error) => {
    	console.log(error)
    }
  });

  const urls = candidates
  await crawler.queue(urls);

  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler

  // console.log(results)
  fs.writeFileSync("./results/rfs-bios.json", JSON.stringify(results, null, 2));
})();


console.log(candidates.slice(0,10))
