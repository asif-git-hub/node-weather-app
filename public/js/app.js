console.log("Client side js file loaded")

const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weather_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading..'
    msg2.textContent = ''
    let url = 'http://localhost:3000/weather?address=' + location;
        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = data.error
                } else {
                    msg1.textContent = data.forecast
                    msg2.textContent = data.address
                }
            })
        })
})