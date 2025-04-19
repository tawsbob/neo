#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Constants
const COMPONENTS_DIR = path.join(process.cwd(), 'src/components');
const COMPONENT_TEMPLATE = `"use client";
import { styler } from "@/utils/html-class";
import styles from "./{component-name}.module.scss";

const c = styler(styles);

function {ComponentName}() {
  return (
    <div className={c("container")}>
      {ComponentName} Component
    </div>
  );
}

export default {ComponentName};
`;

const STYLE_TEMPLATE = `.container {
  // Component styles go here
}`;

// Helper functions
const createComponentDir = (componentPath, componentName) => {
  if (!fs.existsSync(componentPath)) {
    fs.mkdirSync(componentPath, { recursive: true });
    console.log(`Created directory: ${componentPath}`);
  }
  
  // Create index.js
  const indexContent = COMPONENT_TEMPLATE
    .replace(/{ComponentName}/g, componentName)
    .replace(/{component-name}/g, componentName.toLowerCase());
  
  fs.writeFileSync(path.join(componentPath, 'index.js'), indexContent);
  console.log(`Created: ${path.join(componentPath, 'index.js')}`);
  
  // Create SCSS module
  fs.writeFileSync(
    path.join(componentPath, `${componentName.toLowerCase()}.module.scss`), 
    STYLE_TEMPLATE
  );
  console.log(`Created: ${path.join(componentPath, `${componentName.toLowerCase()}.module.scss`)}`);
};

// Get component directories
const getComponentDirs = () => {
  try {
    console.log(`Looking for components in: ${COMPONENTS_DIR}`);
    return fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  } catch (error) {
    console.error(`Error reading components directory: ${error.message}`);
    console.error(`Components path: ${COMPONENTS_DIR}`);
    process.exit(1);
  }
};

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main process
const main = async () => {
  try {
    // List component directories
    const componentDirs = getComponentDirs();
    
    console.log('\nAvailable component directories:');
    componentDirs.forEach((dir, index) => {
      console.log(`${index + 1}. ${dir}`);
    });
    
    // Prompt for directory selection
    const dirIndexPromise = new Promise(resolve => {
      rl.question('\nSelect directory number for your component: ', answer => {
        const index = parseInt(answer) - 1;
        if (isNaN(index) || index < 0 || index >= componentDirs.length) {
          console.error('Invalid selection');
          process.exit(1);
        }
        resolve(componentDirs[index]);
      });
    });
    
    const selectedDir = await dirIndexPromise;
    
    // Prompt for component name
    const componentNamePromise = new Promise(resolve => {
      rl.question('\nEnter component name (PascalCase): ', name => {
        if (!name || !/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
          console.error('Invalid component name. Use PascalCase (e.g., MyComponent)');
          process.exit(1);
        }
        resolve(name);
      });
    });
    
    const componentName = await componentNamePromise;
    
    // Create component folder
    const componentPath = path.join(COMPONENTS_DIR, selectedDir, componentName);
    createComponentDir(componentPath, componentName);
    
    console.log(`\nComponent ${componentName} created successfully in ${selectedDir}`);
    rl.close();
    
  } catch (error) {
    console.error('Error creating component:', error);
    rl.close();
    process.exit(1);
  }
};

main(); 