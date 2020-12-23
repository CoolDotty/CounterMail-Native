// Note: The javascript file is loaded after DOMContentLoaded, so you can assume the DOM is complete & available.

(function() {
    // Add custom navbar
    let topline = document.getElementById('topline')
    if (topline) {
        // Authenticated
        topline.classList.add("taskbar");

        topline.getElementsByClassName("topleft")[0].remove();

        let taskbar__title = topline.getElementsByClassName("topright")[0];
        taskbar__title.classList.remove('topright');
        taskbar__title.classList.add('taskbar__title');

        topline.appendChild(taskbar__close());
    } else {
        // Login Page
        let taskbar = document.createElement("div");
        taskbar.classList.add("taskbar");
        taskbar.classList.add("taskbar--no-auth");

        let taskbar__title = document.createElement("div");
        taskbar__title.classList.add("taskbar__title");
        taskbar__title.innerHTML = "Login";
        taskbar.appendChild(taskbar__title);

        taskbar.appendChild(taskbar__close());

        document.body.appendChild(taskbar);
    }

    function taskbar__close() {
        let exit = document.createElement("button");
        exit.classList.add("taskbar__close");
        exit.onclick = () => {
            window.close();
        }
        return exit;
    }
})();
