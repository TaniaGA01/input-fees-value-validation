const getDecreaseBtn = document.querySelectorAll('#decrease')
const getQuantityInput = document.querySelectorAll('.quantity-input')
const getIncreaseBtn = document.querySelectorAll('#increase')

const decreaseBtnsArray = Array.from(getDecreaseBtn)
const inputsArray = Array.from(getQuantityInput)
const increaseBtnsArray = Array.from(getIncreaseBtn)

const regexExp = {
    inputNumber: /^[0-9]{0,2}$/
}

const decreaseQuantity = (iElement) => {
    iElement.parentElement.firstElementChild.addEventListener('click', () => { iElement.value-- })
}
const increaseQuantity = (iElement) => {
    iElement.parentElement.lastElementChild.addEventListener('click', () => { iElement.value++ })
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
    decreaseBtnsArray.forEach(decreaseBtn => {
        decreaseBtn.classList.add('disabled')
    })

    input.nextElementSibling.addEventListener('click', () => {
        input.value++
        input.previousElementSibling.classList.remove('disabled')
    })
    
    input.previousElementSibling.addEventListener('click', () => {
        input.value--
        if(input.value === '0'){
            input.previousElementSibling.classList.add('disabled')
        }
    })

    input.addEventListener('change', () => {
        fieldValidation(regexExp.inputNumber, input);
    })
}


