<template>
    <v-flex class="pr-3 pb-3" xs12 md6 lg4>
        <v-card class="green draken-3 white--text">
            <v-card-title class="headline">
                <strong>{{ stock.name }} <small>(Preço: {{ stock.price | currency }})</small></strong>
            </v-card-title>
        </v-card>

        <v-card>
            <v-container fill-height>
                <v-text-field v-model.number="quantity"
                    :error="insufficientFunds || !Number.isInteger(quantity)"
                    label="Quantidade"
                    type="number">
                </v-text-field>

                <v-btn @click="buyStock"
                    class="green draken-3 white--text"
                    :disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(quantity)">
                    {{ insufficientFunds ? 'Insufiente' : 'Comprar'}}
                </v-btn>
            </v-container>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    props: {
        stock: {
            type: [Array, Object]
        }
    },

    data() {
        return {
            quantity: 0
        }
    },

    computed: {
        funds() {
            return this.$store.getters.funds
        },

        insufficientFunds() {
            return this.quantity * this.stock.price > this.funds
        },
    },

    methods: {
        buyStock() {
            const order = {
                quantity: this.quantity,
                stockId: this.stock.id,
                stockPrice: this.stock.price
            }
            this.$store.dispatch('buyStock', order)
            this.quantity = 0
        }
    }
}
</script>

<style>

</style>