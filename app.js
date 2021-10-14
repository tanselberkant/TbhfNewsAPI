const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');

const app = express();

// GLOBALS
const myArticles = [];

// Routes ->
app.get('/', (req, res) => {
  res.send('Welcome to my Turkish Ice Hockey Federation News API');
});

app.get('/news', (req, res) => {
  axios
    .get('https://www.tbhf.org.tr/h/haberler/1')
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("Haber")', html).each(function () {
        const mytitle = $(this).text().slice(64).split('\n');        
        const url = 'https://https://www.tbhf.org.tr' + $(this).attr('href');
        myArticles.push({
          title : mytitle[0],
          url,
        });
      });
      res.json(myArticles);
    })
    .catch((err) => {
      console.log(err);
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
