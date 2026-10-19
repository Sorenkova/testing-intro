const products = require("../../src/data/products");
const { sortProductsByPrice } = require("../../src/catalog");

const ids = (list) => list.map(({ id }) => id);
const pick = (order) =>
  order.map((id) => products.find((product) => product.id === id));

describe("sortProductsByPrice", () => {
  describe("по возрастанию", () => {
    test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
      expect(ids(sortProductsByPrice(products, "asc"))).toEqual([
        3, 6, 5, 4, 2, 1,
      ]);
    });
    test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
      expect(ids(sortProductsByPrice(products, "asc"))).toEqual([
        3, 6, 5, 4, 2, 1,
      ]);
    });
    test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
      const catalog = products.filter(({ id }) => [1, 3, 4].includes(id));
      expect(ids(sortProductsByPrice(catalog, "asc"))).toEqual([3, 4, 1]);
    });
  });

  describe("по убыванию", () => {
    test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
      expect(ids(sortProductsByPrice(products, "desc"))).toEqual([
        1, 2, 4, 5, 6, 3,
      ]);
    });
    test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
      const catalog = pick([3, 1, 4]);
      expect(ids(sortProductsByPrice(catalog, "desc"))).toEqual([1, 4, 3]);
    });
    test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
      const catalog = pick([5, 2, 6]);
      expect(ids(sortProductsByPrice(catalog, "desc"))).toEqual([2, 5, 6]);
    });
  });

  describe("исходный массив не меняется", () => {
    test("'asc' не меняет исходный массив [1, 3, 4]", () => {
      const catalog = products.filter(({ id }) => [1, 3, 4].includes(id));
      sortProductsByPrice(catalog, "asc");
      expect(ids(catalog)).toEqual([1, 3, 4]);
    });
    test("'desc' не меняет исходный массив [1, 3, 4]", () => {
      const catalog = products.filter(({ id }) => [1, 3, 4].includes(id));
      sortProductsByPrice(catalog, "desc");
      expect(ids(catalog)).toEqual([1, 3, 4]);
    });
    test("направление по умолчанию не меняет исходный массив всех товаров", () => {
      sortProductsByPrice(products);
      expect(ids(products)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
