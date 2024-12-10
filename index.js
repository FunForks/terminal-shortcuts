// Read input from the command line.

// `process.argv` is an array. The first two items will be
//
// 0: The absolute path to the node executable file
// 1: The absolute path to the file you want node to run
//
// Any remaining items will be the words that followed the
// `node <scriptname>` command. For example, if you run the
// command...
//
//    node unicodeEscape.js three word argument
// 
// ... process.argv will be something like this:
//
// [
//   '/path/to/node',
//   '/path/to/unicodeEscape.js',
//   'three',
//   'word',
//   'argument'
// ]

// console.log("process.argv:", process.argv, "\n\n")

// Ignore the first two items, and just keep the words that were
// given after the name of the file to run...
let input = process.argv.slice(2)

// ... or use "npm run pandoc" if no input is given
if (!input.length) {
  input = "node index.js"

} else {
  // Input from the command line will be separate words that need
  // to be joined into one continuous string.
  input = input.join(" ")
}

// Convert input to an array of individual characters
const charArray = [...input] // or input.split("")

// Define a callback function that can be used with Arra.reduce()
function escape(cumul, char) {
  // Assume all characters in input will be ASCII characters
  // (No emojis or symbols from other writing systems)
  return cumul
       + "\\u00"
       + char.charCodeAt(0)
             .toString(16)
             .toUpperCase()
}

// Generate a string of Unicode Escape characters, beginning
// with an opening " double quote mark and ending with the
// Line Feed character followed by a closing double quote mark.
// 
// The character `\` has the special meaning of "ignore the next
// character, or treat it in a special way". For example `\n`
// means "new line".
//
// To include the character `\` in a string, it must be _escaped_
// with another `\` character. In other words: `\\` means "ignore"
// the fact that `\` means ignore the next character, and use the
// second `\` character exactly as it is.
//
// When used as the text for the
// workbench.action.terminal.sendSequence command, the Line Feed
// character will tell the Terminal to execute the preceding text.
const escaped = charArray.reduce(escape, '"') + '\\u000A\"'

console.log(`
### Paste the following JSON block into keybindings.json

,
{
    "key": "ctrl+shift+alt+X", // use your own shortcut
    "description": "Runs '${input}' in the  Terminal",
    "command": "workbench.action.terminal.sendSequence",
    "args": {
        "text": ${escaped}
    }
}`)