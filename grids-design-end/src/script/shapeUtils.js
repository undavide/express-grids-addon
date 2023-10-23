import { editor, utils, Constants } from "express";

/**
 * Convert a hex color string to an instance of the Color class
 * Private utility of the shapeUtils module.
 *
 * @param {string} hex - The hex color value to convert.
 * @returns {Color} A color instance with RGB values in the (0..1) range.
 */
const hexToColor = (hex) => {
  // Ensure the hex value doesn't have a "#" at the beginning
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  // Extract red, green, and blue hex values
  const redHex = hex.slice(0, 2);
  const greenHex = hex.slice(2, 4);
  const blueHex = hex.slice(4, 6);

  // Convert hex values to decimal values
  const red = parseInt(redHex, 16) / 255;
  const green = parseInt(greenHex, 16) / 255;
  const blue = parseInt(blueHex, 16) / 255;

  return utils.createColor(red, green, blue);
};

/**
 * Create a rectangle with the specified width, height, and color.
 * Private utility of the shapeUtils module.
 *
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @param {string} color - The color of the rectangle in hex format.
 * @returns {RectangleNode} The created rectangle.
 */
const createRect = (width, height, color) => {
  const rect = editor.createRectangle();
  rect.width = width;
  rect.height = height;
  const rectangleFill = editor.createColorFill(hexToColor(color));
  rect.fills.append(rectangleFill);
  return rect;
};

/**
 * Add rows of rectangles to the document.
 *
 * @param {number} rowsNumber - The number of rows to add.
 * @param {number} gutter - The size of the gutter between rows.
 * @param {string} color - The color of the rows in hex format.
 * @returns {GroupNode} A group containing the created rows.
 */
const addRows = (rowsNumber, gutter, color) => {
  const doc = editor.documentRoot;
  const page = doc.pages.first;

  var rows = [];
  const rowHeight = (page.height - (rowsNumber + 1) * gutter) / rowsNumber;
  // Create the rectangles
  for (let i = 0; i < rowsNumber; i++) {
    let r = createRect(page.width, rowHeight, color);
    r.translateY = gutter + (gutter + rowHeight) * i;
    rows.push(r);
  }
  // Append the rectangles to the document
  rows.forEach((row) => page.artboards.first.children.append(row));
  // Create the group
  const rowsGroup = editor.createGroup();
  // Append the group to the document
  page.artboards.first.children.append(rowsGroup);
  // Populate the group with the rectangles
  rowsGroup.children.append(...rows);
  // Edit the group's properties
  rowsGroup.blendMode = Constants.BlendModeValue.multiply;
  rowsGroup.locked = true;
  return rowsGroup;
};

/**
 * Add columns of rectangles to the document.
 *
 * @param {number} columsNumber - The number of columns to add.
 * @param {number} gutter - The size of the gutter between columns.
 * @param {string} color - The color of the columns in hex format.
 * @returns {GroupNode} A group containing the created columns.
 */
const addColumns = (columsNumber, gutter, color) => {
  const doc = editor.documentRoot;
  const page = doc.pages.first;
  var cols = [];
  const colWidth = (page.width - (columsNumber + 1) * gutter) / columsNumber;
  // Create the rectangles
  for (let i = 0; i < columsNumber; i++) {
    let r = createRect(colWidth, page.height, color);
    r.translateX = gutter + (gutter + colWidth) * i;
    cols.push(r);
  }
  // Append the rectangles to the document
  cols.forEach((col) => page.artboards.first.children.append(col));
  // Create the group
  const columnsGroup = editor.createGroup();
  // Append the group to the document
  page.artboards.first.children.append(columnsGroup);
  // Populate the group with the rectangles
  columnsGroup.children.append(...cols);
  // Edit the group's properties
  columnsGroup.blendMode = Constants.BlendModeValue.multiply;
  columnsGroup.locked = true;
  return columnsGroup;
};

export { addColumns, addRows };
