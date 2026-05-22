export type Motorcycle = {
    model: string;
    brand: string;
    year: number;
    category: string;
};

export type Section = {
    title: string;
    data: Motorcycle[];
};

export function groupByCategory(motorcycles: Motorcycle[]): Section[] {
    // cria um objeto vazio que vai funcionar como um "dicionário" (mapa chave-string → valor [array de motos])
    const map: Record<string, Motorcycle[]> = {};

    // percorre o array de motos
    for (const moto of motorcycles) {
        if (!map[moto.category]) map[moto.category] = []; // cria o array se não existe
        map[moto.category].push(moto); // adiciona a moto no array da categoria
    }

    // transforma o mapa num array de seções, ordenando por categoria
    return Object.keys(map)
        .sort() // ordena as categorias em ordem alfabética
        .map((title) => ({ title, data: map[title] })); // cria a seção {title: "Categoria", data: [moto1, moto2, ...] } 
}
