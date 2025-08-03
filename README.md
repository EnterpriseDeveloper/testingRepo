## Run Locally

Clone the project

```bash
  git clone https://dredsoft-labs-admin@bitbucket.org/dredsoft-labs/ecommerce.git
```

Go to the project directory

```bash
  cd ecommerce
```

Install dependencies

```bash
  npm install

  or

  npm install react-material-ui-carousel --save --legacy-peer-deps
```

Start the server

```bash
  npm start
```

The server should now be running. You can access the application by opening a web browser and entering the following URL:

```bash
  http://localhost:3000
```

### BLOCKCHAIN

## How Network Changes Are Detected

`window.ethereum.on("chainChanged", handler)` is used.

On change, we reinitialize the provider and update the network name state.

### How Wallet State is Synced

`window.ethereum.on("accountsChanged", handler)` listens to wallet switches.

Updates account and resets the connection state when disconnected.

### How UI Syncs with Transactions

Button triggers a dummy transaction.

UI state (status) is updated at each step:

"confirming" → waiting for user approval

"pending" → tx sent, waiting for confirmation

"success" → tx confirmed

"error" → user rejects or tx fails

Let me know if you’d like this integrated with a smart contract (e.g., mint()) or deployed to testnet with real feedback!
