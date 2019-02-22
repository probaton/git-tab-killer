import { TextEditor } from "vscode";

export class GoAgainer {
    current: TextEditor | undefined;
    prime: TextEditor | undefined;
    previousUndefined: boolean;
    goAgain: boolean;

    constructor(currentEditor: TextEditor | undefined) {
        this.current = currentEditor;
        this.setPrime();
        this.previousUndefined = Boolean(!this.current);
        this.goAgain = true;
    }

    private setPrime(): void {
        this.prime = this.isGitEditor ? undefined : this.current;
        console.log(">>>>> prime", this.prime ? this.prime.document.fileName : undefined, this.previousUndefined, this.isGitEditor);
    }

    get isGitEditor(): boolean {
        return Boolean(this.current && this.current.document.uri.scheme === "git");
    }

    handleNext(nextEditor: TextEditor | undefined): void {
        this.current = nextEditor;
        if (this.current) {
            if (this.prime) {
                this.goAgain = !(this.current.document.fileName === this.prime.document.fileName);
            } else {
                this.setPrime();
            }
            this.previousUndefined = false;
        } else {
            this.goAgain = !this.previousUndefined;
            this.previousUndefined = true;
        }
        this.report("next");
    }

    handleClose(editor: TextEditor | undefined): void {
        this.current = editor;
        this.goAgain = true;
        this.previousUndefined = false;
        this.report("close");
    }

    report(type: string) {
        console.log(">>>>>", type, this.current ? this.current.document.fileName : undefined, this.previousUndefined, this.isGitEditor);
    }
}
