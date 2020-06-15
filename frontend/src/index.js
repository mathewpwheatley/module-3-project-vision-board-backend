const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const BOARDS_URL = `${BASE_URL}/boards`
const GOALS_URL = `${BASE_URL}/goals`

document.addEventListener("DOMContentLoaded", function() {

  // Testing, can be deleted
  buildBoardCard(151)
  // Testing, can be deleted
})

function buildBoardCard(boardId) {
  // Fetch board information
  fetch(BOARDS_URL + "/" + boardId).then(resp => resp.json()).then(function(json) {
    const board = json.data
    
    // Build board card elements
    const boardCard = document.createElement("div")
    boardCard.id = "board-card"
    boardCard.setAttribute("board_id", boardId)
    boardCard.style.background = `url(assets/${board.attributes.background})`
    
    const boardTitleCard = document.createElement("div")
    boardTitleCard.id = "board-title-card"
    const boardTitle = document.createElement("h2")
    boardTitle.id = "board-title"
    boardTitle.innerText = board.attributes.title
    boardTitleCard.append(boardTitle)

    const goalsGrid = document.createElement("div")
    goalsGrid.id = "goals-grid"
    board.attributes.goals.forEach(function(goal) {
      // goalsGrid.append(buildGoalCard(goal))
    })

    // Assemble board card elements
    boardCard.append(boardTitleCard)
    boardCard.append(goalsGrid)
    document.querySelector("main").append(boardCard)
  })
}