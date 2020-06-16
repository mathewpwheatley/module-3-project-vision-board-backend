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


document.addEventListener("DOMContentLoaded", function() {
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
            .then(newUserData => displayUserSignup(newUserData))
        } else{
          res.json()
          .then(errorData => displayError(errorData))
        }})

    }

    function displayError(errors){
      console.log(errors)
    }
    function displayUserSignup(newUser){
      console.log(newUser)
      signupFormDiv.style.display = ""
    }
 


    

  })