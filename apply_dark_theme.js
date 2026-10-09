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

    // Backgrounds
    content = content.replace(/bg-white/g, 'bg-[#0B0F19]');
    content = content.replace(/bg-slate-50/g, 'bg-[#0B0F19]');
    content = content.replace(/bg-\[\#fafbfc\]/g, 'bg-[#0B0F19]');
    content = content.replace(/bg-\[\#f4f8ee\]/g, 'bg-[#0B0F19]');
    content = content.replace(/bg-\[\#f0f9ff\]/g, 'bg-[#0B0F19]');
    content = content.replace(/bg-amber-50/g, 'bg-[#0B0F19]');
    content = content.replace(/bg-slate-100/g, 'bg-[#151b2b]'); // slightly lighter for cards

    // Text colors
    content = content.replace(/text-slate-900/g, 'text-slate-100');
    content = content.replace(/text-slate-800/g, 'text-slate-200');
    content = content.replace(/text-gray-900/g, 'text-gray-100');
    content = content.replace(/text-gray-800/g, 'text-gray-200');
    content = content.replace(/text-gray-700/g, 'text-gray-300');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});
