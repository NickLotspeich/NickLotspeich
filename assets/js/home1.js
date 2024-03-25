document.addEventListener("DOMContentLoaded", function () {

    // Constants for the stars
    const colorStars = "white";
    const starCount = 1200;
    const starSize = 2; // as a fraction of the screen width
    const starSpeed = .001; // fraction of the screen width per second

    const starsContainer = document.getElementById("stars-container");
    let starsContainerHeight = starsContainer.getBoundingClientRect().height;
    let starsContainerWidth = starsContainer.getBoundingClientRect().width;

    let stars = [];
    let starsSpeed = starSpeed * starsContainerWidth;
    let xVelocity = starsSpeed * randomSign() * Math.random();
    let yVelocity = Math.sqrt(Math.pow(starsSpeed, 2) - Math.pow(xVelocity, 2)) * randomSign();

    // Function to initialize stars
    function initializeStars() {
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement("div");
            star.className = "star";
            star.style.width = starSize + "px";
            star.style.height = starSize + "px";
            star.style.backgroundColor = colorStars;
            star.style.position = "absolute"; // Set the position to absolute

            // Position stars randomly within and outside the visible bounds of the container
            let startX, startY;
            if (Math.random() > 0.5) {
                startX = Math.random() * -2 * starsContainerWidth;
            } else {
                startX = Math.random() * 2 * starsContainerWidth + starsContainerWidth;
            }
            if (Math.random() > 0.5) {
                startY = Math.random() * -2 * starsContainerHeight;
            } else {
                startY = Math.random() * 2 * starsContainerHeight + starsContainerHeight;
            }

            star.style.left = startX + "px";
            star.style.top = startY + "px";
            starsContainer.appendChild(star);

            stars.push({
                element: star,
                x: startX,
                y: startY,
                xVelocity: xVelocity,
                yVelocity: yVelocity
            });
        }
    }

    // Initialize stars
    initializeStars();

    let timeDelta, timeLast = 0;
    requestAnimationFrame(loop);

    function loop(timeNow) {
        // Time Difference
        timeDelta = timeNow - timeLast;
        timeLast = timeNow;

        for (let i = 0; i < starCount; i++) {
            const star = stars[i];
            const starElement = star.element;

            // Update Star's x Position
            star.x += star.xVelocity * timeDelta * 0.001;
            star.y += star.yVelocity * timeDelta * 0.001;

            // Wrap around when stars move out of the container
            if (star.x < -2 * starsContainerWidth) star.x += 4 * starsContainerWidth;
            if (star.x > 2 * starsContainerWidth) star.x -= 4 * starsContainerWidth;
            if (star.y < -2 * starsContainerHeight) star.y += 4 * starsContainerHeight;
            if (star.y > 2 * starsContainerHeight) star.y -= 4 * starsContainerHeight;

            // Update star position
            starElement.style.left = star.x + "px";
            starElement.style.top = star.y + "px";
        }

        // Call the next frame
        requestAnimationFrame(loop);
    }

    function randomSign() {
        return Math.random() >= .5 ? 1 : -1;
    }
});

// Dynamic to the screen size
window.onresize = function () {
    let starsContainerWidth = starsContainer.getBoundingClientRect().width;
    let starsContainerHeight = starsContainer.getBoundingClientRect().height;

    // Update positions of stars transitioning off-screen
    for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        if (star.x < -2 * starsContainerWidth || star.x > 2 * starsContainerWidth || star.y < -2 * starsContainerHeight || star.y > 2 * starsContainerHeight) {
            star.x = Math.random() * -2 * starsContainerWidth;
            star.y = Math.random() * -2 * starsContainerHeight;
        }
    }
};
