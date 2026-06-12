# Anime-episode 🎬

A modern, dark-themed anime aggregator web application that provides direct deep-links to official streaming platforms. Unlike standard directories, it indexes specific story arcs and iconic highlight scenes, allowing users to jump straight into their favorite moments.

## 🌟 Key Features

* **Highlight Scene Indexing:** Direct deep-links to specific timestamps or episodes on streaming platforms (e.g., Bilibili, Netflix, iQIYI).
* **Smart Search:** Quickly find anime using English titles, Thai titles, or alternate names.
* **Modern UI/UX:** A responsive, dark-mode-first design tailored for entertainment browsing, featuring hover effects and smooth transitions.
* **Language Tags:** Clear indicators for available audio and subtitles (e.g., 🇹🇭 ซับไทย, 🎙️ พากย์ไทย).

## 🛠️ Tech Stack

* **Frontend:** HTML5, Vanilla JavaScript
* **Styling:** Tailwind CSS (via CDN)
* **Data Storage:** Local JSON (`data/anime.json`)

## 📂 Project Structure

\`\`\`text
ANIME-EPISODE/
├── data/
│   └── anime.json      # Database containing all anime details and scene links
├── src/
│   └── app.js          # Core logic, DOM manipulation, and search filtering
├── index.html          # Main application layout and UI structure
└── README.md
\`\`\`

## 🚀 Getting Started

Since this project uses Vanilla JavaScript and a local JSON file, it requires a local web server to run properly (to avoid CORS policy issues when fetching the JSON data).

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/kenpooripong/Anime-episode.git
   \`\`\`
2. **Open the project in your code editor** (e.g., VS Code).
3. **Run a local server:** * If you are using VS Code, install the **Live Server** extension.
   * Right-click on `index.html` and select **"Open with Live Server"**.
4. The application will open in your default browser at `http://127.0.0.1:5500/`.

## 📝 How to Add New Anime

All data is managed inside `data/anime.json`. To add a new anime or scene, simply append a new object to the JSON array following this structure:

\`\`\`json
{
  "id": "anime-unique-id",
  "title": "Anime Title",
  "altTitles": ["Thai Title", "Alternate Title"],
  "year": 2024,
  "coverImage": "image-url.jpg",
  "synopsis": "Anime description...",
  "languages": [
    {"emoji": "🇯🇵", "label": "ซับไทย"}
  ],
  "firstEpisodeLink": "https://link-to-ep1.com",
  "scenes": [
    {
      "id": "scene-unique-id",
      "thumbnail": "scene-thumbnail.jpg",
      "episode": 1,
      "title": "Highlight Scene Title",
      "description": "What happens in this scene...",
      "link": "https://deep-link-to-streaming-platform.com"
    }
  ]
}
\`\`\`

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).