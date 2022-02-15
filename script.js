function addData() {

    let idV = document.querySelector('.table').getElementsByTagName('tr').length
    let qntdV = document.querySelector('#qntd').value
    let nameV = document.querySelector('#name').value
    let unitValueV = document.querySelector('#unit-value').value

    console.log(idV, qntdV, nameV, document.querySelector('#tbody').getElementsByTagName('tr'))

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
    totalValue.innerHTML = `<input type="text" class="td-input total-value" value="R$${calculateTotalvalue(qntdV, unitValueV)}" readonly>`

    let btn = document.createElement('td')
    btn.innerHTML = `<div class="table-btns">
    <i class="bi bi-pencil-square" id="edit-btn"></i>
    <i class="bi bi-x-square-fill" id="delete-btn" onclick="deleteLine(${idV})"></i>
    </div>`
    btn.setAttribute('style', 'padding: 0')

    tbody.appendChild(row)
    row.appendChild(qntd)
    row.appendChild(name)
    row.appendChild(unitValue)
    row.appendChild(totalValue)
    row.appendChild(btn)

    //  Limpando os campos
    document.querySelector('#qntd').value = ''
    document.querySelector('#name').value = ''
    document.querySelector('#unit-value').value = ''

    function calculateTotalvalue(num1, num2) {
        num1 = parseFloat(num1.replace(",", "."))
        num2 = parseFloat(num2.replace(",", "."))
        let result = num1 * num2
        return result.toString().replace('.', ',')
    }
}


function deleteLine(i) {
    console.log(
        document.querySelector(`#row${i}`).remove()
    )
}



