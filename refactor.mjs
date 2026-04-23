import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');

const dirs = ['sections', 'layout', 'windows', 'animations', 'ui'];
dirs.forEach(d => {
  const dirPath = path.join(componentsDir, d);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

const fileDestinations = {
  'About.tsx': 'sections',
  'Contact.tsx': 'sections',
  'Education.tsx': 'sections',
  'Home.tsx': 'sections',
  'Projects.tsx': 'sections',
  'Skills.tsx': 'sections',
  'Stats.tsx': 'sections',
  'Navbar.tsx': 'layout',
  'Navbar.css': 'layout',
  'HomeDock.tsx': 'layout',
  'MacMenuBar.tsx': 'layout',
  'MacTerminal.tsx': 'windows',
  'TerminalWindow.tsx': 'windows',
  'VSCodeWindow.tsx': 'windows',
  'AboutTerminal.tsx': 'windows',
  'MacStartup.tsx': 'animations',
  'GSAPScrollSync.tsx': 'animations',
  'InteractiveDots.tsx': 'animations',
  'Others1.tsx': 'animations',
  'Badges.tsx': 'ui',
};

// Build a map of CURRENT absolute paths to NEW absolute paths
const moveMap = new Map();

for (const [file, dir] of Object.entries(fileDestinations)) {
  const currentPath = path.join(componentsDir, file);
  const newPath = path.join(componentsDir, dir, file);
  if (fs.existsSync(currentPath)) {
    moveMap.set(currentPath, newPath);
  }
}

// Handle VariableProximity.tsx specifically
const vpCurrent = path.join(srcDir, 'VariableProximity.tsx');
const vpNew = path.join(componentsDir, 'ui', 'VariableProximity.tsx');
if (fs.existsSync(vpCurrent)) {
  moveMap.set(vpCurrent, vpNew);
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.css')) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const allFiles = getAllFiles(srcDir);

// First pass: update imports in all files
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // We need to match `import ... from "..."`, `import "..."`, `export ... from "..."`
  const importRegex = /(?:import|export)\s+(?:[^'"]+\s+from\s+)?['"]([^'"]+)['"]/g;
  
  content = content.replace(importRegex, (match, importPath) => {
    if (importPath.startsWith('.')) {
      // Resolve the relative path based on the current location of the file
      let targetCurrentAbsolute = path.resolve(path.dirname(file), importPath);
      
      // Because imports might omit extensions like .tsx, .ts, or point to a directory with index.ts
      // We must determine the actual file it points to.
      let actualTargetFile = targetCurrentAbsolute;
      
      // Try to find the exact file if extension is missing
      const extensions = ['.tsx', '.ts', '.css', '/index.tsx', '/index.ts'];
      let found = false;
      if (fs.existsSync(targetCurrentAbsolute) && !fs.statSync(targetCurrentAbsolute).isDirectory()) {
          found = true;
      } else {
          for (const ext of extensions) {
              if (fs.existsSync(targetCurrentAbsolute + ext)) {
                  actualTargetFile = targetCurrentAbsolute + ext;
                  found = true;
                  break;
              }
          }
      }

      // If we still can't find it, maybe it's not a local file or something we care about
      if (!found) {
        return match;
      }

      // Where is this target moving to?
      const targetNewAbsolute = moveMap.get(actualTargetFile) || actualTargetFile;

      // Where is the CURRENT file moving to?
      const fileNewAbsolute = moveMap.get(file) || file;

      // Convert targetNewAbsolute to `@/` path
      // e.g. D:\...\src\components\sections\Home.tsx -> @/components/sections/Home
      let relativeToSrc = path.relative(srcDir, targetNewAbsolute).replace(/\\/g, '/');
      
      // Remove extension for TS/TSX, but keep for CSS
      if (relativeToSrc.endsWith('.tsx') || relativeToSrc.endsWith('.ts')) {
          relativeToSrc = relativeToSrc.replace(/\.tsx?$/, '');
      }

      const newImportPath = `@/${relativeToSrc}`;
      
      // Reconstruct the match
      return match.replace(importPath, newImportPath);
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated imports in ${file}`);
  }
});

// Second pass: actually move the files
for (const [currentPath, newPath] of moveMap.entries()) {
  if (fs.existsSync(currentPath)) {
    fs.renameSync(currentPath, newPath);
    console.log(`Moved ${currentPath} to ${newPath}`);
  }
}

console.log('Refactoring complete!');
