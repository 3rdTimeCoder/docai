import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { generateReadmeTool } from './tools/generateReadme.js';

const server = new McpServer({
    name: 'DocAI',
    description: 'An AI-powered code documentation generator.',
    version: '1.0.0',
    port: 4000,
    capabilities: {
        resources: {},
        tools: {},
        prompts: {}
    }
});

generateReadmeTool({ server });

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log('DocAI MCP Server is running and connected via stdio...');
}

main().catch((error) => {
    console.error('Error starting DocAI MCP Server:', error);
    process.exit(1);
});