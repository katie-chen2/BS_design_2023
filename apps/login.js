const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'IoT_Platform'
    }
})

module.exports = {

    login_user: (req, res) => {
        console.log("POST: /login-user");

        const { email, password } = req.body;
        if (email == undefined || password == undefined)
            return res.json({ error: 'email or password is undefined' });
        db.select('id','name', 'email')
            .from('user')
            .where({
                email: email,
                password: password
            })
            .then(data => {
                if (data.length)
                    res.json(data[0]);
                else
                    res.json('email or password is incorrect');
            })
    },
    register_user: (req, res) => {
        console.log("POST: /register-user");
        const { name, email, password } = req.body;
        if (name == undefined || email == undefined || password == undefined)
            return res.json({ error: 'name, email or password is undefined' });
        if (!name.length || !email.length || !password.length) {
            res.json('fill all the fields');
        }
        else if(password.length<6 || email.length<6){
            res.json('email or password need to have at least 6 characters');
        }
        else if(email.search("@")==-1){
            res.json('email format incorrect');
        }
         else {
            db("user").insert({
                name: name,
                email: email,
                password: password
            })// catch the error and return error if email already exists
                .then(() => res.json('success'))
                .catch(err => res.json('email already exists'));
        }
    }

};