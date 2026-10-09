import os
import re

directories = ['src/app', 'src/components']

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    for old, new in replacements:
        content = re.sub(old, new, content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

def main():
    # Find all tsx files
    pages = []
    for directory in directories:
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith('.tsx'):
                    pages.append(os.path.join(root, file))

    for page in pages:
        replacements = [
            # Backgrounds
            (r'bg-white', r'bg-[#0a0a0a]'),
            (r'bg-\[\#f1f3f2\]', r'bg-[#0a0a0a]'),
            (r'bg-slate-50', r'bg-[#111111]'),
            (r'bg-\[\#fafbfc\]', r'bg-[#111111]'),
            (r'bg-slate-100', r'bg-[#1a1a1a]'),
            
            # Text colors
            (r'text-slate-900', r'text-white'),
            (r'text-slate-700', r'text-slate-300'),
            (r'text-slate-600', r'text-slate-300'),
            (r'text-slate-500', r'text-slate-400'),
            
            # Borders
            (r'border-slate-200', r'border-slate-800'),
            (r'border-slate-100', r'border-slate-800'),
            (r'border-white/60', r'border-white/10'),
            
            # Specific elements (like backgrounds with opacity that were white)
            (r'bg-white/70', r'bg-black/70'),
            (r'bg-white/90', r'bg-black/90'),
            (r'from-white/30', r'from-black/50'),
            (r'via-\[\#f1f3f2\]/50', r'via-[#0a0a0a]/70'),
            (r'to-\[\#f1f3f2\]', r'to-[#0a0a0a]'),
            
            # Main headings
            (r'text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-\[1\.08\] tracking-tight mb-6 drop-shadow-sm', r'text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight max-w-3xl'),
            (r'text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl', r'text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight max-w-3xl'),
            (r'text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight', r'text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight max-w-3xl'),
            
            # Fix hover states
            (r'hover:bg-\[\#111111\]', r'hover:bg-[#1a1a1a]'),
        ]
        
        replace_in_file(page, replacements)
        
        # Now some specific fixes per page
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fix layout.tsx body bg class
        if 'layout.tsx' in page:
            content = content.replace('bg-[#0a0a0a]', 'bg-[#0a0a0a]')
            content = content.replace('text-white', 'text-white') # ensure text-white on body
        
        # Any other manual tweaks can be done here.
        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)

    print("Theme applied.")

if __name__ == '__main__':
    main()
