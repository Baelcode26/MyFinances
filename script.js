// Seleção dos botões de abrir popups
let addRevenueBtn = document.querySelector('.add-revenue');
let addExpensesBtn = document.querySelector('.add-expenses');

// Elementos dos Popups
let popupAddRevenue = document.querySelector('.popup-add-value');
let popupAddExpense = document.querySelector('.popup-add-expense');

// --- VARIÁVEIS DE SOMA (Globais) ---
let totalRevenueSum = 0;
let totalExpensesSum = 0;
let totalRevenueElement = document.querySelector('.revenue-info h1');
let totalExpenseElement = document.querySelector('.expenses-info h1')

// --- LÓGICA DE ABRIR/FECHAR POPUPS ---

addRevenueBtn.addEventListener('click', () => {
    popupAddRevenue.classList.add('popup-open');
});

let closeRevenueBtns = popupAddRevenue.querySelectorAll('.close-popup, .cancel-button');
closeRevenueBtns.forEach((button) => {
    button.addEventListener("click", () => {
        popupAddRevenue.classList.remove('popup-open');
    });
});

addExpensesBtn.addEventListener('click', () => {
    popupAddExpense.classList.add('popup-open');
});

let closeExpenseBtns = popupAddExpense.querySelectorAll('.close-popup-expense, .cancel-expense');
closeExpenseBtns.forEach((button) => {
    button.addEventListener("click", () => {
        popupAddExpense.classList.remove('popup-open');
    });
});

// --- SALVAR RECEITAS E ATUALIZAR TOTAL ---

//area revenue
let saveButton = document.querySelector(".save-button");
let nomeRevenue = document.querySelector("#nome");
let valorRevenue = document.querySelector('#valor');
let dateRevenue = document.querySelector('#date');

//area expenses
let saveButtonExpenses = document.querySelector(".save-expense");
let nomeExpense = document.querySelector('#nome-despesa');
let valorExpense = document.querySelector('#valor-despesa');
let categoryExpense = document.querySelector('#categoria-despesa');
let dateExpense = document.querySelector('#date-despesa')



saveButtonExpenses.addEventListener("click", () => {
    let expenseAddArea = document.querySelector(".expenses-add-area");
    let nome = nomeExpense.value;
    let valorExp = valorExpense.value;
    let category = categoryExpense.value;
    let data = dateExpense.value;

    if (nome === "" || valorExp === "" || category === "" || data === "") {
        alert("Por favor, preencha todos os campos da receita.");
        return;
    }

    let valorConvertido = parseFloat(valorExp.replace(',', '.'));
    
    if (isNaN(valorConvertido)) {
        alert("Digite um valor numérico válido.");
        return;
    }

    totalExpensesSum += valorConvertido;

    totalExpenseElement.innerText = totalExpensesSum.toLocaleString('pt-br', {minimumFractionDigits: 2});

     let novosElementos = `
        <div class="item">${nome}</div>
        <div class="item">R$ ${valorConvertido.toLocaleString('pt-br', {minimumFractionDigits: 2})}</div>
        <div class="item">${category}</div>
        <div class="item">${data}</div>
    `;

    expenseAddArea.insertAdjacentHTML('beforeend', novosElementos);

    nomeExpense.value = "";
    valorExpense.value = "";
    categoryExpense.value = "";
    dateExpense.value = "";

    popupAddExpense.classList.remove('popup-open');

})

saveButton.addEventListener("click", () => {
    let addArea = document.querySelector(".revenue-add-area");

    let nome = nomeRevenue.value;
    let valorRaw = valorRevenue.value;
    let data = dateRevenue.value;

    // Validação básica
    if (nome === "" || valorRaw === "" || data === "") {
        alert("Por favor, preencha todos os campos da receita.");
        return;
    }

    // 1. Tratamento do valor para cálculo
    // Substitui vírgula por ponto para o JS entender como número decimal
    let valorConvertido = parseFloat(valorRaw.replace(',', '.'));

    if (isNaN(valorConvertido)) {
        alert("Digite um valor numérico válido.");
        return;
    }

    // 2. Atualizar a soma no topo
    totalRevenueSum += valorConvertido;
    // Formata o número para o padrão de moeda (ex: 1.500,00)
    totalRevenueElement.innerText = totalRevenueSum.toLocaleString('pt-br', {minimumFractionDigits: 2});

    // 3. Adicionar na lista (planilha)
    let novosElementos = `
        <div class="item">${nome}</div>
        <div class="item">R$ ${valorConvertido.toLocaleString('pt-br', {minimumFractionDigits: 2})}</div>
        <div class="item">${data}</div>
    `;

    addArea.insertAdjacentHTML('beforeend', novosElementos);

    // 4. Limpar e fechar
    nomeRevenue.value = "";
    valorRevenue.value = "";
    dateRevenue.value = "";

    popupAddRevenue.classList.remove('popup-open');
});