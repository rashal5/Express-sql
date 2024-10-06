var express = require('express');
var router = express.Router();
const pool = require('../module/book');


router.get('/', async function(req, res, next) {
  try {
  
    const data = await pool.query(`SELECT * FROM books`);
    newdata = data[0]
    res.render('index', { title: newdata});
    
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});


router.get('/update/:id', async function(req, res, next) {
  const id = req.params.id
  const data = await pool.query(`SELECT * FROM books WHERE id = ${id};`)
  const newdata = data[0]

    res.render('update', { title: newdata });
});

router.post('/update/:id', async function(req, res, next) {
  const id = req.params.id
  const title = req.body.title;
  const author = req.body.author;
  const publication_date = req.body.publication_date;
  const publisher = req.body.publisher;
  const description = req.body.description;

  try {
    await pool.query(`UPDATE books SET title = '${title}', author = '${author}', publication_date = '${publication_date}', publisher = '${publisher}', description = '${description}'   WHERE id = ${id};
    `);
    res.redirect('/')
  } catch (err) {
    next(err);
  }
});



router.get('/delete/:id', async function(req, res, next) {
  const d = req.params.id;
  try {
    await pool.query(`DELETE FROM books WHERE id = ${d}`);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.get('/create', async function(req, res, next) {
  res.render('create');
});


router.post('/create', async function(req, res, next) {
  const { 
    title, 
    author, 
    publication_date, 
    publisher, 
    description 
  } = req.body;

  try {
    await pool.query(`
      INSERT INTO books 
        (title, author, publication_date, publisher, description) 
      VALUES 
        (?, ?, ?, ?, ?)
    `, [ 
      title, 
      author, 
      publication_date, 
      publisher, 
      description 
    ]);

    res.redirect('/');
  } catch (err) {
    next(err);
  }
});




module.exports = router;
