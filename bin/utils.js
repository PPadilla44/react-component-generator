const fs = require("fs");

function createComponent(componentName, isJavaScript = false) {
  const dir = `./${componentName}`;
  const fileStart = `${dir}/${componentName}`;

  const fileEnd = isJavaScript ? ".jsx" : ".tsx";

  try {
    createFolder(dir);
    createFile(fileStart, fileEnd, componentName);
    createFile(`${dir}/index`, ".js", componentName);
    createFile(fileStart, ".module.css");
    createFile(fileStart, `.spec${fileEnd}`);
  } catch (err) {
    console.error(err);
  }
}

function createFolder(dir) {
  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log("Directory is created.");
  });
}

function createFile(fileStart, extension, componentName = "Test") {
  const path = `${fileStart}${extension}`;
  fs.open(path, "wx", function (err, file) {
    if (err) throw err;
    if (extension === ".js") {
      createDefaultExportFile(path, componentName);
    }
    if (extension === ".jsx" || extension === ".tsx") {
      createReactFile(path, componentName);
    }
  });
}

function createReactFile(path, componentName) {
  const content = `import React from "react";

const ${componentName} = () => {
  return <div>${componentName}</div>;
};

export default ${componentName};`;

  fs.writeFile(path, content, function (err) {
    if (err) throw err;
  });
}

function createDefaultExportFile(path, componentName) {
  const content = `export { default } from "./${componentName}";`;

  fs.writeFile(path, content, function (err) {
    if (err) throw err;
  });
}

function showHelp(usage) {
  console.log(usage);
  console.log("\nOptions:\r");
  console.log(
    "\t--version\t      " + "Show version number." + "\t\t" + "[boolean]\r"
  );
  console.log("\t--help\t\t      " + "Show help." + "\t\t\t" + "[boolean]\n");
}

module.exports = { createComponent, showHelp };
