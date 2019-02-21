// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, window, Disposable, ExtensionContext, TextEditor, Uri } from 'vscode';

class ActiveEditorTracker extends Disposable {
    private disposable: Disposable;
    private resolver: ((editor?: TextEditor) => void) | undefined; 

    constructor() {
        super(() => this.disposable && this.disposable.dispose());
        this.disposable = window.onDidChangeActiveTextEditor(e => this.resolver && this.resolver(e));
    }

    async awaitEditor(): Promise<TextEditor> {
        return new Promise<TextEditor>(resolve => {
            let timer: NodeJS.Timer;
    
            this.resolver = (e => {
                resolve(e);
                clearTimeout(timer);
                return e;
            });
    
            timer = setTimeout(() => {
                throw new Error("Editor took too long to load");
            }, 500);
        });
    }

    nextEditor(): Promise<TextEditor> {
        commands.executeCommand("workbench.action.nextEditor");
        return this.awaitEditor();
    }

     closeEditor(): Promise<TextEditor> {
        commands.executeCommand("workbench.action.closeActiveEditor");
        return this.awaitEditor();
    }
}

function isNonGitEditor(editor: TextEditor | undefined): boolean {
    return Boolean(editor && editor.document.uri.scheme !== "git");
}

export function activate(context: ExtensionContext) {
    const killTabs = async function marp() {
        console.log(">>>> Que?");
        
        let editor = window.activeTextEditor;
        let firstNonGitEditor: TextEditor | "nyi" = "nyi";
        let goAgain = true;
        
        const tracker = new ActiveEditorTracker();

        while (goAgain) {
            editor = await tracker.nextEditor();
            if (isNonGitEditor(editor)) {
                goAgain = !(firstNonGitEditor !== "nyi" && editor && firstNonGitEditor.document.uri.fsPath === editor.document.uri.fsPath);
                firstNonGitEditor = firstNonGitEditor === "nyi" ? editor : firstNonGitEditor;
            } else {
                await tracker.closeEditor();
            }
            console.log(editor);
        }
    };
    let disposable = commands.registerCommand("extension.killGitTabs", killTabs);
    

	context.subscriptions.push(disposable);
}

export function deactivate() {}
