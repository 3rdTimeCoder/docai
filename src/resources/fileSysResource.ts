import { Resource } from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { getFiles } from "../lib/util/getFiles.js";

export class FileSystemResource implements Resource {
    [x: string]: unknown;
    name!: string;
    uri!: string;
    title?: string | undefined;
    description?: string | undefined;
    mimeType?: string | undefined;
    _meta?: { [x: string]: unknown; } | undefined;

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