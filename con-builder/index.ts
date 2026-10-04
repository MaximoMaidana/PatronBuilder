class Computadora {
    public cpu!: string;
    public ram!: string;
    public almacenamiento!: string;
    public gpu?: string | undefined;
    public refrigeracionLiquida?: boolean | undefined;
    public wifi?: boolean | undefined;

    mostrarEspecificaciones(): void {
        console.log("Especificaciones (Con Builder):", this);
    }
}

class ComputadoraBuilder {
    private computadora: Computadora;

    constructor() {
        this.computadora = new Computadora();
    }

    setCPU(cpu: string): this {
        this.computadora.cpu = cpu;
        return this; 
    }

    setRAM(ram: string): this {
        this.computadora.ram = ram;
        return this;
    }

    setAlmacenamiento(almacenamiento: string): this {
        this.computadora.almacenamiento = almacenamiento;
        return this;
    }

    setGPU(gpu: string): this {
        this.computadora.gpu = gpu;
        return this;
    }

    setWifi(wifi: boolean): this {
        this.computadora.wifi = wifi;
        return this;
    }

    setRefrigeracionLiquida(refrigeracionLiquida: boolean): this {
        this.computadora.refrigeracionLiquida = refrigeracionLiquida;
        return this;
    }

    build(): Computadora {
        if (!this.computadora.cpu || !this.computadora.ram || !this.computadora.almacenamiento) {
            throw new Error("Faltan componentes esenciales (CPU, RAM, Almacenamiento)");
        }
        return this.computadora;
    }
}

// Los parámetros opcionales simplemente se omiten, haciendo el código limpio
const pcOficina = new ComputadoraBuilder()
    .setCPU("Intel i3")
    .setRAM("8GB")
    .setAlmacenamiento("256GB SSD")
    .setWifi(true)
    .build();

const pcGamer = new ComputadoraBuilder()
    .setCPU("AMD Ryzen 9")
    .setRAM("32GB")
    .setAlmacenamiento("1TB SSD")
    .setGPU("RTX 4090")
    .setRefrigeracionLiquida(true)
    .setWifi(true)
    .build();

pcOficina.mostrarEspecificaciones();
pcGamer.mostrarEspecificaciones();