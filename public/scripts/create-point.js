// Cidades e estados vindos da API do IBGE
function urls (select, url) {
  fetch(url)
    .then( res => res.json() )
    .then( values => {
      for(const value of values) {
        if(url == "https://servicodados.ibge.gov.br/api/v1/localidades/estados")
          select.innerHTML += `<option value="${value.id}">${value.nome}</option>`;
        else
          select.innerHTML += `<option value="${value.nome}">${value.nome}</option>`;
        select.disabled = false;
      }
    });
}

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  urls(ufSelect, "https://servicodados.ibge.gov.br/api/v1/localidades/estados");
};

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;

  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;

  urls(citySelect, url);
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities);

// Itens de coleta selecionados
const itemsToCollect = document.querySelectorAll(".items-grid li");

for(const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target
  
  //Adicionar ou remover uma classe
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  //Verificar se existem itens selecionado e pega-los
  const alreadySelected = selectedItems.findIndex( item => item == itemId);

  //Se ja estiver selecionado
  if( alreadySelected >= 0 ) {
    //Tirar da seleção
    const filteredtems = selectedItems.filter( item => item != itemId);
    
    selectedItems = filteredtems;
  } else {
      //Se não estiver selecionado, adicionar a seleção
      selectedItems.push(itemId);

  }

  //Atualizar o campo escondido com os itens
  collectedItems.value = selectedItems;
}