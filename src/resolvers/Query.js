async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { url_contains: args.filter },
        { descritpion_contains: args.filter },
      ]
    }
    : {}

  const queriedLinks = await context.db.query.links(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    `{ id }`,
  )
  const countSelection = `
    {
      aggregate {
        count
      }
    }
  `

  const linksConnection = await context.db.query.linksConnection({}, countSelection)

  return {
    count: linksConnection.aggregate.count,
    linkIds: queriedLinks.map(link => link.id)
  }
}

module.exports = {
  feed,
}