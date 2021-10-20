// Body

const body = document.querySelector(".warpper");

// Heading

const todoTitle = document.createElement("h1");
todoTitle.innerHTML = "Todo List";

body.append(todoTitle);

// Unorder List

const todoUnorderList = document.createElement("ul");
todoUnorderList.id = "todoList";

body.append(todoUnorderList);

// toDos Array

let toDos = [];
let retrievedData = JSON.parse(localStorage.getItem("toDosArray"));

if (!retrievedData) {
  toDos = ["wake up", "eat breakfast", "code"];
} else {
  toDos = retrievedData;
}

// load buttons function

const loadButtons = () => {
  // delete
  const liList = document.querySelectorAll("li");
  liList.forEach((element) => {
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "DELETE";
    deleteButton.className = "deleteButton red";
    element.append(deleteButton);
  });
  const deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((element) => {
    element.addEventListener("click", deleteListItem);
  });
  // update
  liList.forEach((element) => {
    const updateButton = document.createElement("button");
    updateButton.innerHTML = "UPDATE";
    updateButton.className = "updateButton green";
    element.append(updateButton);
  });
  const updateButtons = document.querySelectorAll(".updateButton");
  updateButtons.forEach((element) => {
    element.addEventListener("click", updateListItem);
  });
};

// renderList function

const renderList = () => {
  const toDOList = document.getElementById("todoList");
  toDOList.innerHTML = "";
  toDos.forEach((element, index) => {
    const li = document.createElement("li");
    li.innerHTML = element;
    li.id = `li${index}`;
    toDOList.append(li);
  });
  loadButtons();
  localStorage.setItem("toDosArray", JSON.stringify(toDos));
};

// addToList function

const addToList = () => {
  const inputValue = document.querySelector("input");
  if (inputValue.value === "") {
    alert("There is nothing to add!!");
  } else {
    toDos.push(inputValue.value);
    renderList();
  }
};

// deleteListItem function

const deleteListItem = (event) => {
  const target = event.target;
  const parent = target.parentElement;

  toDos = toDos.filter((todo, index) => {
    return index != parent.id[2];
  });

  renderList();
};

// updateListItem function

const updateListItem = (event) => {
  const newValue = prompt("Enter the new value:");
  const target = event.target;
  const parent = target.parentElement;

  toDos = toDos.map((todo, index) => {
    let newArray = [];
    if (index == parent.id[2]) {
      newArray += newValue;
    } else {
      newArray += todo;
    }
    return newArray;
  });

  renderList();
};

// initalize the app

renderList();

// input and add button

const input = document.createElement("input");
body.append(input);

const button = document.createElement("button");
button.innerHTML = "ADD";
button.id = "addButton";
button.className = "blue";
body.append(button);

// add button functionality

const addButton = document.getElementById("addButton");
addButton.addEventListener("click", addToList);
