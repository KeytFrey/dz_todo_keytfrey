let form = document.querySelector ('form')
let inp = document.querySelector('input').value
let txtar = document.querySelector('textarea').value
let btnAdd = document.querySelector('.btnAdd')
let btnSave = document.querySelector('.btnSave')

fetch("http://127.0.0.1:5500/list.json").then(async (res) => {
    let data = await res.json()
    for(let i=0; i<data.length; i++) {
        let item = data[i]
    }

    data.forEach((item) => {
        let ol = document.querySelector('.list')
        let li = document.createElement('li')
        let p = document.createElement('div')
        let btnDel = document.createElement('button')
        btnDel.appendChild(document.createTextNode('[x]'))
        li.appendChild(document.createTextNode(item.name))
        p.appendChild(document.createTextNode(item.text))
        btnDel.classList.add('btnDel')

        btnDel.addEventListener('click', () => {
        li.remove(ol)
        })

        btnAdd.addEventListener('click', () => {
            btnAdd.style.display = 'none'
            form.style.display = 'block'
        })

        btnSave.addEventListener('click', () => {
            li.appendChild(document.createTextNode(inp))
            p.appendChild(document.createTextNode(txtar))
            li.parentNode.appendChild(ol)
        })

        li.style.background = 'azure'

        li.appendChild(btnDel)
        li.appendChild(p)
        ol.appendChild(li)

    })
})



