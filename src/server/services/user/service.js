'use strict';
class Service {
  constructor(neo4jDriver, uuid) {
    this.driver = neo4jDriver;
    this.uuid = uuid;
  }

  find(params) {
    const session = this.driver.session();
    session.close();
  }

  get(id) {
    const session = this.driver.session();
    session.close();
  }

  create(data) {
    const session = this.driver.session();

    const cypher = 'CREATE (n:User {username : {usernameParam}, ' +
      'email : {emailParam}, password: {passwordParam}, userId : {userIdParam} ' +
      '}) RETURN n';

    const cypherParams = {
      usernameParam: data.username,
      emailParam: data.email,
      passwordParam: data.password,
      userIdParam: this.uuid.v4()
    };

    return session
      .run(cypher, cypherParams)
      .then((r) => {
        // r.records.forEach(rec => console.log(rec._fields));
        const records = r.records.slice();
        session.close();
        return records;
      })
      .catch((e) => console.error(e));
  }

  update() {
    const session = this.driver.session();
    session.close();
  }

  patch() {
    const session = this.driver.session();
    session.close();
  }

  remove() {
    const session = this.driver.session();
    session.close();
  }
}

module.exports = Service;
