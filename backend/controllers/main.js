const pool = require("../db/database.js");

exports.getHowls = async (req, res, next) => {
    // res.send("API is working properly! By EMoons");
    const { rows } = await pool.query('SELECT * FROM howls');
    
    res.json(rows);
};

exports.createHowl = async (req, res, next) => {
    await pool.query('INSERT INTO howls (caption) VALUES($1)', [req.body.caption]);
    
    res.send("Howl created!");
};

exports.changeHowl = async (req, res, next) => {
    const id = parseInt(req.params.id);

    await pool.query(`UPDATE howls SET caption = $1, updated_at = current_timestamp  WHERE id = $2`,
    [req.body.caption, id]);
    
    res.send("Howl updated!");
    // res.send(req.params);
    // res.send(req.body.caption);
};

exports.silenceHowl = async (req, res, next) => {
    const id = parseInt(req.params.id);

    await pool.query("DELETE FROM howls WHERE id = $1", [id]);
    
    res.send("Howl deleted");
};