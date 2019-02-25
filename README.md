# git-tab-killer 

Closes all open Git working tree and index tabs. Simply bind `extension.killGitTabs` to your favorite shortcut and you're good to go. 

Unfortunately, the VS Code API does not provide a list of open editors, so the only way to identify Git tabs is to cycle through all open editors and eliminate Git tabs one by one. Expect a whole bunch of screen flickering. 

## Known issues
- The extension will only run through all your tabs once as long as no Git tabs are found. However, if there are tabs present that need to be closed, the extension will sometimes run through some of the editors several times for as-of-yet unknown reasons. This did not seem like a significant issue to me personally, but if you run into performance issues on larger projects, or if you have some insight into why it might be happening, you should definitely post an issue on GitHub. 
- The tab you start on is not always the same tab you end up with, presumably linked to the issue mentioned above. 
- As the extension 'manually' runs through all your open tabs, your history is obliterated every time you run it. 