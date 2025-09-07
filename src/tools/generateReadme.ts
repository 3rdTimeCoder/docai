import fs from 'fs/promises';
import path from 'path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod';


export function generateReadmeTool({ server }: { server: McpServer }) {
    server.tool("generateReadme", "Write a README.md file to the project directory.", {
        content: z.string().describe("The content of the README.md file to be created.")
    }, 
    {
        title: "Generate README.md",
        description: "takes generated README content and saves it.",
        readOnlyHint: false, 
        destructiveHint: false, 
        idempotentHint: false,
        openWorldHint: false,
    }, async ({ content }) => {
        try {
            await fs.writeFile(path.join(process.cwd(), 'README.md'), content);
            return {
                content: [
                    { type: "text", text: 'README.md created/updated successfully & saved.' }
                ]
            }

        } catch {
            return {
                content: [
                    { type: "text", text: "Failed to save user"}
                ]
            }
        }
    });
}