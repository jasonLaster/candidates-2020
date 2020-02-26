require('dotenv').config({
  path: `.env.development`,
})

var Airtable = require('airtable')
const candidates = Object.values(require("../results/rfs-bios.json"))


Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});


var base = Airtable.base('appmwihYY08QJYQKK');

function fetchCandidates() {
	base('Candidates').select({
	    // Selecting the first 3 records in Grid view:
	    maxRecords: 3,
	    view: "Grid view"
	}).eachPage(function page(records, fetchNextPage) {
	    // This function (`page`) will get called for each page of records.

	    records.forEach(function(record) {
	        console.log('Retrieved', record.get('Name'));
	    });

	    // To fetch the next page of records, call `fetchNextPage`.
	    // If there are more records, `page` will get called again.
	    // If there are no more records, `done` will get called.
	    fetchNextPage();

	}, function done(err) {
	    if (err) { console.error(err); return; }
	});
}


function createCandidates(index) {
  console.log(`Create candidates from ${index*10}-${(index+1)*10 - 1}`)
  const list = candidates.slice(index*10, (index+1)*10 - 1);
  console.log(list.map(l => l.Name))
      if (index < 14) {
        createCandidates(index + 1)  
      }
  // base('Candidates').create(
  //   list.map(c => ({
  //     fields: {
  //       ...c, 
  //       Image: [{ url: c.Image }]
  //     }
  //   }
  //   )), 
  //   function(err, records) {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     // records.forEach(function (record) {
  //     //   console.log(record.getId());
  //     // });

  //     if (index < 14) {
  //       createCandidates(index + 1)  
  //     }
  //   }
  // );
}

console.log(candidates.length)
createCandidates(0)

// console.log( JSON.stringify(candidates.slice(0,9).map(c => ({
//       fields: {
//         ...c, 
//         Image: { url: c.Image }
//       }
//     }
//     )), null, 2))