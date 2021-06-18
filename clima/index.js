function getValues() {
  const cidade = document.querySelector("#cidade").value
  const estado = document.querySelector("#estado").value
  return { cidade, estado }
}

function StrinfForURL(ArrayString) {
  var stringFinal = ""
  for (let letras in ArrayString) {
    if (ArrayString[letras] == " ") ArrayString[letras] = "%20"
    stringFinal += ArrayString[letras]
  }
  return stringFinal
}

function StringTreatment(str) {
  str = str.replace(/[ÀÁÂÃÄÅ]/, "A")
  str = str.replace(/[àáâãäå]/, "a")
  str = str.replace(/[ÈÉÊË]/, "E")
  str = str.replace(/[Ç]/, "C")
  str = str.replace(/[ç]/, "c")
  str = str.replace(/[ã]/, "a")
  // o resto

  return str
}

function ModfyString(cidade) {
  let [...citystring] = StringTreatment(cidade)
  return StrinfForURL(citystring)
}

async function Busca(cidade) {
  const { estado } = getValues();
  const result = await fetch(`https://server-tempo.herokuapp.com/weather/${cidade}/${estado}`)
    .then(async response => {
      return await response.json()
    })
    .catch(error => {
      throw new Error('Não foi possivel fazer a busca')
    })
  return result
}

function setlaoding(loading) {
  if (loading === true) {
    let loadingEl = document.createElement('span')

    loadingEl.appendChild(document.createTextNode('carregando...'))

    loadingEl.setAttribute('id', 'loading')
    const ul = document.querySelector('ul')
    ul.appendChild(loadingEl)
  }
}

function GetDateForComparation() {
  let momentoAtual = new Date()
  let json = momentoAtual.toLocaleDateString()
  let string = json.toString()
  string = string.split("/")

  let day = string.shift()
  let month = string.shift()
  return `${day}/${month}`
}

function MostarTempo(dias, cityName, state) {
  let comparation = GetDateForComparation()

  let list = ""
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

    if (data[dia] == comparation) {
      list += `
        <li class = "card${dia}">
          <div class="data">Hoje</div>
          <div class="descricao"> ${description[dia]}`
    } else {
      list += `
      <li class = "card${dia}">
        <div class="data">Dia: ${data[dia]}</div>
        <div class="descricao"> ${description[dia]}
      `
    }
    if (clima[dia] == "storm") {
      list += `
          <img src="./img/chuva.svg">
      </div>
      `
    } else if (clima[dia] == "cloud") {
      list += `
          <img src="./img/nuvem.svg" class="cloud-IMG">
      </div>
      `
    } else if (clima[dia] == "clear_day") {
      list += `
          <img src="./img/sol.svg">
      </div>
      `
    } else if (clima[dia] === "cloudly_day") {
      list += `
          <img src="./img/nublado.svg">
      </div>
      `
    } else if (clima[dia] == "rain") {
      list += `
          <img src="./img/tempestade.svg">
      </div>
      `
    } else {
      list += `</div>`
    }

    list += `
      <div class="temp">
        <span>Máxima: <span class="max">${max[dia]}°C</span></span>
          <span>Mínima: <span class="min"> ${min[dia]}°C</span></span>
      </div>
      <div class="dia">Dia da semana: ${weekday[dia]}</div>
    </li>`
  }
  //console.log(dias)

  document.querySelector("ul").innerHTML = `
    <h1>${cityName}, ${state}</h1>
    <div class = "card-deck m-0">${list}</div>
    `
}

async function init() {
  try {
    setlaoding(true)
    const { cidade, estado } = getValues()
    let cidadeURL = ModfyString(cidade)
    const data = await Busca(cidadeURL)
    MostarTempo(data, cidade, estado)
    setlaoding(false)
  } catch (error) {
    alert(error.message)
  }
}
