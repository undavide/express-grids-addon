import addOnScriptSdk from "AddOnScriptSdk";
const { runtime } = addOnScriptSdk.instance;

function start() {
  runtime.exposeApi({
    log: (...args) => {
      console.log(...args);
    },
    // add other properties will go here...
  });
}

start();
