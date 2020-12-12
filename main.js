let id = 0;
let list = [];

chrome.storage.sync.get("todo", (storage) => {
  if (!storage.todo) {
    return;
  }

  list = storage.todo;
  id = list[list.length - 1].id + 1;

  list.map((list) => addListItem(list.value));
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
  var text = e.target.textContent;
  this.removeChild(e.target);
  list = list.filter((item) => item.value !== text);
  chrome.storage.sync.set({ todo: list });
});

function addListItem(value) {
  const element = document.createElement("li");
  element.classList.add(
    "list-group-item",
    "text-capitalize",
    "d-flex",
    "justify-content-between",
    "my-2"
  );
  element.textContent = value;
  document.querySelector("#list").appendChild(element);
}
