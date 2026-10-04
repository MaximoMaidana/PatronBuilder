class PeticionHTTP {
    public url!: string;
    public metodo: string = "GET"; // Por defecto
    public headers?: Record<string, string> | undefined;
    public body?: Record<string, any> | undefined;
    public timeout?: number | undefined;

    enviar(): void {
        console.log(`\n[Enviando ${this.metodo}] a ${this.url}`);
        if (this.headers) console.log("   Headers:", this.headers);
        if (this.body) console.log("   Body:", this.body);
        if (this.timeout) console.log(`   Timeout: ${this.timeout}ms`);
    }
}

class RequestBuilder {
    private peticion: PeticionHTTP;

    // Pasamos la URL directamente porque es lo único indispensable
    constructor(url: string) {
        this.peticion = new PeticionHTTP();
        this.peticion.url = url;
    }

    setMetodo(metodo: string): this {
        this.peticion.metodo = metodo;
        return this;
    }

    setHeaders(headers: Record<string, string>): this {
        this.peticion.headers = headers;
        return this;
    }

    setBody(body: Record<string, any>): this {
        this.peticion.body = body;
        return this;
    }

    setTimeout(timeout: number): this {
        this.peticion.timeout = timeout;
        return this;
    }

    build(): PeticionHTTP {
        return this.peticion;
    }
}

console.log("\n--- PETICIÓN HTTP (CON BUILDER) ---");

console.log("\n1. Petición GET Simple:");
const getSimple = new RequestBuilder("https://api.test/usuarios").build();
getSimple.enviar();

console.log("\n2. Petición POST Completa (Crear usuario):");
const postCompleto = new RequestBuilder("https://api.test/usuarios")
    .setMetodo("POST")
    .setHeaders({ "Authorization": "Bearer abc-123" })
    .setBody({ nombre: "Max", rol: "Admin" })
    .setTimeout(5000)
    .build();
postCompleto.enviar();

console.log("\n3. Petición GET con Timeout:");
console.log("Nota: Directo al grano. Omitimos Headers y Body, y configuramos solo lo que nos importa.");
const getConTimeout = new RequestBuilder("https://api.test/usuarios")
    .setTimeout(3000)
    .build();
getConTimeout.enviar();