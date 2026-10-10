document.addEventListener("DOMContentLoaded", function () {

    // منوی موبایل
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.textContent = isOpen ? "✕" : "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    // انیمیشن نمایش عناصر هنگام اسکرول
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("show");
        });

    }


    // تغییر تم روشن و تاریک
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        let savedTheme = "dark";

        try {
            savedTheme = localStorage.getItem("portfolio-theme") || "dark";
        } catch (error) {
            savedTheme = "dark";
        }

        if (savedTheme === "light") {
            document.body.classList.add("light-theme");
            themeToggle.textContent = "☾";
        } else {
            themeToggle.textContent = "☀";
        }

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("light-theme");

            const isLight = document.body.classList.contains("light-theme");

            themeToggle.textContent = isLight ? "☾" : "☀";

            try {
                localStorage.setItem(
                    "portfolio-theme",
                    isLight ? "light" : "dark"
                );
            } catch (error) {
                // سایت بدون ذخیره‌سازی تنظیمات نیز کار می‌کند.
            }

        });
    }


    // برجسته کردن لینک بخش فعلی
    const pageSections = document.querySelectorAll("main section[id]");
    const menuLinks = document.querySelectorAll(".nav-links a");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        menuLinks.forEach(function (link) {

                            const isCurrent =
                                link.getAttribute("href") === "#" + currentId;

                            link.classList.toggle("active", isCurrent);

                        });

                    }

                });

            },
            {
                rootMargin: "-25% 0px -60% 0px"
            }
        );

        pageSections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }


    // نمایش سال جاری
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // فرم تماس
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            if (formStatus) {

                formStatus.textContent =
                    "فرم از نظر اطلاعات کامل است، اما برای ارسال واقعی پیام باید سرویس ایمیل متصل شود.";

            } else {

                alert(
                    "برای ارسال واقعی پیام، فرم باید به سرویس ایمیل متصل شود."
                );

            }

        });
    }

});
