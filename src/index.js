const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for graphql'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => 'This is my API',
    feed: () => links,
    link: (root, args) => {
      const link = links.find(link => link.id === args.id)
      return link
    },
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      const link = links.find(link => link.id === args.id)
      if (args.url)
        link.url = args.url
      if (args.description)
        link.description = args.description
      return link
    },
    deleteLink: (root, args) => {
      const link = links.indexOf(links.find(link => link.id === args.id))
      links.splice(link, 1)
      return links
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})
server.start(() => console.log(`Server is running on http://localhost:4000`))