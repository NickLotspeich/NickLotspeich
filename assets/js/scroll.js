document.addEventListener("DOMContentLoaded", function () {

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const hotbarHeight = document.querySelector('.hotbar').offsetHeight;
        const targetOffsetTop = target.offsetTop;

        setTimeout(() => {
            window.scrollTo({
                top: targetOffsetTop - hotbarHeight,
                behavior: 'smooth'
            });
        }, 100); // Adjust the delay (100 ms) for your preferred smoothness
    });
});


// js for making the video move up when the user scrolls down to view the other content
window.onscroll = function () {
    var videoContainer = document.getElementById('video-container');
    var scrollPosition = window.scrollY;

    // If the user has scrolled down, set the top value of the video container to the negative of the scroll position
    if (scrollPosition > 0) {
        videoContainer.style.top = -scrollPosition + 'px';
    } else {
        // If the user has scrolled to the top, set the top value of the video container to 0
        videoContainer.style.top = '0';
    }
};
});