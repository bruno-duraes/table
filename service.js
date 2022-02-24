function handleSuppliers() {
    let searchSuppliers = document.querySelector('#search-supplier-radio')
    let registerSuppliers = document.querySelector('#register-supplier-radio')
    let registerSupplierArea = document.querySelector('#register-supplier')
    let searchSupplierArea = document.querySelector('#search-supplier')
    let registerInputs = registerSupplierArea.querySelectorAll('input')
    let searchInputs = searchSupplierArea.querySelectorAll('input')

    if (searchSuppliers.checked) {
        registerSupplierArea.setAttribute('hidden', 'hidden')
        searchSupplierArea.removeAttribute('hidden')
        document.querySelector('#select-supplier').removeAttribute('disabled')
        // desabilitando os inputs do cadastro de novo fornecedor
        for (let i = 0; i < registerInputs.length; i++) {
            const element = registerInputs[i];
            element.setAttribute('disabled', 'disabled')
        }

        // habilitando os inputs da busca por fonecedor no sistema
        for (let i = 0; i < searchInputs.length; i++) {
            const element = searchInputs[i];
            element.removeAttribute('disabled')
        }
    } else if (registerSuppliers.checked) {
        registerSupplierArea.removeAttribute('hidden')
        searchSupplierArea.setAttribute('hidden', 'hidden')

        // desabilitando os inputs do cadastro de novo fornecedor
        searchSupplierArea.querySelector('select').setAttribute('disabled', 'disabled')
        for (let i = 0; i < searchInputs.length; i++) {
            const element = searchInputs[i];
            element.setAttribute('disabled', 'disabled')
        }

        // habilitando os inputs do cadastro de novo fornecedor
        for (let i = 0; i < registerInputs.length; i++) {
            const element = registerInputs[i];
            element.removeAttribute('disabled')
        }
    }
}

let myHeaders = new Headers();
myHeaders.append("user", "bruno.dbs");
myHeaders.append("pass", "Teste@2021@");
myHeaders.append("encryptionType", "0");
myHeaders.append("Content-Type", "aplication/json");

let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("https://seniormsc.mainhardt.com.br:8181/API/G5Rest?server=https://seniormsc.mainhardt.com.br:8181&module=sapiens&service=com_platform_fornecedor&port=consultafornecedor", requestOptions)

    .then(response => response.text())

    .then(result => {
        let suppliers = JSON.parse(result).tabela
        arrSupp = suppliers
        console.log(suppliers)

        for (let i = 0; i < suppliers.length; i++) {
            const supplier = suppliers[i];
            const { nomfor } = supplier

            let option = document.createElement('option')
            option.setAttribute('id', `supplier-${i}`)
            option.innerHTML = nomfor
            let select = document.querySelector('#select-supplier')
            select.appendChild(option)
        }

    })

    .catch(error => console.log('error', error))


function handleSelectSupplier(ev) {

    fetch("https://seniormsc.mainhardt.com.br:8181/API/G5Rest?server=https://seniormsc.mainhardt.com.br:8181&module=sapiens&service=com_platform_fornecedor&port=consultafornecedor", requestOptions)

        .then(response => response.text())

        .then(result => {
            let suppliers = JSON.parse(result).tabela
            const selectedIndex = ev.options[ev.selectedIndex].index - 1

            let selectedSupplier = suppliers[selectedIndex]

            document.querySelector('#supplier-input-cep').value = selectedSupplier.cepfor
            document.querySelector('#supplier-input-city').value = selectedSupplier.cidfor
            document.querySelector('#supplier-input-uf').value = selectedSupplier.sigufs
            document.querySelector('#supplier-input-address').value = selectedSupplier.endfor
            document.querySelector('#supplier-input-neighborhood').value = selectedSupplier.baifor
            document.querySelector('#supplier-input-email').value = selectedSupplier.intnet
            document.querySelector('#supplier-input-tel').value = selectedSupplier.fonfor
        })

        .catch(error => console.log('error', error))
}
