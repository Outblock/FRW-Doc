---
description: 🛠️ Guide to Configuring Privy with Flow Wallet (EVM Support)
hidden: true
noIndex: true
---

# Privy

***



#### 📌 Prerequisites

* Registered and logged into the [Privy Dashboard](https://www.privy.io/dashboard)
* Your project has Smart Wallet enabled

***

### 1. Enable Smart Wallet

1. Log into the [Privy Dashboard](https://www.privy.io/dashboard)
2. Open your project page
3. In the left-hand menu, click on `Smart Wallet`
4. Click the `Enable Smart Wallet` button (if not already enabled)

***

### 2. Add Custom EVM Chains (Flow EVM)

Once Smart Wallet is enabled, you can add the Flow mainnet or testnet EVM chain.

#### ✳️ Add Flow EVM Mainnet

1. In the Smart Wallet settings, click `Add New Chain`
2. Fill in the following information:

| Field    | Value                                                                         |
| -------- | ----------------------------------------------------------------------------- |
| Name     | Flow                                                                          |
| Chain ID | 747                                                                           |
| RPC URL  | [https://mainnet.evm.nodes.onflow.org](https://mainnet.evm.nodes.onflow.org/) |

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

***

#### 🧪 Add Flow EVM Testnet

1. Click `Add New Chain` again
2. Enter the following details:

| Field       | Value                                                                         |
| ----------- | ----------------------------------------------------------------------------- |
| Name        | Flow Testnet                                                                  |
| Description | The public RPC URL for Flow Testnet                                           |
| Chain ID    | 545                                                                           |
| RPC URL     | [https://testnet.evm.nodes.onflow.org](https://testnet.evm.nodes.onflow.org/) |

> 💡 The testnet is recommended for development and integration testing.

***

### ✅ Verify the Configuration

After saving, you should see `Flow` and/or `Flow Testnet` listed under your configured chains in Smart Wallet. Privy will automatically assign smart wallet addresses that are compatible with the specified EVM chains.

You can now use Privy’s SDK in your dApp frontend to connect wallets, sign transactions, and interact with contracts on Flow EVM.

***
