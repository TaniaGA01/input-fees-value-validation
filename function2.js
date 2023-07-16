const getDecreaseBtn = document.querySelectorAll('#decreaseButton')
const getQuantityInput = document.querySelectorAll('.quantity-input')
const decreaseBtnsArray = Array.from(getDecreaseBtn)
const inputsArray = Array.from(getQuantityInput)
const regexExp = {
    inputNumber: /^[0-9]{0,2}$/
}

const fieldValidation = (regexExp, iElement) => {

    const decreaseButton = iElement.parentElement.querySelector('#decreaseButton')
    const increaseButton = iElement.parentElement.querySelector('#increaseButton')

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

const totalText = document.querySelector('#total')
let totalArray=[]
let total = '0'

for (const input of inputsArray) {
    
    const paragraph = input.parentElement.parentElement.parentElement.querySelector('#feePrice')
    const decreaseButton = input.parentElement.querySelector('#decreaseButton')
    const increaseButton = input.parentElement.querySelector('#increaseButton')
    const ticketFee = parseInt(input.attributes['data-montant'].value)
    
    const changePrice = () => {
        if(input.attributes['data-montant'].value === '0'){
            paragraph.innerHTML = 'Gratuit'
        }else if(input.value === '0' || input.value === '00' || input.value === ''){
            paragraph.innerHTML = ticketFee
        }
        else{
            paragraph.innerHTML = ticketFee * input.value
        }
    }
    changePrice()

    decreaseButton.addEventListener('click', () => {
        input.value--
        fieldValidation(regexExp.inputNumber, input);

        if(input.value === '0'){
            decreaseButton.classList.add('disabled')
            
            const index = totalArray.indexOf(ticketFee);
            const newTotalArray = totalArray.splice(ticketFee, index );
            totalArray = []
            totalArray = newTotalArray
            total = total - ticketFee
            totalText.innerHTML = total 
            
        }else{
            
            paragraph.innerHTML = parseInt(paragraph.innerHTML) - ticketFee

            const index = totalArray.indexOf(ticketFee);
            const newTotalArray = totalArray.toSpliced(index, 2, ticketFee);
            totalArray = []
            totalArray = newTotalArray
            total = total - ticketFee
            totalText.innerHTML = total  
        }

        changePrice() 
    })

    input.addEventListener('keyup', () => {
        fieldValidation(regexExp.inputNumber, input);
        changePrice()
    })
    input.addEventListener('change', () => {
        totalArray.push(parseInt(paragraph.innerHTML))
        total = totalArray.reduce((total, item) => total + item)
        totalText.innerHTML = total
    })
    
    increaseButton.addEventListener('click', () => {
        input.value++
        decreaseButton.classList.remove('disabled')
        fieldValidation(regexExp.inputNumber, input);
        

        if(input.value !== '0'){
            totalArray.push(ticketFee)
            total = totalArray.reduce((total, item) => total + item)
            totalText.innerHTML = total
        }
        
        changePrice()

    })
}