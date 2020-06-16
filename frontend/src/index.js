const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const BOARDS_URL = `${BASE_URL}/boards`
const GOALS_URL = `${BASE_URL}/goals`
const loginFormDiv = document.getElementById("login-form-div")
const signupFormDiv = document.getElementById("signup-form-div")
const loginForm = document.getElementById("login-form")
const signupForm = document.getElementById("signup-form")
const loginBtn = document.getElementById("loginButton")
const signupBtn = document.getElementById("signupButton")
const cancelBtns = document.querySelectorAll(".cancel")
const confirmSignup = document.getElementById("signup-submit")

////////////////////////////
// Board Functions: Start //
////////////////////////////

function fetchBoard(boardId) {
  fetch(BOARDS_URL + "/" + boardId).then(resp => resp.json()).then(json => buildBoardCard(json.data))
}

function buildBoardCard(board) {
  // Delete old board if it exists
  if (document.getElementById("board-card")) {
    document.getElementById("board-card").remove()
  }

  // Build board card elements
  const boardCard = document.createElement("div")
  boardCard.id = "board-card"
  boardCard.setAttribute("board-id", board.id)
  boardCard.style.background = `url(assets/boards/${board.attributes.background})`

  const boardHeader = document.createElement("div")
  boardHeader.id = "board-header"

  const addGoalButton = document.createElement("button")
  addGoalButton.id = "add-goal-button"
  addGoalButton.setAttribute("board-id", board.id)
  addGoalButton.innerText = "Add Goal"
  addGoalButton.addEventListener("click", event => addGoal(event))

  const boardTitleCard = document.createElement("div")
  boardTitleCard.id = "board-title-card"

  const boardTitle = document.createElement("h2")
  boardTitle.id = "board-title"
  boardTitle.innerText = board.attributes.title

  const boardCategory = document.createElement("h4")
  boardCategory.id = "board-category"
  boardCategory.innerText = board.attributes.category

  const boardButtonsCard = document.createElement("div")
  boardButtonsCard.id = "board-buttons-card"

  const editBoardButton = document.createElement("button")
  editBoardButton.id = "edit-board-button"
  editBoardButton.innerText = "Edit Board"
  editBoardButton.addEventListener("click", event => buildBoardForm(board.id))

  const deleteBoardButton = document.createElement("button")
  deleteBoardButton.id = "delete-board-button"
  deleteBoardButton.innerText = "Delete Board"
  deleteBoardButton.addEventListener("click", event => deleteBoard(board.id))

  const goalsGrid = document.createElement("div")
  goalsGrid.id = "goals-grid"
  board.attributes.goals.forEach(function(goal) {
    // goalsGrid.append(buildGoalCard(goal))
  })

  // Assemble board card elements
  boardHeader.append(addGoalButton)
  boardTitleCard.append(boardTitle)
  boardTitleCard.append(boardCategory)
  boardHeader.append(boardTitleCard)
  boardButtonsCard.append(editBoardButton)
  boardButtonsCard.append(deleteBoardButton)
  boardHeader.append(boardButtonsCard)
  boardCard.append(boardHeader)
  boardCard.append(goalsGrid)
  document.querySelector("main").append(boardCard)
}

