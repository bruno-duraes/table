this.workflowCockpit = workflowCockpit({
    init: _init,
    onSubmit: _saveData,
    onError: _rollback
});

function _init(data, info) {

}

function _saveData() {

    let newData = {}

    newData.nomfor = searchOrRegister().querySelector('.nom-For').value
    newData.cepFor = searchOrRegister().querySelector('.cep-For').value
    newData.cidFor = searchOrRegister().querySelector('.cid-For').value
    newData.ufFor = searchOrRegister().querySelector('.uf-For').value
    newData.endFor = searchOrRegister().querySelector('.end-For').value
    newData.baiFor = searchOrRegister().querySelector('.bai-For').value
    newData.emailFor = searchOrRegister().querySelector('.email-For').value
    newData.telFor = searchOrRegister().querySelector('.tel-For').value

    // capturando os valores da tabela
    let tableRows = document.querySelector('#tbody').children
    for (let i = 0; i < tableRows.length; i++) {
        let id = i + 1
        newData[`tabSol-${id}`] = document.querySelector(`#input-requester-${id}`).value
        newData[`tabQnt-${id}`] = document.querySelector(`#input-qnt-${id}`).value
        newData[`tabDes-${id}`] = document.querySelector(`#input-name-${id}`).value
        newData[`tabUnV-${id}`] = document.querySelector(`#input-unitValue-${id}`).value
        newData[`tabToV-${id}`] = document.querySelector(`#input-totalValue-${id}`).value
    }
    newData.tabTot = document.querySelector('#display-value').value

    console.log(newData)
    return { formData: newData }
}

function searchOrRegister() {
    let searchRadio = document.querySelector('#search-supplier-radio')
    let registerRadio = document.querySelector('#register-supplier-radio')

    if (searchRadio.checked) {

        return document.querySelector('#search-supplier')

    } else if (registerRadio.checked) {

        return document.querySelector('#register-supplier')

    }
}

function _rollback() {

}