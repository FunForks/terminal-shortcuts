console.log("process.argv:", process.argv, "\n\n")

let input = "command you want to run"

const escaped = "\"value calculated from input in Unicode Escape format" + "\\u000A\""

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