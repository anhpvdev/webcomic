function changebackground(){
    var __viewweb = document.getElementById("background")
    console.log(__viewweb.getAttribute("style"))
    const background_img = localStorage.getItem('background');
    const linkbackground = "background-image: url(" + background_img + ")"
    if (background_img) {
        __viewweb.setAttribute("style",linkbackground)
    } else {
        __viewweb.setAttribute("style","")
    }


}
if(localStorage.getItem('background')){
    changebackground()
}