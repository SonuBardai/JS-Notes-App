let addBtn = document.getElementById("addBtn");
let addTxt = document.getElementById("addTxt");
let addTtl = document.getElementById("title");
let search = document.getElementById("search");

showNotes();

addBtn.addEventListener("click", function (e) {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let obj;
    let ttl;
    if (notes == null) {
        obj = [];
        ttl = [];
    } else {
        obj = JSON.parse(notes);
        ttl = JSON.parse(titles);
    }
    let giventext = addTxt.value;
    let giventtl = addTtl.value;
    if(giventext == "\n" || giventext == ""){
        giventext = "(no text)";
    }
    if(giventtl == "\n" || giventtl == ""){
        giventtl = "(no title)";
    }
    obj.push(giventext);
    ttl.push(giventtl);
    localStorage.setItem('notes', JSON.stringify(obj));
    localStorage.setItem('titles', JSON.stringify(ttl));

    addTtl.value = "";
    addTxt.value = "";
    showNotes();
});

function showNotes() {
    let notes = JSON.parse(localStorage.getItem('notes'));
    let titles = JSON.parse(localStorage.getItem('titles'));
    let noteContainer = document.getElementById('noteContainer');
    if (notes != null) {
        let html = "";
        for (i = 0; i < notes.length; i++) {
            html = html + `
        <div class="noteCards card mx-2 my-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title" id="title-${i}">${titles[i]}</h5>
            <p class="card-text" id="note-${i}">${notes[i]}</p>
            <button type="button" id="editbtn-${i}" onclick="editNote(${i})" class="btn btn-primary">Edit Note</button>
            <button type="button" onclick="delNote(${i})" class="btn btn-danger">Delete Note</button>
        </div>
        </div>
        `;
        }
        noteContainer.innerHTML = html;
    } else {
        noteContainer.innerHTML = "<b>No notes added yet</b>";
    }
}

let delNote = (i) => {
    let notes = JSON.parse(localStorage.getItem('notes'));
    let titles = JSON.parse(localStorage.getItem('titles'));
    notes.splice(i, 1);
    titles.splice(i, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('titles', JSON.stringify(titles));
    showNotes();
};

let editNote = (i) => {
    let notes =  JSON.parse(localStorage.getItem('notes'));
    let titles = JSON.parse(localStorage.getItem('titles'));
    let ttledit = document.getElementById("title-"+i);
    let textedit = document.getElementById("note-"+i);
    let flag = 0;
    ttledit.innerHTML = `<textarea id="editttl" class="form-control my-3">${titles[i]}</textarea>`
    textedit.innerHTML = `<textarea id="editnote" class="form-control my-3">${notes[i]}</textarea><br>
    <button type="button" id="confirm" class="btn btn-success">Confirm</button>`
    editbtn = document.getElementById("editbtn-"+i);
    editbtn.style.display="none"
    document.getElementById("confirm").addEventListener("click", ()=>{
        ttledit.innerText = editttl.value;
        titles[i] = ttledit.innerText; 
        textedit.innerText = editnote.value;
        notes[i] = textedit.innerText;
        localStorage.setItem('titles', JSON.stringify(titles));
        localStorage.setItem('notes', JSON.stringify(notes));
        editbtn.style.display = "inline-block"
    });
};

search.addEventListener("input", () => {
    input = search.value.toLowerCase(); 
    let noteCards = document.getElementsByClassName("noteCards");
    Array.from(noteCards).forEach((card)=>{
        title = card.getElementsByTagName('h5')[0].innerText.toLowerCase();
        note = card.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(title.includes(input) || note.includes(input)){
            card.style.display = 'block'
        } else {
            card.style.display = 'none'
        }
    });
});