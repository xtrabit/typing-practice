const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: process.env.DB_PASSWORD,
  database: 'typing',
  port: '3306'
});


db.connect((err) => {
  if (err) {
    console.log('MYSQL ERROR', err);
  } else {
    console.log('mySQL CONNECTED!');
  }
});

const getStats = async (user, callback) => {
  const table = await checkUserTable(user);
  if (table === null) {
    return callback(null, null);
  }
  db.query('SELECT letter, after, delay, time FROM ' + user, (err, res) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(null, res);
  });
};

const saveStats = async (user, data, callback) => {
  const table = await checkUserTable(user);
  if (table === null) {
    const ctb = await createTable(user);
  }
  let userId = await getUserId(user);
  if (!userId.length) {
    userId = await saveUser(user);
  }
  const values = data.map((item, i) => {
    return '("'
      + item.letter + '", "'
      + item.after + '", "'
      + item.delay + '", "'
      + item.time + '")'
      + (i < item.length - 1 ? ', ' : '');
  });

  db.query(('INSERT INTO ' + user + ' (letter, after, delay, time) VALUES ' + values), (err, res) => {
    if (err) {
      console.log('ERROR saveStats - ', err);
      return callback(err);
    }
    callback(null, res);
  });
};

const createTable = (user) => {
  return new Promise((resolve, reject) => {
    db.query(`CREATE TABLE ${user} (`
      + 'id INTEGER NOT NULL AUTO_INCREMENT,'
      + 'letter CHAR(1) NULL,'
      + 'after CHAR(1) NULL,'
      + 'delay INT NULL,'
      + 'time CHAR(255) NULL,'
      + 'PRIMARY KEY (id));', (err, res) => {
      if (err) {
        console.log('ERROR createTable - ', err);
        return reject(err);
      }
      console.log(res);
      return resolve();
    });
  });
};

const checkUserTable = (user) => {
  return new Promise((resolve, reject) => {
    db.query(('SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema="typing" AND table_name="' + user + '"'), (err, res) => {
      if (err) {
        console.log('ERROR checkUserTable - ', err);
        return reject(err);
      }
      let tbName = res.length ? res[0].TABLE_NAME : null;
      return resolve(tbName);
    });
  });
};

const getUserId = (user) => {
  return new Promise((resolve, reject) => {
    db.query(('SELECT id FROM users WHERE name="' + user + '"'), (err, res) => {
      if (err) {
        console.log('ERROR getUserId - ', err);
        return reject(err);
      }
      return resolve(res);
    });
  });
};

const saveUser = (user) => {
  return new Promise((resolve, reject) => {
    db.query(('INSERT INTO users (name, email, password) VALUES ("' + user + '", "a@b.com", "password")'), (err, res) => {
      if (err) {
        console.log('ERROR getUserId - ', err);
        return reject(err);
      }
      return resolve(res.insertId);
    });
  });
};

module.exports = {
  getStats,
  saveStats
};

