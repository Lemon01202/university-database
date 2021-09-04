const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();


// CONNECTION
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'library'
});
 
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 


//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET
app.get('/',(req, res) => {
	res.render('main',{	
		title: 'Library Database',
	});
});

app.get('/students',(req, res) => {
	let sql = "SELECT * FROM students INNER JOIN students__cards ON students.card__id = students__cards.card__id";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('student_index',{	
		 	title: 'Students Table',
		 	students: rows
		 });
	
	});
});

app.get('/students__cards',(req, res) => {
	let sql = "SELECT * FROM students__cards INNER JOIN books ON students__cards.take__book = books.id JOIN staff ON students__cards.staff__id = staff.id";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('students_card_index',{	
		 	title: 'Students Cards Table',
		 	students: rows
		 });
	
	});
});

app.get('/add-student_card',(req, res) => {
	let sql = "SELECT * FROM students__cards INNER JOIN books ON students__cards.take__book = books.id JOIN staff ON students__cards.staff__id = staff.id";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('students_card_add',{	
		 	title: 'Add Student Card',
		 	student_card: rows
		 });
	
	});
});

app.get('/add-student',(req, res) => {
	let sql = "SELECT * FROM students INNER JOIN students__cards ON students.card__id = students__cards.card__id";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('student_add',{	
		 	title: 'Add Student',
		 	students: rows
		 });
	
	});
});

app.get('/teachers',(req, res) => {
	let sql = "SELECT * FROM teachers INNER JOIN teachers__cards ON teachers.card__id = teachers__cards.card__id";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('teacher_index',{	
		 	title: 'Teachers Table',
		 	students: rows
		 });
	
	});
});

app.get('/teachers__cards',(req, res) => {
	let sql = "SELECT * FROM teachers__cards INNER JOIN books ON teachers__cards.take__book = books.id JOIN staff ON teachers__cards.staff__id = staff.id";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('teachers_card_index',{	
		 	title: 'Teachers Cards Table',
		 	students: rows
		 });
	
	});
});

app.get('/add-teacher',(req, res) => {
	let sql = "SELECT * FROM teachers INNER JOIN teachers__cards ON teachers.card__id = teachers__cards.card__id";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('teacher_add',{	
		 	title: 'Add Teacher',
		 	teachers: rows
		 });
	
	});
});

app.get('/add-teacher_card',(req, res) => {
	let sql = "SELECT * FROM teachers__cards INNER JOIN books ON teachers__cards.take__book = books.id JOIN staff ON teachers__cards.staff__id = staff.id";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('teachers_card_add',{	
		 	title: 'Add Teacher Card ',
		 	teachers_card: rows
		 });
	
	});
});

app.get('/staff',(req, res) => {
	let sql = "SELECT * FROM staff";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('staff_index',{	
		 	title: 'Staff Table',
		 	students: rows
		 });
	
	});
});

app.get('/add-staff',(req, res) => {
	res.render('staff_add',{	
		title: 'Add Student'
	});
});

app.get('/books',(req, res) => {
	let sql = "SELECT * FROM books INNER JOIN authors ON books.author__id = authors.a__id JOIN publishers ON books.publishing__id = publishers.p__id";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('books_index',{	
		 	title: 'Books Table',
		 	students: rows
		 });
	
	});
});

app.get('/add-book',(req, res) => {
	let sql = "SELECT * FROM books INNER JOIN authors ON books.author__id = authors.a__id JOIN publishers ON books.publishing__id = publishers.p__id";
	let aCount = "SELECT COUNT(*) FROM authors";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
		res.render('book_add',{	
			title: 'Add Book',
			books: rows
		});
	});
});

app.get('/authors',(req, res) => {
	let sql = "SELECT * FROM authors";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('authors_index',{	
		 	title: 'Authors Table',
		 	students: rows
		 });
	
	});
});

app.get('/add-author',(req, res) => {
	res.render('author_add',{	
		title: 'Add Author'
	});
});

