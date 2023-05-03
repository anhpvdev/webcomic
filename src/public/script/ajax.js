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


function bindhotcomic(data){
    let listhotcomic=""
    for(i=0;i<data.length;i++){
        let listitem=""
        let listchap = JSON.parse(data[i].listid)
        if(listchap){
            if(listchap.length >3){
                for(j=listchap.length-1;j>=listchap.length-3;j--){
                    listitem += `<li>
                    <a href="${listchap[j].id}">${listchap[j].name}</a>
                    <i>28/08/21</i>
                </li>`
                }
            }else{
                for(j=listchap.length-1;j>=0;j--){
                    listitem += `<li>
                    <a href="${listchap[j].id}">${listchap[j].name}</a>
                    <i>28/08/21</i>
                </li>`
                }
            }
        }
        listhotcomic += `<div class="listcomic--item l-3 m-3 c-4">
        <div class="item">
            <div class="item--top">
                <div class="item--top__img">
                    <a href="/comic/${data[i].id}"><img src="/public/image/comic/${data[i].image}" alt=""></a>
                </div>
                <div class="iteam--top__info">
                    <span>
                        <i>
                            <i class="fa-solid fa-eye"></i>
                            <span>${data[i].views}</span>
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
                    <a>${data[i].name}</a>
                </div>
                <div class="item--bottom__listchapter">
                    <ul>
                    ${listitem}
                    </ul>
                </div>
            </div>
        </div>
    </div>`
    }

    if(listhotcomic){
        document.querySelector(".listcomic").innerHTML = listhotcomic
    }

}

function gethotcomic(id){
    $.ajax({
        type: "GET",
        url: `/comic/hotcomic/${id}`,
        success: function(data) {  
           binmaincomic(data)
           gettophot()
           addpagecontrollerbyhot(data[0].num/20)
           window.scrollTo(0,0)
        }
    })
}

function  binheadertag(data){
    let content =`<div class="seachcategory--name">
                    <span>Thể Loại: </span>
                    <i>${data[0].tagname}</i>
                </div>
                <div class="seachcategory--info">
                    <p>${data[0].taginf}</p>
                </div>`
    document.querySelector(".main-container__topcomic").innerHTML=content
}

