import fs from "fs/promises";
import path from "path";
import { getFiles } from "../lib/util/getFiles.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

class FileSystemResource {
    async get() {
        const filesToRead = await getFiles();
        const contents: Record<string, string> = {};
        for (const filePath of filesToRead) {
            try {
                const filename = path.basename(filePath);  
                const data = await fs.readFile(filePath, 'utf-8');
                contents[filename] = data;
            } catch (error) {
                const filename = path.basename(filePath); 
                contents[filename] = '';
            }
        }

        return contents;
    }
}

function getFileSystemResource({server }: { server: McpServer}) {
    server.resource(
        // do not use camelCase, one is case-sensitive the other is not
        "projectfiles", 
        "projectfiles://all",
        {
            description: "Project source code and configuration files",
            title: "Project Files",
        },
        async (uri) => {
            const fs = new FileSystemResource();
            const files = await fs.get();
            return {
                contents: [
                    {
                        uri: uri.href,
                        text: JSON.stringify(files, null, 2),
                        mimeType: "application/json"
                    }
                ]
            }
        }
    );

}

export { FileSystemResource, getFileSystemResource };