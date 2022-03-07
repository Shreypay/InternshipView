const axios = require('axios');
const cheerio = require('cheerio');

var fs = require('fs');
var csv = require('fast-csv');
var ws = fs.createWriteStream('scraper.csv')

const url = 'http://emeraldcoasthomesonline.com/agents/';
//http://emeraldcoasthomesonline.com/agents/?pn=64&pn=226
/*

axios.get(url)
  .then(response => {
    //console.log(response.data);
    getData(response.data)
  })
  .catch(error => {
    console.log(error);
  })
*/
let callUrl = url => {
  axios.get(url)
    .then(response => {
      //console.log(response.data);
      getData(response.data)
    })
    .catch(error => {
      console.log(error);
    })
}

let getData = html => {
  data = [];
  const $ = cheerio.load(html);

  //<div class="agent-container">
  $('.agent-container').each((i, elem) => {
    data.push({
      name: $(elem).find('a').text().trim(),
      first_name: $(elem).find('a').text().trim().split(" ")[0],
      last_name: $(elem).find('a').text().trim().split(" ")[1],
      email: $(elem).html().match("mailto:(.*)\"><i")[0].replace("mailto:","").replace("><i",""),
      phone: $(elem).html().match("\t\t\t\t\t\t\t\t            \t(.*)<br>\n")[0].replace("\t\t\t\t\t\t\t\t            \t", "").replace("<br>\n", ""),
      //temp: $(elem).html()
    });
  });

  /*
  $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
    data.push({
      title : $(elem).text(),
      link : $(elem).find('a.storylink').attr('href')
    });
  });
  */
  console.log(data);
  csv.
    write([
      
      ['Hello World'],
      [data]

     ],{headers:true})
     .pipe(ws);
}

let start_page = 1;
let end_page = 1; //226  
for (let i = start_page; i <= end_page; i++) {
  let urlWithPage = url+"?pn="+i;
  console.log(urlWithPage);
  callUrl(urlWithPage);
}
