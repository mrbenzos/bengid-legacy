import os
import re

directories = ['src/app', 'src/components']
SKIP = ['Navbar.tsx']

DARK_BG = re.compile(
    r'(?<![\w-])(?:hover:)?bg-(?:\[#(?:165b33|124b2a|25D366|0369a1|0c2f1a|0a1120|075985)\]'
    r'|slate-[89]\d\d|black|gradient'
    r'|(?:emerald|green|blue|sky|rose|red|amber|orange|indigo|purple|teal|yellow)-[5-9]00)'
)

BG_MAP = [
    (r'from-black/50', 'from-white/30'),
    (r'via-\[#0a0a0a\]/70', 'via-[#f1f3f2]/50'),
    (r'to-\[#0a0a0a\]', 'to-[#f1f3f2]'),
    (r'bg-black/70', 'bg-white/70'),
    (r'bg-black/90', 'bg-white/90'),
    (r'border-white/10', 'border-slate-200'),
    (r'hover:bg-\[#1a1a1a\]', 'hover:bg-slate-100'),
    (r'hover:bg-\[#0a0a0a\]', 'hover:bg-slate-50'),
    (r'(?<![\w/-])bg-\[#0a0a0a\]/', 'bg-white/'),
    (r'(?<![\w/-])bg-\[#1a1a1a\]/', 'bg-slate-100/'),
    (r'(?<![\w/-])bg-\[#0a0a0a\]', 'bg-white'),
    (r'(?<![\w/-])bg-\[#111111\]', 'bg-slate-50'),
    (r'(?<![\w/-])bg-\[#1a1a1a\]', 'bg-slate-100'),
    (r'border-slate-800', 'border-slate-200'),
    (r'from-white via-slate-200 to-\[#86efac\]', 'from-[#165b33] to-[#22c55e]'),
]

TEXT_MAP = [
    (r'(?<![\w:-])text-white(?![\w/-])', 'text-slate-900'),
    (r'hover:text-white', 'hover:text-slate-900'),
    (r'text-slate-300', 'text-slate-600'),
    (r'text-slate-400', 'text-slate-500'),
]


def convert(content):
    out = []
    for line in content.split('\n'):
        has_dark = bool(DARK_BG.search(line))
        for old, new in BG_MAP:
            line = re.sub(old, new, line)
        if not has_dark:
            for old, new in TEXT_MAP:
                line = re.sub(old, new, line)
        out.append(line)
    return '\n'.join(out)


def main():
    for directory in directories:
        for root, _, files in os.walk(directory):
            for f in files:
                if not f.endswith('.tsx') or f in SKIP:
                    continue
                p = os.path.join(root, f)
                with open(p, 'r', encoding='utf-8', newline='') as fh:
                    c = fh.read()
                n = convert(c)
                if n != c:
                    with open(p, 'w', encoding='utf-8', newline='') as fh:
                        fh.write(n)
                    print('Updated', p)
    print('Light theme applied.')


if __name__ == '__main__':
    main()
