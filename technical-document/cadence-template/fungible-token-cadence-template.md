# 🪙 Fungible Token Cadence Template

### Token List

{% embed url="https://raw.githubusercontent.com/Outblock/Assets/main/ft/ft.json" %}

## Replace Rule

| Keyword              | Replace                            | Example                   |
| -------------------- | ---------------------------------- | ------------------------- |
| \<Token>             | contract\_name                     | FlowToken                 |
| \<TokenAddress>      | address.mainnet or address.testnet | 0x1654653399040a61        |
| \<TokenReceiverPath> | storage\_path.receiver             | /public/flowTokenReceiver |
| \<TokenBalancePath>  | storage\_path.balance              | /public/flowTokenBalance  |
| \<TokenStoragePath>  | storage\_path.vault                | /storage/flowTokenVault   |

## Check Token vault is enabled

```jsx
import FungibleToken from 0xFungibleToken
import <Token> from <TokenAddress>

pub fun main(address: Address) : Bool {
   let receiver: Bool = getAccount(address)
   .getCapability<&<Token>.Vault{FungibleToken.Receiver}>(<TokenReceiverPath>)
   .check()
   let balance: Bool = getAccount(address)
    .getCapability<&<Token>.Vault{FungibleToken.Balance}>(<TokenBalancePath>)
    .check()
    return receiver && balance
 }
```

#### Example

```jsx
import FungibleToken from 0xf233dcee88fe0abe
import FUSD from 0x3c5959b568896393

        pub fun main(address: Address) : Bool {
            let receiver: Bool = getAccount(address)
                .getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)
                .check()
            let balance: Bool = getAccount(address)
                .getCapability<&FUSD.Vault{FungibleToken.Balance}>(/public/fusdBalance)
                .check()
            return receiver && balance
        }
```

## Enable Token Vault

```jsx
import FungibleToken from 0xFungibleToken
import <Token> from <TokenAddress>

transaction {

  prepare(signer: AuthAccount) {

    if(signer.borrow<&<Token>.Vault>(from: <TokenStoragePath>) != nil) {
      return
    }
    
    signer.save(<-<Token>.createEmptyVault(), to: <TokenStoragePath>)

    signer.link<&<Token>.Vault{FungibleToken.Receiver}>(
      <TokenReceiverPath>,
      target: <TokenStoragePath>
    )

    signer.link<&<Token>.Vault{FungibleToken.Balance}>(
      <TokenBalancePath>,
      target: <TokenStoragePath>
    )
  }
}
```

#### Example

```jsx
import FungibleToken from 0xf233dcee88fe0abe
import FUSD from 0x3c5959b568896393

transaction {

  prepare(signer: AuthAccount) {

    // It's OK if the account already has a Vault, but we don't want to replace it
    if(signer.borrow<&FUSD.Vault>(from: /storage/fusdVault) != nil) {
      return
    }
    
    // Create a new FUSD Vault and put it in storage
    signer.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

    // Create a public capability to the Vault that only exposes
    // the deposit function through the Receiver interface
    signer.link<&FUSD.Vault{FungibleToken.Receiver}>(
      /public/fusdReceiver,
      target: /storage/fusdVault
    )

    // Create a public capability to the Vault that only exposes
    // the balance field through the Balance interface
    signer.link<&FUSD.Vault{FungibleToken.Balance}>(
      /public/fusdBalance,
      target: /storage/fusdVault
    )
  }
}
```

## Get Token Balance

```jsx
import FungibleToken from 0xFungibleToken
    import <Token> from <TokenAddress>

    pub fun main(address: Address): UFix64 {
      let account = getAccount(address)

      let vaultRef = account
        .getCapability(<TokenBalancePath>)
        .borrow<&<Token>.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance capability")

      return vaultRef.balance
 }
```

#### Example

```jsx
import FungibleToken from 0xf233dcee88fe0abe
import FUSD from 0x3c5959b568896393

pub fun main(address: Address): UFix64 {
  let account = getAccount(address)

  let vaultRef = account
    .getCapability(/public/fusdBalance)
    .borrow<&FUSD.Vault{FungibleToken.Balance}>()
    ?? panic("Could not borrow Balance capability")

  return vaultRef.balance
}
```

## Transfer Token

```jsx
import FungibleToken from 0xFungibleToken
import <Token> from <TokenAddress>

transaction(amount: UFix64, recipient: Address) {

  // The Vault resource that holds the tokens that are being transfered
  let sentVault: @FungibleToken.Vault

  prepare(signer: AuthAccount) {
    // Get a reference to the signer's stored vault
    let vaultRef = signer.borrow<&<Token>.Vault>(from: <TokenStoragePath>)
      ?? panic("Could not borrow reference to the owner's Vault!")

    // Withdraw tokens from the signer's stored vault
    self.sentVault <- vaultRef.withdraw(amount: amount)
  }

  execute {
    // Get the recipient's public account object
    let recipientAccount = getAccount(recipient)

    // Get a reference to the recipient's Receiver
    let receiverRef = recipientAccount.getCapability(<TokenReceiverPath>)!
      .borrow<&{FungibleToken.Receiver}>()
      ?? panic("Could not borrow receiver reference to the recipient's Vault")

    // Deposit the withdrawn tokens in the recipient's receiver
    receiverRef.deposit(from: <-self.sentVault)
  }
}
```

#### Example

```jsx
import FungibleToken from 0xf233dcee88fe0abe
import FUSD from 0x3c5959b568896393

// Testnet
// import FungibleToken from 0x9a0766d93b6608b7
// import FUSD from 0xe223d8a629e49c68

transaction(amount: UFix64, recipient: Address) {

  // The Vault resource that holds the tokens that are being transfered
  let sentVault: @FungibleToken.Vault

  prepare(signer: AuthAccount) {
    // Get a reference to the signer's stored vault
    let vaultRef = signer.borrow<&FUSD.Vault>(from: /storage/fusdVault)
      ?? panic("Could not borrow reference to the owner's Vault!")

    // Withdraw tokens from the signer's stored vault
    self.sentVault <- vaultRef.withdraw(amount: amount)
  }

  execute {
    // Get the recipient's public account object
    let recipientAccount = getAccount(recipient)

    // Get a reference to the recipient's Receiver
    let receiverRef = recipientAccount.getCapability(/public/fusdReceiver)!
      .borrow<&{FungibleToken.Receiver}>()
      ?? panic("Could not borrow receiver reference to the recipient's Vault")

    // Deposit the withdrawn tokens in the recipient's receiver
    receiverRef.deposit(from: <-self.sentVault)
  }
}
```
