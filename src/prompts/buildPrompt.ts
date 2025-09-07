import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { get } from "http";
import { FileSystemResource } from "../resources/fileSysResource.js";

function generateReadmePrompt({ server }: { server: McpServer }) {
    server.prompt(
        "generateReadmePrompt",
        "Generate a professional and helpful README.md file for a project based on its source code and configuration files.",
        {},
        async () => {
            const fs = new  FileSystemResource();
            const files = await fs.get();

            return {
                messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: getPrompt({ files })
                    },
                },
            ]
            }
        }
    );
}



function getPrompt({ files }: { files: Record<string, string>}): string {
  const fileNames = Object.keys(files).join(', ');
  let summary = `You are an AI assistant tasked with writing a professional and helpful README.md file for a project. Based on the following files below, generate a complete README including project name, description, features, installation steps (git clone repo link), and usage(use package.json as a guide) examples.\n\n`;

  for (const [fileName, content] of Object.entries(files)) {
    if (!content) continue;
    summary += `### ${fileName}\n`;
    summary += "```\n" + content.slice(0, 1000) + "\n```\n\n"; // limit long files
  }

  summary += "\nGenerate a README.md that is clear and helpful. Use the files provide to inform the content. Do not make up any information that is not present in the files.\n\n";
  return summary;
}


export { generateReadmePrompt };