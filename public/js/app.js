console.log('This is javascript file')

const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()

    const address = searchValue.value
    message1.textContent = 'loading...'
    message2.textContent = ''
    const url = 'http://localhost:3000/weather?address='+address
    fetch(url).then((res) => {
        res.json().then((data) => {
            if (data.error) {
            message1.textContent = data.error
            } else{
            message1.textContent = data.location 
            message2.textContent = data.forecast
            }
        })
    })
    
})