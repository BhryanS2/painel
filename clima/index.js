const utils = {
  getValues() {
    cidade = document.querySelector("#cidade").value
    const estado = document.querySelector("#estado").value
    return { cidade, estado }
  },

  StrinfForURL(ArrayString) {
    var stringFinal = ""
    for (let letras in ArrayString) {
      if (ArrayString[letras] == " ") ArrayString[letras] = "%20"
      stringFinal += ArrayString[letras]
    }
    return stringFinal
  },

  StringTreatment(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/, "A")
    str = str.replace(/[àáâãäå]/, "a")
    str = str.replace(/[ÈÉÊË]/, "E")
    str = str.replace(/[Ç]/, "C")
    str = str.replace(/[ç]/, "c")
    str = str.replace(/[ã]/, "a")
    // o resto

    return str
  },

  ModfyString(cidade) {
    let [...citystring] = this.StringTreatment(cidade)
    return this.StrinfForURL(citystring)
  },

  GetDateForComparation() {
    let momentoAtual = new Date()
    let json = momentoAtual.toLocaleDateString()
    let string = json.toString()
    string = string.split("/")

    let day = string.shift()
    let month = string.shift()
    return `${day}/${month}`
  },

  isToday(dia) {
    let comparation = utils.GetDateForComparation()
    return (dia == comparation)
  },

}

const Weekdays = {
  Dom() {
    return "Domingo"
  },
  Seg() {
    return "Segunda"
  },
  Ter() {
    return "Terça"
  },
  Qua() {
    return "Quarta"
  },
  Qui() {
    return "Quinta"
  },
  Sex() {
    return "Sexta"
  },
  Sab() {
    return "Sábado"
  }
}

const Search = {
  isCityExist(cidade) {
    //dias.results.forecast[dia].date
    if (localStorage.getItem(cidade)) {
      //é do mesmo dia?
      const DataJson = JSON.parse(localStorage.getItem(cidade))
      const day = DataJson.results.forecast[0].date;
      return utils.isToday(day)

    } else return false
  },
  async Busca(cidadeURL) {
    const { estado, cidade } = utils.getValues();
    if (this.isCityExist(cidade)) {
      return JSON.parse(localStorage.getItem(cidade))
    } else {
      const result = await fetch(`https://server-tempo.herokuapp.com/weather/${cidadeURL}/${estado}`)
        .then(async response => {
          const Res = await response.json()
            localStorage.setItem(cidade, JSON.stringify(Res))
            return Res
        })
        .catch(e => {
          alert(e)
          throw new Error('Não foi possivel fazer a busca')
        })
      return result
    }
  },
}

const setClimate = {
  storm() {
    return `<img src="./svg/Chuva.svg">`
  },
  cloud() {
    return `<img src="./svg/Nuvem.svg" class="cloud-IMG" />`
  },
  clear_day() {
    return `<img src="./svg/Sol.svg">`
  },
  cloudly_day() {
    return `<img src="./svg/Nublado.svg">`
  },
  rain() {
    return `<img src="./svg/Tempestade.svg">`
  },
}

const RenderInScreen = {
  setlaoding(loading) {
    if (loading === true) {
      let loadingEl = `<h1>carregando..., carregando...</h1>
      <div class="card-deck m-0">
          <li class="card0">
              <div class="data">carregando...</div>
              <div class="descricao">carregando...
                  <img src="./svg/Loading.svg">
              </div>

              <div class="temp">
                  <span>Máxima: <span class="max">carregando...°C</span></span>
                  <span>Mínima: <span class="min">carregando...C</span></span>
              </div>
              <div class="dia">Dia da semana: carregando...</div>
          </li>
          <li class="card1">
              <div class="data">Dia:carregando...</div>
              <div class="descricao">carregando...
                  <img src="./svg/Loading.svg">
              </div>

              <div class="temp">
                  <span>Máxima: <span class="max">carregando...°C</span></span>
                  <span>Mínima: <span class="min">carregando...C</span></span>
              </div>
              <div class="dia">Dia da semana: carregando...</div>
          </li>
          <li class="card2">
              <div class="data">Dia:carregando...</div>
              <div class="descricao">carregando...

                  <img src="./svg/Loading.svg">
              </div>

              <div class="temp">
                  <span>Máxima: <span class="max">carregando...°C</span></span>
                  <span>Mínima: <span class="min">carregando...C</span></span>
              </div>
              <div class="dia">Dia da semana: carregando...</div>
          </li>
          <li class="card3">
              <div class="data">Dia:carregando...</div>
              <div class="descricao"> Parcialmente nublado
                  <img src="./svg/Loading.svg">
              </div>
              <div class="temp">
                  <span>Máxima: <span class="max">carregando...°C</span></span>
                  <span>Mínima: <span class="min">carregando...C</span></span>
              </div>
              <div class="dia">Dia da semana: carregando...</div>
          </li>
          <li class="card4">
              <div class="data">Dia:carregando...</div>
              <div class="descricao"> Parcialmente nublado

                  <img src="./svg/Loading.svg">
              </div>
              <div class="temp">
                  <span>Máxima: <span class="max">carregando...°C</span></span>
                  <span>Mínima: <span class="min">carregando...C</span></span>
              </div>
              <div class="dia">Dia da semana: carregando......</div>
          </li>
      </div>
    `
      const ul = document.querySelector('ul')
      ul.innerHTML = (loadingEl)
    }
  },

  MostarTempo(dias, cityName, state) {

    let list = ""
    //pega dados do users
    for (let dia = 0; dia < 5; dia++) {
      const clima = dias.results.forecast[dia].condition
      const data = dias.results.forecast[dia].date
      const description = dias.results.forecast[dia].description
      const max = dias.results.forecast[dia].max
      const min = dias.results.forecast[dia].min
      const weekday = utils.StringTreatment(dias.results.forecast[dia].weekday)
      const istoday = utils.isToday(data)

      list += `
      <li class="card${dia}">
        <div class="data">${istoday ? "Hoje" : data}</div>
        <div class="descricao">
          ${description}
          ${setClimate[clima]()}
        </div>
        <div class="temp">
          <span>Máxima:
            <span class="max">${max}°C</span>
          </span>
          <span>Mínima:
            <span class="min">${min}°C</span>
          </span>
        </div>
        <div class="dia">Dia da semana: ${Weekdays[weekday]()}</div>
      </li>`
    }

    document.querySelector("ul").innerHTML = `
    <h1>${cityName}, ${state}</h1>
    <div class = "card-deck m-0">${list}</div>
    `
  },

}


async function init(cidade, estado) {
  try {
    RenderInScreen.setlaoding(true)
    let cidadeURL = utils.ModfyString(cidade)
    const data = await Search.Busca(cidadeURL)
    RenderInScreen.MostarTempo(data, cidade, estado)
    RenderInScreen.setlaoding(false)
  } catch (error) {
    alert(error.message)
  }
}

function reload() {
  const { cidade, estado } = utils.getValues()
  init(cidade, estado)
}

