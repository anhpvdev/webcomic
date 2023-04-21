var listselect =""
var listselect__ID =""
var listtag = document.getElementById("checkaddtag")
var selecttag = document.getElementById("caraddtag")
listtag.onclick = function(){
    let valuetag = selecttag.value
    let textag = selecttag.options[selecttag.selectedIndex].text
    console.log(valuetag)
    console.log(textag)
    listselect +=textag+";"
    listselect__ID+=valuetag+","
    document.getElementById("showtagselect").textContent =  listselect
    document.getElementById("tagcomic").value = listselect__ID
}