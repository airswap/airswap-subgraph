import {
  AddProtocols,
  AddTokens,
  RemoveProtocols,
  RemoveTokens,
  SetServerURL,
  UnsetServer,
} from '../generated/RegistryContract/RegistryContract'
import { ProtocolServer, Server, TokenServer } from '../generated/schema'

import { store } from '@graphprotocol/graph-ts'

export function handleSetServerURL(event: SetServerURL): void {
  const staker = event.params.staker
  let server = Server.load(staker.toHex())
  if (!server) {
    server = new Server(staker.toHex())
    server.staker = staker
  }
  server.serverURL = event.params.url.toString()
  server.save()
}

export function handleAddProtocols(event: AddProtocols): void {
  const staker = event.params.staker
  const server = Server.load(event.params.staker.toHex())

  if (server) {
    for (let i = 0; i < event.params.protocols.length; i++) {
      const protocol = event.params.protocols[i]
      const protocolServer = new ProtocolServer(
        `${staker.toHex()}-${protocol.toI32()}`
      )
      protocolServer.staker = staker
      protocolServer.serverURL = server.serverURL
      protocolServer.protocolID = protocol
      protocolServer.save()
    }
  }
}

export function handleRemoveProtocols(event: RemoveProtocols): void {
  const staker = event.params.staker

  for (let i = 0; i < event.params.protocols.length; i++) {
    const protocol = event.params.protocols[i]
    store.remove('ProtocolServer', `${staker.toHex()}-${protocol.toI32()}`)
  }
}

export function handleAddTokens(event: AddTokens): void {
  const staker = event.params.staker
  const server = Server.load(event.params.staker.toHex())

  if (server) {
    for (let i = 0; i < event.params.tokens.length; i++) {
      const token = event.params.tokens[i]
      const tokenServer = new TokenServer(`${staker.toHex()}-${token.toHex()}`)
      tokenServer.staker = staker
      tokenServer.serverURL = server.serverURL
      tokenServer.tokenAddress = token
      tokenServer.save()
    }
  }
}

export function handleRemoveTokens(event: RemoveTokens): void {
  const staker = event.params.staker

  for (let i = 0; i < event.params.tokens.length; i++) {
    const token = event.params.tokens[i]
    store.remove('TokenServer', `${staker.toHex()}-${token.toHex()}`)
  }
}

export function handleUnsetServer(event: UnsetServer): void {
  const staker = event.params.staker
  store.remove('Server', staker.toHex())

  for (let i = 0; i < event.params.protocols.length; i++) {
    const protocol = event.params.protocols[i]
    store.remove('ProtocolServer', `${staker.toHex()}-${protocol.toI32()}`)
  }

  for (let i = 0; i < event.params.tokens.length; i++) {
    const token = event.params.tokens[i]
    store.remove('TokenServer', `${staker.toHex()}-${token.toHex()}`)
  }
}
