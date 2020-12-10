var id = 0;
var list = [];
$(function () {
  chrome.storage.sync.get("todo", function (item) {
    if (item.todo) {
      if (item.todo.length > 0) {
        var length = item.todo.length;
        var last_id = item.todo[length - 1].id;
        id = last_id;
        list = item.todo;
        list.map((item) => {
          var list = document.createElement("li");
          list.className +=
            "list-group-item text-capitalize d-flex justify-content-between my-2";
          list.textContent = item.task;
          document.getElementById("list").appendChild(list);
        });
      }
    }
  });

  $("#add-task").click(function () {
    var task = $("#task-value").val();
    if (task) {
      $("#task-value").val(" ");
      var object = {
        id: id,
        task: task,
      };
      list.push(object);
      chrome.storage.sync.set({ todo: list }, function () {
        console.log(object.id + "," + object.task + " are saved to storage");
        id++;
        var list = document.createElement("li");
        list.className +=
          "list-group-item text-capitalize d-flex justify-content-between my-2";
        list.textContent = task;
        document.getElementById("list").appendChild(list);
      });
    }
  });

  $("#clear").click(function () {
    chrome.storage.sync.set({ todo: [] }, function () {
      id = 0;
      var element = document.getElementById("list");
      element.parentNode.removeChild(element);
    });
  });
});
