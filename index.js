let navbar=document.querySelector("#navbar");
let notesContainer=document.querySelector(".notes-container");
let notesArchiveContainer=document.querySelector(".notes-archive-container")
let notesEditorContainer=document.querySelector("#notes-editor-container");
let notesTitle=document.querySelector("#notes-title");
let notes=document.querySelector("#notes");
let notesArray=JSON.parse(localStorage.getItem("notesArray"))||[];


//home & archive clicking works now
navbar.addEventListener("click",(event)=>{
    let navKey=event.target.dataset.key;
//    console.log(notesArchiveContainer.classList)
    if(navKey==="home"){
        notesArchiveContainer.classList.add("d-none");
        notesContainer.classList.remove("d-none");
    }
    if(navKey==="archive"){
        notesArchiveContainer.classList.remove("d-none");
        notesContainer.classList.add("d-none");
    }
})


//adding notes to notes list
notesEditorContainer.addEventListener("click",(event)=>{
    let contentKey=event.target.dataset.key;
    let content=notes.value.trim();
    let title=notesTitle.value.trim();

    if(contentKey==="submit" && content!="" && title!=""){
        notesArray=[...notesArray,{title:title,content:content}]
        notes.value=notesTitle.value="";
        console.log(notesArray);
        localStorage.setItem("notesArray",JSON.stringify(notesArray));
        renderingNotes(notesArray);
    }
    
})

function renderingNotes(notes){
    notesContainer.innerHTML=notes.map(({title,content})=>
        `<div class="item">
            <h1>${title}</h1>
            <p>${content}</p>
         </div>`
    )

}


renderingNotes(notesArray);