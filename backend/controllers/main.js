const pool = require("../db/database.js");

exports.getHowls = async (req, res, next) => {
    const { rows } = await pool.query('SELECT * FROM howls');
    
    if(rows.length > 0) {
        res.json(rows);
    }else{
        res.send("No howls found!")
    }
};

exports.createHowl = async (req, res, next) => {
    await pool.query('INSERT INTO howls (caption) VALUES($1)', [req.body.caption]);
    
    res.send("Howl created!");
};

exports.changeHowl = async (req, res, next) => {
    const id = parseInt(req.params.id);

    await pool.query(`UPDATE howls SET caption = $1, updated_at = current_timestamp - interval '4 hours' WHERE id = $2`,
    [req.body.caption, id]);
    
    res.send("Howl updated!");
};

exports.silenceHowl = async (req, res, next) => {
    const id = parseInt(req.params.id);

    await pool.query("DELETE FROM howls WHERE id = $1", [id]);
    
    res.send("Howl deleted");
};