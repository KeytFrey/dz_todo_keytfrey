let form = document.querySelector ('form')
let inp = document.querySelector('input')
let txtar = document.querySelector('textarea')
let btnAdd = document.querySelector('.btnAdd')
let btnSave_one = document.querySelector('.btnSave_one')
let btnSave_two = document.querySelector('.btnSave_two')

// function dragdrop(ol, item) {




//     // itemli.addEventListener('dragstart', dragstart)
//     // itemli.forEach(item => {
//     //     item.draggable = 'true'
//     //     ol.addEventListener('dragover', dragover)
//     //     ol.addEventListener('dragenter', dragenter)
//     //     ol.addEventListener('dragleave', dragleave)
//     //     ol.addEventListener('drop', dragdrop)
//     })
// }

btnAdd.addEventListener('click', () => {
    btnAdd.style.display = 'none'
    form.style.display = 'block'
})

function addItem(ol, {name, text}) {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(`${name}`))
    ol.appendChild(li)

    let p = document.createElement('div')
    p.innerHTML = text
    li.appendChild(p)

    let btnDel = document.createElement('button')
    btnDel.appendChild(document.createTextNode('[x]'))
    btnDel.classList.add('btnDel')
    li.appendChild(btnDel)

    li.style.background = 'azure'


}

// function dragstart(event) {
//     event.target.classList.add('hold')
//     setTimeout(() => event.target.classList.add('hide'), 0)
// }

// function dragend(event) {
//     event.target.className = 'itemli'
// }

// function dragover(event) {
//     event.preventDefault()
// }

// function dragenter(event) {
//     event.target.classList.add('hovered')
// }

// function dragleave(event) {
//     event.target.classList.remove('hovered')
// }

// function dragdrop(event) {
//     event.target.classList.remove('hovered')
//     event.target.appendChild(ol)
// }


function addlist(ol, data) {
    data.addEventListener('click', (event) => {
        event.preventDefault();
        let a = {'name': inp.value, 'text': txtar.value}
        if (inp.value !== '' &&  txtar.value !== '') {
            addItem(ol, a)
        } else {
            alert ('Поля не заполнены!')
        }
        inp.value = ''
        txtar.value = ''
    })

    ol.addEventListener('click', ({target}) => {
        if(Array.prototype.slice.call(target.classList).indexOf('btnDel') >= 0) {
            target.parentNode.remove();
        }
    })
}

Promise.all([
    fetch("http://127.0.0.1:5500/list_one.json").then(res => res.json()),
    fetch("http://127.0.0.1:5500/list_two.json").then(res => res.json())
]).then(([list1, list2]) => {

    let ol1 = document.querySelector('.list_one')
    list1.forEach(item => addItem(ol1, item))

    let ol2 = document.querySelector('.list_two')
    list2.forEach(item => addItem(ol2, item))

    addlist(ol1, btnSave_one)
    addlist(ol2, btnSave_two)


    let itemli = document.querySelectorAll('li')
    itemli.forEach(item => {
        item.draggable = 'true'
        ol1.addEventListener('dragstart', (event) => {
            event.target.classList.add('hold')
            setTimeout(() => event.target.classList.add('hide'), 0)
        })

        ol1.addEventListener('dragover', (event) => {
            event.preventDefault();
        })

        ol1.addEventListener('drop', (event) => {
            event.target.closest('ol1')
            event.target.appendChild(ol2)
        })

        ol2.addEventListener('dragstart', (event) => {
            event.target.classList.add('hold')
            setTimeout(() => event.target.classList.add('hide'), 0)
        })

        ol2.addEventListener('dragover', (event) => {
            event.preventDefault();
        })

        ol2.addEventListener('drop', (event) => {
            event.target.closest('ol2')
            event.target.appendChild(ol1)
        })
    })
 })




