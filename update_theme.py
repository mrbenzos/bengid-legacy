import re

def update_materials():
    with open('src/app/materials/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update CATEGORIES images
    content = content.replace("image: '/images/division-printing-materials.jpg'", "image: '/images/materials-hero.jpg'")
    content = re.sub(
        r"{ name: 'Lamination Films', image: '/images/materials-hero.jpg', desc: 'Thermal & Cold Protective Roll Laminates \(Gloss/Matte\)' },",
        "{ name: 'Lamination Films', image: '/images/printing-shop.jpg', desc: 'Thermal & Cold Protective Roll Laminates (Gloss/Matte)' },",
        content
    )
    content = re.sub(
        r"{ name: 'Stationery & Cutters', image: '/images/materials-hero.jpg', desc: 'Heavy-Duty Cutters, Binding Equipment & Consumables' },",
        "{ name: 'Stationery & Cutters', image: '/images/printing-shop.jpg', desc: 'Heavy-Duty Cutters, Binding Equipment & Consumables' },",
        content
    )

    # Change root background
    content = content.replace('<div className="min-h-screen bg-[#070b14] text-white">', '<div className="min-h-screen bg-white text-slate-900">')
    
    # Change buttons to rounded-full
    content = content.replace('rounded-md flex items-center justify-center', 'rounded-full flex items-center justify-center')
    content = content.replace('px-6 py-3 rounded-md', 'px-6 py-3 rounded-full')
    
    # Search section
    content = content.replace('className="py-8 bg-[#0c1322] border-y border-slate-800"', 'className="py-8 bg-slate-50 border-y border-slate-200"')
    content = content.replace('bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-2xl', 'bg-white rounded-2xl p-6 border border-slate-200 shadow-xl')
    content = content.replace('bg-slate-800/90 px-4 py-3 rounded-xl border border-slate-700', 'bg-white px-4 py-3 rounded-xl border border-slate-200')
    content = content.replace('text-slate-900 outline-none placeholder:text-slate-400"', 'text-slate-900 outline-none placeholder:text-slate-400"')
    content = content.replace('text-white outline-none placeholder:text-slate-400"', 'text-slate-900 outline-none placeholder:text-slate-400"')
    content = content.replace('text-white outline-none cursor-pointer"', 'text-slate-900 outline-none cursor-pointer"')
    content = content.replace('className="bg-slate-900"', '')
    content = content.replace('text-slate-400 hover:text-white', 'text-[#165b33] hover:text-[#114b29]')

    # Categories section
    content = content.replace('className="py-20 bg-[#070b14]"', 'className="py-20 bg-white"')
    content = content.replace('text-[#86efac] uppercase tracking-widest block mb-2">PRODUCT LINEUP', 'text-[#165b33] uppercase tracking-widest block mb-2">PRODUCT LINEUP')
    content = content.replace('text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">Material Categories', 'text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">Material Categories')
    content = content.replace('text-slate-400 text-sm max-w-md mt-4 md:mt-0', 'text-slate-500 text-sm font-medium max-w-md mt-4 md:mt-0')
    content = content.replace('border border-slate-800 hover:border-emerald-500/50 transition-all duration-500 shadow-xl', 'border border-slate-200 hover:border-[#165b33] transition-all duration-500 shadow-md hover:shadow-xl')
    content = content.replace('text-[#86efac] uppercase tracking-widest bg-black/60', 'text-[#165b33] uppercase tracking-widest bg-white/90 text-slate-900')

    # Catalog section
    content = content.replace('className="py-20 bg-[#0b101c] border-t border-slate-800"', 'className="py-20 bg-slate-50 border-t border-slate-200"')
    content = content.replace('text-[#86efac] uppercase tracking-widest block mb-1">AVAILABLE IN KUMASI', 'text-[#165b33] uppercase tracking-widest block mb-1">AVAILABLE IN KUMASI')
    content = content.replace('text-3xl sm:text-4xl font-black text-white uppercase tracking-tight', 'text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight')
    content = content.replace('className="bg-slate-900 rounded-xl h-80 animate-pulse border border-slate-800 p-4"', 'className="bg-slate-200 rounded-xl h-80 animate-pulse border border-slate-300 p-4"')

    with open('src/app/materials/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

def update_imports():
    with open('src/app/general-importations/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Images
    content = content.replace("image: '/images/division-general-imports.jpg'", "image: '/images/imports-hero.jpg'")
    content = content.replace("image: '/images/hero-port.jpg'", "image: '/images/tema_port_cargo_1790734627946.jpg'")
    content = content.replace("image: '/images/division-car-sales.jpg'", "image: '/images/automobiles-hero.jpg'")
    content = re.sub(
        r"{ name: 'Construction & Structural Supplies', image: '/images/imports-hero.jpg'",
        "{ name: 'Construction & Structural Supplies', image: '/images/tema_port_cargo_1790734627946.jpg'",
        content
    )

    # Root background
    content = content.replace('<div className="min-h-screen bg-[#070b14] text-white">', '<div className="min-h-screen bg-white">')
    
    # Buttons
    content = content.replace('rounded-md flex items-center justify-center', 'rounded-full flex items-center justify-center')
    content = content.replace('rounded-md bg-[#165b33]', 'rounded-full bg-[#165b33]')

    # Categories section
    content = content.replace('className="py-24 bg-[#0a0f1a]"', 'className="py-24 bg-white"')
    content = content.replace('text-[#86efac] uppercase tracking-widest block mb-2">IMPORT SECTORS', 'text-[#165b33] uppercase tracking-widest block mb-2">IMPORT SECTORS')
    content = content.replace('text-3xl sm:text-5xl font-black text-white tracking-tight uppercase', 'text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase')
    content = content.replace('text-slate-400 text-sm max-w-md mt-4 lg:mt-0', 'text-slate-500 text-sm font-medium max-w-md mt-4 lg:mt-0')
    
    # Category cards
    content = content.replace('bg-[#111827] rounded-3xl p-8 border border-slate-800', 'bg-white shadow-xl rounded-3xl p-8 border border-slate-100')
    content = content.replace('text-xl font-black text-white mb-3', 'text-xl font-black text-slate-900 mb-3')
    content = content.replace('text-sm text-slate-400 font-medium', 'text-sm text-slate-500 font-medium')
    content = content.replace('bg-[#1f2937]', 'bg-slate-100')
    
    # Process section
    content = content.replace('className="py-20 bg-[#070b14] border-t border-slate-800"', 'className="py-20 bg-slate-50 border-t border-slate-200"')
    content = content.replace('text-[#86efac] uppercase tracking-widest block mb-2">THE PROCESS', 'text-[#165b33] uppercase tracking-widest block mb-2">THE PROCESS')
    content = content.replace('text-3xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4', 'text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4')
    content = content.replace('text-slate-400 text-sm max-w-2xl mx-auto', 'text-slate-600 font-medium text-sm max-w-2xl mx-auto')

    content = content.replace('bg-slate-900/50 border border-slate-800', 'bg-white border border-slate-200 shadow-md')
    content = content.replace('bg-slate-800 flex', 'bg-slate-100 flex')
    content = content.replace('text-white font-black', 'text-slate-900 font-black')
    content = content.replace('text-slate-300 font-medium', 'text-slate-600 font-medium')
    content = content.replace('text-xl font-bold text-white mb-2', 'text-xl font-bold text-slate-900 mb-2')
    content = content.replace('text-slate-400 text-sm', 'text-slate-500 text-sm')

    # Quick Quote section
    content = content.replace('className="py-20 bg-[#0a0f1a] border-t border-slate-800 relative overflow-hidden"', 'className="py-20 bg-[#165b33] text-white relative overflow-hidden"')
    content = content.replace('text-[#86efac] uppercase tracking-widest block mb-2">REQUEST A QUOTE', 'text-[#86efac] uppercase tracking-widest block mb-2">REQUEST A QUOTE')
    content = content.replace('text-3xl sm:text-4xl font-black text-white tracking-tight', 'text-3xl sm:text-4xl font-black text-white tracking-tight')
    content = content.replace('bg-[#111827] border border-slate-800', 'bg-white text-slate-900 shadow-2xl')
    
    # Form fields inside quote section
    content = content.replace('text-sm font-bold text-slate-300 mb-2', 'text-sm font-bold text-slate-700 mb-2')
    content = content.replace('bg-slate-900/50 border border-slate-700 text-white', 'bg-slate-50 border border-slate-200 text-slate-900')
    content = content.replace('text-slate-400', 'text-slate-500')
    
    with open('src/app/general-importations/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    update_materials()
    update_imports()
