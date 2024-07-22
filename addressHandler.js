const routes = {
    "/index.html": { template: "Templates/index.html", title: "Home | DtgA", description: "Welcome to our homepage" },
    "/about.html": { template: "Templates/About.html", title: "About Us", description: "Learn more about us" }
    // Add more routes as needed
};

function getCurrentRoute() {
    return window.location.pathname;
}

function loadContent(route) {
    const routeData = routes[route];
    if (!routeData) {
        console.error(`Route ${route} not found`);
        return;
    }

    $.get(routeData.template, function(data) {
        $("title").text(routeData.title);
        $("meta[name='description']").attr("content", routeData.description);
        $(".content-section").html(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error(`Error loading content for route ${route}: ${textStatus}, ${errorThrown}`);
        alert("There was an error loading the page."); // Optional: Inform the user
    });
}

function loadParticles() {
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
}

$(window).on("popstate", function() {
    const currentRoute = getCurrentRoute();
    loadContent(currentRoute);
});

$(document).ready(function() {
    const initialRoute = getCurrentRoute();
    loadContent(initialRoute);

    if (initialRoute === "/index.html") {
        setTimeout(() => {
            loadParticles();
        }, 100);
    }
});
