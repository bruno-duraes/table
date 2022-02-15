// this.workflowCockpit = workflowCockpit({
//     init: _loadData,
//     onSubmit: _saveData,
//     onError: _rollback
// });

let arrayId = []

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

function addData() {

    let rowsLenght = document.querySelector('#tbody').children.length

    if (rowsLenght < 10) {
        let qntdV = document.querySelector('#qntd').value
        let nameV = document.querySelector('#name').value
        let unitValueV = document.querySelector('#unit-value').value
        let idV = getId()
        console.log(idV, arrayId)

        let tbody = document.querySelector('#tbody')

        let row = document.createElement('tr')
        row.setAttribute('id', `row${idV}`)

        let qntd = document.createElement('td')
        qntd.innerHTML = `<input type="text" class="td-input qntd" value="${qntdV}" readonly>`

        let name = document.createElement('td')
        name.innerHTML = `<input type="text" class="td-input name" value="${nameV}" readonly>`

        let unitValue = document.createElement('td')
        unitValue.innerHTML = `<input type="text" class="td-input unit-value" value="R$${unitValueV}" readonly>`

        let totalValue = document.createElement('td')
        totalValue.innerHTML = `<input type="text" class="td-input total-value" value="R$${calculateTotalValue(qntdV, unitValueV)}" readonly>`

        let btn = document.createElement('td')
        btn.innerHTML = `<div class="table-btns">
        <i class="bi bi-pencil-square" id="edit-btn" onclick="editLine(${idV})"></i>
        <i class="bi bi-x-square-fill" id="delete-btn" onclick="deleteLine(${idV})"></i>
        </div>`
        btn.setAttribute('style', 'padding: 0')

        tbody.appendChild(row)
        row.appendChild(qntd)
        row.appendChild(name)
        row.appendChild(unitValue)
        row.appendChild(totalValue)
        row.appendChild(btn)

        // idNumber++

        //  Limpando os campos
        document.querySelector('#qntd').value = ''
        document.querySelector('#name').value = ''
        document.querySelector('#unit-value').value = ''

        function calculateTotalValue(num1, num2) {

            if (num2.toString().indexOf(',') > 0) {
                num1 = parseInt(num1.replace(",", "."))
                num2 = parseFloat(num2.replace(",", "."))
                let result = num1 * num2
                resultDecimal = `${Math.round(parseFloat(result.toString().split('.')[1].split('').slice(0, 2).join('.')))}${0}`
                resultInt = result.toString().split('.')[0]
                result = `${resultInt},${resultDecimal}`
                return result.toString()
            } else {
                return num1 * num2
            }
        }

    } else {
        alert('Numero de linhas excedido ☺')
    }
}

function deleteLine(i) {

    document.querySelector(`#row${i}`).remove()
    arrayId.splice(arrayId.indexOf(i), 1)
}

function editLine(obj) {

    let allElements = document.querySelector(`#row${obj}`).children

    if (allElements[0].children[0].hasAttribute('readonly')) {
        for (let i = 0; i < 4; i++) {

            let element = allElements[i].children
            element[0].removeAttribute('readonly')
        }
    } else {
        for (let i = 0; i < 4; i++) {

            let element = allElements[i].children
            element[0].setAttribute('readonly', 'readonly')
        }
    }

}
