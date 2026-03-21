let selectCategorias = [
    {id: 'cartao', nome: 'cartão', cor: '#e30613'},
    {id: 'casa', nome: 'casa', cor: '#fff200'},
    {id: 'automovel', nome: 'automovel', cor: '#019468'},
    {id: 'mercado', nome: 'mercado', cor: '#ff2a00'},
    {id: 'outros', nome: 'outros', cor: '#c508ff'},
];

let listaDespesas = [];

function preencherSelect(){
    const select = document.querySelector('#categoria-despesa');

    selectCategorias.forEach(cat =>{
        select.insertAdjacentHTML('beforeend', `<option value="${cat.id}">${cat.nome}</option>`)
    })
    }
    preencherSelect()



function formatarDataBR(dataEstrangeira) {
    if (!dataEstrangeira) return "--/--/----";
    
    // Divide a string "2024-03-15" em ["2024", "03", "15"]
    const partes = dataEstrangeira.split('-');
    
    // Retorna no formato brasileiro: "15/03/2024"
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

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
    //seleção de elementos da planilha
    let expenseAddArea = document.querySelector(".expenses-add-area");
    let nome = nomeExpense.value;
    let valorExp = valorExpense.value;
    let category = categoryExpense.value;
    let data = dateExpense.value;
   
    let dataFormatada = formatarDataBR(data);


    const categoriaEncontrada = selectCategorias.find(cat => cat.id === category);

    // 2. Agora pegue a cor (ou uma cor padrão caso não ache)
    const corParaExibir = categoriaEncontrada ? categoriaEncontrada.cor : '#ccc';

    //seleção dos elementos do grafico
    let higherExpenseArea = document.querySelector(".higher-expenses-area");
   


    //logica para adicionar a planilha
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
        <div class="item">${dataFormatada}</div>
    `;

    //logica para adicionar ao grafico

     graphcText.innerText = `R$${totalExpensesSum.toLocaleString('pt-br', {minimumFractionDigits: 2})}`

     let novosElementosGraficoHigher = `
        <div class="higher-expenses-info">
            <div class="simbol-with-name-expenses">
                <div class="simbol" style="background-color: ${corParaExibir};"></div>
                <h2 class="name">${nome}</h2>
            </div>
                <h2 class="value">R$${valorConvertido.toLocaleString('pt-br', {minimumFractionDigits: 2})}</h2>
                <h2 class="maturity">VEN ${dataFormatada}</h2>
        </div>
     `;




    expenseAddArea.insertAdjacentHTML('beforeend', novosElementos);
    higherExpenseArea.insertAdjacentHTML('beforeend', novosElementosGraficoHigher);

    listaDespesas.push({
        nome: nome,
        valor: valorConvertido,
        dataPura: data, 
        cor: corParaExibir
    })

    updateDates()
    atualizarGrafico()

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

    let dataFormatada = formatarDataBR(data);

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
        <div class="item">${dataFormatada}</div>
    `;

    addArea.insertAdjacentHTML('beforeend', novosElementos);


    // 4. Limpar e fechar
    nomeRevenue.value = "";
    valorRevenue.value = "";
    dateRevenue.value = "";

    popupAddRevenue.classList.remove('popup-open');
});



//area do grafico

 let graphcText = document.querySelector(".center-text");

function updateDates (){
    let nearingExpensesArea = document.querySelector(".nearing-expenses-area");

    nearingExpensesArea.innerHTML = `
        <h1 class="nearing-expenses-titulo">Mais Próximos do Vencimento</h1>
        <div class="nearing-expense-description">
            <h1>Nome</h1><h1>Valor</h1><h1>Vencimento</h1>
        </div>
    `;

    let listaOrdenada = [...listaDespesas].sort((a, b)=> new Date(a.dataPura) - new Date(b.dataPura)) ;

    listaOrdenada.slice(0, 5).forEach(despesa => {

        let html = `
            <div class="nearing-expenses-info">
                <div class="nearing-simbol-with-name-expenses">
                    <div class="simbol" style="background-color: ${despesa.cor};"></div>
                    <h2 class="name">${despesa.nome}</h2>
                </div>
                <h2 class="value">R$${despesa.valor.toLocaleString('pt-br', {minimumFractionDigits: 2})}</h2>
                <h2 class="maturity">VEN ${formatarDataBR(despesa.dataPura)}</h2>
            </div>
        `;
        nearingExpensesArea.insertAdjacentHTML('beforeend', html);
    })
}


function atualizarGrafico() {
    let circleElement = document.querySelector(".graphc-circle");

    // 1. Se não houver despesas, deixa o gráfico cinza (vazio)
    if (totalExpensesSum === 0) {
        circleElement.style.background = `
            radial-gradient(circle, #ffffff 55%, transparent 56%),
            conic-gradient(#e0e0e0 0% 100%)
        `;
        return;
    }

    // 2. Agrupar os valores por cor
    // Vamos somar quanto foi gasto em cada cor para criar as fatias
    let gastosPorCor = {};
    
    listaDespesas.forEach(despesa => {
        if (gastosPorCor[despesa.cor]) {
            gastosPorCor[despesa.cor] += despesa.valor;
        } else {
            gastosPorCor[despesa.cor] = despesa.valor;
        }
    });

    // 3. Construir as fatias do conic-gradient
    let fatiasGradiente = [];
    let porcentagemAcumulada = 0; // O nosso "bastão de revezamento"

    for (let cor in gastosPorCor) {
        let valorDaCor = gastosPorCor[cor];
        
        // Descobre quantos % essa cor representa do total (Regra de 3)
        let tamanhoDaFatia = (valorDaCor / totalExpensesSum) * 100;
        
        let inicioFatia = porcentagemAcumulada;
        let fimFatia = porcentagemAcumulada + tamanhoDaFatia;

        // Monta o texto no padrão do CSS (ex: "#e30613 0% 25%")
        fatiasGradiente.push(`${cor} ${inicioFatia}% ${fimFatia}%`);

        // Atualiza o bastão para a próxima cor começar de onde essa terminou
        porcentagemAcumulada = fimFatia; 
    }

    // 4. Junta todas as fatias com vírgula
    let textoConicGradient = `conic-gradient(${fatiasGradiente.join(', ')})`;

    // 5. Injeta o novo background no CSS da sua div
    circleElement.style.background = `
        radial-gradient(circle, #ffffff 55%, transparent 56%),
        ${textoConicGradient}
    `;
}