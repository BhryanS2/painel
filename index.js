//document.querySelector('button').addEventListener("submit", MostarTempo())

async function MostarTempo() {
    let cidade =  document.querySelector("#cidade").value
    let estado =  document.querySelector("#estado").value
    console.log(cidade + " " + estado)
    await fetch(`https://server-tempo.herokuapp.com/weather/${cidade}/${estado}`)
    .then( async response => {
        const data = await response.json()
        alert("sua cidade esta a procura")
        View(data)
    })
    .catch(error => {
        alert(error)
    })
   
}

// MostarTempo()
function View(dias) {
    let momentoAtual = new Date()
    let json = momentoAtual.toLocaleDateString()
    let string = json.toString()
    string = string.split("/")

    let day = string.shift()
    let month = string.shift()
    let comparation = `${day}/${month}`
    // console.log(comparation)

    let list = ''
    let clima = []
    let data = []
    let description = []
    let max = []
    let min = []
    let weekday = []
    //pega dados do users
    for (let dia = 0; dia < 5; dia++) {
        clima.push(dias.results.forecast[dia].condition)
        data.push(dias.results.forecast[dia].date)
        description.push(dias.results.forecast[dia].description)
        max.push(dias.results.forecast[dia].max)
        min.push(dias.results.forecast[dia].min)
        weekday.push(dias.results.forecast[dia].weekday)
        //console.log(clima, data, description, max, min, weekday)
        
        if(data[dia] == comparation){
            list += `
            <li class = 'card${dia}'>
                <div class='data'>Hoje</div>
                <div class='descricao'> ${description[dia]}  
            `
        }else{
            list += `
            <li class = 'card${dia}'>
                <div class='data'>Dia: ${data[dia]}</div>
                <div class='descricao'> ${description[dia]}    
            `
        }

        if (clima[dia] == 'storm' || clima[dia] == 'rain') {
            list += `
                <img src="./img/chuva.svg">
            </div> 
            `
        }else if (clima[dia] == 'cloud') {
            list += `
                <img src="./img/nuvem.svg">
            </div> 
            `
        }else if (clima[dia] == 'clear_day') {
            list += `
                <img src="./img/sol.svg">
            </div>
            `
        }else if (clima[dia] === 'cloudly_day') {
            list += `
                <img src="./img/nublado.svg">
            </div>
            `
        } else {
            list += `</div>`
        }

        
        list += `
            <div class="temp">
                <span>Máxima: <span class='max'>${max[dia]}°C</span></span>
                <span>Mínima: <span class='min'> ${min[dia]}°C</span></span>
            </div>
            <div class='dia'>Dia da semana: ${weekday[dia]}</div><br>
        </li>
        `
    }
    //console.log(dias)

    document.querySelector('ul').innerHTML = `
    <h1>${dias.results.city}</h1>
    <div class = 'card-deck m-0'>${list}</div>
    `
}

