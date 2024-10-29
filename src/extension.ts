// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands, window, Range, Position } from 'vscode';
import { Uri,TextDocumentShowOptions  } from 'vscode';
import exp from 'constants';
import { Console } from 'console';

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
		try
		{
			fs.mkdirSync(userPath, { recursive:true });
		}
		catch(e:any)
		{
			console.log((e as Error).message);	
		}
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


async function CreateWatcher()
{
	var path = require('path');
	var fs = require('fs');
	let stringname = process.env.APPDATA;
	let exeDir = process.env.PROGRAMFILES;
	const userPath = path.join(stringname,"NathanSilvers","POORMANS_IPC") as string;

	if( !fs.existsSync(userPath))
	{
		await fs.mkDir(userPath);
	}
	const watcher = fs.watch(userPath, (eventType:string, filename:string) => 
	{
		console.log(`Event type: ${eventType}`); 
		console.log(`File affected: ${filename}`); 

		const constructedPath = path.join(userPath,filename);
		const opts: TextDocumentShowOptions = {
			preview: true,
			
		};

		let isGoto = false;
		if( filename === "VS_CODE_GOTO.txt")
		{
			isGoto = true;
			opts.preview = false;
		}

		if( filename === "VS_CODE_GOTO_PREVIEW.txt")
		{
			isGoto = true;
			opts.preview = true;
		}

		if( isGoto )
		{
			fs.readFile(constructedPath, function (err:any, data:any) 
			{
				if (err) {
					return console.error(err);
				}
	
				let splitText = data.toString().split(';');
				let fileName = splitText[0];
				const lineNumber = parseInt(splitText[1])-1;
				const column = parseInt(splitText[2]);
	
				opts.selection = new vscode.Range(lineNumber, column, lineNumber, column);
				vscode.window.showTextDocument(Uri.file(fileName), opts);
			});
		}

	});
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) 
{
	var fs = require('fs');
	var path = require('path');

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "blitzsearch" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let set_search_command = vscode.commands.registerCommand('blitzsearch.searchThis', () => 
	{
		writeContextCommand("SET_SEARCH");
	});

	let set_replace_command = vscode.commands.registerCommand('blitzsearch.replaceThis', () => 
	{
		writeContextCommand("SET_REPLACE");
	});


	let configure_theme_command = vscode.commands.registerCommand('blitzsearch.configureTheme', () => 
	{
		extractCurrentTheme();
	});


	context.subscriptions.push(set_search_command);
	context.subscriptions.push(set_replace_command);
	context.subscriptions.push(configure_theme_command);
	
	CreateWatcher();

    vscode.workspace.onDidChangeWorkspaceFolders(onDidChangeWorkspaceFolders, null, context.subscriptions);
    onDidChangeWorkspaceFolders();
}


async function onDidChangeWorkspaceFolders()
{
	let appDataDirectory = process.env.APPDATA;
	var fs = require('fs');
	var path = require('path');
	const ipcDirectory = path.join(appDataDirectory,"NathanSilvers","POORMANS_IPC") as string;
	const ipcMessageFile = path.join(ipcDirectory,"WORKSPACE_UPDATE.txt");

	let list: Array<string> = [];

	if( !fs.existsSync(ipcDirectory))
	{
		fs.mkdirSync(ipcDirectory, { recursive:true });
	}

	if(vscode.workspace.workspaceFolders !== undefined)
	{
		for( let workspaceFolder of vscode.workspace.workspaceFolders)
		{
			list.push(workspaceFolder.uri.fsPath);
		}
	}


	//Going to try and share this similar object with other Simply folder targetting editors, like Sublime Text.
	let data =
	{
		"Name":vscode.workspace.name,
		"ExeForIcon":"code.cmd",
		"Folders":list
	};
	await fs.writeFileSync(ipcMessageFile, JSON.stringify(data));
}

async function extractCurrentTheme()
{
	let appDataDirectory = process.env.APPDATA;
	var fs = require('fs');
	var path = require('path');
	const themeName = "VS CODE Export.tmTheme"; //Todo: somewhere in here is probably the actual name..
	const themeDirectory = path.join(appDataDirectory,"NathanSilvers","ThemeExports") as string;
	const ipcDirectory = path.join(appDataDirectory,"NathanSilvers","POORMANS_IPC") as string;
	let themeOutput = path.join(themeDirectory,themeName) as string;

	if( !fs.existsSync(themeDirectory))
	{
		fs.mkdirSync(themeDirectory, { recursive:true });
	}

	const lightTheme = vscode.window.activeColorTheme.kind === 1;  // 1=light, 2=dark, 3=highcontrast
	const ipcFileName = lightTheme ? path.join(ipcDirectory,"SET_THEME_LIGHT.txt"): path.join(ipcDirectory,"SET_THEME.txt");

	// Todo: After a morning of searching, this ends up being the most simplistic thing to automate the process of exporting Saving-to-File. 
	// Would be nice if we didn't have to bother the text editor though
	await commands.executeCommand('workbench.action.generateColorTheme');
	if (window.activeTextEditor) 
	{
		const text = await window.activeTextEditor.document.getText();
		// clean the editor so when it asked to close it will not ask the user if they want to save the file
		await window.activeTextEditor.edit(editor => editor.delete(new Range(new Position(0, 0), new Position(10000, 100000))));
		await fs.writeFileSync(themeOutput, text);	
		await commands.executeCommand('workbench.action.closeActiveEditor');

		//Sends a Generic theme load message
		await fs.writeFileSync(ipcFileName, themeOutput);	
	}
}


// This method is called when your extension is deactivated
export function deactivate() {}
