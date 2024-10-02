# AirSwap Subgraph

Latest is deployed at [7ruo9nxQ3LUqnKkbLgmETDQ27j6A2DFx5L5eV6MS2TAz](https://thegraph.com/explorer/subgraphs/7ruo9nxQ3LUqnKkbLgmETDQ27j6A2DFx5L5eV6MS2TAz?view=Query&chain=arbitrum-one)

**Quick Start**

1. `yarn configure 1` – configure subgraph.yaml for specified chainId
2. `yarn codegen` – generates classes for all smart contracts and events
3. `yarn build` – compile the mappings to wasm for deployment
4. `yarn deploy` – deploy to the subgraph studio for indexing

Follow the official [quick start](https://thegraph.com/docs/en/cookbook/quick-start/) to develop, build, and deploy the subgraph.

**Pricing**
We use the [Messari Price Oracle](https://github.com/messari/subgraphs/tree/master/subgraphs/_reference_/src/prices) for asset pricing.