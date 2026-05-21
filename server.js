const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: false }));
const db = require('./database');

app.get('/', (req, res) => {
    db.prepare("DELETE FROM reservations WHERE start_date < date('now')").run();
    const reservations = db.prepare('SELECT * FROM reservations ORDER BY start_date ASC, start_time ASC').all();
    const error = req.query.error;
    res.render('index', { reservations, error });
});

app.get('/grillbereich', (req, res) => {
    res.send('Grillbereich Buchungen');
});

app.get('/reservations', (req, res) => {
    const reservations = db.prepare('SELECT * FROM reservations').all();
    res.send(reservations);
});

app.post('/reservations/delete', (req, res) => {
    const { id } = req.body;
    db.prepare('DELETE FROM reservations WHERE id = ?').run(id);
    res.redirect('/');
});

app.post('/reservations', (req, res) => {
    const { name, room, date, start_time, end_time } = req.body;

    const conflict = db.prepare(`
    SELECT * FROM reservations 
    WHERE room = ? 
    AND start_date = ?
    AND start_time < ? 
    AND end_time > ?
    `).get(room, date, end_time, start_time);

    if (conflict) {
        return res.redirect('/?error=' + encodeURIComponent('Conflict! This room is already booked for that time.'));
    }
    
    db.prepare(`
        INSERT INTO reservations (name, room, start_date, start_time, end_time)
        VALUES (?, ?, ?, ?, ?)
    `).run(name, room, date, start_time, end_time);

    res.redirect('/');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server läuft auf Port ' + PORT);
});