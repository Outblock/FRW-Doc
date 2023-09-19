# 📖 Human Readable Transactions

Flow Reference Wallet supports human-readable transactions during transaction authorization.\
\
**Background**\
\
When users are prompted for authorization during a transaction, they are frequently presented with complex and often bewildering information, leading to confusion and increased user friction. This obscurity has unfortunately paved the way for numerous attacks, resulting in significant losses for unsuspecting victims.

On Flow, with [Interaction Templates](https://developers.flow.com/tooling/fcl-js/interaction-templates), Cadence developers have a means to declare static metadata about transactions they ask users to sign. This information is vital to understanding the outcome of the request and often includes data such as an internationalized human-readable title and description of the transaction.

Interaction template auditors play a crucial role in assessing the accuracy and safety of interaction templates. Auditors are entities in the Flow ecosystem that review Interaction Templates for correctness and safety. Flow Reference Wallet harnesses interaction template audits to confidently present users with clear, human-readable transaction titles and descriptions during the authorization process.\
\
**Conclusion**\
\
Interaction templates and audits eliminate the need for users to decipher unintelligible authorization prompts, ensuring they receive and understand important information and can confidently sign and approve.\
\
Flow Foundation believes that by increasing the number of human-readable transactions on Flow through the usage of interaction templates and audits, we can further increase the adoption of Web3 and Flow.\
\
For more on how application developers, Cadence developers and wallets can use Interaction Templates, see: [https://developers.flow.com/tooling/fcl-js/interaction-templates](https://developers.flow.com/tooling/fcl-js/interaction-templates)
