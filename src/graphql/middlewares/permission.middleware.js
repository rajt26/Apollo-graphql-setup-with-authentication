import { rule, shield, not, or, deny, allow, and } from 'graphql-shield'

const isAdmin = rule()(async (parent, args, ctx, info) => {
  console.log(ctx.req.user)
  return ctx.req.user.role === 'ADMIN'
})
const isUser = rule()(async (parent, args, ctx, info) => {
  return ctx.req.user.role === 'USER'
})


const permissions = shield({
  Query: {
    '*': isAdmin,
    'getUsers': allow
  },
  Mutation: {
    '*': isAdmin,
    'login': allow,
    'createUser': allow
  }
})

export default permissions
