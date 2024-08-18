import Principal "mo:base/Principal";

actor {
  public shared (message) func greet() : async Text {
    return "Hello, " # Principal.toText(message.caller) # "!";
  };
};
