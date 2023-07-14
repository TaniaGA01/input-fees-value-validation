const getDecreaseBtn = document.querySelectorAll('#decrease')
const getQuantityInput = document.querySelectorAll('.quantity-input')
const getIncreaseBtn = document.querySelectorAll('#increase')
const getFeePriceParagraph = document.querySelectorAll('#feePrice')

const decreaseBtnsArray = Array.from(getDecreaseBtn)
const inputsArray = Array.from(getQuantityInput)

const regexExp = {
    inputNumber: /^[0-9]{0,2}$/
}

const fieldValidation = (regexExp,iElement) => {

    if(iElement.value === '0') {
        iElement.parentElement.parentElement.lastElementChild.classList.add(`visually-hidden`);
        iElement.parentElement.firstElementChild.classList.add('disabled');
        iElement.parentElement.lastElementChild.classList.remove('disabled');
    }else if (iElement.value === ``){
        iElement.value = '0'
        iElement.parentElement.parentElement.lastElementChild.classList.add(`visually-hidden`);
        iElement.parentElement.firstElementChild.classList.add('disabled');
        iElement.parentElement.lastElementChild.classList.remove('disabled');
    }else if(regexExp.test(iElement.value)) {
        iElement.parentElement.parentElement.lastElementChild.classList.add(`visually-hidden`);
        iElement.parentElement.firstElementChild.classList.remove('disabled');
    }else {
        iElement.value = '0'
        iElement.parentElement.parentElement.lastElementChild.classList.remove(`visually-hidden`);
        iElement.parentElement.firstElementChild.classList.add('disabled');
        setTimeout(() => {
            iElement.parentElement.parentElement.lastElementChild.classList.add(`visually-hidden`)
        }, 3000);
    }
}

for (const input of inputsArray) {

    const paragraph = input.parentElement.parentElement.parentElement.children.feePrice
    if(input.attributes['data-montant'].value === '0'){
        paragraph.innerHTML = 'Gratuit'
    }else{
        paragraph.innerHTML = input.attributes['data-montant'].value + '€ TTC'
    }

    decreaseBtnsArray.forEach(decreaseBtn => {
        decreaseBtn.classList.add('disabled')
    })

    const changePrice = () => {
        if(input.attributes['data-montant'].value === '0'){
            paragraph.innerHTML = 'Gratuit'
        }else{
            paragraph.innerHTML = input.attributes['data-montant'].value * input.value + '€ TTC'
        }
    }

    input.nextElementSibling.addEventListener('click', () => {
        input.value++
        input.previousElementSibling.classList.remove('disabled')
        changePrice()
    })
    
    input.previousElementSibling.addEventListener('click', () => {
        input.value--
        changePrice()
    })

    input.addEventListener('change', () => {
        fieldValidation(regexExp.inputNumber, input);
        if(input.attributes['data-montant'].value !== NaN){
            changePrice()
        }
    })
}



