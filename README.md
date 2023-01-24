# AirSwap Subgraph

AirSwap subgraph for [The Graph](https://thegraph.com/).


**Subgraph Studio** - https://thegraph.com/explorer/subgraphs/3xdURMor7NCcFs1g1Ff7JjnASQcgDyGsGY3Ba5n8VRDL?view=Overview


# Get Started

## Build Graph

AirSwap is deployed to the following chains. Generate the `subgraph.yaml` manifest files for each chain using the commands below.

**Ethereum**

```
yarn prepare:ethereum
```

**BNB Chain**

```
yarn prepare:bnb
```

**Avalanche**

```
yarn prepare:avalanche
```

**Polygon**

```
yarn prepare:polygon
```
## Authorize, Generate and Deploy Code

After generating the subgraph.yaml file, authorize graph cli.
### Auth 

```
graph auth --studio <deploy-key>
```


```
graph codegen
```


### Build

```
graph build

```

### Deploy
```
graph deploy --studio airswap-v3
```

## Subgraph Documentation

<!-- AirSwap v3 Documentation can be found here -> https://hackmd.io/@6Vt_l5I0TP6t3O_awqTYkA/ryKJ5FIss -->


**Test 1**

**AST Daily Snapshots**

- [x] AstDailySnapshot Transactions
- Get the total daily AST transfer for Jan 18th, 2023, datetime is converted to unix timestamp.

**Query**
```
{
  astDailySnapshots(where: {date: 1674000000}) {
    dailyTotalTransfer
    date
    id
  }
}
```

**Result**
```
{
  "data": {
    "astDailySnapshots": [
      {
        "dailyTotalTransfer": "9001570161",
        "date": 1674000000,
        "id": "19375"
      }
    ]
  }
}
```

**Test 2**

**Daily Swap Volumes**

- [x] Daily Swap Volume Transactions
- Get the total daily Swap volume for Jan 18th, 2023, datetime is converted to unix timestamp.

**Query**
```
{
  dailySwapVolumes(where: {date: 1674000000}) {
    amount
    date
    id
  }
}
```

**Result**
```
{
  "data": {
    "dailySwapVolumes": [
      {
        "amount": "7158975.8632851712827256757686944",
        "date": 1674000000,
        "id": "19375"
      }
    ]
  }
}
```

**Test 3**

**Daily Fees**

- [x] Daily Fees Transactions
- Get the total daily Swap fees for Jan 18th, 2023, datetime is converted to unix timestamp.

**Query**
```
{
  feePerDays(where: {date: 1674000000}) {
    amount
    date
    id
  }
}
```

**Result**
```
{
  "data": {
    "feePerDays": [
      {
        "amount": "5011.28310429961989790797303808608",
        "date": 1674000000,
        "id": "19375"
      }
    ]
  }
}
```

**Test 4**

**Swap**

- [x] Swap Transactions
- Get the swap transaction for txhash: 0xb1e3fd07c73aaeb0645c97dc291c8bb182d7edec4c8d08aabf8617a98e760a56

- etherscan link: https://etherscan.io/tx/0xb1e3fd07c73aaeb0645c97dc291c8bb182d7edec4c8d08aabf8617a98e760a56

**Query**
```
{
  swaps(
    where: {transactionHash: "0xb1e3fd07c73aaeb0645c97dc291c8bb182d7edec4c8d08aabf8617a98e760a56"}
  ) {
    expiry
    from
    id
    nonce
    protocolFee
    senderAmount
    senderAmountUSD
    senderTokenDecimal
    signerAmount
    signerAmountUSD
    signerTokenDecimal
    signerToken {
      id
    }
    senderToken {
      id
    }
    senderWallet {
      id
    }
    signerTokenPrice
    signerWallet {
      id
    }
    timestamp
    to
    transactionHash
    value
    swap {
      id
    }
  }
}
```

**Result**
```
{
  "data": {
    "swaps": [
      {
        "expiry": "1674105011",
        "from": "0x81dbbf2878e69d7c7ea3d832c6adb804141ce42b",
        "id": "0x111bb8c3542f2b92fb41b8d913c01d37884311111674104980",
        "nonce": "1674104980",
        "protocolFee": "7",
        "senderAmount": "468509523291865285",
        "senderAmountUSD": "716.3416909227961834593",
        "senderTokenDecimal": "1000000000000000000",
        "signerAmount": "715925144993538500000",
        "signerAmountUSD": "716.2752323894403403265",
        "signerTokenDecimal": "1000000000000000000",
        "signerToken": {
          "id": "0x6b175474e89094c44da98b954eedeac495271d0f"
        },
        "senderToken": {
          "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        },
        "senderWallet": {
          "id": "0x81dbbf2878e69d7c7ea3d832c6adb804141ce42b"
        },
        "signerTokenPrice": "1000489",
        "signerWallet": {
          "id": "0x111bb8c3542f2b92fb41b8d913c01d3788431111"
        },
        "timestamp": "1674105011",
        "to": "0x522d6f36c95a1b6509a14272c17747bbb582f2a6",
        "transactionHash": "0xb1e3fd07c73aaeb0645c97dc291c8bb182d7edec4c8d08aabf8617a98e760a56",
        "value": "0",
        "swap": {
          "id": "0x522d6f36c95a1b6509a14272c17747bbb582f2a6"
        }
      }
    ]
  }
}
```


**Test 5**

**Users**

- [x] User Balance
- Get user balance and total AST transfer

**Query**
```
{
  users(first: 3) {
    id
    totalTransfers
    tokenBalance
  }
}
```

**Result**
```
{
  "data": {
    "users": [
      {
        "id": "0x0000000000000000000000000000000000000000",
        "totalTransfers": "2",
        "tokenBalance": "-5000000000000"
      },
      {
        "id": "0x000000000000000000000000000000000000dead",
        "totalTransfers": "3",
        "tokenBalance": "5049"
      },
      {
        "id": "0x000000000000006f6502b7f2bbac8c30a3f67e9a",
        "totalTransfers": "527",
        "tokenBalance": "0"
      }
    ]
  }
}
```

- Get the first 3 users with total balance greater than **78000000**

**Query**
```
{
  users(where: {tokenBalance_gt: "78000000"}, first: 3) {
    id
    totalTransfers
    tokenBalance
  }
}
```

**Result**
```
{
  "data": {
    "users": [
      {
        "id": "0x0000e0ca771e21bd00057f54a68c30d400000000",
        "totalTransfers": "1225",
        "tokenBalance": "4672096931"
      },
      {
        "id": "0x002759b2de8bc7442b2d1feb5dc58ea962150a1a",
        "totalTransfers": "5",
        "tokenBalance": "132000000"
      },
      {
        "id": "0x003393d556c24610da1e9d6a3f2e7dbf81f9a635",
        "totalTransfers": "4",
        "tokenBalance": "975084180"
      }
    ]
  }
}
```

