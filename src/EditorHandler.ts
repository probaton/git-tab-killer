import { commands, window, Disposable, TextEditor } from "vscode";

export class EditorHandler extends Disposable {
    private disposable: Disposable;
    private resolver: ((editor?: TextEditor) => void) | undefined; 

    constructor() {
        super(() => this.disposable && this.disposable.dispose());
        this.disposable = window.onDidChangeActiveTextEditor(e => this.resolver && this.resolver(e));
    }

    async awaitEditor(): Promise<TextEditor> {
        const editor = await new Promise<TextEditor>(resolve => {
            let timer: NodeJS.Timer;
    
            this.resolver = (e => {
                if (e) { 
                    clearTimeout(timer);
                    resolve(e); 
                }
            });
    
            timer = setTimeout(() => {
                throw new Error("Editor took too long to load");
            }, 500);
        });
        this.resolver = undefined;
        return editor;
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
