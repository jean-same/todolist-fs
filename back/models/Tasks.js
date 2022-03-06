const db = require('../utils/database')

module.exports = {

    async findAll(order = "ASC") {
      try {
        conn = await db.getConnection();

        sql = 'SELECT `Tasks`.`id` as `id_task`, `Tasks`.`title` , `Tasks`.`completion` , `Tasks`.`status` , `Tasks`.`created_at` , `Cat`.`id` as `id_category`, `Cat`.`name` as `category_name` FROM `Tasks` LEFT JOIN `Categories` AS `Cat` ON `Tasks`.`id_category` = `Cat`.`id` WHERE `Tasks`.`status` = 1 ORDER BY `Tasks`.`created_at` ' + order

        const rows = await conn.query(sql , order);

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

    async findBy(column, value) {
        try {
            conn = await db.getConnection();

            sql = "SELECT * FROM Tasks WHERE " + column + " = ?";
            const row = await conn.query(sql, [value] );
  
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
                        "message" : "Task deleted successfully"
                    }
                } else {
                    return {
                        "status" : "error",
                        "message" : "An error occured"
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
