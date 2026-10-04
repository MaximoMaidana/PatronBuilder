class Computadora {
    public cpu: string;
    public ram: string;
    public almacenamiento: string;
    public gpu?: string | undefined;
    public refrigeracionLiquida?: boolean | undefined;
    public wifi?: boolean | undefined;

    constructor(
        cpu: string, 
        ram: string, 
        almacenamiento: string, 
        gpu?: string, 
        refrigeracionLiquida?: boolean, 
        wifi?: boolean
    ) {
        this.cpu = cpu;
        this.ram = ram;
        this.almacenamiento = almacenamiento;
        this.gpu = gpu;
        this.refrigeracionLiquida = refrigeracionLiquida;
        this.wifi = wifi;
    }

    mostrarEspecificaciones(): void {
        console.log("Especificaciones (Sin Builder):", this);
    }
}

// Pasamos explícitamente undefined, lo cual ahora es permitido por la interfaz
const pcOficina = new Computadora("Intel i3", "8GB", "256GB SSD", undefined, undefined, true);
const pcGamer = new Computadora("AMD Ryzen 9", "32GB", "1TB SSD", "RTX 4090", true, true);

pcOficina.mostrarEspecificaciones();
pcGamer.mostrarEspecificaciones();