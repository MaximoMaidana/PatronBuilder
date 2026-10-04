class PeticionHTTP {
    public url: string;
    public metodo: string;
    public headers?: Record<string, string> | undefined;
    public body?: Record<string, any> | undefined;
    public timeout?: number | undefined;

    constructor(
        url: string,
        metodo: string = "GET",
        headers?: Record<string, string> | undefined,
        body?: Record<string, any> | undefined,
        timeout?: number | undefined
    ) {
        this.url = url;
        this.metodo = metodo;
        this.headers = headers;
        this.body = body;
        this.timeout = timeout;
    }

    enviar(): void {
        console.log(`\n[Enviando ${this.metodo}] a ${this.url}`);
        if (this.headers) console.log("   Headers:", this.headers);
        if (this.body) console.log("   Body:", this.body);
        if (this.timeout) console.log(`   Timeout: ${this.timeout}ms`);
    }
}

console.log("\n--- PETICIÓN HTTP (SIN BUILDER) ---");

console.log("\n1. Petición GET Simple:");
const getSimple = new PeticionHTTP("https://api.test/usuarios");
getSimple.enviar();

console.log("\n2. Petición POST Completa (Crear usuario):");
console.log("Nota: Funciona bien si mandas todo, pero los parámetros deben ir en un orden estricto.");
const postCompleto = new PeticionHTTP(
    "https://api.test/usuarios", 
    "POST", 
    { "Authorization": "Bearer abc-123" }, 
    { nombre: "Max", rol: "Admin" }, 
    5000
);
postCompleto.enviar();

console.log("\n3. Petición GET con Timeout:");
console.log("Nota: Solo queríamos agregar un límite de tiempo, pero tuvimos que pasar por Headers y Body con 'undefined'.");
const getConTimeout = new PeticionHTTP(
    "https://api.test/usuarios", 
    "GET", 
    undefined, 
    undefined, 
    3000
);
getConTimeout.enviar();