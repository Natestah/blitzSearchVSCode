// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


function writeContextCommand( commandName :string )
{
	var editor = vscode.window.activeTextEditor;
	if(!editor)
	{
		return;
	}
	
	var fs = require('fs');
	let stringname = process.env.APPDATA;
	var path = require('path');


	let exeDir = process.env.PROGRAMFILES;
	const blitzPath = path.join(exeDir,"Blitz","Blitz.exe");


	const userPath = path.join(stringname,"NathanSilvers","POORMANS_IPC");

	if( !fs.existsSync(blitzPath))
	{
		vscode.window.showErrorMessage("Visit https://natestah.com to install Blitz Search Tool..");
		return;
	}

	if( !fs.existsSync(userPath))
	{
		fs.mkDirSync(userPath, { recursive:true });
	}
	const fullpath = path.join(userPath,`${commandName}.txt`);
	const selection = editor.selection;

	if (selection && !selection.isEmpty) 
	{
		const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
		const highlighted = editor.document.getText(selectionRange);
		fs.writeFileSync(fullpath,highlighted);
	}
	else
	{
		let document = editor.document;
		let curPos = editor.selection.active;
		let wordRange = document.getWordRangeAtPosition(editor.selection.active);


		if(wordRange?.isEmpty)
		{
			fs.writeFileSync(fullpath, '');	
		}
		else
		{
			let docText = document.getText(wordRange);

			// empty selection on new line causes this.. with getwordrangge.. here we just signal empty.
			if(docText.includes('\n') || docText.includes('\r'))
			{
				fs.writeFileSync(fullpath, '');	
				return;

			}
			let wholeWord = "^@" + document.getText(wordRange);
			fs.writeFileSync(fullpath, wholeWord);
		}
	}

	const spawn = require('child_process').spawn;
	spawn(blitzPath);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) 
{

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "blitzsearch" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('blitzsearch.searchThis', () => 
	{
		writeContextCommand("SET_SEARCH");
	});

		// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable2 = vscode.commands.registerCommand('blitzsearch.replaceThis', () => 
	{
		writeContextCommand("SET_REPLACE");
	});


	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);


}

// This method is called when your extension is deactivated
export function deactivate() {}
