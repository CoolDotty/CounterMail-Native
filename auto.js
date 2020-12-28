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

        // NV style searching in Safebox
        // TODO: No auto copy because result is opened in an iframe
        let sb_search = document.getElementsByClassName('listsearchbox');
        if (sb_search.length > 0) {
            sb_search[0].style.display = 'block';
            let search_input_text = document.getElementById('safeboxsearch');
            search_input_text.focus();
            search_input_text.addEventListener("input", debounce(() => {
                let results = document.getElementById('cmsectionslistsafebox').firstChild.children; // trows
                if (results.length > 0) {
                    // Fire event on td
                    results[0].firstChild.dispatchEvent(new MouseEvent("mousedown",{bubbles: true, cancellable: true}));
                    results[0].firstChild.dispatchEvent(new MouseEvent("mouseup",{bubbles: true, cancellable: true}));
                    search_input_text.focus();
                }
            }, 100));
        }
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
            // Default back to inbox on close
            let back_to_home = document.getElementsByClassName('button-mail');
            if (back_to_home.length > 0) {
                back_to_home[0].click();
            }
        }
        return exit;
    }

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    //
    // Yoinked from David Walsh: https://davidwalsh.name/javascript-debounce-function
    // Who also yoinked it from Underscore.js: http://underscorejs.org/
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
})();
