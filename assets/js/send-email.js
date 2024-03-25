document.addEventListener("DOMContentLoaded", function () {
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("response").innerHTML = data;
        form.reset();
    })
    .catch(error => console.error('Error:', error));
});
});