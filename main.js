var id = 0;
var list = [];
$(function () {
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
});
