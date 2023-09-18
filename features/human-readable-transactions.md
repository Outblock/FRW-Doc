# 📖 Human Readable Transactions

When users are prompted for authorization during a transaction, they are frequently presented with complex and often bewildering information, leading to confusion and increased user friction. This obscurity has unfortunately paved the way for numerous attacks, resulting in significant losses for unsuspecting victims.

On Flow, with interaction templates ([https://developers.flow.com/tooling/fcl-js/interaction-templates](https://developers.flow.com/tooling/fcl-js/interaction-templates)), Cadence developers have a means to declare static metadata about transactions they ask users to sign. This information is vital to understanding the outcome of the request and may include data such as a human-readable title and description.

Interaction template auditors play a crucial role in assessing the accuracy and safety of interaction templates. Flow Reference Wallet harnesses interaction template audits to confidently present users with clear, human-readable transaction titles and descriptions during the authorization process. This approach eliminates the need for users to decipher unintelligible authorization prompts, ensuring they receive and understand important information and can confidently sign and approve.

\
For more on how application developers, Cadence developers and wallets can use Interaction Templates, see: [https://developers.flow.com/tooling/fcl-js/interaction-templates](https://developers.flow.com/tooling/fcl-js/interaction-templates)
