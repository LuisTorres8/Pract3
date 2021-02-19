//Por defecto la página carga España
var results = [];
fetch(`https://restcountries.eu/rest/v2/name/Spain`, {
        headers: {
            Accept: 'application/json'
        },
        method: 'GET'
    })
        .then(res => {
            console.log("Response here")
            return res.json()
    })
        .then(response => {
            results = response;
            console.log("Updating table");
            updateTable(); 
    })
        .catch(e => {
            console.error("Error " + e)
    })


//Hasta que se busca algo que se actualiza la información. Se permite la búsqueda por nombre o por acrónomimo del país. Si no hay ninguna coincidencia (número, símbolo...) sale una alerta.
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function(event){
  event.preventDefault();
    fetch(`https://restcountries.eu/rest/v2/name/${document.getElementById("search-input").value}`, {
        headers: {
            Accept: 'application/json'
        },
        method: 'GET'
    })
        .then(res => {
            console.log("Response here")
            return res.json()
    })
        .then(response => {
            results = response;
            console.log("Updating table");
            updateTable(); 
    })
        .catch(e => {
            console.error("Error " + e); 
            alert("Sorry, no results found, try again!"); 
    })
    return false;
  })

        function updateTable(){
            let html='';
            results.forEach(function(name, i){
                html+=
                '<tr>\n' +
                `        <th scope="row">${name.name}</th>\n` +
                `        <td>${name.capital} </td>\n` +
                `        <td>${name.population}  </td>\n` +
                `        <td>${name.timezones[0]}  </td>\n` +
                `        <td>${name.borders}  </td>\n` +
                `        <td>${name.region}  </td>\n` +
                `        <td>${name.nativeName}  </td>\n` +
                `        <td><img class= "name-flag" src="${name.flag}"> </td>`
                '</tr>';
            })
            document.getElementById("contenido-tabla").innerHTML = html;
        }