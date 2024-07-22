$(document).ready(async function () {
    await loadFull(tsParticles);

    $("#tsparticles")
        .particles()
        .init(
            {
                fpsLimit: 120,
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: true,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 150,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 4 },
                        animation: { enable: true, speed: 3}

                    },
                },
                detectRetina: true,
            },
            function (container) {
            },
        );
});

window.refreshParticles = function() {
    loadFull(tsParticles);

    $("#tsparticles")
        .particles()
        .init(
            {
                fpsLimit: 120,
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: true,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 150,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 4 },
                        animation: { enable: true, speed: 3}

                    },
                },
                detectRetina: true,
            },
            function (container) {
            },
        );  
};
