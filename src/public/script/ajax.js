var  boxfind = document.getElementById("listfindcomic")
function getlistfind(e){
    let listfcomic=""
    console.log(e.length)
    for(i=0;i<e.length;i++){
        listfcomic+=`<li class="findcomic--item">
        <div class="findcomic--item__img">
            <a href="/commic/"><img src="/public/image/comic/${e[i].image}" alt="top truyen"></a>
        </div>
        <div class="findcomic--item__info">
            <a href="/commic/${e[i].id}">${e[i].name}</a>
            
        </div>
    </li>`
    }
    if(listfcomic){
        boxfind.style.display ="block"
        document.getElementById("show--comicfind").innerHTML =listfcomic
    }else{
        boxfind.style.display ="none"
        console.log("đéo có truyện đấy con")
    }
}

function getlistcomic(e){
    let listcomicinpage =""
    console.log(e.length)
    for(i=0;i<e.length;i++){
        listcomicinpage+=`<div class="listcomic--item l-3 m-3 c-4">
        <div class="item">
            <div class="item--top">
                <div class="item--top__img">
                    <a href="/commic/${e[i].id}"><img src="/public/image/comic/${e[i].image}" alt=""></a>
                </div>
                <div class="iteam--top__info">
                    <span>
                        <i>
                            <i class="fa-solid fa-eye"></i>
                            <span>${e[i].views}</span>
                        </i>
                        <i>
                            <i class="fa-solid fa-comment"></i>
                            <span>500k</span>
                        </i>
                        <i>
                            <i class="fa-solid fa-heart"></i>
                            <span>500k</span>
                        </i>
                    </span>
                </div>
            </div>
            <div class="item--bottom">
                <div class="item--bottom__name">
                    <a>${e[i].name}</a>
                </div>
                <div class="item--bottom__listchapter">
                   
                </div>
            </div>
        </div>
    </div>`
    }
    if(listcomicinpage){
       console.log(listcomicinpage)
       document.querySelector(".listcomic").innerHTML = listcomicinpage
    }
}


const findcomic = document.getElementById("findcomic");
findcomic.oninput = function(){
    console.log(findcomic.value)
    if(findcomic.value){
        $.ajax({
            type: "GET",
            url: "/seachcomic",
            data: {
                find:findcomic.value
            },
            success: function(data) {
                getlistfind(data)      
                console.log(data)                     
            }
        })
    }else{
        boxfind.style.display ="none"
    }
};


function changepage(id){
    $.ajax({
        type: "GET",
        url: "/",
        data: {
            page:id
        },
        success: function(data) {
            getlistcomic(data)                     
        }
    })
    window.scrollTo(0,0)
    document.getElementById(id).style.border = "1px solid rgb(255, 140, 0)"
    document.getElementById(id).style.color ="rgb(255, 140, 0)"
}


