function checkPWA() {

    //qua ho bisogno di sapere che è installata per spedire sia al browser che all'app che è installata.
    // solo dopo essere stata installata io spedisco quel messaggio non posso usare lo script sotto perchè semplicemente separa
    //quello che è cosa visualizzare non c'è un evento che fa scattare qualcosa.
    var install = document.getElementsByClassName("installBtn");
    var text = document.getElementsByClassName("installText");
    window.addEventListener('beforeinstallprompt', (event) =>{
        event.preventDefault();
    })

    console.log("sono in check")

    window.addEventListener('appinstalled', (event) =>{
        console.log("sono in appinstalled");
        localStorage.setItem("pwa-installed", "true");

    })

    
    //document.cookie.indexOf("pwa-installed=true") !== -1
    console.log(localStorage.getItem("pwa-installed"));
    if(localStorage.getItem("pwa-installed") === "true" || (window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone){
        install[0].classList.add('hidden');
        console.log("pwa installed");
        text[0].innerHTML = "PWA INSTALLED";

    }else{
        console.log("not installed");
    }

}

export default checkPWA;