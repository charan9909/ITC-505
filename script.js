document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const totalTasksElement = document.getElementById('totalTasks');
    const completedTasksElement = document.getElementById('completedTasks');
    
    // Initialize task counters
    let totalTasks = 0;
    let completedTasks = 0;
    
    // Function to update task counters
    function updateTaskCounters() {
        totalTasksElement.textContent = totalTasks;
        completedTasksElement.textContent = completedTasks;
    }
    
    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        
        // Create task item elements
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;
        
        const taskControls = document.createElement('div');
        taskControls.className = 'task-controls';
        
        const completeButton = document.createElement('button');
        completeButton.className = 'complete-btn';
        completeButton.textContent = 'Complete';
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        
        // Add event listener to complete button
        completeButton.addEventListener('click', function() {
            taskItem.classList.toggle('completed');
            
            if (taskItem.classList.contains('completed')) {
                completedTasks++;
                completeButton.textContent = 'Undo';
            } else {
                completedTasks--;
                completeButton.textContent = 'Complete';
            }
            
            updateTaskCounters();
        });
        
        // Add event listener to delete button
        deleteButton.addEventListener('click', function() {
            if (taskItem.classList.contains('completed')) {
                completedTasks--;
            }
            
            totalTasks--;
            taskList.removeChild(taskItem);
            updateTaskCounters();
        });
        
        // Append elements to task item
        taskControls.appendChild(completeButton);
        taskControls.appendChild(deleteButton);
        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(taskControls);
        
        // Add task to list
        taskList.appendChild(taskItem);
        
        // Clear input
        taskInput.value = '';
        
        // Update counters
        totalTasks++;
        updateTaskCounters();
        
        // Focus back on input
        taskInput.focus();
    }
    
    // Add event listener to button
    addTaskButton.addEventListener('click', addTask);
    
    // Add event listener to input for Enter key
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});