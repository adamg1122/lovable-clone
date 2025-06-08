/*
  Core Engine: Multi-File GPT Response Parser
  ============================================
  This module extracts named file blocks from a GPT response in the format:

    [file: filename.ext]
    <file content>...

  and returns a Map<string, string> of filename → content.
*/

// parser.ts

/**
 * Parse a GPT response containing multiple file definitions.
 * @param response The raw string returned by GPT.
 * @returns A record mapping filenames to their content.
 */
export function parseMultiFileResponse(response: string): Record<string, string> {
  const filePattern = /^\[file:\s*(.+?)\]\s*\n([\s\S]*?)(?=^\[file:|\z)/gim;
  const files: Record<string, string> = {};
  let match: RegExpExecArray | null;

  while ((match = filePattern.exec(response)) !== null) {
    const filename = match[1].trim();
    const content = match[2].trim();
    files[filename] = content;
  }

  return files;
}

/*
  Example Integration in React:

  const [files, setFiles] = useState<Record<string,string>>({});

  async function handleGenerate(prompt: string) {
    const raw = await fetchGeneratedCode(prompt); // GPT response string
    const parsed = parseMultiFileResponse(raw);
    setFiles(parsed);
  }

  // `files` can then feed a File Explorer UI and individual file editors.
*/
