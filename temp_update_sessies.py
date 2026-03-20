from pathlib import Path
p = Path('data/sessies2026.js')
text = p.read_text(encoding='utf-8')
lines = text.splitlines(True)
out = []
count = 0
for i, line in enumerate(lines):
    out.append(line)
    if 'rechts' in line and '](' in line:
        start = line.find('](')
        end = line.find(')', start + 2)
        if start != -1 and end != -1:
            url = line[start + 2:end]
            next_chunk = ''.join(lines[i+1:i+6])
            if 'plaatje' not in next_chunk:
                indent = ' ' * (len(line) - len(line.lstrip(' ')))
                out.append(f"{indent}plaatje : '{url}',\n")
                count += 1
p.write_text(''.join(out), encoding='utf-8')
print('updated', count)
