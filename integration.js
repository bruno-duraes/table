this.workflowCockpit = workflowCockpit({
    init: _init,
    onSubmit: _saveData,
    onError: _rollback,
});

function _init(data, info) {
    const { intialVariables } = data.loadContext
    console.log(intialVariables)
    info.getUserData().then(
        (user) => {
            console.log('User:', user)
        }
    ).then(() => {
        info.getPlatformData().then(
            (platformData) => { console.log('Dados da plataforma:', platformData) }
        )
    })
    info.getInfoFromProcessVariables().then((processVar) => {
        if (!info.isRequestNew() && Array.isArray(processVar)) {

            let map = new Map()
            processVar.map(({ key, value }) => map.set(key, value))
            console.log('Loading...', map)

            // Preenchendo os campos do formulario
            let inputRadio = map.get('inputRadio')
            if (inputRadio == 'false') {
                console.log()
                document.querySelector('#register-supplier-radio').setAttribute('checked', 'checked')
                handleSuppliers()
            }
            document.querySelector('#setor-select').value = map.get('selSet')
            document.querySelector('#setor-select').value = map.get('selSet')
            searchOrRegister().querySelector('.nom-For').value = map.get('nomFor')
            searchOrRegister().querySelector('.cep-For').value = map.get('cepFor')
            searchOrRegister().querySelector('.cid-For').value = map.get('cidFor')
            searchOrRegister().querySelector('.uf-For').value = map.get('ufFor')
            searchOrRegister().querySelector('.end-For').value = map.get('endFor')
            searchOrRegister().querySelector('.bai-For').value = map.get('baiFor')
            searchOrRegister().querySelector('.email-For').value = map.get('emailFor')
            searchOrRegister().querySelector('.tel-For').value = map.get('telFor')


        }
    })

}

function _saveData() {
    isFormValid()

    let newData = {}

    newData.inputRadio = inputRadioSearch()
    newData.selSet = document.querySelector('#setor-select').value
    newData.nomFor = searchOrRegister().querySelector('.nom-For').value
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

function inputRadioSearch() {
    let searchRadio = document.querySelector('#search-supplier-radio')
    if (searchRadio.checked) {
        return true
    } else {
        return false
    }
}

function _rollback() {

}

// Validation
function isFormValid() {
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

    let checkbox = document.querySelector('#check-value')

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

                        handleChecked(checkbox)
                        disableAttributeReadonly()
                        form.classList.add('was-validated')
                        return (false)
                    }
                }
            }, false)
        })
}

