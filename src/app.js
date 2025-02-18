import './script/components/index.js'
// import './script/data/inputData.js'
// import './script/data/data.js'
import './style/style.css'
import './script/api/fetching.js'

const toggleForm = document.querySelector('#toggleForm')
const form = document.querySelector('form')
toggleForm.addEventListener('click', () => {
    form.classList.toggle('aktif')
})


