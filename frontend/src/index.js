const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const BOARDS_URL = `${BASE_URL}/boards`
const GOALS_URL = `${BASE_URL}/goals`

document.addEventListener("DOMContentLoaded", function() {

  // Testing, can be deleted
  buildBoardCard(152)
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
    boardCard.style.background = `url(assets/boards/${board.attributes.background})`

    const addGoalButton = document.createElement("button")
    addGoalButton.id = "add-goal-button"
    addGoalButton.setAttribute("board_id", boardId)
    addGoalButton.innerText = "Add Goal"
    addGoalButton.addEventListener("click", event => addGoal(event))
    
    const boardTitleCard = document.createElement("div")
    boardTitleCard.id = "board-title-card"

    const boardTitle = document.createElement("h2")
    boardTitle.id = "board-title"
    boardTitle.innerText = board.attributes.title

    const boardButtonsCard = document.createElement("div")
    boardButtonsCard.id = "board-buttons-card"

    const editBoardButton = document.createElement("button")
    editBoardButton.id = "edit-board-button"
    editBoardButton.innerText = "Edit Board"
    editBoardButton.addEventListener("click", event => editBoard(event.target))

    const deleteBoardButton = document.createElement("button")
    deleteBoardButton.id = "delete-board-button"
    deleteBoardButton.innerText = "Delete Board"
    deleteBoardButton.addEventListener("click", event => deleteBoard(boardId))

    const goalsGrid = document.createElement("div")
    goalsGrid.id = "goals-grid"
    board.attributes.goals.forEach(function(goal) {
      // goalsGrid.append(buildGoalCard(goal))
    })

    // Assemble board card elements
    boardTitleCard.append(addGoalButton)
    boardTitleCard.append(boardTitle)
    boardButtonsCard.append(editBoardButton)
    boardButtonsCard.append(deleteBoardButton)
    boardTitleCard.append(boardButtonsCard)
    boardCard.append(boardTitleCard)
    boardCard.append(goalsGrid)
    document.querySelector("main").append(boardCard)
  })
}

function buildBoardForm(target) {

  // Create form
  const boardForm = document.createElement("form")
  boardForm.id = "board-form"

  // Label form
  const formLabel = document.createElement("h2")
  if (!!target) {
    formLabel.innerText = "Edit Board"
  } else {
    formLabel.innerText = "New Board"
  }

  // Create from fields
  const titleCard = document.createElement("div")
  titleCard.className = "board-form-input"
  const titleLabel = document.createElement("p")
  titleLabel.innerText = "Title:"
  const titleInput = document.createElement("input")
  titleInput.name = "title"

  const categoryCard = document.createElement("div")
  categoryCard.className = "board-form-input"
  const categoryLabel = document.createElement("p")
  categoryLabel.innerText = "Category:"
  const categoryInput = document.createElement("input")
  categoryInput.name = "category"

  const backgroundCard = document.createElement("div")
  backgroundCard.className = "board-form-input"
  const backgroundLabel = document.createElement("p")
  backgroundLabel.innerText = "Background:"
  const backgroundInput = document.createElement("input")
  backgroundInput.setAttribute("type", "text")
  backgroundInput.name = "background"

  // Create from buttons
  const buttonCard = document.createElement("div")
  backgroundCard.className = "board-form-input"
  const cancelButton = document.createElement("button")
  cancelButton.innerText = "Cancel"
  cancelButton.addEventListener("click", event => document.querySelector("#new-edit-board-form").remove())
  const submitButton = document.createElement("button")
  submitButton.innerText = "Submit"
  submitButton.addEventListener("click", event => console.log(event))

  // Assemble form elements
  boardForm.append(formLabel)
  titleCard.append(titleLabel)
  titleCard.append(titleInput)
  boardForm.append(titleCard)
  categoryCard.append(categoryLabel)
  categoryCard.append(categoryInput)
  boardForm.append(categoryCard)
  backgroundCard.append(backgroundLabel)
  backgroundCard.append(backgroundInput)
  boardForm.append(backgroundCard)
  buttonCard.append(cancelButton)
  buttonCard.append(submitButton)
  boardForm.append(buttonCard)

  document.querySelector("main").append(boardForm)
}

function createBoard() {
  // Open form
  buildBoardForm()
  console.log("Functionality has not been written")
  // Write me!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

function editBoard(target) {
  buildBoardForm(target)
}

function deleteBoard(boardId) {
  // Confirm delete request
  if (confirm('Deleting a board will also delete all related goals. This action cannot be undone. Are you sure you want to delete this board?')) {
    // Setup delete request options
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
    // Send delete request to server
    fetch(BOARDS_URL + "/" + boardId, options).then(resp => resp.json()).then(function(json) {
      if (json.data.id == boardId) {
        // Delete board from DOM
        document.querySelector("#board-card").remove()
      }
    })
  }
}

function addGoal(clickEvent) {
  console.log(clickEvent.target.getAttribute("board_id"))
}