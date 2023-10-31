import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/home', async function handler (request, reply) {
  return 'Hello World'
})

// Run the server!
await fastify.listen({ port: 3000 })
