// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand("extension.killGitTabs", () => {
        console.log(">>>> Que?");
        let firstNonGitUri: vscode.Uri | "nyi" = "nyi";
        let editor = vscode.window.activeTextEditor;
        let uri = editor ? editor.document.uri : undefined;
        while (uri !== firstNonGitUri) {
            firstNonGitUri = (firstNonGitUri === "nyi") && uri && (uri.scheme !== "git") ? uri : "nyi";
            vscode.commands.executeCommand("workbench.action.nextEditor");
            editor = vscode.window.activeTextEditor;
            uri = editor ? editor.document.uri : undefined;
            if (uri && (uri.scheme === "git")) {
                vscode.commands.executeCommand("workbench.action.closeActiveEditor");
            }
            console.log(">>>> editorUris", uri, firstNonGitUri);
        }
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
