
const getBanco = () => {
    return localStorage.getItem('todoList') ? JSON.parse( localStorage.getItem('todoList')) : [];    
}

const setBanco = Banco => {
    localStorage.setItem('todoList', JSON.stringify(Banco))
}

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('item-tarefa');

    item.innerHTML = `
        <input type="checkbox" ${status} data-indice="${indice}">
        <div class="tarefa">${tarefa}</div>
        <input type="button" value="X" data-indice="${indice}">
    `

   document.getElementById('lista-tarefas').appendChild(item)
}

const limparTela = () => {
    const lista_tarefas = document.getElementById('lista-tarefas');

    while(lista_tarefas.firstChild){
        lista_tarefas.removeChild(lista_tarefas.lastChild);
    }
}

const atualizarTela = () => {
    limparTela();
    const Banco = getBanco();
    Banco.forEach( (dados, indice) => criarItem(dados.tarefa, dados.status, indice) )
}

const inserirItem = (event) => {
    let tecla = event.key;
    let tarefa = event.target.value;
    //console.log(tarefa);
    //console.log(tecla);
    if(tecla === "Enter"){
        const Banco = getBanco();
        Banco.push({'tarefa':`${tarefa}`, 'status':''});
        setBanco(Banco)
        atualizarTela();
        event.target.value = '';
    }
}

const removeItem = indice => {
    const Banco = getBanco()
    Banco.splice(indice, 1);
    setBanco(Banco);
    atualizarTela();
}

const atualizarItem = indice => {
    const Banco = getBanco();
    Banco[indice].status = Banco[indice].status === "" ? "checked" : "";
    setBanco(Banco);    
}

const cliqueItem = (event) => {
    let element = event.target;
    let indice = event.target.dataset.indice;
    //console.log(element)
    if(element.type === "button"){
        removeItem(indice);
    }else if (element.type === "checkbox") {
        atualizarItem(indice);
    }
}

atualizarTela();

document.getElementById('nome-tarefa').addEventListener('keypress', inserirItem)
document.querySelector('#lista-tarefas').addEventListener('click', cliqueItem)

