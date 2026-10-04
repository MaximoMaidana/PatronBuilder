class ConsultaSQL {
    public tabla!: string;
    public campos: string = "*";
    public condicion?: string | undefined;
    public orden?: string | undefined;
    public limite?: number | undefined;

    ejecutar(): void {
        let sql = `SELECT ${this.campos} FROM ${this.tabla}`;
        if (this.condicion) sql += ` WHERE ${this.condicion}`;
        if (this.orden) sql += ` ORDER BY ${this.orden}`;
        if (this.limite) sql += ` LIMIT ${this.limite}`;
        console.log(`[Ejecutando] -> ${sql};`);
    }
}

class QueryBuilder {
    private consulta: ConsultaSQL;

    constructor(tabla: string) {
        this.consulta = new ConsultaSQL();
        this.consulta.tabla = tabla;
    }

    select(campos: string): this {
        this.consulta.campos = campos;
        return this;
    }

    where(condicion: string): this {
        this.consulta.condicion = condicion;
        return this;
    }

    orderBy(orden: string): this {
        this.consulta.orden = orden;
        return this;
    }

    limit(limite: number): this {
        this.consulta.limite = limite;
        return this;
    }

    build(): ConsultaSQL {
        return this.consulta;
    }
}

console.log("\n--- CONSTRUCTOR DE SQL (CON BUILDER) ---");

// 1. Consulta Simple (Obtener todos los usuarios)
const consultaSimple = new QueryBuilder("usuarios").build();
consultaSimple.ejecutar();

// 2. Consulta Compleja (10 usuarios activos más recientes)
// Nota: El encadenamiento de métodos se lee exactamente igual que la sintaxis nativa de SQL. La intención es 100% clara.
const consultaFiltro = new QueryBuilder("usuarios")
    .where("estado = 'activo'")
    .orderBy("fecha_creacion DESC")
    .limit(10)
    .build();
consultaFiltro.ejecutar();

// 3. Consulta Intermedia (Solo obtener 5 correos)
// Nota: No hay rastro de los parámetros intermedios (where, orderBy). Simplemente los omitimos y construimos lo que necesitamos.
const consultaCorreos = new QueryBuilder("usuarios")
    .select("email")
    .limit(5)
    .build();
consultaCorreos.ejecutar();