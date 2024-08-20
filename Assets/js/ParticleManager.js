export async function initializeParticles() {
    await loadFull(tsParticles);
    // Retrieve custom color from local storage or use default
    let rgbValues = localStorage.getItem('color-primary-rgb-values') || '133, 255, 225';
    let particleColor = `rgb(${rgbValues})`;

    // Define default configuration for tsParticles
    const defaultConfig = {
        autoPlay: true,
        clear: true,
        defaultThemes: {},
        delay: 0,
        fullScreen: { enable: true, zIndex: 0 },
        detectRetina: true,
        duration: 0,
        fpsLimit: 120,
        particles: {
            bounce: { horizontal: { value: 1 }, vertical: { value: 1 } },
            collisions: {
                absorb: { speed: 2 },
                bounce: { horizontal: { value: 1 }, vertical: { value: 1 } },
                enable: false,
                maxSpeed: 50,
                mode: "bounce",
                overlap: { enable: true, retries: 0 }
            },
            color: {
                value: particleColor,
                animation: {
                    h: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        decay: 0,
                        delay: 0,
                        sync: true,
                        offset: 0
                    },
                    s: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        decay: 0,
                        delay: 0,
                        sync: true,
                        offset: 0
                    },
                    l: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        decay: 0,
                        delay: 0,
                        sync: true,
                        offset: 0
                    }
                }
            },
            effect: { close: true, fill: true },
            move: {
                angle: { offset: 0, value: 90 },
                attract: { distance: 200, enable: false, rotate: { x: 3000, y: 3000 } },
                center: { x: 50, y: 50, mode: "percent", radius: 0 },
                decay: 0,
                distance: {},
                direction: "none",
                drift: 0,
                enable: true,
                gravity: {
                    acceleration: 9.81,
                    enable: false,
                    inverse: false,
                    maxSpeed: 50
                },
                path: { clamp: true, delay: { value: 0 }, enable: false, options: {} },
                outModes: { default: "out" },
                random: false,
                size: false,
                speed: { min: 0.1, max: 1 },
                spin: { acceleration: 0, enable: false },
                straight: false,
                trail: { enable: false, length: 10, fill: {} },
                vibrate: false,
                warp: false
            },
            number: {
                density: { enable: true, width: 1920, height: 1080 },
                limit: { mode: "delete", value: 0 },
                value: 250
            },
            opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                    count: 0,
                    enable: true,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: false,
                    mode: "auto",
                    startValue: "random",
                    destroy: "none"
                }
            },
            reduceDuplicates: false,
            shape: { close: true, fill: true, options: {}, type: "circle" },
            size: {
                value: { min: 2, max: 3 },
                animation: {
                    count: 0,
                    enable: true,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: false,
                    mode: "auto",
                    startValue: "random",
                    destroy: "none"
                }
            },
            zIndex: { value: 0, opacityRate: 1, sizeRate: 1, velocityRate: 1 },
            destroy: {
                bounds: {},
                mode: "none",
                split: {
                    count: 1,
                    factor: { value: 3 },
                    rate: { value: { min: 4, max: 9 } },
                    sizeOffset: true
                }
            }
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        zLayers: 100,
        motion: { disable: false, reduce: { factor: 4, value: true } }
    }

    // Initialize tsParticles with the default configuration
    await tsParticles.load({
        id: "tsparticles",
        options: defaultConfig
    }).catch(error => {
        console.error(error);
    });
}