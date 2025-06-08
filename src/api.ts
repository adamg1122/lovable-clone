export async function fetchGeneratedCode(prompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  // Extract each block using regex
  const htmlMatch = content.match(/```html\s*([\s\S]*?)```/i);
  const cssMatch = content.match(/```css\s*([\s\S]*?)```/i);
  const jsMatch = content.match(/```js\s*([\s\S]*?)```/i);

  const html = htmlMatch ? htmlMatch[1] : "<!-- No HTML found -->";
  const css = cssMatch ? `<style>\n${cssMatch[1]}\n</style>` : "";
  const js = jsMatch ? `<script>\n${jsMatch[1]}\n</script>` : "";

  // Inject CSS and JS into the HTML before </head> and </body>
  let finalHtml = html;

  if (css) {
    finalHtml = finalHtml.replace("</head>", `${css}\n</head>`);
  }
  if (js) {
    finalHtml = finalHtml.replace("</body>", `${js}\n</body>`);
  }

  return finalHtml;
}
