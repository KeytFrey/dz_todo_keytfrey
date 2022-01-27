let form = document.querySelector ('form')
let ol = document.querySelector('.list')
let inp = document.querySelector('input')
let txtar = document.querySelector('textarea')
let btnAdd = document.querySelector('.btnAdd')
let btnSave_one = document.querySelector('.btnSave_one')
let btnSave_two = document.querySelector('.btnSave_two')


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

Promise.all([
    fetch("http://127.0.0.1:5500/list_one.json").then(res => res.json()),
    fetch("http://127.0.0.1:5500/list_two.json").then(res => res.json())
]).then(([list1, list2]) => {

    let ol1 = document.querySelector('.list_one')
    list1.forEach(item => addItem(ol1, item))

    let ol2 = document.querySelector('.list_two')
    list2.forEach(item => addItem(ol2, item))

    ol1.addEventListener('click', ({target}) => {
        if(Array.prototype.slice.call(target.classList).indexOf('btnDel') >= 0) {
            target.parentNode.remove();
        }
    });

    ol2.addEventListener('click', ({target}) => {
        if(Array.prototype.slice.call(target.classList).indexOf('btnDel') >= 0) {
            target.parentNode.remove();
        }
    });

    btnAdd.addEventListener('click', () => {
        btnAdd.style.display = 'none'
        form.style.display = 'block'
    })

    btnSave_one.addEventListener('click', (event) => {
        event.preventDefault();
        let a = {'name': inp.value, 'text': txtar.value}
        if (inp.value !== '' &&  txtar.value !== '') {
            addItem(ol1, a)
        } else {
            alert ('Поля не заполнены!')
        }
        inp.value = ''
        txtar.value = ''
    })

    btnSave_two.addEventListener('click', (event) => {
        event.preventDefault();
        let a = {'name': inp.value, 'text': txtar.value}
        if (inp.value !== '' &&  txtar.value !== '') {
            addItem(ol2, a)
        } else {
            alert ('Поля не заполнены!')
        }
        inp.value = ''
        txtar.value = ''
    })
})



