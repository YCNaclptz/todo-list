let listState = [];

const STATE_KEY = 'todo-list';

function loadState(){
    const listState = localStorage.getItem(STATE_KEY);
    if (listState !== null){
        return JSON.parse(listState);
    }
    return [];
}

function saveState(){
    localStorage.setItem(STATE_KEY, JSON.stringify(listState));
}

function initList(){
    listState = loadState();

    const ul = document.getElementById('list');
    for (const item of listState){
        const newItem = document.createElement('li');
        newItem.textContent = item.text;
        newItem.onclick = checkItem;
        if (item.checked){
            newItem.classList.add('checked');
        }
        const deleteButton = document.createElement('span');
        deleteButton.classList.add('delete');
        deleteButton.onclick = deleteItem;
        newItem.appendChild(deleteButton);

        newItem.classList.add('item');
        if(item.checked){
            newItem.classList.add('checked');
        }
        ul.appendChild(newItem);
    }

}

function addItem(){
    const ul = document.getElementById('list');
    const input = document.getElementById('input');
    const text = input.value;
    if(!text){
        alert('請輸入內容');
        return;
    }

    const newItem = document.createElement('li');
    newItem.textContent = text;
    newItem.onclick = checkItem;

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete');
    deleteButton.onclick = deleteItem;
    newItem.appendChild(deleteButton);

    input.value = '';
    ul.appendChild(newItem);

    listState.push({text: text, checked: false});
    saveState();
}

function checkItem(){
    const item = this;
    item.classList.toggle('checked');
    const idx = [...item.parentElement.children].indexOf(item);
    listState[idx].checked = !listState[idx].checked;
    saveState();
}
function deleteItem(e){
    e.stopPropagation();
    
    const item = this.parentElement;
    const idx = [...item.parentElement.children].indexOf(item);
    listState.splice(idx, 1);
    item.remove();
    saveState();
}
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addItem);

initList();