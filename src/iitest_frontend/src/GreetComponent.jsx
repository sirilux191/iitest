import React, { useState, useContext } from "react";
import ActorContext from "./ActorContext";

function GreetComponent() {
  const [greeting, setGreeting] = useState("");
  const actor = useContext(ActorContext);

  async function handleGreet(event) {
    event.preventDefault();
    try {
      console.log("Calling greet");
      const greeting = await actor.greet();
      console.log("Received greeting:", greeting);
      setGreeting(greeting);
    } catch (error) {
      console.error("Error calling greet:", error);
      if (error.message) console.error("Error message:", error.message);
      if (error.stack) console.error("Error stack:", error.stack);
    }
  }

  return (
    <div>
      <button onClick={handleGreet}>Greet</button>
      <section id="greeting">{greeting}</section>
    </div>
  );
}

export default GreetComponent;
