# 📱 Mobile Wallet Restore Guide

Welcome to the Flow  mobile Wallet Account Restoration Guide! This resource will help you seamlessly restore your account using various backup methods. Whether you need to recover your wallet from a device backup, utilize a multi-backup, or access your account using raw keys, we've got you covered.

<figure><img src="../.gitbook/assets/Screenshot_20241004-123407.png" alt="" width="188"><figcaption></figcaption></figure>

### From Device Backup

When you have already logged into an account on another mobile device and want to import the same account on your current device, you can use the device backup feature. Here’s how:

**Step 1:** On your current device, select **‘From Device Backup’**.

<figure><img src="../.gitbook/assets/Screenshot_20241004-124810.png" alt="" width="188"><figcaption></figcaption></figure>

**Step 2:** On the other phone, open the Flow Wallet app and use the scan feature located in the top right corner to scan the QR code.

<figure><img src="../.gitbook/assets/Screenshot_20241004-130025.png" alt="" width="375"><figcaption></figcaption></figure>

**Step 3:** On the other phone, click' **Approve**' in  **Connect for Flow Core**.

<figure><img src="../.gitbook/assets/Screenshot_20241004-1254502.png" alt="" width="188"><figcaption></figcaption></figure>

**Step 4:** Click **‘Next’** on your current device.

**Step 5:** Finally, on the other phone, click '**Hold to Sync'.**

<figure><img src="../.gitbook/assets/Screenshot_20241004-1255202.png" alt="" width="188"><figcaption></figcaption></figure>

This will complete the device backup process, allowing you to access your account on your current device.

### From Multi Backup

A multi-backup stores multiple partial-weight keys across your accounts on trusted providers like Google Drive and iCloud(only in IOS), or a Recovery Phrase.

Two partial-weight keys must be used together to recover access to your account. Each key individually cannot be used. This means, that to recover access to your account, Flow Wallet requires access to two of your backups.

If you previously backed up your account using the multi-backup method \[[multi-backup link](broken-reference)], you can restore your account using the following steps:

**Step 1:** On your current device, select **‘From Multi- Backup’**.

**Step 2:** Select at least two types of backup options to restore your wallet.

<figure><img src="../.gitbook/assets/IMG_7134 (1).jpg" alt="" width="188"><figcaption></figcaption></figure>

**Step 3:** If you choose google drive backup, follow the prompts to restore wallet in Google Drive.&#x20;

<figure><img src="../.gitbook/assets/IMG_7142.png" alt="" width="188"><figcaption></figcaption></figure>

**Step 4:** Verify your existing PIN to proceed with the Google drive restore process.

<figure><img src="../.gitbook/assets/IMG_7143.png" alt="" width="188"><figcaption></figcaption></figure>

**Step 5:** Restore a backup in iCloud by following the on-screen instructions.

<figure><img src="../.gitbook/assets/IMG_7144.png" alt="" width="188"><figcaption></figcaption></figure>

**Step 6:**  Verify your existing PIN to proceed with the iCloud restore process.

**Step 7:** Input your 15 words seed phrase.

<figure><img src="../.gitbook/assets/IMG_7145.png" alt="" width="188"><figcaption></figcaption></figure>

**Step 8:** Choose the profile match with above recovery phrase.

<figure><img src="../.gitbook/assets/IMG_7147.png" alt="" width="188"><figcaption></figcaption></figure>

This will complete the multi-backup process, allowing you to access your account on your current device.

### From Raw Key

The Flow Wallet Mobile version allows users to import profile from the Flow Wallet extension as well as various external accounts. In the section below, we will explain how to use Google Drive, full access mnemonic phrases, keystore files, and private keys to import your profiles seamlessly.

<figure><img src="../.gitbook/assets/Screenshot_20241004-152652.png" alt="" width="188"><figcaption></figcaption></figure>

#### Google Drive(if create Backup in web extension)

Restore a backup in Google drive by following the on-screen instructions.

<figure><img src="../.gitbook/assets/screen-20241004-152739 [MConverter.eu].webp" alt="" width="240"><figcaption></figcaption></figure>

#### 12 word Seed Phrase

Enter your 12-word seed phrase in the correct order.

If you have a specific derivation path or passphrase, make sure to enter it as needed.

Once you’ve entered your seed phrase (and passphrase if applicable), you should have access to your wallet and funds.

<figure><img src="../.gitbook/assets/Screenshot_20241004-152832.png" alt="" width="188"><figcaption></figcaption></figure>

#### Keystore (for Blocto users)

Copy and past your Blocto keystore json data in the correct order.

Enter your password and ensure that the password is entered correctly (it is case-sensitive).

<figure><img src="../.gitbook/assets/Screenshot_20241004-152845.png" alt="" width="188"><figcaption></figcaption></figure>

#### Private key

Copy and past your private key in the correct order.

<figure><img src="../.gitbook/assets/Screenshot_20241004-152855.png" alt="" width="188"><figcaption></figcaption></figure>

### Support

If you encounter any issues or have further questions, please reach out to our support team at support@flow.com.
