import "@spectrum-web-components/styles/typography.css";

import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";

import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/button-group/sp-button-group.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/number-field/sp-number-field.js";
import "@spectrum-web-components/slider/sp-slider.js";
import "@spectrum-web-components/swatch/sp-swatch.js";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  console.log("addOnUISdk is ready for use.");

  // Get the Script runtime.
  const { runtime } = addOnUISdk.instance;
  const scriptApi = await runtime.apiProxy("script");

  // Input fields -------------------------------------------

  const rowsInput = document.getElementById("rows");
  const colsInput = document.getElementById("cols");
  const gutterInput = document.getElementById("gutter");

  rowsInput.value = 4;
  colsInput.value = 6;
  gutterInput.value = 10;

  // Color pickers ------------------------------------------

  const colsColorPicker = document.getElementById("colsColorPicker");
  const colsColorSwatch = document.getElementById("colsColorSwatch");
  const rowsColorPicker = document.getElementById("rowsColorPicker");
  const rowsColorSwatch = document.getElementById("rowsColorSwatch");

  colsColorPicker.value = "#ffcccc";
  colsColorSwatch.color = "#ffcccc";
  rowsColorPicker.value = "#ccccff";
  rowsColorSwatch.color = "#ccccff";

  colsColorSwatch.addEventListener("click", function () {
    colsColorPicker.click();
  });
  colsColorPicker.addEventListener("input", function (event) {
    const selectedColor = event.target.value;
    colsColorSwatch.setAttribute("color", selectedColor);
  });

  rowsColorSwatch.addEventListener("click", function () {
    rowsColorPicker.click();
  });
  rowsColorPicker.addEventListener("input", function (event) {
    const selectedColor = event.target.value;
    rowsColorSwatch.setAttribute("color", selectedColor);
  });

  // CTA Buttons --------------------------------------------

  const createGridBtn = document.getElementById("createGrid");
  const deleteGridBtn = document.getElementById("deleteGrid");

  deleteGridBtn.onclick = async (event) => {
    await scriptApi.deleteGrid();
  };

  createGridBtn.onclick = async (event) => {
    await scriptApi.addGrid({
      columns: colsInput.value,
      rows: rowsInput.value,
      gutter: gutterInput.value,
      columnColor: colsColorPicker.value,
      rowColor: rowsColorPicker.value,
    });
  };

  // Only now it is safe to enable the buttons
  createGridBtn.disabled = false;
  deleteGridBtn.disabled = false;
});
