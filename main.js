//유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다.
// delete버튼을 클릭하면, 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 이동한다.
// 1.ckeck버튼을 클릭하는 순간 true false
// 2.true이면 끝난걸로 간주하고 밑줄 보여주기.
// 3.flase이면 안끝난걸로 간주하고 그대로 보여주기.
// 진행중 끝남 탭을 누르면 언더바가 이동한다.
// 카테고리별로 해당 내용만 나타난다.
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴.
let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".task-tabs div");
let underBar = document.getElementById("under-line");
let menus = document.querySelectorAll(".menu");
let taskList = [];
let mode = "all";
let filterList = [];

menus.forEach((menu) => menu.addEventListener("click", (e) => moveUnderBar(e)));

function moveUnderBar(e) {
  underBar.style.left = e.currentTarget.offsetLeft + "px";
  underBar.style.width = e.currentTarget.offsetWidth + "px";
  underBar.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

// 매개변수로 함수를 넘겨준다.
addBtn.addEventListener("click", addTask);
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
//addEventListener 클릭이벤트 함수
function addTask() {
  let task = {
    id: randomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
}

function enterKey() {
  if (window.event.keyCode == 13) {
    let task = {
      id: randomIdGenerate(),
      taskContent: taskInput.value,
      isComplete: false,
    };
    taskList.push(task);
    render();
  }
}
function render() {
  //내가 선택한 탭에따라서 리스트를 달리 보여준다.
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task-b">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <img class="img"  src="/images/check.png" onclick="toggleComplete('${list[i].id}')"></img>
          <img class="img" src="/images/smile.png" onclick="deleteTask('${list[i].id}')"></img>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <img class="img"  src="/images/check.png" onclick="toggleComplete('${list[i].id}')"></img>
          <img class="img" src="/images/smile.png" onclick="deleteTask('${list[i].id}')"></img>
        </div>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  for (let i = 0; i < filterList.length; i++) {
    if (filterList[i].id == id) {
      filterList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    //전체 리스트를 보여준다.
    render();
  } else if (mode === "ongoing") {
    //진행중인 아이템을 보여준다.
    //task.inComplete = false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
    //끝나는 케이스
    //task.isComplete =true
  }
}

//랜덤아이디부여
function randomIdGenerate() {
  return Math.random().toString(36).substr(2, 16);
}
