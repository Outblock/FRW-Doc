# 🧾 Cadence

**Testnet Address:** 0x1b655847a90e644a

### Check Child Account

```swift
import LinkedAccounts from 0xChildAccount

      pub fun main(address: Address): [Address] {
        // Init return variable
        let addresses: [Address] = []
        // Get the AuthAccount of the specified Address
        let account: AuthAccount = getAuthAccount(address)
        // Get a reference to the account's Collection if it exists at the standard path
        if let collectionRef = account.borrow<&LinkedAccounts.Collection>(
          from: LinkedAccounts.CollectionStoragePath
        ) {
          // Append any child account addresses to the return value
          addresses.appendAll(
           collectionRef.getLinkedAccountAddresses()
          )
        }
        // Return the final array, inclusive of specified Address
        return addresses
      }
```

### Check Child Account Metadata

```swift
        import NonFungibleToken from 0xNonFungibleToken
      import MetadataViews from 0xMetadataViews
      import LinkedAccountMetadataViews from 0xChildAccount
      import LinkedAccounts from 0xChildAccount
      
      pub struct LinkedAccountData {
          pub let address: Address
          pub let name: String
          pub let description: String
          pub let creationTimestamp: UFix64
          pub let thumbnail: AnyStruct{MetadataViews.File}
          pub let externalURL: MetadataViews.ExternalURL
      
          init(
              address: Address,
              accountInfo: LinkedAccountMetadataViews.AccountInfo
          ) {
              self.address = address
              self.name = accountInfo.name
              self.description = accountInfo.description
              self.creationTimestamp = accountInfo.creationTimestamp
              self.thumbnail = accountInfo.thumbnail
              self.externalURL = accountInfo.externalURL
          }
      }
      
      /// Returns a mapping of metadata about linked accounts indexed on the account's Address
      ///
      /// @param address: The main account to query against
      ///
      /// @return A mapping of metadata about all the given account's linked accounts, indexed on each linked account's address
      ///
      pub fun main(address: Address): {Address: LinkedAccountData} {
          let linkedAccountData: {Address: LinkedAccountData} = {}
      
          // Get reference to LinkedAccounts.Collection if it exists
          if let collectionRef = getAccount(address).getCapability<&LinkedAccounts.Collection{LinkedAccounts.CollectionPublic, MetadataViews.ResolverCollection}>(
                  LinkedAccounts.CollectionPublicPath
              ).borrow() {
              let addressToID: {Address: UInt64}  = collectionRef.getAddressToID()
              // Iterate over each linked account in LinkedAccounts.Collection
              for linkedAccountAddress in addressToID.keys {
                  let accountInfo: LinkedAccountMetadataViews.AccountInfo = (collectionRef.borrowViewResolver(
                          id: addressToID[linkedAccountAddress]!
                      ).resolveView(
                          Type<LinkedAccountMetadataViews.AccountInfo>()
                      ) as! LinkedAccountMetadataViews.AccountInfo?)!
                  // Insert the linked account's metadata in each child account indexing on the account's address
                  linkedAccountData.insert(
                      key: linkedAccountAddress,
                      LinkedAccountData(
                          address: linkedAccountAddress,
                          accountInfo: accountInfo
                      )
                  )
              }
          }
          return linkedAccountData 
      }
```

### Check Child Account NFT

