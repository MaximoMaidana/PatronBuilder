// 1. PRODUCTOS (Quedan iguales)
interface IConsulta {
    ejecutar(): void;
}

class ConsultaPostgres implements IConsulta {
    constructor(private query: string) {}
    ejecutar(): void {
        console.log(`[Ejecutando en Postgres] -> ${this.query}`);
    }
}

class ConsultaMongoDB implements IConsulta {
    constructor(private query: string) {}
    ejecutar(): void {
        console.log(`[Ejecutando en MongoDB]  -> ${this.query}`);
    }
}

// 2. BUILDER (Interfaz mejorada: no acepta SQL crudo)
interface IQueryBuilder {
    reset(): void;
    setTabla(tabla: string): void;
    select(campos: string): void;
    // Ahora pasamos el campo y el valor por separado
    where(campo: string, valor: string): void;
    orderBy(campo: string, direccion: "ASC" | "DESC"): void;
    limit(limite: number): void;
    getResult(): IConsulta; 
}

// 3. CONCRETE BUILDER A (SQL)
class PostgresQueryBuilder implements IQueryBuilder {
    private tabla!: string;
    private campos: string = "*";
    private condicion?: string | undefined;
    private orden?: string | undefined;
    private limite?: number | undefined;

    constructor() { this.reset(); }

    reset(): void {
        this.tabla = ""; this.campos = "*"; this.condicion = undefined;
        this.orden = undefined; this.limite = undefined;
    }

    setTabla(tabla: string): void { this.tabla = tabla; }
    select(campos: string): void { this.campos = campos; }
    
    // Postgres arma su sintaxis con = y comillas simples
    where(campo: string, valor: string): void { 
        this.condicion = `${campo} = '${valor}'`; 
    }
    
    // Postgres concatena el campo y ASC/DESC
    orderBy(campo: string, direccion: "ASC" | "DESC"): void { 
        this.orden = `${campo} ${direccion}`; 
    }
    
    limit(limite: number): void { this.limite = limite; }

    getResult(): IConsulta {
        let sql = `SELECT ${this.campos} FROM ${this.tabla}`;
        if (this.condicion) sql += ` WHERE ${this.condicion}`;
        if (this.orden) sql += ` ORDER BY ${this.orden}`;
        if (this.limite) sql += ` LIMIT ${this.limite}`;
        
        const resultado = new ConsultaPostgres(sql + ";");
        this.reset(); 
        return resultado;
    }
}

// 3. CONCRETE BUILDER B (NoSQL)
class MongoQueryBuilder implements IQueryBuilder {
    private coleccion!: string;
    private campos?: string | undefined;
    private condicion?: string | undefined;
    private orden?: string | undefined;
    private limite?: number | undefined;

    constructor() { this.reset(); }

    reset(): void {
        this.coleccion = ""; this.campos = undefined; this.condicion = undefined;
        this.orden = undefined; this.limite = undefined;
    }

    setTabla(tabla: string): void { this.coleccion = tabla; }
    select(campos: string): void { this.campos = campos; }
    
    // Mongo arma su sintaxis JSON con : y comillas
    where(campo: string, valor: string): void { 
        this.condicion = `${campo}: '${valor}'`; 
    }
    
    // Mongo traduce DESC a -1 y ASC a 1
    orderBy(campo: string, direccion: "ASC" | "DESC"): void { 
        const dir = direccion === "DESC" ? -1 : 1;
        this.orden = `{ ${campo}: ${dir} }`; 
    }
    
    limit(limite: number): void { this.limite = limite; }

    getResult(): IConsulta {
        let query = `db.${this.coleccion}.find({ ${this.condicion || ''} })`;
        if (this.campos && this.campos !== "*") query += `.select("${this.campos}")`;
        // No agregamos comillas alrededor de this.orden porque ya es un objeto JSON en string
        if (this.orden) query += `.sort(${this.orden})`;
        if (this.limite) query += `.limit(${this.limite})`;
        
        const resultado = new ConsultaMongoDB(query);
        this.reset();
        return resultado;
    }
}

// 4. DIRECTOR (Totalmente agnóstico del motor de DB)
class QueryDirector {
    private builder!: IQueryBuilder;

    setBuilder(builder: IQueryBuilder): void {
        this.builder = builder;
    }

    construirConsultaTop10Activos(): void {
        this.builder.setTabla("usuarios");
        // Mandamos los datos puros, el Builder decide cómo unirlos
        this.builder.where("estado", "activo");
        this.builder.orderBy("fecha_creacion", "DESC");
        this.builder.limit(10);
    }
}

// --- EJECUCIÓN ---

console.log("\n--- PATRÓN BUILDER CLÁSICO CON POLIMORFISMO ---");

const director = new QueryDirector();

const postgresBuilder = new PostgresQueryBuilder();
director.setBuilder(postgresBuilder);

console.log("\n1. PostgresBuilder:");
director.construirConsultaTop10Activos();
postgresBuilder.getResult().ejecutar();

const mongoBuilder = new MongoQueryBuilder();
director.setBuilder(mongoBuilder);

console.log("\n2. MongoBuilder:");
director.construirConsultaTop10Activos();
mongoBuilder.getResult().ejecutar();