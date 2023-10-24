import addOnScriptSdk from "AddOnScriptSdk";
import { editor } from "express";
import { addColumns, addRows } from "./shapeUtils";

// Get the Authoring Sandbox.
const { runtime } = addOnScriptSdk.instance;

var gridRef = null;

function start() {
  // APIs to be exposed to the UI runtime
  runtime.exposeApi({
    /**
     * Add a grid to the document.
     *
     * @param {Object} options - The options for the grid.
     * @param {number} options.columns - The number of columns in the grid.
     * @param {number} options.rows - The number of rows in the grid.
     * @param {number} options.gutter - The size of the gutter between columns and rows.
     * @param {string} options.columnColor - The color of the columns.
     * @param {string} options.rowColor - The color of the rows.
     * @returns {Group} The group containing the grid.
     */
    addGrid({ columns, rows, gutter, columnColor, rowColor }) {
      // Get the document and page.
      const doc = editor.documentRoot;
      const page = doc.pages.first;

      // Create the grid.
      const rowGroup = addRows(rows, gutter, rowColor);
      const columnGroup = addColumns(columns, gutter, columnColor);

      // Create the grid's group.
      const gridGroup = editor.createGroup();
      page.artboards.first.children.append(gridGroup);
      gridGroup.children.append(rowGroup, columnGroup);
      gridGroup.locked = true;

      // Save the grid reference.
      gridRef = gridGroup;
    },

    /**
     * Delete the grid from the document.
     * @returns {void}
     */
    deleteGrid() {
      console.log("deleteGrid", gridRef);
      if (gridRef) {
        try {
          console.log("in here");
          gridRef.removeFromParent();
          gridRef = null;
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("No grid to delete");
      }
    },
  });
}

start();
