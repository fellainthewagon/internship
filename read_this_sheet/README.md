# Read This Sheet

### Usage

Run:

```sh
cd internship
npm i
cd read_this_sheet
node index
```

### Description

Read the contents of the specified file using a readable stream, which logging each chunk with a serial number and a short message from a chunk of 15 characters:

```
// Input:
// Karl_Marx-Das_Kapital.txt

// Output:
// Chunk 1: <15 symbol length message>...
// Chunk 2: <15 symbol length message>...
// Chunk <...> <15 symbol length message>...
// Chunk n: <15 symbol length message>...
```
