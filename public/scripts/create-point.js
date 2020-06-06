function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) =>  res.json())
    .then( states => {

        for ( const state of states) {
            ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`
        }
        
    })
    
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) =>  res.json())
    .then( cities => {
       

        for ( const city of cities) {
            citySelect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//itens de coleta

const itemsToCollet = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollet) {
    item.addEventListener("click", handleSelectedItem)


}

const colletctedItems = document.querySelectorAll("input[name=itens]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    itemLi.classList.toggle("selected")
    const itemID = itemLi.dataset.id
    

    //verifica itens selecionados
    const alereadySelected = selectedItems.findIndex( function(item){
        const itemFound = item === itemID

    })

    if (alereadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemDifferent = item != itemID
            return itemDifferent
        })

        selectedItems = filteredItems
    }else{
        selectedItems.push[itemID]
    }

    //atualiza o campo escondido com items selecionados
    colletctedItems.value = selectedItems

}