let assert = require("assert");
let Fruits_Basket = require("../FruitsBasket");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:codex123@localhost:5432/fruits'

const pool = new Pool({
    connectionString
});

describe('Fruit Basket', function () {


    beforeEach(async function () {
        await pool.query("delete from fruit_basket");
    });

    it('should be able to insert fruit, quantity and the unit price of the fruit', async function () {

        const basket = Fruits_Basket(pool);
        await basket.inserttingFruit('pineapple', 9, 15)

        let fruit_type = await basket.getFruitBasket()

        assert.deepEqual([{
            "fruit_type": "pineapple",
            "quantity": 9,
            "unit_price": 15
        }], fruit_type)
    });

    it('should be able to show all types of fruits in the fruit basket', async function () {

        const basket = Fruits_Basket(pool);
        await basket.inserttingFruit('pineapple', 9, 15)
        await basket.inserttingFruit('apple', 11, 2)
        await basket.inserttingFruit('mango', 12, 18.42)
        await basket.inserttingFruit('banana', 6, 3.55)
        await basket.inserttingFruit('lemon', 4, 2.50)

        let fruit_type = await basket.getAllFruitTypes()

        assert.deepEqual(['pineapple', 'apple', 'mango', 'banana', 'lemon'], fruit_type)
    });

    it('should be able to show total price each selected fruit basket', async function () {

        const basket = Fruits_Basket(pool);
        await basket.inserttingFruit('pineapple', 9, 15)


        let totalPrice = await basket.getBasketTotalPrice('pineapple', 9, 15)

        assert.deepEqual([{
            fruit_type: 'pineapple',
            total_price: 135
        }], totalPrice)
    });

    it('should be able to show the sum of the basket', async function () {

        const basket = Fruits_Basket(pool);
        await basket.inserttingFruit('pineapple', 9, 15)
        await basket.inserttingFruit('apple', 11, 2)
        await basket.inserttingFruit('mango', 12, 18.42)
        await basket.inserttingFruit('banana', 6, 3.55)
        await basket.inserttingFruit('lemon', 4, 2.50)

        let basketSum = await basket.getTotal()

        assert.deepEqual([{
            sum: 41.47
        }],basketSum)
    });

    it('should be able to update quantity of any selected fruit and total price', async function () {

        const basket = Fruits_Basket(pool);
        
        await basket.inserttingFruit('mango', 12, 18.42)
        await basket.inserttingFruit('pineapple', 9, 15)

        let totalPrice = await basket.updateFruitBasket('pineapple')

        assert.deepEqual([{
            quantity: 10
        }], totalPrice)
    });

    after(function () {
        pool.end();
    })
});