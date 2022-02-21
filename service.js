function handleSuppliers() {

    let searchSuppliers = document.querySelector('#search-supplier-radio')
    let registerSuppliers = document.querySelector('#register-supplier-radio')
    let registerSupplierArea = document.querySelector('#register-supplier')


    if (searchSuppliers.checked) {
        console.log('buscar')
        registerSupplierArea.setAttribute('hidden', 'hidden')
    } else if (registerSuppliers.checked) {
        console.log('registrar')
        registerSupplierArea.removeAttribute('hidden')
    }
}

let myHeaders = new Headers();
myHeaders.append("user", "bruno.dbs");
myHeaders.append("pass", "Teste@2021@");
myHeaders.append("encryptionType", "0");
myHeaders.append("Content-Type", "aplication/json");
myHeaders.append("Authorization", "OdHaofBjUmmflLCwqzmbYppt9yJKZ8aT")

let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

const data = fetch("http://seniormsc.mainhardt.com.br:8888/API/G5Rest?server=http://seniormsc.mainhardt.com.br:8888&module=sapiens&service=com_platform_fornecedor&port=consultafornecedor", requestOptions)

    .then(response => response.text())

    .then(result => {
        let suppliers = JSON.parse(result).tabela
        console.log(suppliers)


        for (let i = 0; i < suppliers.length; i++) {
            const supplier = suppliers[i];
            const { nomfor } = supplier

            let option = document.createElement('option')

            // preencher o select com os nomes dos fornecedores
        }


    })

    .catch(error => console.log('error', error))

