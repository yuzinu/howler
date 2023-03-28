const pool = require("../db/database.js");

module.exports = {
    getHowls: async (req, res, next) => {
        try {
            const { rows } = await pool.query('SELECT * FROM howls');
            
            if(!rows) {
                res.status(404).send("No howls found!");
            }else{
                res.status(200).json(rows);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getHowl: async (req, res, next) => {
        try {
            const { rows } = await pool.query(`SELECT * FROM howls WHERE id = ${req.params.id}`);
            
            if(!rows) {
                res.send("No howl found!");
            }else{
                const howl = rows[0];
                res.status(200).json(howl);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },

    createHowl: async (req, res, next) => {
        try {
            await pool.query('INSERT INTO howls (caption) VALUES($1)', [req.body.caption]);
        
            res.status(200).send("Howl created!");
        } catch (err) {
            res.status(500).send(err);
        }
    },

    changeHowl: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);

            await pool.query(`UPDATE howls SET caption = $1, updated_at = current_timestamp - interval '4 hours' WHERE id = $2`,
            [req.body.caption, id]);
            
            res.status(200).send("Howl updated!");
        } catch (err) {
            res.status(500).send(err);
        }
    },

    silenceHowl: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);

            await pool.query("DELETE FROM howls WHERE id = $1", [id]);
            
            res.status(200).send("Howl deleted");
        } catch (err) {
            res.status(500).send(err);
        }
    },
};