// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand("extension.killGitTabs", () => {
        console.log(">>>> Que?");
        let firstNonGitEditorUri: vscode.Uri | undefined = undefined;
        let editor = vscode.window.activeTextEditor;
        let editorUri = editor ? editor.document.uri : undefined;
        console.log(">>>> editor", editor);
        console.log(">>>> editorUri", editorUri);
        console.log(editorUri != firstNonGitEditorUri)
        while (editorUri != firstNonGitEditorUri) {
            vscode.commands.executeCommand("workbench.action.nextEditor");
            editor = vscode.window.activeTextEditor;
            editorUri = editor ? editor.document.uri : editorUri;
            if (editorUri && editorUri.scheme == "git") {
                vscode.commands.executeCommand("workbench.action.closeActiveEditor");
            } else {
                if (!firstNonGitEditorUri) firstNonGitEditorUri = editorUri;
            }
        };
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
