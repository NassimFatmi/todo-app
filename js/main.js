/*
    Tasks : 
    [1] Use sweet alert if the input is empty => Done
    [2] Check if the task exist => Done
    [3] Create delete all tasks => Done
    [4] Create finish all tasks => Done
*/

let theInput = document.querySelector('.add-task input'),
    addButton = document.querySelector('.add-task .plus'),
    tasksContainer = document.querySelector('.tasks-content'),
    tasksCount = document.querySelector('.tasks-count span'),
    tasksCompleted = document.querySelector('.tasks-completed span');

document.querySelector('.control-buttons .delete-all').classList.add('disabled');

// focus on input
window.onload = function() {
    theInput.focus();
};

// adding task
addButton.onclick = function() {
    if (theInput.value === '') {
        Swal.fire({
            icon: 'warning',
            text: 'You can\'t add an empty task',
        });
    } else {

        // check if the Task exits
        let tasks = document.querySelectorAll('.task-box'),
            safeToAdd = true;

        tasks.forEach(element => {
            if (theInput.value === element.childNodes[0].textContent) {
                safeToAdd = false;
            } else {
                safeToAdd = true;
            }
        });

        if (safeToAdd) {
            if (document.body.contains(document.querySelector('.no-tasks-message')))
                document.querySelector('.no-tasks-message').remove();
            let mainSpan = document.createElement('span'),
                deleteButton = document.createElement('span'),
                text = document.createTextNode(theInput.value),
                deleteText = document.createTextNode('Delete');

            mainSpan.classList.add('task-box');
            deleteButton.classList.add('delete');

            mainSpan.appendChild(text);
            deleteButton.appendChild(deleteText);

            mainSpan.appendChild(deleteButton);

            tasksContainer.appendChild(mainSpan);

            theInput.value = "";
            theInput.focus();
            calculateTasks();

            document.querySelector('.control-buttons .delete-all').classList.remove('disabled');


            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });

            Toast.fire({
                icon: 'success',
                title: 'Added successfuly',
                showDenyButton: true,
                denyButtonText: 'Undo',
            }).then((result) => {
                if (result.isDenied) {
                    mainSpan.remove();
                    calculateTasks();
                    if (tasksContainer.childElementCount == 0) {
                        createNoTasksMessage();
                    }
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'This task already exits !',
            });
        }
    }
};

document.addEventListener('click', function(e) {

    if (e.target.className == 'delete') {
        e.target.parentNode.remove();
        if (tasksContainer.childElementCount == 0) {
            createNoTasksMessage();
        }
    }

    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle('finished');
    }

    calculateTasks();

});

function createNoTasksMessage() {
    let span = document.createElement('span');
    span.appendChild(document.createTextNode('No tasks to show'));
    span.classList.add('no-tasks-message');

    tasksContainer.appendChild(span);
}

function calculateTasks() {
    tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;
    tasksCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;
}

document.querySelector('.control-buttons .delete-all').onclick = deleteAll;

function deleteAll() {
    let tasks = document.querySelectorAll('.task-box');
    tasks.forEach(element => {
        element.remove();
    });
    document.querySelector('.control-buttons .delete-all').classList.add('disabled');
    createNoTasksMessage();
}

document.querySelector('.control-buttons .finish-all').onclick = finishAll;

function finishAll() {
    let tasks = document.querySelectorAll('.task-box');
    tasks.forEach(element => {
        element.classList.add('finished');
    });
}