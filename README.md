# altv-adminpanel-api
This project serves as an example for integrating an api into an ALT:V GTA V server. It provides basic usage with another project that is currently being worked upon.

# Usage

## Requirements
-   NodeJS
-   Alt:V

## Installation & First Start

1. Copy the contents of this repo to `altv-server\resources\altv-adminpanel-api`
2. Run `npm install`
3. Start server
4. Open a browser and go to `http://localhost:9999/acp/dashboard?token=REPLACETHIS`

## Modify

1. Change the secret to one that suits you, be vary of http arguments (avoid &, ?, % etc.) in `index.mjs`
2. New listeners can be added with `addAcpListener`. Consult the comments.