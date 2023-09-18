# 🦺 Account Recovery

Flow Reference Wallet supports account recovery by enabling users to store backups of their account credentials / private keys on their desired cloud storage provider (Google Drive, iCloud). This way, if a user loses access to their device they can restore access to their Flow accounts and assets. This mechanic improves the safety and security of Flow Reference Wallet as a non-custodial wallet on Flow, as users have the ability to perform account recovery in the event they lose access to their device.

{% hint style="info" %}
The following are features not yet available on Flow Reference Wallet. These features are coming soon!
{% endhint %}

Users will be able to use secondary devices to store backup keys for their accounts on Flow managed by Flow Reference Wallet. A user will be able to store a primary key in their day-to-day device, and backup keys across a set of backup devices in case they lose access to their primary device.\
\
Since every user has different security preferences, their desired mechanic for how to perform account recovery will vary. Some users may be comfortable with Flow Reference Wallet maintaining custody of a key or capability that allows a new key to be set on the user’s account in the event the user loses access to one or more of their keys. Other users may prefer a more secure on-chain account recovery mechanism. For example, if a user's account hasn’t executed a transaction for a defined period, or if the user's defined set of friends vote that the user lost access to their account, then a new user-controlled key might be set on the account. Flow Reference Wallet will enable users to recover access to their accounts in ways that work best for them and their security preferences.\
\
Technologies such as multi-party computation, Shamir's secret sharing, and threshold cryptography provide mechanics for distributing a user's secrets across multiple devices and systems, further removing the single point of failure that exists when custodying a user's key on a single device. Flow Reference Wallet will engage with systems such as Torus Network and Lit Protocol to provide ways to gate recovery keys behind cloud storage, social login providers, and across recovery devices should a user choose these options.\
\
Flow Foundation believes that a safe user experience; one that empowers users to enjoy true ownership of their assets through self-custody while remaining safe from the possibility of losing access to a set of their account keys will further propel Flow and Web3 toward greater adoption.
