/**
 * This script initializes and refreshes the tsParticles animation on a webpage using jQuery.
 * 
 * Features:
 * - Initializes the tsParticles animation with specific configurations.
 * - Provides a function to refresh the particles animation.
 * 
 * The particles animation includes customization for particle color, movement, number, opacity, shape, and size.
 */

$(document).ready(async function () {
    // Load the full tsParticles library
    await loadFull(tsParticles);

    // Initialize the tsParticles animation with specified configurations
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
                        animation: { enable: true, speed: 3 }
                    },
                },
                detectRetina: true,
            },
            function (container) {
                // Callback function after initialization (currently empty)
            },
        );
});

/**
 * Refresh the tsParticles animation with specified configurations.
 */
window.refreshParticles = function() {
    loadFull(tsParticles);

    // Reinitialize the tsParticles animation with the same configurations
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
                        animation: { enable: true, speed: 3 }
                    },
                },
                detectRetina: true,
            },
            function (container) {
                // Callback function after reinitialization (currently empty)
            },
        );  
};
