---
description: Integrate with Web3js
---

# Web3js

### Connet wallet

```javascript
// Some code
import Web3 from 'web3';

const WalletConnect = () => {

    // connect wallet
    const connectWallet = async () => {
        // init web3 
        const web3 = new Web3(window.ethereum);
        // connect wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
  
        const chainId = await web3.eth.getChainId();
        const balance = await web3.eth.getBalance(accounts[0]);
    
      };
  
  return (
     <div>
       <button onClick={connectWallet}>Connect Wallet</button>
     <div/>
  )
}
```





See more detail on [https://github.com/Outblock/web3js-flow-evm-demo](https://github.com/Outblock/web3js-flow-evm-demo)







See more detail on [https://github.com/Outblock/web3js-flow-evm-demo](https://github.com/Outblock/web3js-flow-evm-demo)
