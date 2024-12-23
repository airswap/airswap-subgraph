// import {
//   AddProtocols,
//   AddTokens,
//   RemoveProtocols,
//   RemoveTokens,
//   SetServerURL,
//   UnsetServer,
// } from '../generated/RegistryContract/RegistryContract'
// import { Server } from '../generated/schema'
// import { store } from '@graphprotocol/graph-ts'

// export function handleTransfer(event: Transfer): void {
//   const staker = event.params.staker
//   let server = Server.load(staker)
//   if (!server) {
//     server = new Server(staker)
//     server.protocols = []
//     server.tokens = []
//   }
//   server.url = event.params.url.toString()
//   server.save()
// }
