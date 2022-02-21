this.workflowCockpit = workflowCockpit({
    //     init: _loadData,
    onSubmit: _saveData,
    //     onError: _rollback
});

let arrayId = []
let totalPrice = document.querySelector('#display-value').value

function getId() {

    let arrayStr = arrayId.toString().split(',')

    let n = 1
    while (arrayStr.indexOf(`${n}`) >= 0) {
        arrayStr.indexOf(`${n}`) === -1 ? arrayId.push(n) : null
        n++
    }
    arrayId.push(n)
    return n
}

function insertsValidation() {
    let requester = document.querySelector('#requester').value
    let quantity = document.querySelector('#qntd').value
    let description = document.querySelector('#name').value
    let unitValue = document.querySelector('#unit-value').value

    if (!quantity || !description || !unitValue || !requester) {
        return ("invalid")
    } {
        return ("valid")
    }
}

function shootModal(str) {
    let modal_el = document.querySelector(`#${str}`)
    let modal = new bootstrap.Modal(modal_el)
    modal.show()
}


function addData() {
    if (insertsValidation() == 'invalid') {
        shootModal('modal-insertValidation')
    }
    else {

        let rowsLenght = document.querySelector('#tbody').children.length

        if (rowsLenght < 10) {
            let requesterV = document.querySelector('#requester').value
            let qntdV = document.querySelector('#qntd').value
            let nameV = document.querySelector('#name').value
            let unitValueV = document.querySelector('#unit-value').value
            let idV = getId()

            let tbody = document.querySelector('#tbody')

            let row = document.createElement('tr')
            row.setAttribute('id', `row${idV}`)

            let requester = document.createElement('td')
            requester.innerHTML = `<div class="td-div" id="td-edit">
        <input id="input-requester-${idV}" type="text" class="td-input requester form-control" value="${requesterV}" readonly required>
        <div>`

            let qntd = document.createElement('td')
            qntd.innerHTML = `<div class="td-div" id="td-edit">
        <input id="input-qnt-${idV}" type="number" class="td-input qntd form-control" value="${qntdV}" min="0" readonly required>
        <div>`

            let name = document.createElement('td')
            name.innerHTML = `<div class="td-div" id="td-edit">
        <input id="input-name-${idV}" type="text" class="td-input name form-control" value="${nameV}" readonly required>
        </div`

            let unitValue = document.createElement('td')
            unitValue.innerHTML = `<div class="td-div" id="td-edit">
        <span style="padding-top: 3px">R$</span>
        <input id="input-unitValue-${idV}" type="text" class="td-input unit-value form-control" data-mask="0" value="${unitValueV}" readonly required>
        </div>`


            let totalValue = document.createElement('td')
            totalValue.innerHTML = `<div class="td-div" id="td-total-value">
        <span style="padding-top: 3px">R$</span>
        <input id="input-totalValue-${idV}" type="text" class="td-input total-value form-control" value="${calculateTotalValue(qntdV, unitValueV)}" readonly required>
        </div>`
            let btn = document.createElement('td')
            btn.innerHTML = `<div class="table-btns">
        <i class="bi bi-pencil-square" id="edit-btn" onclick="editLine(${idV})"></i>
        <i class="bi bi-x-square-fill" id="delete-btn" onclick="deleteLine(${idV})"></i>
        </div>`
            btn.setAttribute('style', 'padding: 0')

            tbody.appendChild(row)
            row.appendChild(requester)
            row.appendChild(qntd)
            row.appendChild(name)
            row.appendChild(unitValue)
            row.appendChild(totalValue)
            row.appendChild(btn)

            sumPrice(idV)
            showTotalPrice(totalPrice)

            //  Limpando os campos
            document.querySelector('#requester').value = ''
            document.querySelector('#qntd').value = ''
            document.querySelector('#name').value = ''
            document.querySelector('#unit-value').value = ''

            document.querySelector('#requester').focus()
        } else {
            shootModal('modal-maxLines')
        }
    }
}

function sumPrice(i) {
    let rowValue = parseFloat(document.querySelector(`#input-totalValue-${i}`).value.split(',').join('.'))
    totalPrice = parseFloat(totalPrice) + rowValue
}

function subtractPrice(i) {
    let rowValue = parseFloat(document.querySelector(`#input-totalValue-${i}`).value.split(',').join('.'))
    totalPrice = parseFloat(totalPrice) - rowValue
    showTotalPrice(totalPrice)
}

function showTotalPrice(totalPrice) {
    let strTotalPrice = totalPrice.toString()
    if (strTotalPrice.indexOf('.') > 0) {
        let beforeComma = strTotalPrice.split('.')[0]
        let afterComma = strTotalPrice.split('.')[1].split('').slice(0, 2).join('')
        document.querySelector('#display-value').value = `${beforeComma},${afterComma}`
    } else {
        document.querySelector('#display-value').value = `${totalPrice},00`
    }
}

function calculateTotalValue(qntd, price) {
    price = price.replace(',', '.')
    let result = (parseInt(qntd) * parseFloat(price)).toFixed(2)
    return result.replace('.', ',')
}

function deleteLine(i) {
    subtractPrice(i)
    document.querySelector(`#row${i}`).remove()
    arrayId.splice(arrayId.indexOf(i), 1)
}


function editLine(obj) {

    let allElements = document.querySelector(`#row${obj}`).children
    // console.log(allElements[0].querySelector('input'))
    if (allElements[0].querySelector('input').hasAttribute('readonly')) {
        for (let i = 0; i < 3; i++) {

            let element = allElements[i].querySelector('input')
            element.removeAttribute('readonly')
        }
    } else {
        for (let i = 0; i < 4; i++) {

            let element = allElements[i].children
            element[0].setAttribute('readonly', 'readonly')
        }
    }

}


// Validation Bootstrap
(function () {
    'use strict'

    function disableAttributeReadonly() {
        for (let i = 0; i < arrayId.length; i++) {
            const tr = document.querySelector(`#row${arrayId[i]}`)
            for (let x = 0; x < 3; x++) {
                const input = tr.children[x].querySelector('input');
                input.removeAttribute('readonly')
            }
        }
    }

    function tableLengthValidation() {

        let rows = document.querySelector('#tbody').children.length

        if (rows == 0) {
            return ('empty')
        }
    }


    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {

                if (tableLengthValidation() == 'empty') {
                    event.preventDefault()
                    shootModal('modal-tableLenghtValidation')
                } else {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    disableAttributeReadonly()

                    form.classList.add('was-validated')
                }
            }, false)
        })
})()

// Senior
function _saveData(data, info) {
    let newData = {}
}

// Mask

$(document).ready(() => {
    $('.money').mask('0000000,00', { reverse: true })
})