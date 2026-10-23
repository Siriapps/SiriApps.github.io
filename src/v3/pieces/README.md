# Highlight motion pieces

One file per highlight, each exporting `seek(t, ctx, W, H)` that paints frame t (0 to 6 s) on a 2D canvas,
a pure function of time (no state between frames, no Math.random). Palette: navy #0f1733, white, orange #ff8a3d,
pink #f06ab0, violet #7c5cff, blue #2f5bff, sun #ffd166. Fonts: Gloock for display, Inter for text, DM Mono for labels.
Springs: use `spring(t, k, d)` from ./motion.ts. Each piece is rendered to public/videos/<slug>.mp4 by scripts/render-piece.mjs
and also runs live in the page through the same function.
