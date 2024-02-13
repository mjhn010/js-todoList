//유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다.
// delete버튼을 클릭하면, 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 이동한다.
// 진행중 끝남 탭을 누르면 언더바가 이동한다.
// 카테고리별로 해당 내용만 나타난다.
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴.
let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = [];

// 매개변수로 함수를 넘겨준다.
addBtn.addEventListener("click",addTask);
//addEventListener 클릭이벤트 함수 
function addTask(){
    let taskContent = taskInput.value;
    taskList.push(taskContent)
    console.log(taskList);
    render();
}
function render(){
    let resultHTML = "";
    console.log(resultHTML)
    for(let i = 0; i < taskList.length; i++){
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
          <button>Check</button>
          <button>Delete</button>
        </div>
      </div>`;
    }
    console.log(resultHTML);
    document.getElementById("task-board").innerHTML = resultHTML;
    console.log(resultHTML);
}
