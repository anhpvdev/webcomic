var m =true
var b =true
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


const listpage =document.getElementById("list--page")
    
    function addpagecontroller(number){
        let listcontroller =""
        console.log(listpage)
        if(number>5){
            listcontroller=`<a href="/?page=1" class="page">1</a> 
            <a href="/?page=2" class="page">2</a> 
            <li class="page"  id="another--page">...</li> 
            <a href="/?page=${parseInt(number)}" class="page">${parseInt(number)}</a>
            <a href="/?page=${parseInt(number)+1}" class="page">${parseInt(number)+1}</a>
            `
        }else{
            let newnum = parseInt(number)+1
            for(i=1;i<=newnum;i++){
                if(i==3){
                    listcontroller+=`<li class="page" id="another--page">...</li>`
                }else{
                    
                     listcontroller+=`<a id="${i}" class="page" onclick="changepage(this.id)">${i}</a>`
                }
               
            }
        }

        listpage.innerHTML = listcontroller
    }

    function addpagecontrollerbytag(number,id){
        const listpagetag =document.getElementById("list--pagetag")
        let listcontrollertag =""
        console.log("asdasdasd: "+number)
        if(number>5){
            listcontroller=`<a href="/?page=1" class="page">1</a> 
            <a href="/?page=2" class="page">2</a> 
            <li class="page"  id="another--page">...</li> 
            <a href="/?page=${parseInt(number)}" class="page">${parseInt(number)}</a>
            <a href="/?page=${parseInt(number)+1}" class="page">${parseInt(number)+1}</a>
            `
        }else{
            let newnum = parseInt(number)+1
            for(i=1;i<=newnum;i++){
                console.log(listcontrollertag+"||"+newnum)
                if(i==3){
                    listcontrollertag+=`<li class="page" id="another--page">...</li>`
                }else{
                    
                    listcontrollertag+=`<a  class="page" onclick=" seachcategory(${id},${i})">${i}</a>`
                }
               
            }
        }
        listpagetag.innerHTML = listcontrollertag
    }

