import { TextEditor } from "vscode";

export class GoAgainer {
    current: VSCEditor;
    prime: VSCEditor;
    previousUndefined: boolean;
    goAgain: boolean;

    constructor(currentEditor: TextEditor | undefined) {
        this.setCurrent(currentEditor);
        this.setPrime();
        this.previousUndefined = Boolean(!this.current);
        this.goAgain = true;
    }

    setCurrent(editor: TextEditor | undefined): void {
        this.current = editor ? { id: (editor as any)._id, scheme: editor.document.uri.scheme } : undefined;
    }

    private setPrime(): void {
        this.prime = this.isGitEditor ? undefined : this.current;
    }

    get isGitEditor(): boolean {
        return Boolean(this.current && this.current.scheme === "git");
    }

    handleNext(nextEditor: TextEditor | undefined): void {
        this.setCurrent(nextEditor);
        if (this.current) {
            if (this.prime) {
                this.goAgain = !(this.current.id === this.prime.id);
            } else {
                this.setPrime();
            }
            this.previousUndefined = false;
        } else {
            this.goAgain = !this.previousUndefined;
            this.previousUndefined = true;
        }
    }

    handleClose(editor: TextEditor | undefined): void {
        this.setCurrent(editor);
        this.previousUndefined = false;
        this.goAgain = true;
    }
}

type VSCEditor = { id: string, scheme: string } | undefined;
