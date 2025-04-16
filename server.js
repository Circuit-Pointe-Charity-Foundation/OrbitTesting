const express = require("express");
const path = require("path");
const app = express();

// Serve static files from Vite's dist directory
app.use(
  express.static(path.join(__dirname, "dist"), {
    dotfiles: "allow", // Needed for .env files
  })
);

// Handle client-side routing - MUST be last
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Current directory: ${__dirname}`);
  console.log(`Files in dist: ${fs.readdirSync(path.join(__dirname, "dist"))}`);
});
