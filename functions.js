const getDecreaseBtn = document.querySelectorAll('#decreaseButton')
const getQuantityInput = document.querySelectorAll('.quantity-input')
const decreaseBtnsArray = Array.from(getDecreaseBtn)
const inputsArray = Array.from(getQuantityInput)
const regexExp = {
    inputNumber: /^[0-9]{0,2}$/
}

const fieldValidation = (regexExp, iElement) => {

    const decreaseButton = iElement.parentElement.children.decreaseButton
    const increaseButton = iElement.parentElement.children.increaseButton

    if(iElement.value === '0') {
        decreaseButton.classList.add('disabled');
        increaseButton.classList.remove('disabled');
    }else if (iElement.value === ``){
        decreaseButton.classList.add('disabled');
        increaseButton.classList.remove('disabled');
    }else if(iElement.value[0] === '0') {
        iElement.value = '0'
        decreaseButton.classList.add('disabled');
    }else if(regexExp.test(iElement.value)) {
        decreaseButton.classList.remove('disabled');
    }else {
        iElement.value = '0'
        decreaseButton.classList.add('disabled');
    }
}

for (const decreaseBtn of decreaseBtnsArray) {
    decreaseBtn.classList.add('disabled')
}

for (const input of inputsArray) {
    
    const paragraph = input.parentElement.parentElement.parentElement.children.feePrice
    const decreaseButton = input.parentElement.children.decreaseButton
    const increaseButton = input.parentElement.children.increaseButton
    
    
    const changePrice = () => {
        if(input.attributes['data-montant'].value === '0'){
            paragraph.innerHTML = 'Gratuit'
        }else if(input.value === '0' || input.value === '00' || input.value === ''){
            paragraph.innerHTML = input.attributes['data-montant'].value + '€ TTC'
        }
        else{
            paragraph.innerHTML = input.attributes['data-montant'].value * input.value + '€ TTC'
        }
    }
    changePrice()

    decreaseButton.addEventListener('click', () => {
        input.value--
        if(input.value === '0'){
            decreaseButton.classList.add('disabled')
        }
        changePrice()
    })

    input.addEventListener('keyup', () => {
        fieldValidation(regexExp.inputNumber, input);
        changePrice()
    })
    
    increaseButton.addEventListener('click', () => {
        input.value++
        decreaseButton.classList.remove('disabled')
        changePrice()
    })
}



