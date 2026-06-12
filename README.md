# Anime-episode (mockup)

This is a small mockup project for an anime aggregator UI that links to official streaming for episodes, story arcs, and highlight scenes.

Quick preview (serve from the `anime-episode` folder):

```bash
# from workspace root
cd "anime-episode"
# start a simple server
python3 -m http.server 8000
# open http://localhost:8000/
```

Files created:

- [anime-episode/index.html](anime-episode/index.html)
- [anime-episode/src/app.js](anime-episode/src/app.js)
- [anime-episode/data/anime.json](anime-episode/data/anime.json)

Notes:
- This is a static mockup using Tailwind CDN and vanilla JS.
- Deep links in `data/anime.json` are example placeholders; replace with real platform deep-links (Bilibili, Netflix, iQIYI) as available.
