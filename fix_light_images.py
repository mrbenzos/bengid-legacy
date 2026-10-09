import re

BASE = 'src/'

def edit(path, subs):
    p = BASE + path
    with open(p, 'r', encoding='utf-8', newline='') as f:
        c = f.read()
    o = c
    for old, new in subs:
        c = c.replace(old, new)
    if c != o:
        with open(p, 'w', encoding='utf-8', newline='') as f:
            f.write(c)
        print('Updated', path)

HERO_LIGHT = [
    ('bg-[#070b14] flex flex-col', 'bg-white flex flex-col'),
    ('from-[#070b14] via-[#070b14]/50 to-black/30', 'from-white via-white/60 to-white/10'),
    ('from-[#070b14]/90 via-[#070b14]/40 to-transparent', 'from-white/90 via-white/50 to-transparent'),
    ('opacity-70 scale-105', 'opacity-60 scale-105'),
    ('bg-slate-900/80 border border-slate-700/60 backdrop-blur-md shadow-2xl', 'bg-white/90 border border-slate-200 backdrop-blur-md shadow-xl'),
    ('bg-black/40 p-5 rounded-xl', 'bg-white/80 p-5 rounded-xl'),
    ('bg-black/60 backdrop-blur-md py-4', 'bg-white/80 backdrop-blur-md py-4'),
    ('text-slate-200 text-sm sm:text-base', 'text-slate-700 text-sm sm:text-base'),
    ('text-[#86efac]', 'text-[#165b33]'),
]

# Image cards: white text over dark photo overlay
CARD = [
    ('opacity-75 group-hover:opacity-95', 'opacity-100'),
    ('from-black via-black/40 to-transparent', 'from-black/85 via-black/30 to-transparent'),
    ('text-2xl font-bold text-slate-900 leading-tight mt-4 group-hover:text-[#165b33] transition-colors',
     'text-2xl font-bold text-white leading-tight mt-4 group-hover:text-[#86efac] transition-colors'),
    ('text-xs text-slate-600 font-medium mt-2 line-clamp-3', 'text-xs text-slate-200 font-medium mt-2 line-clamp-3'),
    ('border-t border-slate-200 pt-4', 'border-t border-white/40 pt-4'),
    ('text-xs font-bold text-slate-900 uppercase tracking-wider">Explore Supplies', 'text-xs font-bold text-white uppercase tracking-wider">Explore Supplies'),
    ('text-xs font-bold text-slate-900 uppercase tracking-wider">Inquire Import', 'text-xs font-bold text-white uppercase tracking-wider">Inquire Import'),
    ('w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-[#165b33] group-hover:text-white transition-colors">\r\n                    <HiArrowRight className="text-lg text-slate-900" />',
     'w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-[#165b33] transition-colors">\r\n                    <HiArrowRight className="text-lg text-white" />'),
    ('w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-[#165b33] group-hover:text-white transition-colors">\r\n                  <HiArrowRight className="text-lg text-slate-900" />',
     'w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-[#165b33] transition-colors">\r\n                  <HiArrowRight className="text-lg text-white" />'),
    ('text-[10px] font-mono font-bold text-[#165b33] uppercase tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-slate-200',
     'text-[10px] font-mono font-bold text-[#165b33] uppercase tracking-widest bg-white/90 backdrop-blur-md px-2.5 py-1 rounded border border-slate-200'),
]

# --- Materials ---
edit('app/materials/page.tsx', CARD + HERO_LIGHT + [
    ("{ name: 'Photo Papers', image: '/images/materials-hero.jpg'", "{ name: 'Photo Papers', image: '/images/categories/photo-papers.jpg'"),
    ("{ name: 'Lamination Films', image: '/images/printing-shop.jpg'", "{ name: 'Lamination Films', image: '/images/categories/lamination-films.jpg'"),
    ("{ name: 'Inks & Toners', image: '/images/materials-hero.jpg'", "{ name: 'Inks & Toners', image: '/images/categories/inks-toners.jpg'"),
    ("{ name: 'Stationery & Cutters', image: '/images/printing-shop.jpg'", "{ name: 'Stationery & Cutters', image: '/images/categories/stationery-cutters.jpg'"),
])

