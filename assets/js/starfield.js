document.addEventListener("DOMContentLoaded", function () {
    // Constants for the stars
    const colorStars = "white";
    const starCount = 1200;
    const starSize = 2; // as a fraction of the screen width
    const starSpeed = .001; // fraction of the screen width per second

    const starsContainer = document.getElementById("stars-container");
    const starsContainerHeight = starsContainer.getBoundingClientRect().height;
    const starsContainerWidth = starsContainer.getBoundingClientRect().width;

    var stars = [];
    var starsSpeed = starSpeed * starsContainerWidth;
    var xVelocity = starsSpeed * randomSign() * Math.random();
    var yVelocity = Math.sqrt(Math.pow(starsSpeed, 2) - Math.pow(xVelocity, 2)) * randomSign();
    // var starsSize = starSize * (Math.random() + .1);
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.width = starSize + "px";
        star.style.height = starSize + "px";
        star.style.backgroundColor = colorStars;
        star.style.position = "absolute"; // Set the position to absolute
        star.style.top = Math.floor(Math.random() * 4 * starsContainerHeight) + "px";
        star.style.left = Math.floor(Math.random() * 4 * starsContainerWidth) + "px";
        starsContainer.appendChild(star);

        stars.push({
            element: star,
            xVelocity: xVelocity,
            yVelocity: yVelocity
        });
    }

    var timeDelta, timeLast = 0;
    requestAnimationFrame(loop);

    function loop(timeNow) {
        // Time Difference
        timeDelta = timeNow - timeLast;
        timeLast = timeNow;

        for (let i = 0; i < starCount; i++) {
            const star = stars[i];
            const starElement = star.element;

            // Update Star's x Position
            starElement.style.left = parseFloat(starElement.style.left) + star.xVelocity * timeDelta * .001 + "px";

            // Loop stars on x axis

            if (parseFloat(starElement.style.left) + parseFloat(starElement.style.width) < 0 - 3*starsContainerWidth) {
                starElement.style.left = starsContainerWidth + "px";
            } else if (parseFloat(starElement.style.left) > starsContainerWidth + 3*starsContainerWidth) {
                starElement.style.left = -parseFloat(starElement.style.width) + "px";
            }

            // Update Star's y Position
            starElement.style.top = parseFloat(starElement.style.top) + star.yVelocity * timeDelta * .001 + "px";

            // Loop stars on y axis
            if (parseFloat(starElement.style.top) + parseFloat(starElement.style.height) < 0 - 3*starsContainerHeight) {
                starElement.style.top = starsContainerHeight + "px";
            } else if (parseFloat(starElement.style.top) > starsContainerHeight + 3*starsContainerHeight) {
                starElement.style.top = -parseFloat(starElement.style.height) + "px";
            }
        }

        // Call the next frame
        requestAnimationFrame(loop);
    }

    function randomSign() {
        return Math.random() >= .5 ? 1 : -1;
    }
});

// Dynamic to the screen size
// window.onresize = function () {
//     const starsContainerWidth = window.innerWidth;
//     const starsContainerHeight = window.innerHeight;

//     const starSize = 0.005 * starsContainerWidth;
//     const starCount = Math.floor(starsContainerWidth * starsContainerHeight / (starSize * starSize));

//     const starsSpeed = starSpeed * starsContainerWidth;
//     const xVelocity = starsSpeed * randomSign() * Math.random();
//     const yVelocity = Math.sqrt(Math.pow(starsSpeed, 2) - Math.pow(xVelocity, 2)) * randomSign();

//     for (let i = 0; i < starCount; i++) {
//         stars[i].r = Math.random() * starSize * starsContainerWidth / 2;
//         stars[i].x = Math.floor(Math.random() * starsContainerWidth);
//         stars[i].y = Math.floor(Math.random() * starsContainerHeight);
//         stars[i].xVelocity = xVelocity;
//         stars[i].yVelocity = yVelocity;
//     }
// };




