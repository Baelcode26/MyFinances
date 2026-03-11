
let addRevenueBtn = document.querySelector('.add-revenue');
let addExpensesBtn = document.querySelector('.add-expenses');


let popupAddRevenue = document.querySelector('.popup-add-value');
let popupAddExpense = document.querySelector('.popup-add-expense');


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