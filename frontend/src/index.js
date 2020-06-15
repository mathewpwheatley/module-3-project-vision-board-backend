const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const BOARDS_URL = `${BASE_URL}/boards`
const GOALS_URL = `${BASE_URL}/goals`

document.addEventListener("DOMContentLoaded", function() {

  // Testing, can be deleted
  buildBoardCard(52)
  // Testing, can be deleted
})

function buildBoardCard(boardId) {
  // Fetch board information
  fetch(BOARDS_URL + "/" + boardId).then(resp => resp.json()).then(function(json) {
    const board = json.data
    
    // Build board card elements
    const boardCard = document.createElement("div")
    boardCard.id = "board"
    boardCard.setAttribute("board_id", boardId)
    boardCard.style.background = `url(assets/${board.attributes.background})`
    
    const boardTitle = document.createElement("h2")
    boardTitle.id = "board-title"
    boardTitle.innerText = board.attributes.title

    const goalsGrid = document.createElement("div")
    goalsGrid.id = "goals-grid"

    // Assemble board card elements
    boardCard.append(boardTitle)
    boardCard.append(goalsGrid)
    document.querySelector("main").append(boardCard)
  })
}

{/* <div class="card">
  <img src="img_avatar.png" alt="Avatar" style="width:100%">
  <div class="container">
    <h4><b>John Doe</b></h4>
    <p>Architect & Engineer</p>
  </div>
</div> */}