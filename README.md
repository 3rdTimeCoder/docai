# DocAI

## Description
DocAI is an AI-powered code documentation generator designed to assist developers in creating comprehensive documentation for their codebases. It leverages the Model Context Protocol (MCP) to provide a seamless experience in generating and managing documentation.

## Features
- **AI-Powered Documentation**: Automatically generates documentation based on your code structure and comments.
- **Customizable Server**: Built on a customizable server that can be extended with additional tools and resources.
- **File System Integration**: Reads and processes files from your project directory to generate relevant documentation.

## Installation
To get started with DocAI, clone the repository:
```bash
git clone <repository-link>
cd docai
```

## Usage
To run the server, you can use the following commands:
- Build the server:
  ```bash
  npm run server:build
  ```
- Start the server in development mode:
  ```bash
  npm run server:dev
  ```
- Start the server with inspection:
  ```bash
  npm run server:inspect
  ```

## Example
After starting the server, you can use the following command to generate a README.md file:
```bash
npm run generateReadme
```

## Author
Nomah S.

## License
This project is licensed under the ISC License.