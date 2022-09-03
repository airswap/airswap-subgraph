import { User, Token } from "../generated/schema"

export function getUser(userAddress: string): User {
  let user = User.load(userAddress)
  // handle new creation of User if they don't exist
  if (!user) {
    user = new User(userAddress)
    user.authorizeAddress = new Array<string>()
    user.save()
  }
  return user as User
}

export function getToken(tokenAddress: string): Token {
  let token = Token.load(tokenAddress)
  // handle new creation of Token if it doesn't exist
  if (!token) {
    token = new Token(tokenAddress)
    token.isBlacklisted = false
    token.save()
  }
  return token as Token
}