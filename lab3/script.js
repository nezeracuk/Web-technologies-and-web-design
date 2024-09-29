import {cameras} from "./js/cameras.js";

let currentCameras = [...cameras];

function displayCameras(cameraList) {
    const cameraListDiv = document.getElementById('cameraList');
    cameraListDiv.innerHTML = '';
    cameraList.forEach(camera => {
        const cameraDiv = document.createElement('div');
        cameraDiv.className = 'item';
        cameraDiv.innerHTML = `
          <strong>Manufacturer:</strong> ${camera.manufacturer} <br>
          <strong>Memory:</strong> ${camera.memory} MB <br>
          <strong>Zoom:</strong> ${camera.zoom}x
        `;
        cameraListDiv.appendChild(cameraDiv);
    });
    calculateTotalMemory(cameraList);
}

displayCameras(currentCameras);

function searchCameras() {
    const searchQuery = document.getElementById('search').value.toLowerCase().trim();
    currentCameras = cameras.filter(camera =>
        camera.manufacturer.toLowerCase().includes(searchQuery)
    );
    displayCameras(currentCameras);
}

function clearSearch() {
    const searchInput = document.getElementById('search');
    searchInput.value = '';
    currentCameras = [...cameras];
    displayCameras(currentCameras);
}

function sortCamerasByZoom() {
    currentCameras = [...currentCameras].sort((a, b) => a.zoom - b.zoom);
    displayCameras(currentCameras);
}

function calculateTotalMemory(cameraList) {
    const totalMemory = cameraList.reduce((sum, camera) => sum + camera.memory, 0);
    document.getElementById('totalMemory').textContent = totalMemory;
}

window.searchCameras = searchCameras;
window.clearSearch = clearSearch;
window.sortCamerasByZoom = sortCamerasByZoom;
window.calculateTotalMemory = calculateTotalMemory;
