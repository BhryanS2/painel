async function MostarTempo() {
    let cidade = document.querySelector("#cidade").value
    let estado = document.querySelector("#estado").value
    
    try {
        const response = await fetch (`http://localhost:8000/`)
        //console.log(response)
        const data = await response.json()

        View(data)
    } catch (error) {
        console.log(error)
    }
}

MostarTempo()

function View(dias){

     let list = ''
    //pega dados do users
    for(let dia = 0; dia < 10; dia++){
        list += `
        
        <li>dia: ${dias.results.forecast[dia].date} </li>
        <li>condição: ${dias.results.forecast[dia].description} </li>
        <li>máxima: ${dias.results.forecast[dia].max} </li>
        <li>mínima: ${dias.results.forecast[dia].min} </li>
        <li>dia da semana: ${dias.results.forecast[dia].weekday}</li>
        <br><br>
        `
    }
    console.log(dias)

     document.querySelector('ul').innerHTML = `<h1>${dias.results.city}</h1>` + list
}