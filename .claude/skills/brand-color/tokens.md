# Color tokens in css/base.css

The light values are in `:root` (lines 2–31). The dark overrides are in `:root[data-theme="dark"]` (lines 34–57) and redefine every token below.

**`--primary` controls the accent/brand color.** It is used for primary buttons, the active nav link, links, focus rings, chart lines and bars, the brand logo, and the current-plan highlight. This skill edits only the light `--primary`.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--primary` | `#4f46e5` | `#8b93f8` | **Accent / brand color** |
| `--primary-hover` | `#4338ca` | `#a5b4fc` | Hover state for primary buttons |
| `--primary-soft` | `#eef0ff` | `#232846` | Tinted background: active nav item, soft highlights |
| `--on-primary` | `#ffffff` | `#0f1420` | Text and icons on a `--primary` background |
| `--bg` | `#f5f7fb` | `#0f1420` | Page background |
| `--surface` | `#ffffff` | `#171d2b` | Cards, sidebar, topbar |
| `--surface-2` | `#f0f3f9` | `#1f2737` | Table headers, hover rows |
| `--border` | `#e3e8f0` | `#2c3547` | Borders and dividers |
| `--text` | `#1a2233` | `#e6eaf2` | Body text |
| `--text-muted` | `#5a6680` | `#9aa5b8` | Secondary text |
| `--success` / `--success-soft` | `#15803d` / `#e7f7ed` | `#4ade80` / `#16302a` | Status: success |
| `--warning` / `--warning-soft` | `#b45309` / `#fdf3e2` | `#fbbf24` / `#33291a` | Status: warning |
| `--danger` / `--danger-soft` | `#b91c1c` / `#fdeaea` | `#f87171` / `#3a1f26` | Status: danger |
| `--info` / `--info-soft` | `#0369a1` / `#e3f3fb` | `#38bdf8` / `#142d40` | Status: info |
| `--overlay` | `rgba(10,15,25,.5)` | `rgba(0,0,0,.6)` | Modal and drawer backdrop |

These values are a snapshot. Always read `css/base.css` for the current values before editing.
