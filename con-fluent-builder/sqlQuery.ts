// 1. PRODUCTO
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

// 2. BUILDER (La Interfaz abstracta)
// Exige que todos los métodos retornen 'this' para garantizar el encadenamiento
interface IQueryBuilder {
    select(campos: string): this;
    where(condicion: string): this;
    orderBy(orden: string): this;
    limit(limite: number): this;
    build(): ConsultaSQL;
}

// 3. CONCRETE BUILDER (Implementa la interfaz)
class QueryBuilder implements IQueryBuilder {
    private consulta: ConsultaSQL;

    constructor(tabla: string) {
        this.consulta = new ConsultaSQL();
        this.consulta.tabla = tabla;
    }

    select(campos: string): this {
        this.consulta.campos = campos;
        return this; // Retorna la propia instancia (Fluent)
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

console.log("\n--- FLUENT BUILDER (Con Interfaz) ---");

// 1. Consulta Compleja (10 usuarios activos más recientes)
const consultaFiltro = new QueryBuilder("usuarios")
    .where("estado = 'activo'")
    .orderBy("fecha_creacion DESC")
    .limit(10)
    .build();
consultaFiltro.ejecutar();

// 2. Consulta Intermedia (Solo obtener 5 correos)
const consultaCorreos = new QueryBuilder("usuarios")
    .select("email")
    .limit(5)
    .build();
consultaCorreos.ejecutar();