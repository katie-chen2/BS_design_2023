
const knex = require('knex');
const util = require('../lib/util');
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
  showByType: (req, res) => {
    // check if the user is logged in
    const email = req.body.email;
    const password = req.body.password;
    let user_id = null;
    
    db.select('id', 'email')
        .from('user')
        .where({
            email: email,
            password: password
        })
        .then(data => {
            user_id = data[0].id;
            if (data.length) {
                
                db.select('h_type','c')
                    .from('count')
                    .where({
                        user_id: user_id
                    })
                    .then(data => {
                        // convert the data to the format that the front end needs
                        data = data.map(item => {
                            return {
                                _count: item.c,
                                h_type: item.h_type,
                            }
                        })
                        console.log(data);
                        res.json(data);
                    })
            } else {
                res.json('You Are Not Logged In!');
            }
        })

  }
}
