import React, { useState } from "react";
import { createActor, iitest_backend } from "../../declarations/iitest_backend";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import ActorContext from "./ActorContext";
import GreetComponent from "./GreetComponent";

function App() {
  const [actor, setActor] = useState(iitest_backend);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginButton = async (event) => {
    event.preventDefault();
    try {
      const authClient = await AuthClient.create();
      await new Promise((resolve) => {
        authClient.login({
          identityProvider: process.env.II_URL,
          onSuccess: resolve,
        });
      });

      const identity = authClient.getIdentity();
      const agent = new HttpAgent({ identity });

      if (process.env.DFX_NETWORK !== "ic") {
        await agent.fetchRootKey().catch((err) => {
          console.warn(
            "Unable to fetch root key. Check to ensure that your local replica is running"
          );
          console.error(err);
        });
      }

      const newActor = createActor(process.env.IITEST_BACKEND_CANISTER_ID, {
        agent,
      });

      setActor(newActor);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.message) console.error("Error message:", error.message);
      if (error.stack) console.error("Error stack:", error.stack);
    }
  };

  return (
    <ActorContext.Provider value={actor}>
      <main>
        <img
          src="/logo2.svg"
          alt="DFINITY logo"
        />
        <br />
        <br />

        {!isAuthenticated ? (
          <button onClick={loginButton}>Log In</button>
        ) : (
          <GreetComponent />
        )}
      </main>
    </ActorContext.Provider>
  );
}

export default App;
