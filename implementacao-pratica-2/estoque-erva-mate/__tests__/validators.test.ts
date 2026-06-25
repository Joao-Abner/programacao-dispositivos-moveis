import { isValidPrice, isValidStock, formatCurrency } from "../src/helpers/validators";

describe("Testes Unitários: Funções e Regras de Negócio (Estoque Erva-Mate)", () => {
  
  // Teste 1: Validação de Preço de Produto
  test("deve validar corretamente se o preço informado é positivo e válido", () => {
    expect(isValidPrice(25.90)).toBe(true);
    expect(isValidPrice(100)).toBe(true);
    expect(isValidPrice(0)).toBe(false);
    expect(isValidPrice(-15.50)).toBe(false);
  });

  // Teste 2: Validação de Quantidade em Estoque
  test("deve validar corretamente se a quantidade em estoque é um número inteiro não-negativo", () => {
    expect(isValidStock(50)).toBe(true);
    expect(isValidStock(0)).toBe(true);
    expect(isValidStock(-5)).toBe(false);
    expect(isValidStock(12.5)).toBe(false); // estoque não pode ser quebrado
  });

  // Teste 3: Formatação de Moeda Brasileira (BRL)
  test("deve formatar valores numéricos para o padrão monetário brasileiro (R$)", () => {
    expect(formatCurrency(25.9)).toBe("R$ 25,90");
    expect(formatCurrency(150)).toBe("R$ 150,00");
    expect(formatCurrency(9.99)).toBe("R$ 9,99");
  });

});
