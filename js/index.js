function analyseData(hotelObj) {
    for (let i = 0; i < hotelObj.length; i++) {
        let div = document.getElementById('dataFetch')
        let h4=document.createElement('h4')
        let h6 =document.createElement('h6')
        let h5= document.createElement('h5')
        h4.innerHTML=`Hotel Name: ${hotelObj[i].hotelName}`;
        h6.innerHTML=`Location: ${hotelObj[i].location}`;
        h5.innerHTML=` Available Rooms: ${hotelObj[i].beds} Price Tag KSh:${hotelObj[i].price}`
        div.appendChild(h4)
        h4.appendChild(h6)
        h6.appendChild(h5)


    }


    }

let initialize = () => {
    let inputCity = document.getElementById('search_hotel')

    inputCity.addEventListener('submit', (e) => {
        e.preventDefault();
        let input = document.getElementById('city');
        fetch(`http://localhost:3000/${input.value}`)
            .then(response => response.json())
            .then(data => analyseData(data));

    })
}


document.addEventListener('DOMContentLoaded', initialize);