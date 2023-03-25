const addBtn = document.querySelector(".add-btn");
const inputText = document.querySelector(".inputText");
const tableEl = document.querySelector("table");
let todos = [];

window.addEventListener("DOMContentLoaded", () => {
  let fetchesData;

  if (localStorage.getItem("todos")) {
    fetchesData = JSON.parse(localStorage.getItem("todos"));
    todos = [...fetchesData];
    for (let i = 0; i < todos.length; i++) {
      const htmlTemplate = `
              <tr>
              <td>${todos[i].title}</td>
              <td><input class="del" type="button" value="Delete" onclick="deleteHandler(event , ${todos[i].id})"></td>
              </tr>
              `;
      tableEl.insertAdjacentHTML("beforeend", htmlTemplate);
    }
  }
});

const deleteHandler = function (event, id) {
  if (confirm("Are you sure delet it!!!")) {
    const rmTodoIdx = todos.findIndex((todo) => todo.id === id);
    todos.splice(rmTodoIdx, 1);
    event.target.parentElement.parentElement.remove();
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const addRowHandler = function () {
  const todo = {
    id: Math.random(),
    title: inputText.value,
  };
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  // console.log(inputText.value);
  const htmlTemplate = `
        <tr>
            <td>${inputText.value}</td>
            <td><input class="del" type="button" value="Delete" onclick="deleteHandler(event, ${todo.id})"></td>
        </tr>
    `;

  tableEl.insertAdjacentHTML("beforeend", htmlTemplate);
  inputText.value = "";
};

addBtn.addEventListener("click", addRowHandler);
