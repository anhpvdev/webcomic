var m =true
var b =true
var s =true
var test = document.querySelectorAll(".setcolor")
var __url = "http://localhost:8081/"

document.getElementById("change-background").onclick = function(){
    if(b){
        document.body.style.backgroundColor="#ebebeb"
        document.getElementById("navbar").style.backgroundColor ="#e4e4e4"
        document.getElementById("home").style.color="blueviolet"
        for(i=0; i < test.length; i++){
            test[i].setAttribute('class','setcolor changecolor')
        }
        b=false

    }else{
        document.body.style.backgroundColor="rgb(27, 27, 27)"
        document.getElementById("navbar").style.backgroundColor ="black"
        document.getElementById("home").style.color="orange"
        for(i=0; i < test.length; i++){
            test[i].setAttribute('class','setcolor')
        }
        b=true
    }
}

document.getElementById("show-notification").onclick = function() {
    console.log("hello")
    if(m){
        document.getElementById("drop-notification").style.display='block'
        m=false
        
    }else{
        document.getElementById("drop-notification").style.display='none'
        m=true
    }

}

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

var anotherpagecontroller = document.getElementById("another--page")
if(anotherpagecontroller){
    document.getElementById("another--page").onclick = function(){
        document.getElementById("showanotherpage").style.display='block'
        let numclick = 0
        document.body.onclick = function(){
            if(numclick!=0){
                console.log("lo nhập đi em")
            }else{
                numclick++
            }
        }
    }
}


document.getElementById("changepage").onclick = function(){
    var inputpage = document.getElementById("pageInput").value
    if(!inputpage){
        alert("nhập số vào thằng l")
    }else if(isNaN(inputpage)){
            alert("đéo phải số")

        }else if(inputpage>__numpage || inputpage <0){
            alert("làm đếch j có trang "+inputpage)
        }else{
            changepage(inputpage)
        }
}


document.getElementById("nextright").onclick = function(){
    cout=cout+200
    settime(cout)
}

document.getElementById("nextleft").onclick = function(){
    if(cout>=200){
        cout=cout-200
        settime(cout)
    }
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