# --- General imports ---
edit('app/general-importations/page.tsx', CARD + HERO_LIGHT + [
    ("{ name: 'Industrial & Heavy Machinery', image: '/images/imports-hero.jpg'", "{ name: 'Industrial & Heavy Machinery', image: '/images/categories/heavy-machinery.jpg'"),
    ("{ name: 'Commercial Electronics & IT', image: '/images/tema_port_cargo_1790734627946.jpg'", "{ name: 'Commercial Electronics & IT', image: '/images/categories/electronics-it.jpg'"),
    ("{ name: 'Construction & Structural Supplies', image: '/images/tema_port_cargo_1790734627946.jpg'", "{ name: 'Construction & Structural Supplies', image: '/images/categories/construction.jpg'"),
    ("{ name: 'Automobile Spare Parts & Tires', image: '/images/automobiles-hero.jpg'", "{ name: 'Automobile Spare Parts & Tires', image: '/images/categories/spare-parts.jpg'"),
    # quote bar + sections
    ('py-12 bg-[#0c1322] border-y', 'py-12 bg-slate-50 border-y'),
    ('bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xl', 'bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl'),
    ('bg-slate-800/80 p-4 rounded-xl border border-slate-700', 'bg-slate-50 p-4 rounded-xl border border-slate-200'),
    ('w-full bg-slate-900 text-white text-sm font-bold p-3 rounded-lg outline-none border border-slate-700', 'w-full bg-white text-slate-900 text-sm font-bold p-3 rounded-lg outline-none border border-slate-200'),
    ('py-20 bg-[#070b14]', 'py-20 bg-white'),
    ('py-20 bg-[#0b101c] border-t', 'py-20 bg-slate-50 border-t'),
    ('bg-slate-900/90 rounded-2xl p-8 border border-slate-200 relative shadow-xl', 'bg-white rounded-2xl p-8 border border-slate-200 relative shadow-sm'),
    ('bg-[#165b33]/20 border border-emerald-500/30', 'bg-[#165b33]/10 border border-emerald-500/30'),
])

# --- Automobiles ---
edit('app/automobiles/page.tsx', [
    ('from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent', 'from-white via-white/30 to-transparent'),
    ("{ name: 'Mercedes-Benz', image: '/images/cars-showroom.jpg' }", "{ name: 'Mercedes-Benz', image: '/images/categories/mercedes.jpg' }"),
    ("{ name: 'Audi', image: '/images/cars-showroom.jpg' }", "{ name: 'Audi', image: '/images/categories/audi.jpg' }"),
    ("{ name: 'BMW', image: '/images/cars-showroom.jpg' }", "{ name: 'BMW', image: '/images/categories/bmw.jpg' }"),
    ("{ name: 'Porsche', image: '/images/cars-showroom.jpg' }", "{ name: 'Porsche', image: '/images/categories/porsche.jpg' }"),
    ('absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500', 'absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-colors duration-500'),
    ('absolute top-6 left-6 text-2xl font-medium text-slate-900 max-w-[120px]', 'absolute top-6 left-6 text-2xl font-medium text-white max-w-[120px]'),
    ('group-hover:bg-blue-400 group-hover:text-slate-900 transition-colors', 'group-hover:bg-blue-400 transition-colors'),
    ('text-lg text-slate-900 group-hover:text-slate-900', 'text-lg text-slate-900 group-hover:text-white'),
])

# --- Footer / cookie banner ---
edit('components/layout/Footer.tsx', [('bg-[#0f1924] text-slate-900', 'bg-slate-50 text-slate-900 border-t border-slate-200')])
edit('components/layout/CookieBanner.tsx', [('bg-[#0f1924] border-t border-slate-700', 'bg-white border-t border-slate-200 shadow-2xl')])
print('done')
