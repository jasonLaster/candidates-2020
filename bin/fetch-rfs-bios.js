const HCCrawler = require("headless-chrome-crawler");
const candidates = require("./list");
const fs = require('fs')

let results = {};
(async () => {
  const crawler = await HCCrawler.launch({
    evaluatePage: (a,b,c) => {
      function t(selector) {
        return $(selector)
          .text()
          .trim();
      }

      return {
      	url: location.href,
        name: t(".candidate__name"),
        office: t(".candidate__office-state"),
        bio: t(".candidate__bio"),
        image: $('.col-sm-6.content-area img')[0].src,
      };
    },
    onSuccess: ({ result }) => {
      results[result.url] = result;
      if (result.url) {
        console.log(result);
      }
    },
    onError: (error) => {
    	console.log(error)
    }
  });

  const urls = candidates
  await crawler.queue(urls);

  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler

  console.log(results)
  fs.writeFileSync("./results.json", JSON.stringify(results, null, 2));
})();


console.log(candidates.slice(0,10))