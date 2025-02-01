const canvas = document.getElementById("estateCanvas");
const ctx = canvas.getContext("2d");
const threeDView = document.getElementById("threeDView");
const plotWidth = 80, plotHeight = 60;
let plots = [];
let statuses = { "free": "green", "sold": "red", "revolted": "yellow" };

// Generate plots
for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
        let plot = {
            id: `Plot-${row * 5 + col + 1}`,
            x: col * (plotWidth + 10) + 20,
            y: row * (plotHeight + 10) + 20,
            status: "free",
        };
        plots.push(plot);
    }
}

function drawPlots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    plots.forEach(plot => {
        ctx.fillStyle = statuses[plot.status];
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        ctx.fillRect(plot.x, plot.y, plotWidth, plotHeight);
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(plot.id, plot.x + 10, plot.y + 30);
    });
}

function show3DPlot() {
    threeDView.style.display = "block";
    threeDView.innerHTML = "";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, threeDView.clientWidth / threeDView.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(threeDView.clientWidth, threeDView.clientHeight);
    threeDView.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFA200 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    plots.forEach(plot => {
        if (mouseX >= plot.x && mouseX <= plot.x + plotWidth &&
            mouseY >= plot.y && mouseY <= plot.y + plotHeight) {
            plot.status = plot.status === "free" ? "sold" : plot.status === "sold" ? "revolted" : "free";
            drawPlots();
            show3DPlot();
        }
    });
});

drawPlots();
