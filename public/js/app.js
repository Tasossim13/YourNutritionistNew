function toggleText(id) {
    var element = document.getElementById(id);
    if (element.classList.contains("show")) {
        element.classList.remove("show");
    } else {
        element.classList.add("show");
    }
}

function toggleContent(id){
    var content = document.getElementById(id);
    if(content.style.display==="none"){
        content.style.display = "block";
    }
    else{
        content.style.display = "none";
    }
}