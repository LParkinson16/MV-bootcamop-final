const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')
const toDo = document.querySelector('#toDoDiv')



//unused function to add new columns
/*
const divGetter = document.querySelector('.containers')
function addFunction(){
let divAdd = document.createElement('div');
divAdd.classList.add("container");
//let text = document.createTextNode('Test');
//divAdd.appendChild(text);
divGetter.appendChild(divAdd);
}
*/

//unused function to delete elements
/*
function myFunction() {
  var myobj = document.querySelector(".draggable");
  myobj.remove();
}
*/

//unused function to create new draggable elements
/*
function newItem(){
  let pItem = document.createElement('p');
  pItem.classList.add('draggable');
  pItem.setAttribute("draggable", "true");
  toDo.appendChild(pItem)
}
*/

//making elements draggable
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
