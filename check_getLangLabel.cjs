const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Hicham\\Desktop\\fast cv builder\\cv-builder-frontend\\src\\components\\cv-templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const fullPath = path.join(dir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    const hasCall = content.includes('getLangLabel');
    // Check if it's imported in the import line:
    const hasImport = new RegExp(/import\s+{[^}]*getLangLabel[^}]*}\s+from/).test(content);

    if (hasCall && !hasImport) {
        console.log(`FILE WITH BUG: ${file} uses getLangLabel but does not import it!`);
        // Find line numbers of usage
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
            if (line.includes('getLangLabel') && !line.includes('import')) {
                console.log(`  Line ${idx + 1}: ${line.trim()}`);
            }
        });
    }
});
console.log('Finished scan.');
