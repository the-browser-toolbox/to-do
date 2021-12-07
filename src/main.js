
//navbar section Starts


window.addEventListener('resize', function(){
    addRequiredClass();
})


function addRequiredClass() {
    if (window.innerWidth < 860) {
        document.body.classList.add('mobile')
    } else {
        document.body.classList.remove('mobile') 
    }
}

window.onload = addRequiredClass

let hamburger = document.querySelector('.hamburger')
let mobileNav = document.querySelector('.nav-list')

let bars = document.querySelectorAll('.hamburger span')

let isActive = false

hamburger.addEventListener('click', function() {
    mobileNav.classList.toggle('open')
    if(!isActive) {
        bars[0].style.transform = 'rotate(45deg)'
        bars[1].style.opacity = '0'
        bars[2].style.transform = 'rotate(-45deg)'
        isActive = true
    } else {
        bars[0].style.transform = 'rotate(0deg)'
        bars[1].style.opacity = '1'
        bars[2].style.transform = 'rotate(0deg)'
        isActive = false
    }
    

})

//navbar section Ends


let id = 0
let list = []

chrome.storage.sync.get('todo', (storage) => {
    if (storage.todo) {
        if (storage.todo.length > 0) {
            list = storage.todo
            id = list[list.length - 1].id + 1

            list.map((list) => addListItem(list.value))
        }
    }
})

document.querySelector('#add-task').addEventListener('click', async () => {
    const element = document.querySelector('#task-value')
    const value = element.value

    if (!value) {
        return
    }

    element.value = ''

    list.push({ id, value })

    chrome.storage.sync.set({ todo: list }, () => addListItem(value))

    id++
})

document.querySelector('#list').addEventListener('click', function (e) {
    setTimeout(() => {
        var text = e.target.parentNode.textContent
        text = text.replace('X', '')
        list = list.filter((item) => item.value !== text)
        chrome.storage.sync.set({ todo: list })
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    }, 1000)
})

function addListItem(value) {
    const element = document.createElement('li')
    const span = document.createElement('span')
    element.setAttribute('draggable', true)
    element.classList.add('list-group-item', 'text-capitalize', 'd-flex', 'justify-content-between', 'my-2')
    span.style.color = 'red'
    span.style.fontWeight = '900'
    span.style.cursor = 'pointer'
    element.textContent = value
    span.textContent = 'X'
    element.appendChild(span)
    document.querySelector('#list').appendChild(element)
}


