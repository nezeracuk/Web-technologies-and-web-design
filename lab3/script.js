let cameras = [
    {id: 1, manufacturer: "Canon", memory: 16364, zoom: 5},
    {id: 2, manufacturer: "Nikon", memory: 8182, zoom: 4},
    {id: 3, manufacturer: "Sony", memory: 51200, zoom: 10},
    {id: 4, manufacturer: "Samsung", memory: 32000, zoom: 8},
    {id: 5, manufacturer: "Canon 3x Pro", memory: 4096, zoom: 3},
    {id: 6, manufacturer: "Nokia", memory: 512, zoom: 2},
    {id: 7, manufacturer: "Nikon 3x Max", memory: 6400, zoom: 3},
];

let currentCameras = [...cameras];

const addCameraForm = document.getElementById('add-camera-form');
const editCameraForm = document.getElementById('edit-camera-form');
const closeModalBtn = document.getElementById("close-modal");
const closeEditModalBtn = document.getElementById("close-edit-modal");
const modal = document.getElementById("modal");
const editModal = document.getElementById("edit-modal");

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
          <br>
          <button onclick="openEditModal(${camera.id})">Edit</button>
        `;
        cameraListDiv.appendChild(cameraDiv);
    });
    calculateTotalMemory(cameraList);
}

function generateUniqueId() {
    return currentCameras.length > 0
        ? Math.max(...currentCameras.map(camera => camera.id)) + 1
        : 1;
}

addCameraForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const manufacturer = document.getElementById("camera-manufacturer").value;
    const memory = parseInt(document.getElementById("camera-memory").value, 10);
    const zoom = parseInt(document.getElementById("camera-zoom").value, 10);

    const newCamera = {
        id: generateUniqueId(),
        manufacturer,
        memory,
        zoom
    };

    currentCameras.push(newCamera);
    displayCameras(currentCameras);
    closeModal();
    addCameraForm.reset();
});

let currentEditIndex = null;

function openEditModal(id) {
    currentEditIndex = currentCameras.findIndex(camera => camera.id === id);
    const cameraToEdit = currentCameras[currentEditIndex];

    document.getElementById("edit-camera-manufacturer").value = cameraToEdit.manufacturer;
    document.getElementById("edit-camera-memory").value = cameraToEdit.memory;
    document.getElementById("edit-camera-zoom").value = cameraToEdit.zoom;

    editModal.style.display = "block";
}

editCameraForm.addEventListener("submit", (event) => {
    event.preventDefault();

    currentCameras[currentEditIndex].manufacturer = document.getElementById("edit-camera-manufacturer").value;
    currentCameras[currentEditIndex].memory = parseInt(document.getElementById("edit-camera-memory").value, 10);
    currentCameras[currentEditIndex].zoom = parseInt(document.getElementById("edit-camera-zoom").value, 10);

    displayCameras(currentCameras);
    closeEditModal();
});

closeModalBtn.addEventListener("click", closeModal);
closeEditModalBtn.addEventListener("click", closeEditModal);

function closeModal() {
    modal.style.display = 'none';
}

function closeEditModal() {
    editModal.style.display = 'none';
}

document.getElementById("add-camera-btn").addEventListener("click", () => {
    modal.style.display = 'block';
});

displayCameras(currentCameras);

function calculateTotalMemory(cameraList) {
    const totalMemory = cameraList.reduce((sum, camera) => sum + camera.memory, 0);
    document.getElementById('totalMemory').textContent = totalMemory;
}

function searchCameras() {
    const query = document.getElementById('search').value.trim().toLowerCase();
    const filteredCameras = currentCameras.filter(camera => camera.manufacturer.toLowerCase().includes(query));
    displayCameras(filteredCameras);
}

function clearSearch() {
    document.getElementById('search').value = '';
    displayCameras(currentCameras);
}

function sortCamerasByZoom() {
    currentCameras.sort((a, b) => a.zoom - b.zoom);
    displayCameras(currentCameras);
}
