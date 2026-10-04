class ConsultaSQL {
    public tabla: string;
    public campos?: string | undefined;
    public condicion?: string | undefined;
    public orden?: string | undefined;
    public limite?: number | undefined;

    constructor(
        tabla: string,
        campos?: string | undefined,
        condicion?: string | undefined,
        orden?: string | undefined,
        limite?: number | undefined
    ) {
        this.tabla = tabla;
        this.campos = campos || "*";
        this.condicion = condicion;
        this.orden = orden;
        this.limite = limite;
    }

    ejecutar(): void {
        let sql = `SELECT ${this.campos} FROM ${this.tabla}`;
        if (this.condicion) sql += ` WHERE ${this.condicion}`;
        if (this.orden) sql += ` ORDER BY ${this.orden}`;
        if (this.limite) sql += ` LIMIT ${this.limite}`;
        console.log(`[Ejecutando] -> ${sql};`);
    }
}

console.log("\n--- CONSTRUCTOR DE SQL (SIN BUILDER) ---");

// 1. Consulta Simple (Obtener todos los usuarios)
// Nota: Funciona, pero si queremos agregar un LIMIT, el constructor nos obligará a llenar lo demás.
const consultaSimple = new ConsultaSQL("usuarios");
consultaSimple.ejecutar();

// 2. Consulta Compleja (10 usuarios activos más recientes)
// Nota: Al tener tantos parámetros posicionales seguidos, es imposible saber qué rol cumple cada string (¿Cuál es el WHERE y cuál el ORDER BY?) sin ir a leer la clase original.
const consultaFiltro = new ConsultaSQL("usuarios", "*", "estado = 'activo'", "fecha_creacion DESC", 10);
consultaFiltro.ejecutar();

// 3. Consulta Intermedia (Solo obtener 5 correos)
// Nota: Tenemos que pasar por 'condicion' y 'orden' dejándolos 'undefined' obligatoriamente solo para llegar al límite.
const consultaCorreos = new ConsultaSQL("usuarios", "email", undefined, undefined, 5);
consultaCorreos.ejecutar();