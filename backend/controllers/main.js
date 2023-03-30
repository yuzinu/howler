const pool = require("../db/database.js");

module.exports = {
    
    // If authenticated and is new user, add to users table, then show welcome page. Else, show must log in message
    signedIn: async (req, res) => {
        try {
          if (req.oidc.isAuthenticated()) {
            const username = req.oidc.user.nickname;

            await pool.query('INSERT INTO users (username) VALUES ($1) ON CONFLICT (username) DO NOTHING', [username]);
            
            res.status(200).json({username: username});
          } else {
            res.status(404).send('You must log in to continue');
          }
        } catch (err) {
          res.status(500).send(err);
        }
    },

    // Get all howls for the feed
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

    // Get the howl from the user
    getHowl: async (req, res, next) => {
        try {
            const postID = req.params.id;
            
            const { rows } = await pool.query(`SELECT * FROM howls WHERE id = ${postID}`);

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

    // Create a new howl for the user
    createHowl: async (req, res, next) => {
        try {
            const caption = req.body.caption;
            // const username = req.oidc.user.nickname;

            await pool.query(`INSERT INTO howls (caption, howler_id) SELECT '${caption}', id FROM users WHERE username = 'yuzinu'`);
        
            res.status(200).send("Howl created!");
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Update users howl
    changeHowl: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);

            await pool.query(`UPDATE howls SET caption = $1, updated_at = current_timestamp WHERE id = $2`,
            [req.body.caption, id]);
            
            res.status(200);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Delete users howl
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