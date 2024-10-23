let cameras = [
    { id: 1, manufacturer: "Canon", memory: 16364, zoom: 5 },
    { id: 2, manufacturer: "Nikon", memory: 8182, zoom: 4 },
    { id: 3, manufacturer: "Sony", memory: 51200, zoom: 10 },
    { id: 4, manufacturer: "Samsung", memory: 32000, zoom: 8 },
    { id: 5, manufacturer: "Canon 3x Pro", memory: 4096, zoom: 3 },
    { id: 6, manufacturer: "Nokia", memory: 512, zoom: 2 },
    { id: 7, manufacturer: "Nikon 3x Max", memory: 6400, zoom: 3 },
];

export const getAllCameras = (req, res) => {
    res.json(cameras);
};

export const addCamera = (req, res) => {
    const { manufacturer, memory, zoom } = req.body;
    const newCamera = {
        id: cameras.length > 0 ? Math.max(...cameras.map(camera => camera.id)) + 1 : 1,
        manufacturer,
        memory,
        zoom,
    };
    cameras.push(newCamera);
    res.status(201).json(newCamera);
};

export const editCamera = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const cameraIndex = cameras.findIndex(camera => camera.id === id);
    if (cameraIndex === -1) {
        return res.status(404).send('Camera not found');
    }

    const { manufacturer, memory, zoom } = req.body;
    cameras[cameraIndex] = { ...cameras[cameraIndex], manufacturer, memory, zoom };
    res.json(cameras[cameraIndex]);
};

export const deleteCamera = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const cameraIndex = cameras.findIndex(camera => camera.id === id);
    if (cameraIndex === -1) {
        return res.status(404).send('Camera not found');
    }
    const deletedCamera = cameras.splice(cameraIndex, 1);
    res.json(deletedCamera);
};

export const searchCameras = (req, res) => {
    const query = req.query.q ? req.query.q.trim().toLowerCase() : '';
    const filteredCameras = cameras.filter(camera => camera.manufacturer.toLowerCase().includes(query));
    res.json(filteredCameras);
};

export const sortCameras = (req, res) => {
    const sortedCameras = [...cameras].sort((a, b) => a.zoom - b.zoom);
    res.json(sortedCameras);
};

export const getTotalMemory = (req, res) => {
    const totalMemory = cameras.reduce((sum, camera) => sum + camera.memory, 0);
    res.json({ totalMemory });
};
