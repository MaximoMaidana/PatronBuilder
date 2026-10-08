class Pizza {
    public tamaño: string;
    public masa: string;
    public quesoExtra?: boolean | undefined;
    public pepperoni?: boolean | undefined;
    public champinones?: boolean | undefined;
    public aceitunas?: boolean | undefined;

    constructor(
        tamaño: string,
        masa: string,
        quesoExtra?: boolean | undefined,
        pepperoni?: boolean | undefined,
        champinones?: boolean | undefined,
        aceitunas?: boolean | undefined
    ) {
        this.tamaño = tamaño;
        this.masa = masa;
        this.quesoExtra = quesoExtra;
        this.pepperoni = pepperoni;
        this.champinones = champinones;
        this.aceitunas = aceitunas;
    }

    mostrarDetalles(): void {
        console.log(this);
    }
}

console.log("\n--- PIDIENDO PIZZA SIN BUILDER ---");

console.log("\n1. Pizza de Pepperoni (Clásica):");
//Nota: Tenemos que pasar 'undefined' a quesoExtra para llegar al pepperoni, y más 'undefined' si no queremos lo demás.
const pizzaPepperoni = new Pizza("Mediana", "Fina", undefined, true, undefined, undefined);
pizzaPepperoni.mostrarDetalles();

console.log("\n2. Pizza Champiñones (Solo masa, champiñones y aceitunas):");
//Nota: ¿Qué significan todos esos 'undefined' seguidos? Es imposible saberlo sin leer la clase original.
const pizzaChampinones = new Pizza("Familiar", "Integral", undefined, undefined, true, true);
pizzaChampinones.mostrarDetalles();