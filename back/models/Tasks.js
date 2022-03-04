const db = require('../utils/database')

module.exports = {

    async findAll() {
      try {
        conn = await db.getConnection();

        sql = 'SELECT `Tasks`.`id` as `id_task`, `Tasks`.`title` , `Tasks`.`completion` , `Tasks`.`status` , `Tasks`.`created_at` , `Cat`.`name` as `category_name` FROM `Tasks` LEFT JOIN `Categories` AS `Cat` ON `Tasks`.`id_category` = `Cat`.`id`'

        const rows = await conn.query(sql);

        return rows;
      } catch (err) {
        throw err;
      }
    },

    async find(id) {
        try {
          conn = await db.getConnection();
          sql = "SELECT * FROM Tasks WHERE id = ?";
          const row = await conn.query(sql, [id] );

          return row;
        } catch (err) {
          throw err;
        }
      },

      async update(id , data) {
        try {
          conn = await db.getConnection();
          const row = conn.query('UPDATE Tasks SET ? WHERE id = ? ', [data , id])

        return row
      } catch (err) {
            throw err
        }
     },


      async insert(data) {
          try {
            conn = await db.getConnection();
            const row = conn.query('INSERT INTO Tasks SET ?', data)

          return row
        } catch (err) {
              throw err
          }
      },

      async delete(id) {

        try {
            conn = await db.getConnection();
            sql = "SELECT * FROM Tasks WHERE id = ?";
            const row = await conn.query(sql, [id] );
            //conn.end();
            console.log(row)
            if(row.length > 0) {
                console.log("ok")
                let del = conn.query('DELETE FROM Tasks WHERE id = ?', [id])
                if(del) {
                    return {
                        "status" : "success",
                        "message" : "Tache supprimée avec succes"
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
