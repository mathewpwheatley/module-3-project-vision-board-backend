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
const newGoalForm = document.getElementById("new-goal")
const header = document.querySelector("header")

////////////////////////////
// Board Functions: Start //
////////////////////////////

function fetchBoard(boardId) {
  fetch(BOARDS_URL + "/" + boardId)
    .then((resp) => resp.json())
    .then((json) => buildBoardCard(json.data));
}

function buildBoardCard(board) {
  // Delete old board if it exists
  if (document.getElementById("board-card")) {
    document.getElementById("board-card").remove();
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
  addGoalButton.className = "togglebutton"
  addGoalButton.innerText = "Add Goal"
  addGoalButton.addEventListener("click", function() {
    newGoalForm.hidden = false
  })

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
  editBoardButton.className = "togglebutton"
  editBoardButton.innerText = "Edit Board"
  editBoardButton.addEventListener("click", event => buildBoardForm(board.id))

  const deleteBoardButton = document.createElement("button")
  deleteBoardButton.id = "delete-board-button"
  deleteBoardButton.className = "togglebutton"
  deleteBoardButton.innerText = "Delete Board"
  deleteBoardButton.addEventListener("click", event => deleteBoard(board.id))

  const goalsGrid = document.createElement("div")
  // goalsGrid.id = "goals-grid"
  goalsGrid.id = "notes"


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
  document.querySelector("main").prepend(boardCard)

  // Fill board with goals
  board.attributes.goals.forEach(function(goal) {
    createGoalCard(goal)
  })
}

function buildBoardForm(boardId) {
  // Create form
  const boardForm = document.createElement("form");
  boardForm.id = "board-form";

  // Label form
  const formLabel = document.createElement("h2");

  // Create from fields
  const titleCard = document.createElement("div");
  titleCard.className = "board-form-input";
  const titleLabel = document.createElement("p");
  titleLabel.innerText = "Title: ";
  const titleInput = document.createElement("input");
  titleInput.name = "title";

  const categoryCard = document.createElement("div");
  categoryCard.className = "board-form-input";
  const categoryLabel = document.createElement("p");
  categoryLabel.innerText = "Category: ";
  const categoryInput = document.createElement("input");
  categoryInput.name = "category";

  const backgroundCard = document.createElement("div");
  backgroundCard.className = "board-form-input";
  const backgroundLabel = document.createElement("p");
  backgroundLabel.innerText = "Background: ";
  const backgroundInput = document.createElement("input");
  backgroundInput.setAttribute("type", "text");
  backgroundInput.name = "background";

  // Create from buttons
  const buttonCard = document.createElement("div");
  backgroundCard.className = "board-form-input";
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.addEventListener("click", function(event) {
    event.preventDefault()
    document.getElementById("board-form").remove()
  });
  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  if (!!boardId) {
    submitButton.setAttribute("board-id", boardId);
  }
  submitButton.addEventListener("click", (event) => createEditBoard(event));

  // Fill form if it is an edit form
  if (!!boardId) {
    formLabel.innerText = "Edit Board";
    titleInput.value = document.getElementById("board-title").innerText;
    categoryInput.value = document.getElementById("board-category").innerText;
    backgroundInput.value = document.getElementById("board-card").style.background.split("/").slice(-1)[0].slice(0,-2);
  } else {
    formLabel.innerText = "New Board";
  }

  // Assemble form elements
  boardForm.append(formLabel);
  titleCard.append(titleLabel);
  titleCard.append(titleInput);
  boardForm.append(titleCard);
  categoryCard.append(categoryLabel);
  categoryCard.append(categoryInput);
  boardForm.append(categoryCard);
  backgroundCard.append(backgroundLabel);
  backgroundCard.append(backgroundInput);
  boardForm.append(backgroundCard);
  buttonCard.append(cancelButton);
  buttonCard.append(submitButton);
  boardForm.append(buttonCard);

  document.querySelector("main").append(boardForm);
}

function createEditBoard(event) {
  // Prevent redirect from submit button press
  event.preventDefault();
  // Setup fetch options for PATCH request, these will be changed for a new POST request
  const body = {
    title: event.target.form.querySelector("input[name='title']").value,
    category: event.target.form.querySelector("input[name='category']").value,
    background: event.target.form.querySelector("input[name='background']")
      .value,
  };
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  };
  // Check if the board ID is present to determine if this is a new or edited board
  if (event.target.getAttribute("board-id")) {
    // Create board edit fetch request
    const boardId = event.target.getAttribute("board-id");
    options.body =  JSON.stringify(body)
    fetch(BOARDS_URL + "/" + boardId, options)
      .then((resp) => resp.json())
      .then(function (json) {
        if (json.data.id === boardId) {
          event.target.form.remove();
          buildBoardCard(json.data);
        } else {
          console.log("Error Updating Board");
        }
      });
  } else {
    // Create new board fetch request
    options.method = "POST";
    body.user_id = window.user.id;
    options.body = JSON.stringify(body)
    fetch(BOARDS_URL, options)
      .then((resp) => resp.json())
      .then(function (json) {
        if (json.data.id) {
          event.target.form.remove();
          buildBoardCard(json.data);
        } else {
          // Console log error message from server
          console.log(json);
        }
      });
  }
}

