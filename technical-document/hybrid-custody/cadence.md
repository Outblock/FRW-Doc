# 🧾 Cadence

### Contract Address

| Contract      | Testnet                                                                                    | Mainnet |
| ------------- | ------------------------------------------------------------------------------------------ | ------- |
| HybridCustody | [0x294e44e1ec6993c6](https://f.dnz.dev/0x294e44e1ec6993c6/HybridCustody)                   | TBD     |
| MetadataViews | [0x631e88ae7f1d7c20](https://testnet.contractbrowser.com/A.631e88ae7f1d7c20.MetadataViews) | TBD     |
|               |                                                                                            |         |

### Useful Links

[https://developers.flow.com/concepts/hybrid-custody](https://developers.flow.com/concepts/hybrid-custody)\
[https://github.com/onflow/hybrid-custody](https://github.com/onflow/hybrid-custody)

### Get Child Account Metadata (Wallet)

```swift
import HybridCustody from 0x294e44e1ec6993c6
import MetadataViews from 0x631e88ae7f1d7c20

pub fun main(parent: Address): {Address: AnyStruct} {
    let acct = getAuthAccount(parent)
    let m = acct.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
        ?? panic("manager not found")
    var data: {Address: AnyStruct} = {}
    for address in m.getChildAddresses() {
        let c = m.borrowAccount(addr: address) ?? panic("child not found")
        let d = c.resolveView(Type<MetadataViews.Display>())
        data.insert(key: address, d)
    }
    return data
}


```

### Get Child Owned Account  Metadata (dApp)

```swift
import HybridCustody from 0xHybridCustody
import MetadataViews from 0xMetadataViews

pub fun getChildMetaData(child: Address): AnyStruct {
    let acct = getAuthAccount(child)
    let c = acct.borrow<&HybridCustody.OwnedAccount>(from: HybridCustody.OwnedAccountStoragePath)
            ?? panic("child account not found")
    
    let d = c.resolveView(Type<MetadataViews.Display>())
    return d
}

pub fun main(parent: Address): {Address: AnyStruct} {
    let acct = getAuthAccount(parent)
    let manager = acct.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
        ?? panic("manager not found")
    var data: {Address: AnyStruct} = {}
    for address in manager.getChildAddresses() {
        data.insert(key: address, getChildMetaData(child: address))
    }
    return data
}

```

### Get All Child Addresses

```swift
import HybridCustody from 0xHybridCustody

pub fun main(parent: Address): [Address] {
    let acct = getAuthAccount(parent)
    let manager = acct.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
        ?? panic("manager not found")
    return manager.getChildAddresses()
}
```

### Remove Child Account

```swift
import HybridCustody from 0xHybridCustody

transaction(child: Address) {
    prepare (acct: AuthAccount) {
        let manager = acct.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
            ?? panic("manager not found")
        manager.removeChild(addr: child)
    }
}
```

### Edit Child Account

```swift
import HybridCustody from 0xHybridCustody
import MetadataViews from 0xMetadataViews

transaction(childAddress: Address, name: String, description: String, thumbnail: String) {
    prepare(acct: AuthAccount) {
        let m = acct.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
            ?? panic("manager not found")
        
        let d = MetadataViews.Display(
            name: name,
            description: description,
            thumbnail: MetadataViews.HTTPFile(url: thumbnail)
        )

        m.setChildAccountDisplay(address: childAddress, d)
    }
}
```

### Create Child Account (Multisig)

```swift

    #allowAccountLinking

    import FungibleToken from 0x9a0766d93b6608b7
    import FlowToken from 0x7e60df042a9c0868
    import MetadataViews from 0x631e88ae7f1d7c20

    import HybridCustody from 0x294e44e1ec6993c6
    import CapabilityFactory from 0x294e44e1ec6993c6
    import CapabilityDelegator from 0x294e44e1ec6993c6
    import CapabilityFilter from 0x294e44e1ec6993c6

    transaction(
        pubKey: String,
        initialFundingAmt: UFix64,
        factoryAddress: Address,
        filterAddress: Address,
        name: String, 
        desc: String, 
        thumbnailURL: String
    ) {
        prepare(parent: AuthAccount, app: AuthAccount) {
            /* --- Account Creation --- */
            //
            // Create the child account, funding via the signing app account
            let newAccount = AuthAccount(payer: app)
            // Create a public key for the child account from string value in the provided arg
            // **NOTE:** You may want to specify a different signature algo for your use case
            let key = PublicKey(
                publicKey: pubKey.decodeHex(),
                signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
            )
            // Add the key to the new account
            // **NOTE:** You may want to specify a different hash algo & weight best for your use case
            newAccount.keys.add(
                publicKey: key,
                hashAlgorithm: HashAlgorithm.SHA3_256,
                weight: 1000.0
            )
    
            /* --- (Optional) Additional Account Funding --- */
            //
            // Fund the new account if specified
            if initialFundingAmt > 0.0 {
                // Get a vault to fund the new account
                let fundingProvider = app.borrow<&FlowToken.Vault{FungibleToken.Provider}>(
                        from: /storage/flowTokenVault
                    )!
                // Fund the new account with the initialFundingAmount specified
                newAccount.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
                    .borrow()!
                    .deposit(
                        from: <-fundingProvider.withdraw(
                            amount: initialFundingAmt
                        )
                    )
            }
    
            /* Continue with use case specific setup */
            //
            // At this point, the newAccount can further be configured as suitable for
            // use in your dapp (e.g. Setup a Collection, Mint NFT, Configure Vault, etc.)
            // ...
    
            /* --- Link the AuthAccount Capability --- */
            //
            var acctCap = newAccount.linkAccount(HybridCustody.LinkedAccountPrivatePath)
                ?? panic("problem linking account Capability for new account")
    
            // Create a OwnedAccount & link Capabilities
            let ownedAccount <- HybridCustody.createOwnedAccount(acct: acctCap)
            newAccount.save(<-ownedAccount, to: HybridCustody.OwnedAccountStoragePath)
            newAccount
                .link<&HybridCustody.OwnedAccount{HybridCustody.BorrowableAccount, HybridCustody.OwnedAccountPublic, MetadataViews.Resolver}>(
                    HybridCustody.OwnedAccountPrivatePath,
                    target: HybridCustody.OwnedAccountStoragePath
                )
            newAccount
                .link<&HybridCustody.OwnedAccount{HybridCustody.OwnedAccountPublic, MetadataViews.Resolver}>(
                    HybridCustody.OwnedAccountPublicPath, 
                    target: HybridCustody.OwnedAccountStoragePath
                )
    
            // Get a reference to the OwnedAccount resource
            let owned = newAccount.borrow<&HybridCustody.OwnedAccount>(from: HybridCustody.OwnedAccountStoragePath)!

            // Set metadata
            let thumbnail = MetadataViews.HTTPFile(url: thumbnailURL)
            let display = MetadataViews.Display(name: name, description: desc, thumbnail: thumbnail)
            owned.setDisplay(display)
    
            // Get the CapabilityFactory.Manager Capability
            let factory = getAccount(factoryAddress)
                .getCapability<&CapabilityFactory.Manager{CapabilityFactory.Getter}>(
                    CapabilityFactory.PublicPath
                )
            assert(factory.check(), message: "factory address is not configured properly")
    
            // Get the CapabilityFilter.Filter Capability
            let filter = getAccount(filterAddress).getCapability<&{CapabilityFilter.Filter}>(CapabilityFilter.PublicPath)
            assert(filter.check(), message: "capability filter is not configured properly")
    
            // Configure access for the delegatee parent account
            owned.publishToParent(parentAddress: parent.address, factory: factory, filter: filter)
    
            /* --- Add delegation to parent account --- */
            //
            // Configure HybridCustody.Manager if needed
            if parent.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath) == nil {
                let m <- HybridCustody.createManager(filter: filter)
                parent.save(<- m, to: HybridCustody.ManagerStoragePath)
            }
    
            // Link Capabilities
            parent.unlink(HybridCustody.ManagerPublicPath)
            parent.unlink(HybridCustody.ManagerPrivatePath)
            parent.link<&HybridCustody.Manager{HybridCustody.ManagerPrivate, HybridCustody.ManagerPublic}>(
                HybridCustody.ManagerPrivatePath,
                target: HybridCustody.ManagerStoragePath
            )
            parent.link<&HybridCustody.Manager{HybridCustody.ManagerPublic}>(
                HybridCustody.ManagerPublicPath,
                target: HybridCustody.ManagerStoragePath
            )
            
            // Claim the ChildAccount Capability
            let inboxName = HybridCustody.getChildAccountIdentifier(parent.address)
            let cap = parent
                .inbox
                .claim<&HybridCustody.ChildAccount{HybridCustody.AccountPrivate, HybridCustody.AccountPublic, MetadataViews.Resolver}>(
                    inboxName,
                    provider: newAccount.address
                ) ?? panic("child account cap not found")
            
            // Get a reference to the Manager and add the account
            let managerRef = parent.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
                ?? panic("manager no found")
            managerRef.addAccount(cap: cap)
        }
    }

```

### Query accessible NFT collection

```swift
import HybridCustody from 0xHybridCustody
import MetadataViews from 0xMetadataViews
import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken

pub struct CollectionDisplay {
  pub let name: String
  pub let squareImage: MetadataViews.Media

  init(name: String, squareImage: MetadataViews.Media) {
    self.name = name
    self.squareImage = squareImage
  }
}

pub struct NFTCollection {
  pub let id: String
  pub let display: CollectionDisplay?
  pub let idList: [UInt64]

  init(id:String, display: CollectionDisplay?, idList: [UInt64]) {
    self.id = id
    self.display = display
    self.idList = idList
  }
}

pub fun getDisplay(address: Address, path: StoragePath): CollectionDisplay? {
  let account = getAuthAccount(address)
  let resourceType = Type<@AnyResource>()
  let vaultType = Type<@FungibleToken.Vault>()
  let collectionType = Type<@NonFungibleToken.Collection>()
  let metadataViewType = Type<@AnyResource{MetadataViews.ResolverCollection}>()
  var item: CollectionDisplay? =  nil

    if let type = account.type(at: path) {
      let isResource = type.isSubtype(of: resourceType)
      let isNFTCollection = type.isSubtype(of: collectionType)
      let conformedMetadataViews = type.isSubtype(of: metadataViewType)

      var tokenIDs: [UInt64] = []
      if isNFTCollection && conformedMetadataViews {
        if let collectionRef = account.borrow<&{MetadataViews.ResolverCollection, NonFungibleToken.CollectionPublic}>(from: path) {
          tokenIDs = collectionRef.getIDs()

          // TODO: move to a list
          if tokenIDs.length > 0 
          && path != /storage/RaribleNFTCollection 
          && path != /storage/ARTIFACTPackV3Collection
          && path != /storage/ArleeScene {
            let resolver = collectionRef.borrowViewResolver(id: tokenIDs[0]) 
            if let display = MetadataViews.getNFTCollectionDisplay(resolver) {
              item = CollectionDisplay(
                name: display.name,
                squareImage: display.squareImage
              )
            }
          }
        }
      }
    }

  return item
}

pub fun main(parent: Address, childAccount: Address): [NFTCollection] {
    let manager = getAuthAccount(parent).borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath) ?? panic ("manager does not exist")

    // Address -> Collection Type -> ownedNFTs

    let providerType = Type<Capability<&{NonFungibleToken.Provider}>>()
    let collectionType: Type = Type<@{NonFungibleToken.CollectionPublic}>()

    // Iterate through child accounts

    let acct = getAuthAccount(childAccount)
    let foundTypes: [Type] = []
    let nfts: {String: [UInt64]} = {}
    let collectionList: [NFTCollection] = []
    let childAcct = manager.borrowAccount(addr: childAccount) ?? panic("child account not found")
    
    // get all private paths
    acct.forEachPrivate(fun (path: PrivatePath, type: Type): Bool {
        // Check which private paths have NFT Provider AND can be borrowed
        if !type.isSubtype(of: providerType){
            return true
        }
        if let cap = childAcct.getCapability(path: path, type: Type<&{NonFungibleToken.Provider}>()) {
            let providerCap = cap as! Capability<&{NonFungibleToken.Provider}> 

            if !providerCap.check(){
                // if this isn't a provider capability, exit the account iteration function for this path
                return true
            }
            foundTypes.append(cap.borrow<&AnyResource>()!.getType())
        }
        return true
    })

    // iterate storage, check if typeIdsWithProvider contains the typeId, if so, add to nfts
    acct.forEachStored(fun (path: StoragePath, type: Type): Bool {

        if foundTypes == nil {
            return true
        }

        for idx, value in foundTypes {
            let value = foundTypes!

            if value[idx] != type {
                continue
            } else {
                if type.isInstance(collectionType) {
                    continue
                }
                if let collection = acct.borrow<&{NonFungibleToken.CollectionPublic}>(from: path) { 
                    nfts.insert(key: type.identifier, collection.getIDs())
                    collectionList.append(
                      NFTCollection(
                        id: type.identifier,
                        display: getDisplay(address: childAccount, path: path),
                        idList: collection.getIDs()
                      )
                    )
                }
                continue
            }
        }
        return true
    })

    return collectionList
}
```
