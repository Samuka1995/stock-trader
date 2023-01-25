<template>
    <div>
        <canvas id="myChart" height='15vh' width='40vw'></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
import { mapGetters } from 'vuex'

export default {
    // props: {
    //     labels: {
    //         type: Array,
    //         required: true
    //     }
    // },

    computed: {
        ...mapGetters({
            stocks: 'stockPortfolio'
        }),

        stocksLabel() {
            var name = this.stocks.map(stk => stk.name)
            return name
        },

        stocksQuantity() {
            var quantity = this.stocks.map(stk => stk.quantity)
            return quantity
        },

        setDay() {
            let date = new Date();
            let day = String(date.getDate()).padStart(2, '0');
            return day
        },
    },

    mounted() {
        const data = {
            labels: [ ...this.stocksLabel ],
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Compra',
                    data: [ ...this.stocksQuantity ],
                    backgroundColor: [
                        'red',
                        'blue',
                        'yellow',
                        'green',
                    ],
                    borderColor: [
                        'green',
                        'yellow',
                        'blue',
                        'red',
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Venda',
                    data: [ ...this.stocksQuantity ],
                    backgroundColor: [
                        'green',
                        'yellow',
                        'blue',
                        'red',
                    ],
                    borderColor: [
                        'red',
                        'blue',
                        'yellow',
                        'green',
                    ],
                    borderWidth: 1
                }
            ]
        }

        const config = {
            /* TIPO GRAFICO */
            type: 'line',

            /*DADOS DO GRAFICO */
            data: data,

            /* CONFIGURAÇÕES EXTRA */
            options: {
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: true
                    }
                },
                scales: {
                    y: { // defining min and max so hiding the dataset does not change scale range
                        min: 0,
                    }
                }
            },
        };

        const ctx = document.querySelector('#myChart')

        const myChart = new Chart(ctx, config)
        myChart;
    },

    destroy() {
        this.myChart.destroy()
    }
}
</script>

<style>
</style>