<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="shadow rounded-3 p-3 mb-3">
          <h4 class="text-center fs-5 mb-4">美元匯率</h4>
          <div class="d-flex justify-content-around">
            <p class="text-secondary">1 美元等於</p>
            <p class="fw-bold">$TWD {{ Number(exchangeTWD).toFixed(2) }}</p>
          </div>
        </div>

        <div class="shadow rounded-3 p-3 bg-warning">
          <h4 class="text-center fs-5 mb-4">GST 收益</h4>
          <div class="text-center">
            <p>本月收益 ＿＿＿ GST</p>
            <p>目前收益 ＿＿＿ GST</p>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="rounded-3 shadow px-5 py-3">
          <h4 class="text-center fs-5 mb-4">加密貨幣價錢</h4>
          <table class="table fs-6-5">
            <thead>
              <tr class="text-center">
                <th scope="col">名稱</th>
                <th scope="col">價格</th>
                <th scope="col">24h %</th>
                <th scope="col">7d %</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(coin, i) in coin" :key="'coin' + i">
                <td>
                  <template v-for="(logo, i) in coinLogo[i]" :key="'logo' + i">
                    <img
                      :src="logo.image"
                      :alt="coin[0].name"
                      style="width: 16px"
                    />
                    {{ logo.image }}
                  </template>

                  {{ coin[0].name }}
                  <span class="text-secondary ms-2">{{ coin[0].symbol }}</span>
                </td>

                <td>
                  <p class="mb-0">
                    USD$ {{ coin[0].quote.USD.price.toFixed(2) }}
                  </p>

                  <p class="text-secondary">
                    TWD$
                    {{ (coin[0].quote.USD.price * exchangeTWD).toFixed(2) }}
                  </p>
                </td>
                <td>
                  <p
                    v-if="coin[0].quote.USD.percent_change_24h.toFixed(2) > 0"
                    class="text-success"
                  >
                    {{ coin[0].quote.USD.percent_change_24h.toFixed(2) }}%

                    <i class="bi bi-caret-up-fill"></i>
                  </p>
                  <p v-else class="text-danger">
                    {{ coin[0].quote.USD.percent_change_24h.toFixed(2) }}%
                    <i class="bi bi-caret-down-fill"></i>
                  </p>
                </td>
                <td>
                  <p
                    v-if="coin[0].quote.USD.percent_change_7d.toFixed(2) > 0"
                    class="text-success"
                  >
                    {{ coin[0].quote.USD.percent_change_7d.toFixed(2) }}%

                    <i class="bi bi-caret-up-fill"></i>
                  </p>
                  <p v-else class="text-danger">
                    {{ coin[0].quote.USD.percent_change_7d.toFixed(2) }}%
                    <i class="bi bi-caret-down-fill"></i>
                  </p>
                </td>

                <!-- <td
                :class="{
                  textSuccess: coin[0].quote.USD.percent_change_7d > 0,
                  textDanger: coin[0].quote.USD.percent_change_7d < 0
                }"
              >
                {{ coin[0].quote.USD.percent_change_7d.toFixed(2) }}%
                <i
                  class="bi bi-caret-up-fill text-success"
                  v-if="coin[0].quote.USD.percent_change_7d.toFixed(2) > 0"
                ></i>
                <i class="bi bi-caret-down-fill text-danger" v-else></i>
              </td> -->
              </tr>
              <!-- <tr>
              <td>Bitcoin</td>
              <td>BTC</td>
              <td>NT$___</td>
              <td>2.18%</td>
              <td></td>
            </tr> -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- <table class="table">
    <thead>
      <tr class="text-center">
        <th colspan="2">名稱</th>
        <th scope="col">價格 (USD)</th>
        <th scope="col">24h %</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(farms, i) in farms" :key="farms + i">
        <td>
          <template v-for="(logo, i) in coinLogo[i]" :key="'logo' + i">
            <img :src="logo" :alt="logo" style="width: 16px" />
            {{ logo }}
          </template>
        </td>
        <td>{{ farms.farmer }}</td>
        <td>$ {{ farms.field }}</td>
        <td>{{ farms.chick }}%</td>
      </tr>
      <tr>
        <td>Bitcoin</td>
        <td>BTC</td>
        <td>NT$___</td>
        <td>2.18%</td>
        <td></td>
      </tr>
    </tbody>
  </table> -->
</template>

<script>
export default {
  data() {
    return {
      coin: [],
      coinList: {},
      coinLogo: [
        {
          image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18069.png'
        },
        {
          image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/16352.png'
        },
        {
          image: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=022'
        }
      ],
      farms: [
        {
          farmer: 'John',
          field: 12,
          chick: 200
        },
        {
          farmer: 'Joy',
          field: 12,
          chick: 200
        },
        {
          farmer: 'Joy',
          field: 12,
          chick: 200
        }
      ],
      exchangeTWD: ''
    }
  },
  methods: {
    getCoin() {
      const cors = 'https://cors-anywhere.herokuapp.com/'
      const params = '?&symbol=SOL,GMT,GST'
      //   https://cors-anywhere.herokuapp.com/corsdemo
      this.$http
        .get(
          `${cors}https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest` +
            params,
          {
            headers: {
              'X-CMC_PRO_API_KEY': `${process.env.VUE_APP_APIKEY}`
            }
          }
        )
        .then((res) => {
          console.log(res)
          this.coin = res.data.data
          console.log(this.coin)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getExchangeRate() {
      const api = 'https://api.coinbase.com/v2/exchange-rates?currency=USD'

      this.$http
        .get(api)
        .then((res) => {
          console.log(res)
          this.exchangeTWD = res.data.data.rates.TWD
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    // getCoinLogo() {
    //   const image = []
    //   for (let i = 0; i < 3; i++) {
    //     image.push(this.coinLogo[i])
    //   }
    //   return image
    // }
    // TWDprice() {
    //   return (this.coin[0].quote.USD.price * this.exchangeTWD).toFixed(2)
    // }
  },
  mounted() {
    this.getCoin()
    this.getExchangeRate()
  }
}
</script>
