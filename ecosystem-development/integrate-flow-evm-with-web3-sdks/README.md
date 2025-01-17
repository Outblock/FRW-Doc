# 🔌 Integrate Flow EVM with Web3 SDKs

### Detect Flow wallet provider via EIP-6963&#x20;

```javascript
// React code
import React, { useState, useEffect } from 'react';

const WalletConnect = () => {
  const [flowWalletProvider, setFlowWalletProvider] = useState(null)


  const setupEventListeners = () => {
    // detect wallet announcement
    window.addEventListener(
      'eip6963:announceProvider',
      ((event: CustomEvent) => {
        const { info, provider } = event.detail;
        console.log('Wallet announced:', info.name);
        // detect flow wallet with rdns
        if (info.rdns == 'com.flowfoundation.wallet') {
          setFlowWalletProvider(provider)
        }

      }) as EventListener
    );
  }


  useEffect(() => {
    setupEventListeners()
  }, [])
  

  // ...//

}

```





