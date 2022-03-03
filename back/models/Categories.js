const db = require('../utils/database')

module.exports = {

    async browse() {
      try {
        conn = await db.getConnection();

        sql = 'SELECT * FROM Categories'

        const rows = await conn.query(sql);

        return rows;
      } catch (err) {
        throw err;
      }
    },

    async read(id) {
        try {
          conn = await db.getConnection();
          sql = "SELECT * FROM Categories WHERE id = ?";
          const row = await conn.query(sql, [id] );
          console.log(row)
          return row;
        } catch (err) {
          throw err;
        }
      },

      async edit(id , data) {
        try {
          conn = await db.getConnection();
          const row = conn.query('UPDATE Categories SET ? WHERE id = ? ', [data , id])

        return row
      } catch (err) {
            throw err
        }
    },


      async add(data) {
          try {
            conn = await db.getConnection();
            const row = conn.query('INSERT INTO Categories SET ?', data)

          return row
        } catch (err) {
              throw err
          }
      },

      async delete(id) {

        try {
            conn = await db.getConnection();
            sql = "SELECT * FROM Categories WHERE id = ?";
            const row = await conn.query(sql, [id] );
            //conn.end();
            console.log(row)
            if(row.length > 0) {
                console.log("ok")
                let del = conn.query('DELETE FROM Categories WHERE id = ?', [id])
                if(del) {
                    return {
                        "status" : "success",
                        "message" : "Categorie supprimée avec succes"
                    }
                } else {
                    return {
                        "status" : "error",
                        "message" : "Une erreur s'est produite"
                    }
                }
            } else {
                return {
                    "status" : "error",
                    "message" : "ID incorrect"
                }
            }
            //return row;
          } catch (err) {
            throw err;
          }
      }
    
  

  };
