const express = require("express");
const path = require("path");
const app = express();

// Serve static files from Vite's dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
