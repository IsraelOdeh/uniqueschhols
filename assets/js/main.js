document.addEventListener("DOMContentLoaded", function () {
    fetch('./../assets/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.getElementById('divCanopy');
            if (navbarContainer) {
                navbarContainer.innerHTML = data;


                const scrollElement = document.getElementById('scrollElement');
                let lastScrollTop = 0;
                window.addEventListener('scroll', () => {
                    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                    if (currentScroll > lastScrollTop) {
                        // Scrolling down
                        scrollElement.classList.add('opacity-0');
                        scrollElement.classList.add('h-[60px]');
                        scrollElement.classList.remove('h-[90px]');
                    } else {
                        // Scrolling up
                        scrollElement.classList.remove('opacity-0');
                        scrollElement.classList.remove('h-[60px]');
                        scrollElement.classList.add('h-[90px]');
                    }
                    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Avoid negative values
                });

                const div = document.getElementById('sidebar');
                div.addEventListener('click', function (e) {
                    const target = e.target.closest('a');
                    if (target && div.contains(target)) {
                        {
                            if (sidebarOpen) {
                                toggleSidebar();
                            }
                        }
                    }
                });
            }
        })
        .catch(error => console.error('Error loading navbar:', error));

    fetch('./../assets/components/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById('footCanopy');
            if (footerContainer) {
                footerContainer.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading navbar:', error));






});


let sidebarOpen = false;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    const overlay = document.getElementById('overlay');

    if (!sidebarOpen) {
        sidebar.classList.remove('translate-x-full');
        main.classList.add('-translate-x-64');
        overlay.classList.remove('hidden');
        overlay.addEventListener('click', toggleSidebar);
    } else {
        sidebar.classList.add('translate-x-full');
        main.classList.remove('-translate-x-64');
        overlay.classList.add('hidden');
        overlay.removeEventListener('click', toggleSidebar);
        backToMain()
    }

    sidebarOpen = !sidebarOpen;
}

//function toggleSubmenu(id) {
//    const submenu = document.getElementById(id);
//    if (window.innerWidth < 768) { // mobile only
//        submenu.classList.toggle('hidden');
//    }
//}


function showSubmenu(id) {
    const submenu = document.getElementById(id);
    submenu.style.left = '0';
    document.getElementById('mainMenu').style.left = '-100%';
}

function backToMain() {
    document.getElementById('mainMenu').style.left = '0';
    document.querySelectorAll('#sidebar > div[id^="submenu"]').forEach(sub => {
        sub.style.left = '100%';
    });
}