function deleteBoard(boardId) {
  // Confirm delete request
  if (
    confirm(
      "Deleting a board will also delete all related goals. This action cannot be undone. Are you sure you want to delete this board?"
    )
  ) {
    // Setup delete request options
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    // Send delete request to server
    fetch(BOARDS_URL + "/" + boardId, options)
      .then((resp) => resp.json())
      .then(async function (json) {
        // Verify the data was deleted on server side via confirmation
        if (json.data.id) {
          // Delete board from DOM
          document.querySelector("#board-card").remove()
          // Update user data now that board has been deleted
          await fetchUser(window.user.attributes.email)
          if (window.user.attributes.boards.length > 0) {
            fetchBoard(window.user.attributes.boards[0].id)
          } else {
            buildBoardForm()
          }
        }
      });
  }
}

//////////////////////////
// Board Functions: End //
//////////////////////////

const statusInput = document.getElementById("status")
const submitButton = document.getElementById("submit-button")

function createGoalCard(goal) {
  const goalsSection = document.getElementById("notes");
  const note = document.createElement("div");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const h4 = document.createElement("h4");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const goalFormLabel = document.getElementById("form-label")
  const nameInput = document.getElementById("name")
  const descriptionInput = document.getElementById("description")

  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";
  editButton.style.marginRight = "5px";
  deleteButton.style.marginLeft = "5px";
  editButton.className = "togglebutton"
  deleteButton.className = "togglebutton"

  goalsSection.appendChild(note);
  note.appendChild(h2);
  note.appendChild(p);
  note.appendChild(h4);
  note.appendChild(editButton);
  note.appendChild(deleteButton);

  note.setAttribute("goal-id", goal.id)
  h2.innerHTML = goal.title;
  p.innerHTML = goal.content;
  h4.innerHTML = goal.status;

  deleteButton.addEventListener("click", function () {
    note.remove()
    return fetch(`${GOALS_URL}/${goal.id}`, {
      method: 'DELETE'
    })
    .then(response => response.json()
    .then(json => {
      return json
    }))
  });

  editButton.addEventListener("click", function() {
    newGoalForm.hidden = false
    goalFormLabel.innerHTML = `<strong>Edit ${goal.title}</strong>`
    nameInput.value = goal.title
    descriptionInput.value = goal.content
    statusInput.value = goal.status
    submitButton.setAttribute("goal-id", goal.id)
    submitButton.value = "Complete Edit"
  })
}


///////////////////////////
// User Functions: Start //
///////////////////////////
//event handlers
function handleLogin(e) {
  e.preventDefault();
  let email = e.target.email.value;
  loginUser(email);
}


function handleSignup(e) {
  e.preventDefault();
  let firstName = e.target.fname.value;
  let lastName = e.target.lname.value;
  let email = e.target.email.value;
  fetchSignupUser(firstName, lastName, email);
}


//Fetches
//recieve user email from login handler and fetch user data, send to loginUser
async function fetchUser(email){
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }
  return fetch(`${BASE_URL}/login`, configObject)
  .then(res => res.json())
  .then(function(json) { 
    // Set window variable to user data
    window.user = json.data
  })
}

