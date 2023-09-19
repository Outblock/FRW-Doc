# ⛓ Account Linking

Account linking is uniquely supported by Flow's account abstraction, which enables accounts to be linked together to create an association between them.&#x20;

**Purpose**

The purpose of account linking includes improved user onboarding to applications on Flow. Users can sign up for an app via traditional means (email/password, social login, OAuth, etc.), while Flow account creation and key custody are handled behind the scenes by the application. When users become familiar with the concepts of true ownership and asset portability on Flow, they may then create their self-custody Flow account using Flow Reference Wallet. \
\
The application would provide the means to claim the original (“child”) account by linking their new (“parent”) account managed by Flow Reference Wallet and delegating access control. In this way, users can claim custody and gain control of assets stored in the application account for use across the Flow ecosystem.\
\
**Usage**

Flow Reference Wallet supports account linking by automatically detecting when a transaction is attempting to perform account linking, and displaying it to the user using a custom UI. Users can then view and manage their linked accounts directly within Flow Reference Wallet, and remove any links to accounts they no longer want.\
\
For more information on account linking, see: [https://flow.com/account-linking](https://flow.com/account-linking)
