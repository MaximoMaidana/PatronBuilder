// 1. PRODUCTO: La entidad compleja resultante
class Pizza {
    constructor(
        public tamaño: string = "",
        public masa: string = "",
        public quesoExtra: boolean = false,
        public pepperoni: boolean = false,
        public champinones: boolean = false,
        public aceitunas: boolean = false
    ) {}

    mostrarDetalles(): void {
        console.log(this);
    }
}

// 2. BUILDER: Interfaz que define el contrato abstracto
interface IPizzaBuilder {
    reset(): void;
    setTamaño(tamaño: string): void;
    setMasa(masa: string): void;
    agregarQuesoExtra(): void;
    agregarPepperoni(): void;
    agregarChampinones(): void;
    agregarAceitunas(): void;
    getResult(): Pizza;
}

// 3. CONCRETE BUILDER: Implementa los pasos y mantiene el producto en construcción
class PizzaBuilder implements IPizzaBuilder {
    private pizza!: Pizza;

    constructor() {
        this.reset();
    }

    reset(): void {
        // Inicializa un nuevo producto vacío
        this.pizza = new Pizza();
    }

    setTamaño(tamaño: string): void { this.pizza.tamaño = tamaño; }
    setMasa(masa: string): void { this.pizza.masa = masa; }
    agregarQuesoExtra(): void { this.pizza.quesoExtra = true; }
    agregarPepperoni(): void { this.pizza.pepperoni = true; }
    agregarChampinones(): void { this.pizza.champinones = true; }
    agregarAceitunas(): void { this.pizza.aceitunas = true; }

    getResult(): Pizza {
        const resultado = this.pizza;
        // Prepara el builder para crear un producto nuevo tras entregar este
        this.reset();
        return resultado;
    }
}

// 4. DIRECTOR: Define el orden de llamada para armar recetas predeterminadas
class PizzaDirector {
    private builder!: IPizzaBuilder;

    setBuilder(builder: IPizzaBuilder): void {
        this.builder = builder;
    }

    construirPizzaPepperoni(): void {
        this.builder.setTamaño("Mediana");
        this.builder.setMasa("Fina");
        this.builder.agregarPepperoni();
    }

    construirPizzaChampinones(): void {
        this.builder.setTamaño("Familiar");
        this.builder.setMasa("Integral");
        this.builder.agregarChampinones();
        this.builder.agregarAceitunas();
    }
}

// --- EJECUCIÓN ---

console.log("\n--- PATRÓN BUILDER CLÁSICO (CON DIRECTOR) ---");

const director = new PizzaDirector();
const builder = new PizzaBuilder();

// Vinculamos el builder concreto al director
director.setBuilder(builder);

console.log("\n1. Pizza de Pepperoni (Clásica):");
director.construirPizzaPepperoni();
const pizzaPepperoni = builder.getResult();
pizzaPepperoni.mostrarDetalles();

console.log("\n2. Pizza Champiñones (Solo masa, champiñones y aceitunas):");
director.construirPizzaChampinones();
const pizzaChampinones = builder.getResult();
pizzaChampinones.mostrarDetalles();

console.log("\n3. Pizza Personalizada (Sin Director):");
// El cliente interactúa directamente con el Builder para un pedido "a la carta"
builder.setTamaño("Pequeña");
builder.setMasa("Rellena de queso");
builder.agregarQuesoExtra();
builder.agregarAceitunas();

const pizzaPersonalizada = builder.getResult();
pizzaPersonalizada.mostrarDetalles();