function fetchSignupUser(firstName, lastName, email) {
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
      first_name: firstName,
      last_name: lastName,
    }),
  };
  fetch(`${USERS_URL}`, configObject).then((res) => {
    if (res.status == 201) {
      confirmUserSignup();
    } else {
      res.json().then((errorData) => {
        
        buildErrorMsg(errorData)
      });
    }
  });
}

async function loginUser(email) {
  await fetchUser(email)
  renderUser()
}

function renderUser(){
  loginFormDiv.style.display = ""
  // Generate first board if it exists
  if (window.user.attributes.boards.length > 0) {
   fetchBoard(window.user.attributes.boards[0].id)
 } else {
   buildBoardForm()
 }
 // Update nav bar
 changeNavbar(window.user)
}
  

function buildErrorMsg(data) {
  signupForm.reset();
  let errors = data["errors"];
  for (const error of errors) {
    let p = document.createElement("p");
    p.innerText = error;
    p.style.color = "red";
    p.style.fontSize = "12px";
    setTimeout(() => {
      p.remove();
    }, 2000);
  }
}
function confirmUserSignup() {
  signupForm.reset();
  let p = document.createElement("p");
  p.innerText = "Account created! You can now sign in with your email";
  p.style.color = "green";
  p.style.fontSize = "12px";
  signupForm.insertBefore(p, confirmSignup);
  setTimeout(() => {
    p.remove();
    signupFormDiv.style.display = "";
  }, 5000);
}

function changeNavbar(currentUser){
loginBtn.innerHTML = "<h2>Logout</h2>"
loginBtn.addEventListener("click", () => {logoutUser(navbarUsername)}
)
const navbarUsername = document.createElement("h2")
navbarUsername.className = "rightnavli"
navbarUsername.innerText = `${currentUser.attributes.first_name}`
header.replaceChild(navbarUsername, signupBtn)
}

function logoutUser(navbarUsername) {
  loginBtn.innerHTML = "<h2>Login</h2>"
  header.replaceChild(signupBtn, navbarUsername)
  window.user = ""
  // Remove board from DOM
  document.getElementById("board-card").remove()
}

function createOrEditGoal() {
  newGoalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const goal = {
      id: event.target[3].getAttribute("goal-id"),
      title: `${event.target[0].value}`,
      content: `${event.target[1].value}`,
      status: `${event.target[2].value}`,
    };
    const data = {
      board_id: document.getElementById("board-card").getAttribute("board-id"),
      title: goal.title,
      content: goal.content,
      status: goal.status
    }
    if (submitButton.value === "Complete Edit") {
      let editedGoal = document.querySelector(`div[goal-id = "${goal.id}"]`)
      let title = editedGoal.querySelector("h2")
      let content = editedGoal.querySelector("p")
      let status = editedGoal.querySelector("h4")
      title.innerHTML = `${event.target[0].value}`
      content.innerHTML = `${event.target[1].value}`
      status.innerHTML = `${event.target[2].value}`
      fetch(`${GOALS_URL}/${goal.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
    }
    else {
      fetch(`${GOALS_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(function(json) {
        fetchBoard(data.board_id)
      })
  }
    newGoalForm.reset()
    statusInput.value = "-- Select a Status --"
    newGoalForm.hidden = true
  });
}


document.addEventListener("DOMContentLoaded", function () {
  //event listeners
  //login/signup form submission
  loginForm.addEventListener("submit", handleLogin);
  signupForm.addEventListener("submit", handleSignup);

  //login/signup toggle form on button click and toggle hide on cancel
  loginBtn.addEventListener("click", function () {
    loginFormDiv.style.display = "block";
  });
 
  //Edit navbar on login.  login becomes logout. signup button replaced with current useer firstname.


  signupBtn.addEventListener("click", function () {
    signupFormDiv.style.display = "block";
  });

  for (const button of cancelBtns) {
    button.addEventListener("click", closeForm);
  }
  function closeForm() {
    loginFormDiv.style.display = "";
    signupFormDiv.style.display = "";
  }
  /////////////////////////
  // User Functions: End //
  /////////////////////////

  ///////////////////////////
  // Goal Functions: Start //
  ///////////////////////////

  createOrEditGoal()

  /////////////////////////
  // Goal Functions: End //
  /////////////////////////
});
