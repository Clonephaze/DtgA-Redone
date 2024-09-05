@echo off
cls

:: Check if we're in the correct directory
if exist StaticPageGenerator.js (
    echo Running StaticPageGenerator.js...
    :: Execute the Node.js script
    node StaticPageGenerator.js
    
    :: Wait for user input before closing the window
    pause
) else (
    echo Error: StaticPageGenerator.js not found in current directory.
    pause
)
