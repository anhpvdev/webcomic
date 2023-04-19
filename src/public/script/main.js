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

function checkclick(){
    document.body.onclick = function(){
        console.log("lo nhập đi em")
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
            let newurl = __url+"?page="+inputpage
            window.location.replace(newurl)
        }
}


var cout=0
function settime(cout){
        switch(cout){
            case 200:
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *1), 0px, 0px)' ;
                break;
            case 400:
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *2), 0px, 0px)' ;
                break ;   
            case 600:
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *3), 0px, 0px)' ;
                break ;
            case 800:
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *4), 0px, 0px)' ;
                break ;
            case 1000:
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *5), 0px, 0px)' ;
                break ;  
            default: 
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *0), 0px, 0px)' ;  
        }
}


setInterval(() => {
    settime(cout);
    cout = cout +200
    if(cout>1000){
        cout=0;
    }
    
}, 2000);


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
    window.scrollTo(0,0)
}


var __background = document.getElementById("inputbackground");
var __backgroundlink = document.getElementById("inputbackground__action");

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














//setInterval(() => {
    //     if(cout==0){
    //         setTimeout(() => {
    //             settime(cout);
    //             cout = cout +200
    //             console.log(cout)
    //             if(cout>1000){
    //                 cout=0;
    //             }
                
    //         }, 5000);
    //     }
    //     else{
    //         settime(cout);
    //         cout = cout +200
    //         console.log(cout)
    //         if(cout>1000){
    //             cout=0;
    //         }
    //     }
        
    // }, 2000);




