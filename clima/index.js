//document.querySelector('button').addEventListener("submit", MostarTempo())

async function MostarTempo() {
    const cidade =  document.querySelector("#cidade").value
    const estado =  document.querySelector("#estado").value
    // console.log('cidade do input \n'+cidade)

    let city = StringTreatment(cidade)
    // console.log('cidade da function \n'+city)

    let [...citystring] = city;

    let cityFinal = ''

    for(letras in citystring) {
        if(citystring[letras] == " "){
            citystring[letras] = '%20'
        }
        cityFinal += citystring[letras]
    }
    // console.log('cidade que vai ser passada na URL \n'+cityFinal)

    await fetch(`https://server-tempo.herokuapp.com/weather/${cityFinal}/${estado}`)
    .then( async response => {
        const data = await response.json()
        View(data, cidade, estado)
    })
    .catch(error => {
        alert(error)
    })
}

function StringTreatment(str){
    
    str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
    str = str.replace(/[àáâãäå]/,"a");
    str = str.replace(/[ÈÉÊË]/,"E");
    str = str.replace(/[Ç]/,"C");
    str = str.replace(/[ç]/,"c");
    str = str.replace(/[ã]/,"a")
    // o resto

    return str 
}

// MostarTempo()
function View(dias, cityName, state) {
    let momentoAtual = new Date()
    let json = momentoAtual.toLocaleDateString()
    let string = json.toString()
    string = string.split("/")

    let day = string.shift()
    let month = string.shift()
    let comparation = `${day}/${month}`
    console.log(comparation)

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

        if (clima[dia] == 'storm') {
            list += `
                <img src="./img/chuva.svg">
            </div> 
            `
        }else if (clima[dia] == 'cloud') {
            list += `
                <img src="./img/nuvem.svg" class='cloud-IMG'>
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
        } else if (clima[dia] == 'rain') {
            list += `
                <img src="./img/tempestade.svg">
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
            <div class='dia'>Dia da semana: ${weekday[dia]}</div>
        </li>
        `
    }
    //console.log(dias)

    document.querySelector('ul').innerHTML = `
    <h1>${cityName}, ${state}</h1>
    <div class = 'card-deck m-0'>${list}</div>
    `
}