```swift
import NonFungibleToken from 0xNonFungibleToken
      import MetadataViews from 0xMetadataViews
      import LinkedAccounts from 0xChildAccount

      /// Custom struct to make interpretation of NFT & Collection data easy client side
      pub struct NFTData {
          pub let name: String
          pub let description: String
          pub let thumbnail: String
          pub let resourceID: UInt64
          pub let ownerAddress: Address?
          pub let collectionName: String?
          pub let collectionDescription: String?
          pub let collectionURL: String?
          pub let collectionStoragePathIdentifier: String
          pub let collectionPublicPathIdentifier: String?

          init(
              name: String,
              description: String,
              thumbnail: String,
              resourceID: UInt64,
              ownerAddress: Address?,
              collectionName: String?,
              collectionDescription: String?,
              collectionURL: String?,
              collectionStoragePathIdentifier: String,
              collectionPublicPathIdentifier: String?
          ) {
              self.name = name
              self.description = description
              self.thumbnail = thumbnail
              self.resourceID = resourceID
              self.ownerAddress = ownerAddress
              self.collectionName = collectionName
              self.collectionDescription = collectionDescription
              self.collectionURL = collectionURL
              self.collectionStoragePathIdentifier = collectionStoragePathIdentifier
              self.collectionPublicPathIdentifier = collectionPublicPathIdentifier
          }
      }

      /// Helper function that retrieves data about all publicly accessible NFTs in an account
      ///
      pub fun getAllViewsFromAddress(_ address: Address): [NFTData] {
          // Get the account
          let account: AuthAccount = getAuthAccount(address)
          // Init for return value
          let data: [NFTData] = []
          // Assign the types we'll need
          let collectionType: Type = Type<@{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>()
          let displayType: Type = Type<MetadataViews.Display>()
          let collectionDisplayType: Type = Type<MetadataViews.NFTCollectionDisplay>()
          let collectionDataType: Type = Type<MetadataViews.NFTCollectionData>()

          // Iterate over each public path
          account.forEachStored(fun (path: StoragePath, type: Type): Bool {
              // Check if it's a Collection we're interested in, if so, get a reference
              if type.isSubtype(of: collectionType) {
                  if let collectionRef = account.borrow<&{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(from: path) {
                      // Iterate over the Collection's NFTs, continuing if the NFT resolves the views we want
                      for id in collectionRef.getIDs() {
                          let resolverRef: &{MetadataViews.Resolver} = collectionRef.borrowViewResolver(id: id)
                          if let display = resolverRef.resolveView(displayType) as! MetadataViews.Display? {
                              let collectionDisplay = resolverRef.resolveView(collectionDisplayType) as! MetadataViews.NFTCollectionDisplay?
                              let collectionData = resolverRef.resolveView(collectionDataType) as! MetadataViews.NFTCollectionData?
                              // Build our NFTData struct from the metadata
                              let nftData = NFTData(
                                  name: display.name,
                                  description: display.description,
                                  thumbnail: display.thumbnail.uri(),
                                  resourceID: resolverRef.uuid,
                                  ownerAddress: resolverRef.owner?.address,
                                  collectionName: collectionDisplay?.name,
                                  collectionDescription: collectionDisplay?.description,
                                  collectionURL: collectionDisplay?.externalURL?.url,
                                  collectionStoragePathIdentifier: path.toString(),
                                  collectionPublicPathIdentifier: collectionData?.publicPath?.toString()
                              )
                              // Add it to our data
                              data.append(nftData)
                          }
                      }
                  }
              }
              return true
          })
          return data
      }

      /// Script that retrieve data about all publicly accessible NFTs in an account and any of its
      /// child accounts
      ///
      /// Note that this script does not consider accounts with exceptionally large collections 
      /// which would result in memory errors. To compose a script that does cover accounts with
      /// a large number of sub-accounts and/or NFTs within those accounts, see example 5 in
      /// the NFT Catalog's README: https://github.com/dapperlabs/nft-catalog and adapt for use
      /// with LinkedAccounts.Collection
      ///
      pub fun main(address: Address): {Address: [NFTData]} {
          let allNFTData: {Address: [NFTData]} = {}
          
          // Add all retrieved views to the running mapping indexed on address
          allNFTData.insert(key: address, getAllViewsFromAddress(address))
          
          /* Iterate over any child accounts */ 
          //
          // Get reference to LinkedAccounts.Collection if it exists
          if let collectionRef = getAccount(address).getCapability<&LinkedAccounts.Collection{LinkedAccounts.CollectionPublic}>(
                  LinkedAccounts.CollectionPublicPath
              ).borrow() {
              // Iterate over each linked account in LinkedAccounts.Collection
              for childAddress in collectionRef.getLinkedAccountAddresses() {
                  if !allNFTData.containsKey(childAddress) {
                      // Insert the NFT metadata for those NFTs in each child account
                      // indexing on the account's address
                      allNFTData.insert(key: childAddress, getAllViewsFromAddress(childAddress))
                  }
              }
          }
          return allNFTData 
      }
```
