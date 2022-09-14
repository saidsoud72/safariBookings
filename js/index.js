document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('comment_form').addEventListener('submit', commentInput)
});

//click event for the getstarted button
document.getElementById('btn').addEventListener('click', () => alert('We are delighted to have you as our customer'))


//fetching hotel data from the JSON server and printing them on the html

//function to print the searched hotels on the html
function fetchHotelsDetails(hotelObj) {
  for (let i = 0; i < hotelObj.length; i++) {
    let div = document.getElementById('dataFetch')
    let h4 = document.createElement('h4')
    let h6 = document.createElement('h6')
    let h5 = document.createElement('h5')
    h4.innerHTML = `Hotel Name: ${hotelObj[i].hotelName}`;
    h6.innerHTML = `Location: ${hotelObj[i].location}`;
    h5.innerHTML = ` Available Rooms: ${hotelObj[i].beds} Price Tag KSh:${hotelObj[i].price}`
    let bookNow=document.createElement('button')
    bookNow.innerHTML='Book Now'
    div.appendChild(h4)
    h4.appendChild(h6)
    h6.appendChild(h5)
    h5.appendChild(bookNow)
    bookNow.addEventListener('click',()=>alert('Thank you, your booking Has been Received,Your Hotel ID is 4370'))
  }
}

//function to GET hotels details from the JSON server
let inputCity = document.getElementById('btn1')
inputCity.addEventListener('click', (e) => {
  e.preventDefault();
  let input = document.getElementById('city');

  fetch(`http://localhost:3000/${input.value}`)
    .then(response => response.json())
    .then(data => fetchHotelsDetails(data))

})

//fetching and sending comments to the JSON server as well as  printing them out
//as the customer ratings on the html
function commentInput(e) {
  e.preventDefault();
  console.log(e.target.comment_input.value)
  let commentEntered = {
    comment: e.target.comment_input.value,
  }
  postComment(commentEntered)
  outputComments(commentEntered)
}

//function  to GET posted comments from the JSON server and printing them on the html
function fetchComment() {
  fetch('http://localhost:3000/comments')
    .then(resp => resp.json())
    .then(commentsObtain => outputComments(commentsObtain))

}
function postComment(commentEntered) {
  return fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(commentEntered)
    })
    .then(response => response.json())
    .then(comment => console.log(comment))

}

function outputComments(comment) {
  comment.forEach(com => {
    const ul = document.getElementById('rating_comments');
    const li = document.createElement('li')
    li.innerHTML += com.comment;
    ul.appendChild(li)
  })
}

//function to fetch user subcription details and post it to the JSON server
document.getElementById('subcribe_section').addEventListener('submit',users)
function users(e){
e.preventDefault()
let userEmail={
  userEmail:e.target.newsletter_subscribe.value,
}
enterEmail(userEmail)
}
function enterEmail(enteredMail){
  fetch('http://localhost:3000/users',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      Accept:'application/json'
    },
    body:JSON.stringify(enteredMail)
  })
  .then(res=>res.json())
}

function init() {
  fetchComment()
}
init()