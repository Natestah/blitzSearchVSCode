// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "blitzsearch" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('blitzsearch.searchThis', () => {

		var editor = vscode.window.activeTextEditor;
		if(editor)
		{
			var fs = require('fs');
			const stringname = process.env.APPDATA;
			var path = require('path');
			const fullpath = path.join(stringname,"NathanSilvers","POORMANS_IPC", "SET_SEARCH.txt");
			const selection = editor.selection;

			if (selection && !selection.isEmpty) 
			{
				const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
				const highlighted = editor.document.getText(selectionRange);
				//vscode.window.showInformationMessage(' BlitzSearch!' + highlighted);
				fs.writeFileSync(fullpath,highlighted);
			}
			else
			{
				vscode.window.showInformationMessage('fail from BlitzSearch! ');

			}

		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
