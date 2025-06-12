import {
  AddProtocols,
  AddTokens,
  RemoveProtocols,
  RemoveTokens,
  SetServerURL,
  UnsetServer,
} from '../generated/RegistryContract/RegistryContract'
import { Server } from '../generated/schema'
import { store } from '@graphprotocol/graph-ts'

export function handleSetServerURL(event: SetServerURL): void {
  const staker = event.params.staker
  let server = Server.load(staker)
  if (!server) {
    server = new Server(staker)
    server.protocols = []
    server.tokens = []
  }
  server.url = event.params.url.toString()
  server.save()
}

export function handleAddProtocols(event: AddProtocols): void {
  const staker = event.params.staker
  const protocols = event.params.protocols
  const server = Server.load(staker)
  if (server) {
    const newProtocols = server.protocols
    for (let i = 0; i < protocols.length; i++) {
      newProtocols.push(protocols[i])
    }
    server.protocols = newProtocols
    server.save()
  }
}

export function handleRemoveProtocols(event: RemoveProtocols): void {
  const staker = event.params.staker
  const protocols = event.params.protocols
  const server = Server.load(staker)
  if (server) {
    for (let i = 0; i < protocols.length; i++) {
      for (let j = 0; j < server.protocols.length; j++) {
        if (server.protocols[j] === protocols[i]) {
          server.protocols.splice(j, 1)
        }
      }
    }
    server.save()
  }
}

export function handleAddTokens(event: AddTokens): void {
  const staker = event.params.staker
  const tokens = event.params.tokens
  const server = Server.load(staker)
  if (server) {
    const newTokens = server.tokens
    for (let i = 0; i < tokens.length; i++) {
      newTokens.push(tokens[i])
    }
    server.tokens = newTokens
    server.save()
  }
}

export function handleRemoveTokens(event: RemoveTokens): void {
  const staker = event.params.staker
  const tokens = event.params.tokens
  const server = Server.load(staker)
  if (server) {
    for (let i = 0; i < tokens.length; i++) {
      for (let j = 0; j < server.tokens.length; j++) {
        if (server.tokens[j] === tokens[i]) {
          server.tokens.splice(j, 1)
        }
      }
    }
    server.save()
  }
}

export function handleUnsetServer(event: UnsetServer): void {
  store.remove('Server', event.params.staker.toHex())
}
