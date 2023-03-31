const pool = require("../db/database.js");

module.exports = {

    // If authenticated and is new user, add to users table, then show welcome page. Else, show must log in message
    signedIn: async (req, res) => {
        try {
            const username = req.body.username;
            const auth0_token = req.body.auth0_token;

            const user = await pool.query('INSERT INTO users (username, auth0_token) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING', [username, auth0_token]);

            console.log(user);

            res.status(200).send('OK');
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Get all howls for the feed
    getHowls: async (req, res) => {
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
    getHowl: async (req, res) => {
        try {
            const howlId = req.params.id;

            const howls = await pool.query(`SELECT * FROM howls WHERE id = ${howlId}`);

            if(!howls.rows) {
                res.send("No howl found!");
            }else{
                const howl = howls.rows[0];

                try {
                  const users = await pool.query('SELECT * FROM users WHERE id=($1)', [howl.howler_id]);
                  const user = users.rows[0];

                  res.status(200).json({
                    id: howl.id,
                    caption: howl.caption,
                    howler: user.username,
                    updated_at: howl.updated_at
                  });
                } catch (err) {
                  res.status(500).send(err);
                }
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Create a new howl for the user
    createHowl: async (req, res) => {
        console.log(req.body);
        try {
            const caption = req.body.caption;
            const auth0_token = req.body.auth0_token;

            await pool.query(
              "INSERT INTO howls (caption, howler_id) SELECT $1, id FROM users WHERE auth0_token = $2",
              [caption, auth0_token]
            );

            res.status(200).send("Howl created!");
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Update users howl
    changeHowl: async (req, res) => {
        try {
            const howlId = req.params.id;

            await pool.query(
              `UPDATE howls SET caption = $1, updated_at = current_timestamp WHERE id = $2`,
              [req.body.caption, howlId]
            );

            res.status(200).send("Howl changed");
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Delete users howl
    silenceHowl: async (req, res) => {
        try {
            const howlId = req.params.id;

            await pool.query("DELETE FROM howls WHERE id = $1", [howlId]);

            res.status(200).send("Howl deleted");
        } catch (err) {
            res.status(500).send(err);
        }
    },
};