function buildBoardForm(boardId) {
  // Create form
  const boardForm = document.createElement("form")
  boardForm.id = "board-form"

  // Label form
  const formLabel = document.createElement("h2")

  // Create from fields
  const titleCard = document.createElement("div")
  titleCard.className = "board-form-input"
  const titleLabel = document.createElement("p")
  titleLabel.innerText = "Title: "
  const titleInput = document.createElement("input")
  titleInput.name = "title"

  const categoryCard = document.createElement("div")
  categoryCard.className = "board-form-input"
  const categoryLabel = document.createElement("p")
  categoryLabel.innerText = "Category: "
  const categoryInput = document.createElement("input")
  categoryInput.name = "category"

  const backgroundCard = document.createElement("div")
  backgroundCard.className = "board-form-input"
  const backgroundLabel = document.createElement("p")
  backgroundLabel.innerText = "Background: "
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
  if (!!boardId) {submitButton.setAttribute("board-id",boardId)}
  submitButton.addEventListener("click", event => createEditBoard(event))

  // Fill form if it is an edit form
  if (!!boardId) {
    formLabel.innerText = "Edit Board"
    titleInput.value = document.getElementById("board-title").innerText
    categoryInput.value = document.getElementById("board-category").innerText
    backgroundInput.value = document.getElementById("board-card").style.background
  } else {
    formLabel.innerText = "New Board"
  }

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

function createEditBoard(event) {
  // Prevent redirect from submit button press
  event.preventDefault()
  // Setup fetch options for PATCH request, these will be changed for a new POST request
  const body = {
    title: event.target.form.querySelector("input[name='title']").value,
    category: event.target.form.querySelector("input[name='category']").value,
    background: event.target.form.querySelector("input[name='background']").value
  }
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify(body)
  }
  // Check if the board ID is present to determine if this is a new or edited board
  if (event.target.getAttribute("board-id")) {
    // Create board edit fetch request
    const boardId = event.target.getAttribute("board-id")
    fetch(BOARDS_URL + "/" + boardId, options).then(resp => resp.json()).then(function(json) {
      if (json.data.id === boardId) {
        event.target.form.remove()
        buildBoardCard(json.data)
      } else {
        console.log("Error Updating Board")
      }
    })
  } else {
    // Create new board fetch request
    options.method = "POST"
    body.user_id = undefined // FILL ME IN ONCE EVERYTHING IS DEFINED
    fetch(BOARDS_URL, options).then(resp => resp.json()).then(function(json) {
      if (json.data.id === boardId) {
        event.target.form.remove()
        buildBoardCard(json.data)
      } else {
        console.log("Error Creating Board")
      }
    })
  }
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

//////////////////////////
// Board Functions: End //
//////////////////////////

function addGoal(event) {
  console.log(event.target.getAttribute("board-id"))
}
document.addEventListener("DOMContentLoaded", function() {
  // Test board load
  fetchBoard(155) 

  //event listeners for form submit
  loginForm.addEventListener("submit", handleLogin)
  signupForm.addEventListener("submit", handleSignup)

  //login and sign up toggle show on button click and toggle hide on cancel
  loginBtn.addEventListener("click", function() {
    if (loginFormDiv.style.display === ""){
      loginFormDiv.style.display = "block"
    }
  })
  signupBtn.addEventListener("click", function() {
    if (signupFormDiv.style.display === ""){
      signupFormDiv.style.display = "block"
    }
  })
  
for(const button of cancelBtns){
  button.addEventListener("click", closeForm)
}
  function closeForm() {
    loginFormDiv.style.display = "";
    signupFormDiv.style.display = ""
    }

  //event handlers
  function handleLogin(e){
    e.preventDefault()
  let email = e.target.email.value
  loginUser(email)
  }

  function handleSignup(e){
    e.preventDefault()
    let firstName = e.target.fname.value
    let lastName = e.target.lname.value
    let email = e.target.email.value
    signupUser(firstName, lastName, email)
  }
  //fetches

  function loginUser(email){
    let configObject = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          email: email
      })

    }
    fetch(`${BASE_URL}/login`, configObject)
    .then(res => res.json())
    .then(data => console.log(data))
    loginFormDiv.style.display = ""
  }

  function signupUser(firstName, lastName, email){
    let configObject = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          email: email,
          first_name: firstName,
          last_name: lastName
      })
    }
      fetch(`${USERS_URL}`, configObject)
      .then(res => {
        if(res.status == 201){
          res.json()
          .then(newUserData => displayUserSignup())
      } else{
        res.json()
        .then(errorData => displayError(errorData))
      }})

  }

  function displayError(data){
    let errors = data["errors"]
    for(const error of errors){
      let p = document.createElement("p")
      p.innerText = error
      p.style.color = "red"
      p.style.fontSize = "12px"
      signupForm.insertBefore(p, confirmSignup)
      setTimeout( () => {p.remove()}, 2000)
    }
    
  }
  function displayUserSignup(){
    let p = document.createElement("p")
      p.innerText = "Account created! You can now sign in with your email"       
      p.style.color = "green"
      p.style.fontSize = "12px"
      signupForm.insertBefore(p, confirmSignup)
      setTimeout( () => {
        p.remove()
        signupFormDiv.style.display = ""
      }, 5000)
  }
})