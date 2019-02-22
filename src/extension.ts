import { commands, window, ExtensionContext } from 'vscode';
import { EditorHandler } from "./EditorHandler";
import { GoAgainer } from "./GoAgainer";

export function activate(context: ExtensionContext) {
    const killTabs = async function marp() {
        console.log(">>>> Que?");
        
        const handler = new EditorHandler();
        const tracker = new GoAgainer(window.activeTextEditor);

        while (tracker.goAgain) {
            tracker.handleNext(await handler.nextEditor());
            if (tracker.isGitEditor) {
                tracker.handleClose(await handler.closeEditor());
            } 
        }
    };
    let disposable = commands.registerCommand("extension.killGitTabs", killTabs);
    

	context.subscriptions.push(disposable);
}

export function deactivate() {}
