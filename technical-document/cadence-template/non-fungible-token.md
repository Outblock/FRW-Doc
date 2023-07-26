# 🖼 Non-Fungible Token

## NFT List

```jsx
import NFTCatalog from 0x324c34e1c517e4db

pub fun main(): [String] {
    let catalog = NFTCatalog.getCatalog()
    return catalog.keys
}
```

```jsx
import NFTCatalog from 0x324c34e1c517e4db

pub fun main(batch : [UInt64]?): {String : NFTCatalog.NFTCatalogMetadata} {
    if batch == nil {
        return NFTCatalog.getCatalog()
    }
    let catalog = NFTCatalog.getCatalog()
    let catalogIDs = catalog.keys
    var data : {String : NFTCatalog.NFTCatalogMetadata} = {}
    var i = batch![0]
    while i < batch![1] {
        data.insert(key: catalogIDs[i], catalog[catalogIDs[i]]!)
        i = i + 1
    }
    return data
}
```

## Replace Rule

| Keyword                  | Replace                            | Example                        |
| ------------------------ | ---------------------------------- | ------------------------------ |
| \<NFT>                   | contract\_name                     | Topshot                        |
| \<NFTAddress>            | address.mainnet or address.testnet | 0x0b2a3299cc857e29             |
| \<CollectionStoragePath> | path.storage\_path                 | /storage/MomentCollection      |
| \<CollectionPublic>      | path.public\_collection\_name      | /public/MomentCollection       |
| \<CollectionPublicPath>  | path.public\_path                  | TopShot.MomentCollectionPublic |
| \<CollectionPublicType>  | path.public\_type                  |                                |

#### Check NFT Vault

```jsx
import NonFungibleToken from 0xNonFungibleToke
import <NFT> from <NFTAddress>

// This transaction is for transferring and NFT from
// one account to another

pub fun check<NFT>Vault(address: Address) : Bool {
        let account = getAccount(address)

        let vaultRef = account
        .getCapability<&{NonFungibleToken.CollectionPublic}>(<CollectionPublicPath>)
        .check()

        return vaultRef
}
```

#### Enable NFT

```jsx
import NonFungibleToken from 0xNonFungibleToken
import MetadataViews from 0xMetadataViews
import <NFT> from <NFTAddress>

transaction {

  prepare(signer: AuthAccount) {
    if signer.borrow<&<NFT>.Collection>(from: <CollectionStoragePath>) == nil {
      let collection <- Flovatar.createEmptyCollection()
      signer.save(<-collection, to: <CollectionStoragePath>)
    }
    if (signer.getCapability<&<CollectionPublicType>>(<CollectionPublicPath>).borrow() == nil) {
      signer.unlink(<CollectionPublicPath>)
      signer.link<&<CollectionPublicType>>(/public/FlovatarCollection, target: <CollectionStoragePath>)
    }
  }
}
```

```jsx
```

#### Transfer NFT

```swift
import NonFungibleToken from 0xNonFungibleToken
 import <NFT> from <NFTAddress>

      // This transaction is for transferring and NFT from
      // one account to another

      transaction(recipient: Address, withdrawID: UInt64) {

          prepare(signer: AuthAccount) {
              // get the recipients public account object
              let recipient = getAccount(recipient)

              // borrow a reference to the signer's NFT collection
              let collectionRef = signer
                  .borrow<&NonFungibleToken.Collection>(from: <CollectionStoragePath>)
                  ?? panic("Could not borrow a reference to the owner's collection")

              // borrow a public reference to the receivers collection
              let depositRef = recipient
                  .getCapability(<CollectionPublicPath>)
                  .borrow<&{<CollectionPublic>}>()
                  ?? panic("Could not borrow a reference to the receiver's collection")

              // withdraw the NFT from the owner's collection
              let nft <- collectionRef.withdraw(withdrawID: withdrawID)

              // Deposit the NFT in the recipient's collection
              depositRef.deposit(token: <-nft)
          }
      }
```
