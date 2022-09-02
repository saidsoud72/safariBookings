document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('comment_form').addEventListener('submit', commentInput)
  });
function fetchHotelsDetails(hotelObj) {
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
    function commentInput(e){
     e.preventDefault();
     console.log(e.target.comment_input.value)
     let commentEntered={
         comment:e.target.comment_input.value,
     }
     postComment(commentEntered)
     outputComments(commentEntered)
    }
    function fetchComment(){
        fetch('http://localhost:3000/comments')
        .then(resp=>resp.json())
        .then(commentsObtain=>outputComments(commentsObtain))
      
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
function outputComments(comment){
        comment.forEach(com=>{
        const ul = document.getElementById('rating_comments');
        const li = document.createElement('li')
        li.innerHTML += com.comment;
        ul.appendChild(li)
        })
      }



    let inputCity = document.getElementById('search_hotel')
    inputCity.addEventListener('submit', (e) => {
        e.preventDefault();
        let input = document.getElementById('city');
        fetch(`http://localhost:3000/${input.value}`)
            .then(response => response.json())
            .then(data => fetchHotelsDetails(data));

    })

function init(){
    fetchComment()
}
init()