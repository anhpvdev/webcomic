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


var findcomic = document.getElementById("findcomic");
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


function getnumbercomicbycategory(e,id){
    var content = e
    var ss = content.match(/(numpagecategory\=)\d.\d+/g)
    numbercomic =ss[0].slice(16)
    var __numberpagebytag = numbercomic
    console.log("asdasdas"+__numberpagebytag)
    addpagecontrollerbytag(__numberpagebytag,id)

}

function seachcategory(id,num){
    $.ajax({
        type: "GET",
        url: `/comic/category/${id}&${num}`,
        success: function(data) {  
            document.querySelector(".main-container").innerHTML = data 
            getnumbercomicbycategory(data,id)
            window.scrollTo(0,0)
        }
    })
}

function followcomic(idcomic){
    $.ajax({
        type: "POST",
        url: `/comic/followcomic`,
        data:{
            comicid:idcomic,
        },
    })
    document.getElementById("b_follow").innerHTML = `<button class="comic-button unfollow" onclick="followcomic({{comics.id}})">Hủy Theo dõi</button>`
}

function unfollowcomic(idcomic){
    $.ajax({
        type: "POST",
        url: `/comic/unfollowcomic`,
        data:{
            comicid:idcomic,
        },
    })
    document.getElementById("b_follow").innerHTML = `<button class="comic-button follow" onclick="unfollowcomic({{comics.id}})">Theo dõi</button>`
}


function checkcmt(e,rep,repid){
    let nowtime = (new Date().toLocaleDateString()) +"  "+ (new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}))
    if(e){
        if(rep==true){
            let newcomment = `<div class="repcmt--item">
                <div class="comment-item__avt">
                    <img src="../../../public/image/avatar/${avtURI}" alt="">
                </div>
                <div class="comment-item__content">
                    <div class="content_name">
                        <p>${username}<span>${nowtime}</span></p>
                    </div>
                    <div class="content_cmt">
                        <p>${document.getElementById(`maincontent-${repid}`).value}</p>
                    </div>
                </div>
            </div>`
            document.getElementById(`repcmtlist-${repid}`).innerHTML +=newcomment
            
            document.getElementById(`maincontent-${repid}`).value=""
        }else{
            
            let newcomment = `<div class="comment-item">
                    <div class="comment-item__avt">
                        <img src="../../../public/image/avatar/${avtURI}" alt="">
                    </div>
                    <div class="comment-item__content">
                        <div class="content_name">
                            <p>${username}<span>${nowtime}</span></p>
                        </div>
                        <div class="content_cmt">
                            <p>${document.getElementById("maincontent-cmt").value}</p>
                        </div>
                    </div>
                </div>`
                document.querySelector(".comment-list").innerHTML =newcomment+document.querySelector(".comment-list").innerHTML
                document.getElementById(`maincontent-cmt`).value=""
            }
    }else{
        alert("đéo cmt được")
    }
}

function sendcommentcomic(topicid,parentid,rep){
    console.log(rep)
    let content = document.getElementById("maincontent-cmt").value
    if(rep==true){
        content = document.getElementById(`maincontent-${parentid}`).value
    }
    const cookies = document.cookie

    if(content){
        if (cookies) {

                $.ajax({
                    type: "POST",
                    url: `/comic/comiccomment`,
                    data:{
                        topicid:topicid,
                        content: content,
                        parentid:parentid
                    },
                    success: function(data){
                        checkcmt(data,rep,parentid)
                    }
                })

        }else{
            alert("đăng nhập đi eim")
        }
    }else{
        alert("nhập gì đi eim")
    }
}

function sendcommentchapter(topicid,parentid,rep){
    console.log(rep)
    let content = document.getElementById("maincontent-cmt").value
    if(rep==true){
        content = document.getElementById(`maincontent-${parentid}`).value
    }
    const cookies = document.cookie

    if(content){
        if (cookies) {

                $.ajax({
                    type: "POST",
                    url: `/comic/chaptercomment`,
                    data:{
                        topicid:topicid,
                        content: content,
                        parentid:parentid
                    },
                    success: function(data){
                        checkcmt(data,rep,parentid)
                    }
                })

        }else{
            alert("đăng nhập đi eim")
        }
    }else{
        alert("nhập gì đi eim")
    }
}

function changeidchapter(){
    let checkread = true
    let chapid =document.querySelector(".chapterid").getAttribute("value")
    let readtoken =document.querySelector(".chaptertoken").getAttribute("value")
    timeread = document.querySelectorAll(".chapter--header__item").length * 1500
    console.log(timeread)
 
    if(chapid){
        setTimeout(() => {
            let pageheight =document.querySelector(".chapter--header__list").scrollHeight
            document.addEventListener("scroll", (event) => {
                if(checkread){
                    if(pageYOffset >=pageheight-1000 ){
                        console.log("ok")
                        checkread=false
                        readchapter(chapid,readtoken)  
                    }
                }
            }) 
        }, timeread);
    }
    
}
//send readchap
function readchapter(id,rtoken) {  
    $.ajax({
        type: "POST",
        url: `/comic/readchapter`,
        data:{
            chapterid:id,
            readtoken:rtoken
        },
    })            
}

