# 🧾 Cadence

### Contract Address

| Contract      | Testnet                                                                                    | Mainnet |
| ------------- | ------------------------------------------------------------------------------------------ | ------- |
| HybridCustody | [0x96b15ff6dfde11fe](https://testnet.contractbrowser.com/A.96b15ff6dfde11fe.HybridCustody) | TBD     |
| MetadataViews | [0x631e88ae7f1d7c20](https://testnet.contractbrowser.com/A.631e88ae7f1d7c20.MetadataViews) | TBD     |
|               |                                                                                            |         |

### Useful Links

[https://developers.flow.com/concepts/hybrid-custody](https://developers.flow.com/concepts/hybrid-custody)\
[https://github.com/onflow/hybrid-custody](https://github.com/onflow/hybrid-custody)

### Get Child Account Metadata

```swift
import HybridCustody from 0xHybridCustody
import MetadataViews from 0xMetadataViews

pub fun getChildMetaData(child: Address): AnyStruct {
    let acct = getAuthAccount(child)
    let c = acct.borrow<&HybridCustody.ChildAccount>(from: HybridCustody.ChildStoragePath)
            ?? panic("child account not found")
    
    let d = c.resolveView(Type<MetadataViews.Display>())
    return d
}

pub fun main(parent: Address): {Address: AnyStruct} {
    let acct = getAuthAccount(parent)
    let manager = acct.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
        ?? panic("manager not found")
    var data: {Address: AnyStruct} = {}
    for address in manager.getAddresses() {
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
    return manager.getAddresses()
}
```

### Create Child Account (Multisig)

```swift

    #allowAccountLinking

    import FungibleToken from 0x9a0766d93b6608b7
    import FlowToken from 0x7e60df042a9c0868
    import MetadataViews from 0x631e88ae7f1d7c20

    import HybridCustody from 0x96b15ff6dfde11fe
    import CapabilityFactory from 0x96b15ff6dfde11fe
    import CapabilityProxy from 0x96b15ff6dfde11fe
    import CapabilityFilter from 0x96b15ff6dfde11fe

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
            // Create a public key for the proxy account from string value in the provided arg
            // **NOTE:** You may want to specify a different signature algo for your use case
            let key = PublicKey(
                publicKey: pubKey.decodeHex(),
                signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
            )
            // Add the key to the new account
            // **NOTE:** You may want to specify a different hash algo & weight best for your use case
            newAccount.keys.add(
                publicKey: key,
                hashAlgorithm: HashAlgorithm.SHA2_256,
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

            // Create a ChildAccount & link Capabilities
            let ChildAccount <- HybridCustody.createChildAccount(acct: acctCap)
            newAccount.save(<-ChildAccount, to: HybridCustody.ChildStoragePath)
            newAccount
                .link<&HybridCustody.ChildAccount{HybridCustody.BorrowableAccount, HybridCustody.ChildAccountPublic, HybridCustody.ChildAccountPrivate}>(
                    HybridCustody.ChildPrivatePath,
                    target: HybridCustody.ChildStoragePath
                )
            newAccount
                .link<&HybridCustody.ChildAccount{HybridCustody.ChildAccountPublic}>(
                    HybridCustody.ChildPublicPath, 
                    target: HybridCustody.ChildStoragePath
                )

            // Get a reference to the ChildAccount resource
            let child = newAccount.borrow<&HybridCustody.ChildAccount>(from: HybridCustody.ChildStoragePath)!
            let thumbnail = MetadataViews.HTTPFile(url: thumbnailURL)
            let display = MetadataViews.Display(name: name, description: desc, thumbnail: thumbnail)
            child.setDisplay(display)

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
            child.publishToParent(parentAddress: parent.address, factory: factory, filter: filter)

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
            
            // Claim the ProxyAccount Capability
            let inboxName = HybridCustody.getProxyAccountIdentifier(parent.address)
            let cap = parent
                .inbox
                .claim<&HybridCustody.ProxyAccount{HybridCustody.AccountPrivate, HybridCustody.AccountPublic, MetadataViews.Resolver}>(
                    inboxName,
                    provider: newAccount.address
                ) ?? panic("proxy account cap not found")
            
            // Get a reference to the Manager and add the account
            let managerRef = parent.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
                ?? panic("manager no found")
            managerRef.addAccount(cap)

```
