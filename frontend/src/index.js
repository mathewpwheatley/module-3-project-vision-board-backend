const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users`;
const BOARDS_URL = `${BASE_URL}/boards`;
const GOALS_URL = `${BASE_URL}/goals`;

document.addEventListener("DOMContentLoaded", function () {

  const newGoalForm = document.getElementById("new-goal");
  const goalFormLabel = document.getElementById("form-label")
  const goalsSection = document.getElementById("notes");
  const nameInput = document.getElementById("name")
  const descriptionInput = document.getElementById("description")
  const statusInput = document.getElementById("status")
  const submitButton = document.getElementById("submit-button")

  function createGoalCard(goal) {
    const li = document.createElement("li");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const h4 = document.createElement("h4");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    editButton.innerText = "Edit";
    deleteButton.innerText = "Delete";
    editButton.style.marginRight = "5px";
    deleteButton.style.marginLeft = "5px";

    goalsSection.appendChild(li);
    li.appendChild(h2);
    li.appendChild(p);
    li.appendChild(h4);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    li.setAttribute("goal-id", goal.id)
    h2.innerHTML = goal.attributes.title;
    p.innerHTML = goal.attributes.content;
    h4.innerHTML = goal.attributes.status;

    deleteButton.addEventListener("click", function () {
      li.remove()
      return fetch(`${GOALS_URL}/${goal.id}`, {
        method: 'DELETE'
      })
      .then(response => response.json()
      .then(json => {
        return json
      }))
    });

    editButton.addEventListener("click", function() {
      goalFormLabel.innerHTML = `<strong>Edit ${goal.attributes.title}</strong>`
      nameInput.value = goal.attributes.title
      descriptionInput.value = goal.attributes.content
      statusInput.value = goal.attributes.status
      submitButton.setAttribute("goal-id", goal.id)
      submitButton.value = "Complete Edit"
    })
  }

  function fetchGoals() {
    fetch(GOALS_URL)
      .then((response) => response.json())
      .then((json) => {
        json.data.forEach(function (goal) {
          createGoalCard(goal)
        }) 
      });
  }

  function createOrEditGoal() {
    newGoalForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const goal = {
        id: event.target.getAttribute("goal-id"),
        title: `${event.target[0].value}`,
        content: `${event.target[1].value}`,
        status: `${event.target[2].value}`,
      };
      console.log(goal)
      if (submitButton.value === "Complete Edit") {
        //troubles on line 84 and 86
        let editedGoal = document.querySelector(`li[goal-id = "${goal.id}"]`)
        console.log(editedGoal)
        editedGoal.remove()
        createGoalCard(goal)
        const data = {
          title: goal.title,
          content: goal.content,
          status: goal.status
        }
        fetch(`${GOALS_URL}/${goal.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        })
      }
      else {
      createGoalCard(goal);
    }
      newGoalForm.reset()
      statusInput.value = "-- Select a Status --"
    });
  }

  fetchGoals();
  createOrEditGoal();
});
