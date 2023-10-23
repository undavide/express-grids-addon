import "@spectrum-web-components/styles/typography.css";

import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";

import "@spectrum-web-components/button/sp-button.js";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  console.log("addOnUISdk is ready for use.");
  const createShapeButton = document.getElementById("createShape");

  // Get the UI runtime.
  const { runtime } = addOnUISdk.instance;
  const scriptApi = await runtime.apiProxy("script");
  scriptApi.log("Script runtime up and running.");

  // Enabling CTA elements only when the addOnUISdk is ready
  createShapeButton.disabled = false;
});
