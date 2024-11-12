document.addEventListener("DOMContentLoaded", () => {
    const sortCameraBtn = document.getElementById("sort-camera-btn");
    if (sortCameraBtn) {
        sortCameraBtn.addEventListener("click", sortCamerasByZoom);
    }

    const searchButton = document.getElementById("wanna-button");
    if (searchButton) {
        searchButton.addEventListener("click", searchCameras);
    }

    const clearButton = document.getElementById("nevermind-button");
    if (clearButton) {
        clearButton.addEventListener("click", clearSearch);
    }

    const addCameraBtn = document.getElementById("add-camera-btn");
    if (addCameraBtn) {
        addCameraBtn.addEventListener("click", () => {
            document.getElementById("modal").style.display = "block";
        });
    }

    const closeModalBtn = document.getElementById("close-modal");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            document.getElementById("modal").style.display = "none";
        });
    }

    const closeEditModalBtn = document.getElementById("close-edit-modal");
    if (closeEditModalBtn) {
        closeEditModalBtn.addEventListener("click", () => {
            document.getElementById("edit-modal").style.display = "none";
        });
    }

    document.getElementById("add-camera-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки
        addCamera();
    });

    document.getElementById("edit-camera-form").addEventListener("submit", function (event) {
        event.preventDefault();
        editCamera();
    });

    fetchCameras();
});

async function fetchCameras() {
    try {
        const response = await fetch('http://localhost:3000/cameras');
        const cameras = await response.json();
        currentCameras = cameras;
        displayCameras(cameras);
    } catch (error) {
        console.error('Error fetching cameras:', error);
    }
}

function displayCameras(cameraList) {
    const cameraListDiv = document.getElementById('cameraList');
    cameraListDiv.innerHTML = '';
    cameraList.forEach(camera => {
        const cameraDiv = document.createElement('div');
        cameraDiv.className = 'item';
        cameraDiv.innerHTML = `
            <strong>Manufacturer:</strong> ${camera.manufacturer} <br>
            <strong>Memory:</strong> ${camera.memory} MB <br>
            <strong>Zoom:</strong> ${camera.zoom}x <br>
            <button class="edit-button" data-id="${camera.id}">Edit</button>
            <button class="delete-button" data-id="${camera.id}">Delete</button>
            <br><br>
        `;
        cameraListDiv.appendChild(cameraDiv);
    });

    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", () => openEditModal(button.dataset.id));
    });

    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", () => deleteCamera(button.dataset.id));
    });

    calculateTotalMemory(cameraList);
}

async function addCamera() {
    const manufacturer = document.getElementById("camera-manufacturer").value.trim();
    const memory = parseInt(document.getElementById("camera-memory").value, 10);
    const zoom = parseInt(document.getElementById("camera-zoom").value, 10);

    if (!manufacturer || isNaN(memory) || isNaN(zoom)) {
        alert("Please fill in all the fields correctly");
        return;
    }

    const newCamera = { manufacturer, memory, zoom };

    try {
        const response = await fetch('http://localhost:3000/cameras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCamera)
        });

        if (response.ok) {
            document.getElementById("modal").style.display = "none"; // Закриваємо модальне вікно
            fetchCameras();
        } else {
            alert("Failed to add camera");
        }
    } catch (error) {
        console.error('Error adding camera:', error);
    }
}

async function editCamera() {
    const editId = document.getElementById("editId").value.trim();
    const editManufacturer = document.getElementById("edit-camera-manufacturer").value.trim();
    const editMemory = parseInt(document.getElementById("edit-camera-memory").value, 10);
    const editZoom = parseInt(document.getElementById("edit-camera-zoom").value, 10);

    if (!editManufacturer || isNaN(editMemory) || isNaN(editZoom)) {
        alert("Please fill in all the fields correctly");
        return;
    }

    const updatedCamera = { manufacturer: editManufacturer, memory: editMemory, zoom: editZoom };

    try {
        const response = await fetch(`http://localhost:3000/cameras/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCamera)
        });

        if (response.ok) {
            document.getElementById("edit-modal").style.display = "none";
            fetchCameras();
        } else {
            alert("Failed to edit camera");
        }
    } catch (error) {
        console.error('Error editing camera:', error);
    }
}

function calculateTotalMemory(cameraList) {
    const totalMemory = cameraList.reduce((sum, camera) => sum + camera.memory, 0);
    document.getElementById('totalMemory').textContent = totalMemory;
}

function searchCameras() {
    const query = document.getElementById('search').value.trim().toLowerCase();
    fetch(`http://localhost:3000/cameras/search?q=${query}`)
        .then(response => response.json())
        .then(filteredCameras => {
            displayCameras(filteredCameras);
        })
        .catch(error => console.error('Error searching cameras:', error));
}

function clearSearch() {
    document.getElementById('search').value = '';
    fetchCameras();
}

function sortCamerasByZoom() {
    fetch(`http://localhost:3000/cameras`)
        .then(response => response.json())
        .then(data => {
            let sortedCameras = [...data].sort((a, b) => a.zoom - b.zoom);
            displayCameras(sortedCameras);
        })
        .catch(error => console.error('Error sorting cameras:', error));
}

function openEditModal(cameraId) {
    const camera = currentCameras.find(cam => cam.id == cameraId);
    if (camera) {
        const editManufacturerInput = document.getElementById("edit-camera-manufacturer");
        const editMemoryInput = document.getElementById("edit-camera-memory");
        const editZoomInput = document.getElementById("edit-camera-zoom");
        const editIdInput = document.getElementById("editId");

        if (editManufacturerInput && editMemoryInput && editZoomInput && editIdInput) {
            editManufacturerInput.value = camera.manufacturer;
            editMemoryInput.value = camera.memory;
            editZoomInput.value = camera.zoom;
            editIdInput.value = camera.id;

            document.getElementById("edit-modal").style.display = "block";
            currentEditIndex = cameraId;
        } else {
            console.error("One or more input elements for editing are not found.");
        }
    } else {
        console.error("Camera not found for editing.");
        alert("Camera not found");
    }
}

async function deleteCamera(cameraId) {
    try {
        const response = await fetch(`http://localhost:3000/cameras/${cameraId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchCameras();
        } else {
            alert("Failed to delete camera");
        }
    } catch (error) {
        console.error('Error deleting camera:', error);
    }
}
