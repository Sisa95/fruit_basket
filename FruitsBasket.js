module.exports = function Fruits_Basket(pool) {

    async function inserttingFruit(fruit_type, unit_price, quantity) {
        try {
            await pool.query('insert into fruit_basket(fruit_type,quantity, unit_price) values($1,$2,$3)', [fruit_type, unit_price, quantity])
        } catch (err) {
            console.log(err)
        }
    }

    async function getFruitBasket() {
        try {
            let fruit_type = await pool.query('select fruit_type, unit_price, quantity from fruit_basket')
            return fruit_type.rows
        } catch (err) {
            console.log(err)
        }
    }

    async function getAllFruitTypes() {
        try {
            var arr = [];
            let fruit_type = await pool.query('select * from fruit_basket')
            fruit_type.rows.forEach(element => {

                arr.push(element.fruit_type)
            });
            console.log(arr)
            return arr

        } catch (error) {
            console.log(error)
        }
    }

    async function getBasketTotalPrice(fruit_type, unit_price, quantity) {
        try {
            let totalPrice = await pool.query('SELECT fruit_type, quantity * unit_price  AS total_price FROM fruit_basket')
            console.log(totalPrice.rows)
            return totalPrice.rows

        } catch (error) {
            console.log(error)
        }
    }

    async function updateFruitBasket(fruit_type) {
       try{
            await pool.query('select * from fruit_basket')
            await pool.query(`UPDATE fruit_basket SET quantity = (quantity + 1) WHERE fruit_type = $1`, [fruit_type])
            let updateBasket = await pool.query('select quantity from fruit_basket where fruit_type = $1',[fruit_type])
            console.log( updateBasket.rows)

            return updateBasket.rows

        } catch (error) {
            console.log(error)
        }
    }

    async function getTotal() {
        try {
            let x = await pool.query('SELECT SUM(unit_price) FROM fruit_basket') 
            console.log(x.rows)
            return x.rows

        } catch (error) {
            console.log(error)
        }
    }

    return {
        inserttingFruit,
        getFruitBasket,
        getAllFruitTypes,
        getBasketTotalPrice,
        updateFruitBasket,
        getTotal

    }
}