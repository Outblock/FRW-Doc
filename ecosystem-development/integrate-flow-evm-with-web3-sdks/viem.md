---
description: Integrate with Viem
---

# Viem

### Connect wallet to Flow EVM

```javascript
// page.tsx

import { createWalletClient, custom, http } from 'viem'
import { flowMainnet, flowTestnet } from 'viem/chains'

const WalletConnect = () => {
    
  // connect wallet function
  const connectWallet = async () => {
    try {
      const client = createWalletClient({
        chain: flowMainnet,
        transport: custom(flowWalletProvider!)
      })

      // request user to connect wallet
      const [address] = await client.getAddresses()
      const chainId = await client.getChainId(); // get chain id

    } catch (err: any) {
      console.log('Connect wallet failed:' + err.message);
    }
  };
  
  return (
      <div>
         <button onClick={connectWallet}>Connect Wallet</button>
      <div/>
  )
}
```



See more detail on [https://github.com/Outblock/viem-flow-evm-demo](https://github.com/Outblock/viem-flow-evm-demo)
