## AQP Subgraph

Subgraph for indexing AQP events on Conflux eSpace networks, using The Graph.

## Overview

This subgraph indexes events from the following smart contracts deployed on Conflux eSpace testnet/Conflux eSpace:

- **AqpRedemption**

## Events

- `Redeemed` events from AqpRedemption contract

### Prerequisites

- Node.js 18+
- Yarn 1.x
- Graph CLI and dependencies (installed via package.json)
- Optional (for deploy to Studio): Graph Studio access token

### Project Structure

```text
aqp-subgraph/
├─ abis/                         # Contract ABIs
│  └─ AqpRedemption.json         # ABI for AqpRedemption contract
├─ src/                          # Event handlers (AssemblyScript)
│  └─ aqp-redemption.ts          # Handles Redeemed / TicketsClaimed events
├─ schema.graphql                # Entity schema definitions
├─ subgraph.mainnet.yaml         # Mainnet manifest (conflux-espace)
└─ subgraph.testnet.yaml         # Testnet manifest (conflux-espace-testnet)
```

### Choosing a Manifest (Mainnet vs Testnet)

This repo includes two manifests:

- `subgraph.testnet.yaml` (default address provided)
- `subgraph.mainnet.yaml` (address placeholder)

You can pass the manifest file explicitly to Graph CLI commands:

```bash
# Codegen
yarn graph codegen subgraph.testnet.yaml

# Build
yarn graph build subgraph.testnet.yaml

# Deploy to Studio (after auth)
yarn graph deploy --studio aqp-subgraph subgraph.testnet.yaml
```

Alternatively, copy the one you want to use to `subgraph.yaml` and run the package scripts:

```bash
cp subgraph.testnet.yaml subgraph.yaml
yarn codegen
yarn build
yarn deploy
```

### Configure Contract Address and Start Block

Update the `source.address` and `source.startBlock` in the chosen manifest before build/deploy:

```yaml
dataSources:
  - kind: ethereum
    name: AqpRedemption
    network: conflux-espace # or conflux-espace-testnet
    source:
      address: "0x..." # set contract address
      abi: AqpRedemption
      startBlock: 0 # set a safe start block
```

If you change the mapping file name, align `mapping.file` with your handler file, e.g. `./src/aqp-redemption.ts`.

### Auth for Studio Deploy

Authenticate once with your Graph Studio access token:

```bash
graph auth --studio <ACCESS_TOKEN>
```

Then deploy using either the package script or explicit command with manifest:

```bash
yarn deploy
# or
graph deploy --studio aqp-subgraph subgraph.testnet.yaml
```

### Local Development (optional)

Requires a local Graph Node and IPFS running.

```bash
# create subgraph in local node
yarn create-local

# deploy to local node
yarn deploy-local

# remove from local node
yarn remove-local
```

### Entities

See `schema.graphql` for full definitions. Example:

```graphql
type Redeemed @entity(immutable: true) {
  id: Bytes!
  user: Bytes!
  amount: BigInt!
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
}
```

### License

GPL-3.0. See `LICENSE`.
