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
let taskList = [];

// 매개변수로 함수를 넘겨준다.
addBtn.addEventListener("click", addTask);
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
function render() {
  let resultHTML = "";
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].isComplete == true){
        resultHTML += `<div class="task">
        <div class="task-done">${taskList[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
          <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
      </div>`;
    }else{
        resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
          <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
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
  console.log(taskList)
  render();
}
function deleteTask(id){
    console.log("click")
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
}

//랜덤아이디부여
function randomIdGenerate() {
  return Math.random().toString(36).substr(2, 16);
}