app.get('/publishers',(req, res) => {
	let sql = "SELECT * FROM publishers";
	let query = connection.query(sql,(err, rows) => {
		if(err) throw err;
	
		res.render('publishers_index',{	
		 	title: 'Authors Table',
		 	students: rows
		 });
	
	});
});

app.get('/add-publish',(req, res) => {
	res.render('publish_add',{	
		title: 'Add Publishing'
	});
});

app.post('/save-student', (req, res) => {
	let students = {name: req.body.name, surname: req.body.surname, phone__num: req.body.phone__num, card__id: req.body.card__id};
	let sql = "INSERT INTO students SET ?";
	let query = connection.query(sql, students, (err, result) => {
		if(err) throw err;
		res.redirect('/students'); 
	});
});

app.post('/save-teacher', (req, res) => {
	let teachers = {name: req.body.name, surname: req.body.surname, phone__num: req.body.phone__num, card__id: req.body.card__id};
	let sql = "INSERT INTO teachers SET ?";
	let query = connection.query(sql, teachers, (err, result) => {
		if(err) throw err;
		res.redirect('/teachers'); 
	});
});

app.post('/save-author', (req, res) => {
	let students = {a__name: req.body.a__name, surname: req.body.surname};
	let sql = "INSERT INTO authors SET ?";
	let query = connection.query(sql, students, (err, result) => {
		if(err) throw err;
		res.redirect('/authors'); 
	});
});

app.post('/save-publish', (req, res) => {
	let students = {p__name: req.body.p__name};
	let sql = "INSERT INTO publishers SET ?";
	let query = connection.query(sql, students, (err, result) => {
		if(err) throw err;
		res.redirect('/publishers'); 
	});
});

app.post('/save-book', (req, res) => {
	let books = {name: req.body.name, author__id: req.body.author__id, publishing__id: req.body.publishing__id};
	let sql = "INSERT INTO books SET ?";
	let query = connection.query(sql, books, (err, result) => {
		if(err) throw err;
		res.redirect('/books'); 
	});
});

app.post('/save-staff', (req, res) => {
	let staff = {staff__name: req.body.staff__name, surname: req.body.surname};
	let sql = "INSERT INTO staff SET ?";
	let query = connection.query(sql, staff, (err, result) => {
		if(err) throw err;
		res.redirect('/staff'); 
	});
});

app.post('/save-teacher_card', (req, res) => {
	let teachers__cards = {take__book: req.body.take__book, staff__id: req.body.staff__id};
	let sql = "INSERT INTO teachers__cards SET ?";
	let query = connection.query(sql, teachers__cards, (err, result) => {
		if(err) throw err;
		res.redirect('/teachers__cards'); 
	});
});

app.post('/save-student_card', (req, res) => {
	let students__cards = {take__book: req.body.take__book, staff__id: req.body.staff__id};
	let sql = "INSERT INTO students__cards SET ?";
	let query = connection.query(sql, students__cards, (err, result) => {
		if(err) throw err;
		res.redirect('/students__cards'); 
	});
});

app.get('/edit-author/:a__id',(req,res) => {
	const a__id = req.params.a__id;
	let sql = `SELECT * from authors where a__id = ?`;
	let query = connection.query(sql,a__id, (err, result) => {
		if(err) throw err;
		res.render('author_add',{
			title: "Edit Author",
			a: result[0]
		});
	});
});

app.get('/delete-author/:a__id',(req,res) => {
	const a__id = req.params.a__id;
	let sql = `DELETE from authors where a__id = ?`;
	let query = connection.query(sql,a__id, (err, result) => {
		if(err) throw err;
		res.redirect('/authors');
	});
});

app.get('/edit-publish/:p__id',(req,res) => {
	const p__id = req.params.p__id;
	let sql = `SELECT * from publishers where p__id = ?`;
	let query = connection.query(sql,p__id, (err, result) => {
		if(err) throw err;
		res.render('publish_add',{
			title: "Edit Publish",
			a: result[0]
		});
	});
});

app.get('/delete-publish/:a__id',(req,res) => {
	const a__id = req.params.a__id;
	let sql = `DELETE from publishers where p__id = ?`;
	let query = connection.query(sql,a__id, (err, result) => {
		if(err) throw err;
		res.redirect('/publishers');
	});
});
//

