import Fastify from 'fastify' // Import de la librairie Fastify
import mysql from '@fastify/mysql'
const fastify = Fastify({ // Création de l'instance Fastify
  logger: true
})

// Connexion à la base de données
fastify.register(mysql, {
  connectionString: 'mysql://fastify:fastify@localhost:3306/fastify' // mysql://user:password@host:port/database
})



// Declaration de la route GET /articles
fastify.get('/articles', async (req, res) => {
  await fastify.mysql.query('SELECT * FROM articles', [], (err, result) => {
    if (err) {
      console.error(err);
      return res.code(500);
    }
    return res.send(result).code(200);
  })
})
  
  // Declaration de la route GET /articles/:id
fastify.get('/articles/:id', async (req, res) => {
  const { id } = req.params;
  await fastify.mysql.query('SELECT * FROM articles WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.code(500);
    }
    if (result.length === 0) {
      return res.code(404);
    }
    return res.send(result[0]).code(200);
  })
})

// Declaration de la route POST /articles
fastify.post('/articles', async (req, res) => {
  const { title, content, banner } = req.body

  if (!title || !content) // Vérification des données, si elles sont manquantes, on renvoie un code 400
    return res.code(400)
  
  if (await fastify.mysql.query('SELECT * FROM articles WHERE title = ?', [title], (err, result) => {
    if (err) {
      console.error(err);
      return res.code(500);
    }
    return result.length > 0;
  })) // Vérification que l'article n'existe pas déjà, si c'est le cas, on renvoie un code 409
    return res.code(409)

  await fastify.mysql.query('INSERT INTO articles (title, content, banner) VALUES (?, ?)', [title, content, banner], async (err, result) => {
    if (err) {
      console.error(err);
      return res.code(500);
    }
    await fastify.mysql.query('SELECT * FROM articles WHERE id = ?', [result.insertId], (err, result) => {
      if (err) {
        console.error(err);
        return res.code(500);
      }
      return res.send(result[0]).code(201);
    })
  })
})

// Declaration de la route PUT /articles/:id
fastify.put('/articles/:id', async (req, res) => {
  const { id } = req.params,
    { title, content, banner } = req.body

  if (!title || !content) // Vérification des données, si elles sont manquantes, on renvoie un code 400
    return res.code(400)
  
  if (await fastify.mysql.query('SELECT * FROM articles WHERE title = ? AND id != ?', [title, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.code(500);
    }
    return result.length > 0;
  })) // Vérification que l'article n'existe pas déjà, si c'est le cas, on renvoie un code 409
    return res.code(409)
  
  if (!await fastify.mysql.query('SELECT * FROM articles WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.code(500);
    }
    return result.length > 0;
  })) // Vérification que l'article existe, si ce n'est pas le cas, on renvoie un code 404
    return res.code(404)


  const date = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ') // Formatage de la date pour MySQL
  await fastify.mysql.query('UPDATE articles SET title = ?, content = ?, banner = ?, updated_at = ? WHERE id = ?', [title, content, banner, date, id], async (err, result) => {
    if (err) {
      console.error(err);
      return res.code(500);
    }
    return await fastify.mysql.query('SELECT * FROM articles WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.code(500);
      }
      return res.send(result[0]).code(200);
    })
  })
})

// Declaration de la route DELETE /articles/:id
fastify.delete('/articles/:id', async (req, res) => {
  const { id } = req.params

  if (!await fastify.mysql.query('SELECT * FROM articles WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.code(500);
    }
    return result.length > 0;
  })) // Vérification que l'article existe, si ce n'est pas le cas, on renvoie un code 404
    return res.code(404)

  await fastify.mysql.query('DELETE FROM articles WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.code(500);
    }
    return res.code(204);
  })
})

// Lancement du serveur
await fastify.listen({ port: 3000 })
