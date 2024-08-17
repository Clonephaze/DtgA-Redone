/**
 * Initializes or refreshes the tsParticles animation on a webpage.
 * 
 * @param {Object} customConfig - An optional object to override default configuration settings.
 */
export async function manageTsParticles(customConfig = {}) {
    try {
        // Load the full tsParticles library
        await loadFull(tsParticles);

        // Retrieve custom color from local storage or use default
        let rgbValues = localStorage.getItem('color-primary-rgb-values') || '133, 255, 225';
        let particleColor = `rgb(${rgbValues})`;

        // Define default configuration for tsParticles
        const defaultConfig = {
            fpsLimit: 120,
            particles: {
                color: { value: particleColor },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce" },
                    random: true,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: { enable: true },
                    value: 150,
                },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: {
                    value: { min: 1, max: 4 },
                    animation: { enable: true, speed: 3 },
                },
            },
            detectRetina: true,
        };

        // Merge customConfig with defaultConfig, giving precedence to customConfig
        const config = { ...defaultConfig, ...customConfig };

        // Initialize or refresh tsParticles with the merged configuration
        $("#tsparticles")
            .particles()
            .init(config, function (container) {
                // Callback function after initialization or reinitialization (currently empty)
            });
    } catch (error) {
        console.error("Failed to manage tsParticles:", error);
    }
}