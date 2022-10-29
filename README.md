Simulating running user-inputted code on the server by using a service worker to intercept the network calls.

## Getting Started

`npm i` then `npm run dev` to start the dev server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure

This is Nextjs app. It uses [msw](https://www.npmjs.com/package/msw) to set up a service worker that intercepts the network requests made in the client-side [landing page](./pages/index.tsx). The network mocks are initialised in the [`_app.tsx file`](./pages/_app.tsx). The mock service worker is [here](./public/mockServiceWorker.js).

At the moment the code uses an intercepted network request to update the "server-side" code, but that could be done directly by e.g. exposing an `updateServerCode` method from the mock containing module.

The server-side code creates an object to function as a data store. The client-side code specifies a key to extract from that object, and makes a request to the server, which then returns the value for that key to the client.

There is some error handling, but it can still blow up, this is just a quick POC.
