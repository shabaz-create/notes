let navbar=document.querySelector("#navbar");
let notesContainer=document.querySelector(".notes-container");
let notesArchiveContainer=document.querySelector(".notes-archive-container")
let notesEditorContainer=document.querySelector(".notes-editor-container");
let notesTitle=document.querySelector("#notes-title");
let notes=document.querySelector("#notes-content");
let main=document.querySelector(".main");
let pinnedContainer=document.querySelector(".notes-pinned-container");
let notesArray=JSON.parse(localStorage.getItem("notesArray"))||[];
// let container=document.querySelector(".container");
renderingNotes(notesArray);
// let button=document.querySelector(".hidden-buttons")


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
        let id=Date.now();
        notesArray=[...notesArray,{id:id,title:title,content:content,isArchived:false,isPinned:false}]
        notes.value=notesTitle.value="";
        console.log(notesArray);
        localStorage.setItem("notesArray",JSON.stringify(notesArray));
        renderingNotes(notesArray);
    }
    
})


main.addEventListener("click",(event)=>{
    let key=event.target.dataset.key;
    let item=event.target.closest('.item')
    if(item){
        let id=item.id;
    if(key==="delete"){
        notesArray=notesArray.filter((element)=>element.id.toString()!=id);
        localStorage.setItem("notesArray",JSON.stringify(notesArray));
    }
    // console.log(item)
    if(item){
    if (key === "archive") {
        notesArray = notesArray.map((element) => {
            if (id == element.id) {
                return {
                    id: element.id,
                    title: element.title,
                    content: element.content,
                    isArchived: !element.isArchived,
                    isPinned:element.isPinned
                };
            }else{
                return (element)
                
            }
        });
        localStorage.setItem("notesArray", JSON.stringify(notesArray));
    }
}
    if (key === "pin") {
        notesArray = notesArray.map((element) => {
            if (id == element.id) {
                return {
                    id: element.id,
                    title: element.title,
                    content: element.content,
                    isArchived: element.isArchived,
                    isPinned:!element.isPinned
                };
            }else{
                    return (element)
                
            }
        });
        localStorage.setItem("notesArray", JSON.stringify(notesArray));
    }
    renderingNotes(notesArray);
}
})

function renderingNotes(notes) {
    console.log(notes);
    notesContainer.innerHTML = notes.map(({id, title, content, isArchived,isPinned}) => {
        if (!isArchived && !isPinned) {
            return `<div class="item" id=${id}>
                        <span class="item-delete-button-container">
                            <h1>${title}</h1>
                            <button class="hidden-buttons" data-key="delete">delete</button>
                        </span>
                        <div class="item-extra-buttons-container">
                            <p>${content}</p>
                            <span>
                                <button class="" data-key="pin">pin</button>
                                <button class="" data-key="archive">archive</button>
                            </span>
                        </div>
                    </div>`;
        }
    }).join("");

    notesArchiveContainer.innerHTML = notes.map(({id, title, content, isArchived,isPinned}) => {
        if (isArchived) {
            return `<div class="item" id=${id}>
                        <span class="item-delete-button-container">
                            <h1>${title}</h1>
                            <button class="hidden-buttons" data-key="delete">delete</button>
                        </span>
                        <div class="item-extra-buttons-container">
                            <p>${content}</p>
                            <span>
                                <button class="" data-key="pin">pin</button>
                                <button class="" data-key="archive">archive</button>
                            </span>
                        </div>
                    </div>`;
        }
    }).join("");

    pinnedContainer.innerHTML = notes.map(({id, title, content, isArchived,isPinned}) => {
        if (isPinned) {
            return `<div class="item" id=${id}>
                        <span class="item-delete-button-container">
                            <h1>${title}</h1>
                            <button class="hidden-buttons" data-key="delete">delete</button>
                        </span>
                        <div class="item-extra-buttons-container">
                            <p>${content}</p>
                            <span>
                                <button class="" data-key="pin">pin</button>
                                <button class="" data-key="archive">archive</button>
                            </span>
                        </div>
                    </div>`;
        }
    }).join("");
}


renderingNotes(notesArray);