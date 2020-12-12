let id = 0;
let list = [];

chrome.storage.sync.get("todo", (storage) => {
  if (storage.todo) {
    if (storage.todo.length > 0) {
      list = storage.todo;
      id = list[list.length - 1].id + 1;

      list.map((list) => addListItem(list.value));
    }
  }
});

document.querySelector("#add-task").addEventListener("click", async () => {
  const element = document.querySelector("#task-value");
  const value = element.value;

  if (!value) {
    return;
  }

  element.value = "";

  list.push({ id, value });

  chrome.storage.sync.set({ todo: list }, () => addListItem(value));

  id++;
});

document.querySelector("#list").addEventListener("click", function (e) {
  setTimeout(() => {
    var text = e.target.parentNode.textContent;
    text = text.replace("Clear", "");
    list = list.filter((item) => item.value !== text);
    chrome.storage.sync.set({ todo: list });
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }, 1000);
});

function addListItem(value) {
  const element = document.createElement("li");
  const button = document.createElement("button");

  element.classList.add(
    "list-group-item",
    "text-capitalize",
    "d-flex",
    "justify-content-between",
    "my-2"
  );
  button.classList.add("btn", "btn-danger");
  element.textContent = value;
  button.textContent = "Clear";
  element.appendChild(button);
  document.querySelector("#list").appendChild(element);
}
