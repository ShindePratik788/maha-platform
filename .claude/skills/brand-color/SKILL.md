---
name: brand-color
description: Change the Maha Platform dashboard's accent/brand color by editing the --primary design token in css/base.css. Use when the user says things like "change the brand color", "make the accent teal", "set the primary color to #0d9488", or "re-theme the dashboard".
---

# Change the brand color

Edit one token in one file: `--primary` in the light `:root` block of `css/base.css`. Do not touch any other file or token. See [tokens.md](tokens.md) for the full token list.

## Steps

1. **Read** `css/base.css`, lines 1–31 (the `:root { … }` block), and find the `--primary: <value>;` line. Note its current value. The file has a second `--primary` line in `:root[data-theme="dark"]`; leave that one alone.
2. **Resolve the requested color** to a 6-digit hex, because every token in the file is hex:
   - If the user gave hex (`#0d9488`, `0d9488`, `#0d9`), normalize it to lowercase `#rrggbb`.
   - If the user gave a color name, pick a mid-tone hex that keeps white text readable, for example:

     | Color | Hex |
     |---|---|
     | teal | `#0d9488` |
     | blue | `#2563eb` |
     | green | `#16a34a` |
     | purple | `#7c3aed` |
     | pink | `#db2777` |
     | orange | `#ea580c` |
     | red | `#dc2626` |

   - If the request is ambiguous ("something warmer"), ask the user before editing.
3. **Edit** that one line in the light `:root` block, so it reads `--primary: <new hex>;`. Make the replacement match the full line including its old value, so it can't hit the dark-theme line.
4. **Report** the change as `--primary: <old> → <new>` (css/base.css). Then add one line noting what was left unchanged: `--primary-hover`, `--primary-soft` and the dark-theme `--primary` still have their old values. Offer to update those as well.
   - If the new color is light (for example yellow or lime), also warn that white button text (`--on-primary: #ffffff`) may fall below 4.5:1 contrast.
