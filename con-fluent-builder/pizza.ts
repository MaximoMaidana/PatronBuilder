class Pizza {
    public tamaño!: string;
    public masa!: string;
    public quesoExtra?: boolean | undefined;
    public pepperoni?: boolean | undefined;
    public champinones?: boolean | undefined;
    public aceitunas?: boolean | undefined;

    mostrarDetalles(): void {
        console.log(this);
    }
}

class PizzaBuilder {
    private pizza: Pizza;

    constructor() {
        this.pizza = new Pizza();
    }

    setTamaño(tamaño: string): this {
        this.pizza.tamaño = tamaño;
        return this;
    }

    setMasa(masa: string): this {
        this.pizza.masa = masa;
        return this;
    }

    addQuesoExtra(): this {
        this.pizza.quesoExtra = true;
        return this;
    }

    addPepperoni(): this {
        this.pizza.pepperoni = true;
        return this;
    }

    addChampinones(): this {
        this.pizza.champinones = true;
        return this;
    }

    addAceitunas(): this {
        this.pizza.aceitunas = true;
        return this;
    }

    build(): Pizza {
        if (!this.pizza.tamaño || !this.pizza.masa) {
            throw new Error("Toda pizza necesita un tamaño y un tipo de masa.");
        }
        return this.pizza;
    }
}

console.log("\n--- PIDIENDO PIZZA CON BUILDER ---");

console.log("\n1. Pizza de Pepperoni (Clásica):");
// Nota: Solo llamamos a los ingredientes que queremos. Código semántico y autoexplicativo.
const pizzaPepperoni = new PizzaBuilder()
    .setTamaño("Mediana")
    .setMasa("Fina")
    .addPepperoni()
    .build();
pizzaPepperoni.mostrarDetalles();

console.log("\n2. Pizza Vegana (Solo masa, champiñones y aceitunas):");
//Nota: Ni rastro de la palabra 'undefined'. Se lee literalmente como una receta.
const pizzaVegana = new PizzaBuilder()
    .setTamaño("Familiar")
    .setMasa("Integral")
    .addChampinones()
    .addAceitunas()
    .build();
pizzaVegana.mostrarDetalles();