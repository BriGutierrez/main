// Assembles src/pages/*.html + src/partials/*.html into the site root.
// Run: node build.js
//
// Page files start with a front-matter comment:
//   <!-- title: Page title | description: Meta description | nav: services -->
// and may include partials with {{> name}}.
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src");
const partial = (name) => fs.readFileSync(path.join(SRC, "partials", `${name}.html`), "utf8").trim();

function expand(html) {
  // Partials may include other partials.
  let prev;
  do {
    prev = html;
    html = html.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, name) => partial(name));
  } while (html !== prev);
  return html;
}

for (const file of fs.readdirSync(path.join(SRC, "pages"))) {
  if (!file.endsWith(".html")) continue;
  let body = fs.readFileSync(path.join(SRC, "pages", file), "utf8");
  const fm = body.match(/^<!--([\s\S]*?)-->\s*/);
  const meta = {};
  if (fm) {
    for (const part of fm[1].split("|")) {
      const i = part.indexOf(":");
      if (i > 0) meta[part.slice(0, i).trim()] = part.slice(i + 1).trim();
    }
    body = body.slice(fm[0].length);
  }
  let html = expand(`{{> head}}\n{{> header}}\n${body.trim()}\n{{> footer}}\n<script src="assets/js/main.js" defer></script>\n</body>\n</html>\n`);
  html = html
    .replace(/\{\{title\}\}/g, meta.title || "McKee Media")
    .replace(/\{\{description\}\}/g, meta.description || "")
    .replace(/\{\{current:([\w-]+)\}\}/g, (_, key) => (key === meta.nav ? ' aria-current="page"' : ""));
  fs.writeFileSync(path.join(__dirname, file), html);
  console.log("built", file);
}
