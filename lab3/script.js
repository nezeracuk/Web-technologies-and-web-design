import {cameras} from "./js/cameras.js";

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
}

displayCameras(cameras);

function searchCameras() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredCameras = cameras.filter(camera =>
        camera.manufacturer.toLowerCase().includes(searchQuery)
    );
    displayCameras(filteredCameras);
}
function clearSearch() {
    const searchInput = document.getElementById('search');
    searchInput.value = '';
    displayCameras(cameras);
}

function sortCamerasByZoom() {
    const sortedCameras = [...cameras].sort((a, b) => a.zoom - b.zoom);
    displayCameras(sortedCameras);
}

function calculateTotalMemory() {
    const totalMemory = cameras.reduce((sum, camera) => sum + camera.memory, 0);
    document.getElementById('totalMemory').textContent = totalMemory;
}

window.searchCameras = searchCameras;
window.clearSearch = clearSearch;
window.sortCamerasByZoom = sortCamerasByZoom;
window.calculateTotalMemory = calculateTotalMemory;

