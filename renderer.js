const marked = require('marked');
const {remote, ipcRenderer} = require('electron')
const mainProcess = remote.require('./main.js');

// you always need to use the mainProcess module to require main.js file.
// there is doubt about it.
// I think the idea is that the remote actually create a process within the computer;
// without calling the remote, you are actually talking direct to the file.
// you can use all the module that main.js file is using in the context of the actual
// mainprocess of the computer. 

// kind of like when you do mainProcess = remote.require('./main.js')
// you are actually running a server instance called mainProcess.
// you are interacting with the mainProcess in your computer instead of the file or modules
// which is required by the server instance.

// you will use IPC to send to what file gets send back;
// IPC stands for interprocess communication;



// notice above is a node js code （commonJS code using require) that does not exist in the browser.
// electron takes all the browser API and node API;
// const mainProcess = require('./main.js') in this case, all the app instace will be put into
// the renderer process directly, unfornately, the 


const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');
const showFileButton = document.querySelector('#show-file');
const openInDefaultButton = document.querySelector('#open-in-default');

const renderMarkdownToHtml = markdown => {
  htmlView.innerHTML = marked(markdown, { sanitize: true });
};

//the above is about using marked function to consume the content from the markdown
// and convert it to the developer;


markdownView.addEventListener('keyup', event => {
  const currentContent = event.target.value;
  renderMarkdownToHtml(currentContent);
});

// the above code seems to change the markdown code to html everytime you have an keyup event.
openFileButton.addEventListener('click', () => {
  mainProcess.getFileFromUser();
})

ipcRenderer.on('file-opened', (event, file, content) => {
  markdownView.value = content;
  renderMarkdownToHtml(content);
})
// this is an event listener that listening to a channel.


//notice, all the event listeners is added to the script where it points to the 
//the event listener.

// notice, right now. There is a renderer.js file attached to the hmtl.
// there is a main.js file which the npm will run when you type npm start.
// other than that, there is not so much things you can do.

// we need to somehow let the html talk to the main.js file.

// remote is only a process that you will use in the renderer process only.
// you need to require remote in the renderer.js
// remote = require('electron).remote
// const mainProcess = remote.require('./main.js'
// it is similar to how create the backend fake API when we do the react project we have a folder
// that fakes all the challenge data and submission data.

// in the main.js, you will do export.getFileFromUser = () => {

// } something similar to this is useful.

// but here is the problem, why I cannot just directly do
// const mainProcess = require('./main.js')
// why I had to do const remote = require('electron').remote
// const mainProcess = remote.require('./main.js')