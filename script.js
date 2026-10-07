const form = document.getElementById("contactForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    alert("پیام شما با موفقیت ثبت شد! ✅");

    form.reset();
});