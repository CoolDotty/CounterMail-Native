// Note: The javascript file is loaded after DOMContentLoaded, so you can assume the DOM is complete & available.

(function() {
    // Add custom navbar
    let topline = document.getElementById('topline')
    if (topline) {
        // Inbox
        topline.classList.add("taskbar");

        topline.getElementsByClassName("topleft")[0].remove();

        let taskbar__title = topline.getElementsByClassName("topright")[0];
        taskbar__title.classList.remove('topright');
        taskbar__title.classList.add('taskbar__title');

        topline.appendChild(taskbar__close());

        // This button sucks
        document.getElementsByClassName("minmodetoggle")[0].remove();
    } else {
        // Some other page
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

    // Add Shortcut to Password Manager
    let menu = document.getElementById("taskbar");
    if (menu) {
        let safebox__shortcut = document.createElement("a");
        safebox__shortcut.classList.add("button-safebox");
        safebox__shortcut.role = "button";
        safebox__shortcut.href = "./?_task=settings&_action=plugin.countermail_safebox";
        safebox__shortcut.tabIndex = -1;
        safebox__shortcut["aria-disabled"] = true;

        let button__inner = document.createElement("span");
        button__inner.classList.add("button-inner");
        button__inner.innerHTML = "Safebox";

        safebox__shortcut.appendChild(button__inner);

        menu.insertBefore(safebox__shortcut, menu.children[1]);
    }

    function taskbar__close() {
        let exit = document.createElement("div");
        exit.classList.add("taskbar__close");
        exit.onclick = () => {
            window.close();
        }
        return exit;
    }
})();
