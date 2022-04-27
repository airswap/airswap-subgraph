# Subgraph for airswap v3 protocol

This is the subgraph for airswap V3 Protocol.

The subgraph is going to be updated regularly

# Get Started
### Install dependencies

```
Using Yarn: yarn install
Using NPM: npm install

```
1. Checkout the Schema

2. Generate Code
`graph codegen`

## Build Graph
Airswap V3 is deployed to  the following Chains

1. Mainnet
2. Polygon
3. BSC
4. Avalanche

You can generate the subgraph.yaml manifest files for the following above chains using the commands below

#### Mainnet
`npm run prepare:mainnet`

#### Polygon
`npm run prepare:polygon`

#### Avalanche
`npm run prepare:avalanche`

#### BSC
`npm run prepare:bsc`
### Rinkeby
`npm run prepare:rinkeby`