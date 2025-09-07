import fs from 'fs/promises';
import path from 'path';
import { FileSystemResource } from '../resources/fileSysResource.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';


export function generateReadmeTool({ server }: { server: McpServer }) {
    server.tool("generateReadme", "Generate or update README.md based on project files.", {}, 
    { // annotations - helps the AI understand the tool a bit more.
    title: "Generate README.md", // A short title for the tool
    description: "Generates or updates the README.md file based on the contents of package.json and other relevant files in the project directory.",
    readOnlyHint: false, // tells the AI that this is something that manipulate data
    destructiveHint: false, // since this doesn't delete or destroy any data, this is set to false
    idempotentHint: false, //is this a pure function or not
    openWorldHint: false, // does this interact with something external to it's environment?
    }, async () => {
    try {
        const fs = new FileSystemResource();
        const files = await fs.get();
        const message  = await generateReadme({ files });
        return {
            content: [
                { type: "text", text: message }
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

async function generateReadme({ files }: { files: Record<string, string> }) {
    const packageJson = JSON.parse(files['package.json'] || '{}');
    const name = packageJson.name || 'UnknownProject';
    const description = packageJson.description || 'No description available.';
    const version = packageJson.version || '0.0.1';

    const readmeContent = `# ${name} - ${version}\n\n$${description}\n\n## Setup\n\n\`\`\`bash\nnpm install\nnpm start\n\`\`\`\n`;

    await fs.writeFile(path.join(process.cwd(), 'README.md'), readmeContent);
    return 'README.md created/updated successfully.';
}