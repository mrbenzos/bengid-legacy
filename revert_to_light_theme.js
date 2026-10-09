const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(directoryPath);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Backgrounds (Reverting back to light)
    content = content.replace(/bg-\[\#0B0F19\]/g, 'bg-white');
    content = content.replace(/bg-\[\#151b2b\]/g, 'bg-slate-50');
    
    // Some specific ones I know I changed in admin layout
    content = content.replace(/bg-blue-900/g, 'bg-[#f1f3f2]');
    content = content.replace(/border-slate-800\/80/g, 'border-slate-200');
    content = content.replace(/border-slate-700/g, 'border-slate-200');
    content = content.replace(/bg-\[\#1a2333\]/g, 'bg-[#ebf0eb]');
    content = content.replace(/focus:border-slate-600/g, 'focus:border-slate-300');

    // Text colors
    content = content.replace(/text-slate-100/g, 'text-slate-900');
    content = content.replace(/text-slate-200/g, 'text-slate-800');
    content = content.replace(/text-gray-100/g, 'text-gray-900');
    content = content.replace(/text-gray-200/g, 'text-gray-800');
    content = content.replace(/text-gray-300/g, 'text-gray-600');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Reverted: ${file}`);
    }
});