function seachcategory(id,num){
    $.ajax({
        type: "GET",
        url: `/comic/category/${id}&${num}`,
        success: function(data) {  
            console.log(data)
            binmaincomic(data)
            binheadertag(data)
            addpagecontrollerbytag((data[0].num / 20),data[0].tagid)
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

function binnewchap(data){
    const listimg = data[0].uri.split(",")
    let content =``
    console.log(listimg)
    for(i=0;i<listimg.length;i++){
        content+=`
            <div class="chapter--header__item">
                <img class="item" src="/public/image/chapter/${data[0].id}/${listimg[i]}" alt="">
            </div>`
        
    }
    document.querySelector(".chapter--header__list").innerHTML = content
}
function changeidchapter(data){
    let checkread = true
    let chapid =data[0].id
    let readtoken =data[0].token
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


function bintopuser(data){
    let listuser =""
    for(i=0; i<data.length; i++){

        listuser+=`<li class="member">
                                <div class="member--number">
                                    <span class="topuserweb">${i +1}</span>
                                </div>
                                <div class="member--avatar">
                                    <img src="/public/image/avatar/${data[i].avatar}" alt="top">
                                </div>
                                <div class="member--info">
                                    <div class="member--info__name">
                                        <p>${data[i].fullname}</p>
                                    </div>
                                    <div class="member--info__leve">
                                        <p>Point:${data[i].Point}</p>
                                    </div>
                                </div>
                            </li>`
    }
    document.querySelector(".topmember--bind").innerHTML = listuser
}
function gettopuser(){
    $.ajax({
        type: "GET",
        url: `/comic/api/topuser`,
        success: function(data) {  
        bintopuser(data)
        }
    })
}
function addpagehot(number){
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
        let newnum = parseInt(number)
        for(i=0;i<=newnum;i++){
            if(i==3){
                listcontroller+=`<li class="page" id="another--page">...</li>`
            }else{  
                 listcontroller+=`<a id="${i}" class="page" onclick="getmaincomic(this.id)">${i +1}</a>`
            }
           
        }
    }

    listpage.innerHTML = listcontroller
}

function bintophot(data){
    

    document.querySelector(".main-container__topcomic").innerHTML=`<div>
    <h2>Truyện HOT   </h2>
    <div class="topcomic__list row no-gutters" id="main__topcomic">
    </div>
    <div class="topcomic__nextleft" id="nextleft" onclick="dashleft()"><i class="fa-solid fa-angle-left"></i></div>
    <div class="topcomic__nextright " id="nextright" onclick="dashright()"><i class="fa-solid fa-angle-right"></i></div>
</div>`


    let listhot =""
    for(i=0; i<data.length; i++){

        listhot+=` <div class="topcomic__item col l-2__4 m-2__4 c-4">
            <div>
                <div class="topcomic__item__img">
                    <a href="/comic/${data[i].id}}">
                        <img src="/public/image/comic/${data[i].image}" alt="">
                    </a>
                </div>
                <div class="topcomic__item__info">
                    <a href="/comic/${data[i].id}">${data[i].name}</a>
                </div>
            </div>
        </div>`
    }
    document.querySelector(".topcomic__list").innerHTML = listhot

}
function gettophot(){
    $.ajax({
        type: "GET",
        url: `/comic/api/tophot`,
        success: function(data) {  
            bintophot(data)
        }
    })
}



function bintopcomic(data){
    let top10comic =""
    for(i=0; i<data.length; i++){
        top10comic+=`<li class="topcomic--item">
        <div class="topcomic--item__number">
            <span class="topcomicweb">${i + 1}</span>
        </div>
        <div class="topcomic--item__img">
            <a href="/comic/${data[i].id}"><img src="/public/image/comic/${data[i].image}" alt="top truyen"></a>
        </div>
        <div class="topcomic--item__info">
            <a href="/comic/${data[i].id}">${data[i].name}</a>
            <div>
                <i><i class="fa-solid fa-eye"></i>${data[i].views}</i>
            </div>
        </div>
    </li>`
    }
    document.querySelector(".topcomic--bind").innerHTML = top10comic
}
function gettopcomic(){
    $.ajax({
        type: "GET",
        url: `/comic/api/topcomic`,
        success: function(data) {  
        bintopcomic(data)
        }
    })
}


function binmaincomic(data){
    let listmaincomic=""
    
    for(i=0;i<data.length;i++){
        let listitem=""
        let listchap = JSON.parse(data[i].listid)
        if(listchap){
            if(listchap.length >3){
                for(j=listchap.length-1;j>=listchap.length-3;j--){
                    listitem += `<li>
                    <a href="${listchap[j].id}">${listchap[j].name}</a>
                    <i>28/08/21</i>
                </li>`
                }
            }else{
                for(j=listchap.length-1;j>=0;j--){
                    listitem += `<li>
                    <a href="${listchap[j].id}">${listchap[j].name}</a>
                    <i>28/08/21</i>
                </li>`
                }
            }
        }
        listmaincomic += `<div class="listcomic--item l-3 m-3 c-4">
        <div class="item">
            <div class="item--top">
                <div class="item--top__img">
                    <a href="/comic/${data[i].id}"><img src="/public/image/comic/${data[i].image}" alt=""></a>
                </div>
                <div class="iteam--top__info">
                    <span>
                        <i>
                            <i class="fa-solid fa-eye"></i>
                            <span>${data[i].views}</span>
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
                    <a>${data[i].name}</a>
                </div>
                <div class="item--bottom__listchapter">
                    <ul>
                    ${listitem}
                    </ul>
                </div>
            </div>
        </div>
    </div>`
    }

    if(listmaincomic){
        document.querySelector(".listcomic").innerHTML = listmaincomic
    }else{
        alert("danh sách trống")
    }
   
}
function getmaincomic(page){
    $.ajax({
        type: "GET",
        url: `/comic/api/comic/${page}`,
        success: function(data) {  
            console.log(data)
            binmaincomic(data)
        }
    })
}

