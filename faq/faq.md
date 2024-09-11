---
description: Answers to common questions about Flow Wallet
---

# ❓ FAQ

#### Is Flow Wallet a Self-Custody or Custodial Wallet?

Flow Wallet is self-custodial. Users own and control the cryptographic keys securing their Flow accounts and assets.

Chrome extension:

* Secured by a 12-word seed phrase
* Users are responsible for safeguarding their seed phrase
* Loss of seed phrase results in permanent account loss

iOS and Android:

* Utilizes device's Secure Enclave for account security
* No seed phrase required
* Multi-Backup feature available for account recovery
* Create Multi-Backup: Settings > Backup > Create Multi-Backup

#### Where is my Seed Phrase? I can't find it on Flow Wallet iOS or Android.

Flow Wallet on iOS and Android doesn't use seed phrases. Instead, it leverages your device's Secure Enclave for account security. To ensure account recovery:

1. Create a Multi-Backup
2. Navigate to Settings > Backup > Create Multi-Backup

#### What is Multi-Backup?

Multi-Backup is a security feature for Flow Wallet on iOS and Android:

* Creates multiple partial-weight keys (500 weight each)
* Stores keys across selected platforms: iCloud, Google Drive, or Seed Phrase
* Works in conjunction with your device's primary account key
* Enables account recovery if you lose access to your device

This is the multi-backup recovery process:

1. Install Flow Wallet on a new device
2. Initiate account recovery
3. Flow Wallet accesses multi-backup providers
4. Retrieves recovery keys
5. Adds new device's Secure Enclave key
6. Restores access to your account

Create a Multi-Backup on Flow Wallet iOS and Android&#x20;

* Navigate to Settings > Backup > Create Multi-Backup
