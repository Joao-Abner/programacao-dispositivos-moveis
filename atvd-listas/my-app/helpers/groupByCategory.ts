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
    // reduce: percorre o array acumulando um dicionário (mapa categoria → array de motos)
    const map = motorcycles.reduce<Record<string, Motorcycle[]>>((acc, moto) => {

        if (!acc[moto.category]) acc[moto.category] = []; // cria o array se não existe
        // adiciona a moto no array da categoria
        acc[moto.category].push(moto);
        // retorna o acumulador
        return acc;
    }, {});

    // transforma o mapa num array de seções, ordenando por categoria
    return Object.keys(map)
        .sort() // ordena as categorias em ordem alfabética
        .map((title) => ({ title, data: map[title] })); // converte cada categoria em um objeto Section compatível com o SectionList
}