app.get('/edit-book/:p__id',(req,res) => {
	const p__id = req.params.p__id;
	let sql = `SELECT * from books where id = ?`;
	let query = connection.query(sql,p__id, (err, result, rows) => {
		if(err) throw err;
		res.render('book_add',{
			title: "Edit Book",
			a: result[0],
			books: rows
		});
	});
});

app.get('/delete-book/:p__id',(req,res) => {
	const p__id = req.params.p__id;
	let sql = `DELETE from books where id = ?`;
	let query = connection.query(sql,p__id, (err, result) => {
		if(err) throw err;
		res.redirect('/books');
	});
});
//

app.get('/edit-staff/:p__id',(req,res) => {
	const p__id = req.params.p__id;
	let sql = `SELECT * from staff where id = ?`;
	let query = connection.query(sql,p__id, (err, result) => {
		if(err) throw err;
		res.render('staff_add',{
			title: "Edit Staff",
			a: result[0]
		});
	});
});

app.get('/delete-staff/:a__id',(req,res) => {
	const a__id = req.params.a__id;
	let sql = `DELETE from staff where id = ?`;
	let query = connection.query(sql,a__id, (err, result) => {
		if(err) throw err;
		res.redirect('/staff');
	});
});
//
app.get('/edit-student_card/:p__id',(req,res) => {
	const p__id = req.params.p__id;
	let sql = `SELECT * from students__cards where card__id = ?`;
	let query = connection.query(sql,p__id, (err, result, rows) => {
		if(err) throw err;
		res.render('students_card_add',{
			title: "Edit Student Card",
			a: result[0],
			student_card: rows
		});
	});
});

app.get('/delete-student_card/:a__id',(req,res) => {
	const a__id = req.params.a__id;
	let sql = `DELETE from students__cards where card__id = ?`;
	let query = connection.query(sql,a__id, (err, result) => {
		if(err) throw err;
		res.redirect('/students__cards');
	});
});
//

app.get('/edit-teacher_card/:p__id',(req,res) => {
	const p__id = req.params.p__id;
	let sql = `SELECT * from teachers__cards where card__id = ?`;
	let query = connection.query(sql,p__id, (err, result, rows) => {
		if(err) throw err;
		res.render('teachers_card_add',{
			title: "Edit Teacher Card",
			a: result[0],
			teachers_card: rows
		});
	});
});

app.get('/delete-teacher_card/:a__id',(req,res) => {
	const a__id = req.params.a__id;
	let sql = `DELETE from teachers__cards where card__id = ?`;
	let query = connection.query(sql,a__id, (err, result) => {
		if(err) throw err;
		res.redirect('/teachers__cards');
	});
});
//

app.get('/edit-student/:p__id',(req,res) => {
	const p__id = req.params.p__id;
	let sql = `SELECT * from students where id = ?`;
	let query = connection.query(sql,p__id, (err, result, rows) => {
		if(err) throw err;
		res.render('student_add',{
			title: "Edit Student",
			a: result[0],
			students: rows
		});
	});
});

app.get('/delete-student/:a__id',(req,res) => {
	const a__id = req.params.a__id;
	let sql = `DELETE from students where id = ?`;
	let query = connection.query(sql,a__id, (err, result) => {
		if(err) throw err;
		res.redirect('/students');
	});
});
//

app.get('/edit-teacher/:p__id',(req,res) => {
	const p__id = req.params.p__id;
	let sql = `SELECT * from teachers where id = ?`;
	let query = connection.query(sql,p__id, (err, result, rows) => {
		if(err) throw err;
		res.render('teacher_add',{
			title: "Edit Teacher",
			a: result[0],
			teachers: rows
		});
	});
});

app.get('/delete-teacher/:a__id',(req,res) => {
	const a__id = req.params.a__id;
	let sql = `DELETE from teachers where id = ?`;
	let query = connection.query(sql,a__id, (err, result) => {
		if(err) throw err;
		res.redirect('/teachers');
	});
});
//

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});