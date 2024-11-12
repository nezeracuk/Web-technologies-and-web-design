export class Camera {
    constructor(id, manufacturer, memory, zoom) {
        this.id = id;
        this.manufacturer = manufacturer;
        this.memory = memory;
        this.zoom = zoom;
    }
}

export const cameras = [
    new Camera(1, "Canon", 16364, 5),
    new Camera(2, "Nikon", 8182, 4),
    new Camera(3, "Sony", 51200, 10),
    new Camera(4, "Samsung", 32000, 8),
    new Camera(5, "Canon 3x Pro", 4096, 3),
    new Camera(6, "Nokia", 512, 2),
    new Camera(7, "Nikon 3x Max", 6400, 3),
];
