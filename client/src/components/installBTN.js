var beforeInstallPrompt = null;
window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);

function eventHandler(event){
    beforeInstallPrompt = event;   
    /*var btn = document.getElementsByClassName('installBtn');  
    btn[0].removeAttribute('disabled','');*/
}

function errorHandler(e){
    console.log('error: ' + e);
}

const install = function() {
    console.log("installa");
    if(beforeInstallPrompt) beforeInstallPrompt.prompt();
}

export default install;