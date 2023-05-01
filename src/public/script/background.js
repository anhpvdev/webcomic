var s =true
document.getElementById("setting").onclick = function(){
    if(s){
        document.getElementById("showsetting").style.top='100px'
        s=false

    }else{
        document.getElementById("showsetting").style.top='-1000px'
        s=true
    }
}


document.getElementById("showsetting--exit").onclick = function(){
        document.getElementById("showsetting").style.top='-1000px'
        s=true
}

document.getElementById("dashboad").onclick =function(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
}


var __background = document.getElementById("inputbackground");
var __backgroundlink = document.getElementById("inputbackground__action");
var __backgroundopacity = document.getElementById("inputbackgroundopacity__action")

__background.addEventListener('change', (event) => {
    const image = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(image);

    reader.addEventListener('load', () => {
        localStorage.setItem('background', reader.result);
        console.log("upload file success")
        changebackground()
    });
});

__backgroundlink.onclick = function(){
    const linkimg = document.getElementById("inputbackground__link").value   
    localStorage.setItem('background', linkimg);
    console.log("upload file success")
    changebackground()
};

__backgroundopacity.onclick = function(){
    var opacity = document.getElementById("inputbackground__opacity").value
    if (isNaN(opacity)){
        alert("nhập số vào dcmm");
    }else{
        if(opacity<0 || opacity >100){
            alert("nhập sai r dcmm");
        }else{
            opacity =100- opacity  
            localStorage.setItem('opacity',opacity);
            console.log("upload opacity success  "+opacity)
            changebackground()
        }
    }

};


function changebackground(){
    var __viewweb = document.getElementById("background")
    const background_img = localStorage.getItem('background')
    const background_opacity = localStorage.getItem('opacity')
    // const linkbackground = "background-image: url(" + background_img + ");"
    // const opacitybackground = "opacity:"+background_opacity+"%"
    if (background_img) {
        if (background_opacity) {
            const backgroundcss = "background-image: url(" + background_img + ");opacity:"+background_opacity+"%"
            __viewweb.setAttribute("style",backgroundcss)
            console.log(backgroundcss)
        }else{
            const backgroundcss = "background-image: url(" + background_img + ");"
            __viewweb.setAttribute("style",backgroundcss)
            console.log(backgroundcss)
        }
    }else {
        if (background_opacity) {
            const backgroundcss = "opacity:"+background_opacity+"%"
            __viewweb.setAttribute("style",backgroundcss)
            console.log(backgroundcss)
        }else{
            __viewweb.setAttribute("style","")
        }
    }

}
if(localStorage.getItem('background')){
    changebackground()
}



