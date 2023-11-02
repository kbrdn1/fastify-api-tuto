import Fastify from 'fastify' // Import de la librairie Fastify
const fastify = Fastify({ // Création de l'instance Fastify
  logger: true
})

// Declaration de la route
fastify.get('/home', async (request, reply) => {
  return 'Hello World'
})

// Lancement du serveur
await fastify.listen({ port: 3000 })
