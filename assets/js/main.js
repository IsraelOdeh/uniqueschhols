document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.getElementById('divCanopy');
            if (navbarContainer) {
                navbarContainer.innerHTML = data;


                const scrollElement = document.getElementById('scrollElement');
                const navElement = document.querySelector('.fixed-nav');
                const scrollTitle = document.getElementById('scrollTitle');

                let lastScrollTop = 0;
                window.addEventListener('scroll', () => {
                    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                    if (currentScroll > lastScrollTop) {
                        // Scrolling down
                        scrollElement.classList.add('hidden');
                        scrollElement.classList.add('h-[60px]');
                        scrollElement.classList.remove('h-[90px]');

                        navElement.classList.add('bg-teal-800')
                        navElement.classList.remove('text-gray-800');
                        navElement.classList.add('text-white');

                        scrollTitle.classList.remove('hidden');
                        scrollTitle.classList.add('h-[60px]');
                        scrollTitle.classList.remove('h-[90px]');
                    } else if (currentScroll == 0) {
                        // Scrolling up
                        scrollElement.classList.remove('hidden');
                        scrollElement.classList.remove('h-[60px]');
                        scrollElement.classList.add('h-[90px]');

                        navElement.classList.remove('bg-teal-800');
                        navElement.classList.add('text-gray-800');
                        navElement.classList.remove('text-white');

                        scrollTitle.classList.add('hidden');
                        scrollTitle.classList.remove('h-[60px]');
                        scrollTitle.classList.add('h-[90px]');
                    }
                    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Avoid negative values
                });


                // Mobile Menu Toggle
                Array.from(document.getElementsByClassName('menu-toggle')).forEach(function (element) {
                    element.addEventListener('click', function () {
                        document.querySelector('.site-mobile-menu').classList.toggle('hidden');
                    });
                });

                // Accordion Toggle
                document.querySelectorAll('[data-toggle="collapse"]').forEach(function (element) {
                    element.addEventListener('click', function () {
                        const target = document.querySelector(this.getAttribute('data-target'));
                        target.classList.toggle('hidden');
                        this.classList.toggle('bg-yellow-400', 'text-gray-800', 'bg-teal-600', 'text-white');
                    });
                });

            }
        })
        .catch(error => console.error('Error loading navbar:', error));

    fetch('assets/components/footer.html')
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



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});