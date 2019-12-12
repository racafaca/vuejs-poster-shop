const PRICE = 9.99
new Vue({
  el: '#app',
  data: {
    search: 'witcher',
    last_search: '',
    total: 0,
    currency: '$',
    items: [
    ],
    cart: [],
    loading: false,
    price: PRICE
  },
  methods: {
    onSubmit: function () {
      this.items = []
      this.loading = true
      this.$http
        .get('/search/'.concat(this.search))
        .then((response) => {
            this.items = response.data
            this.last_search = this.search
            this.loading = false
          },
          (error) => {

          })
    },
    addItem: function (index) {
      let item = this.items[index]
      let found = false
      this.cart.some((cartItem) => {
        if (cartItem.id === item.id) {
          this.inc(cartItem)
          found = true
        }
        return found
      })
      if (found) return
      this.cart.push({
        ...item,
        qty: 1
      })
      // this.total += item.price
      this.total += this.price
    },
    inc: function (item) {
      item.qty++
      // this.total += item.price
      this.total += this.price
    },
    dec: function (item) {
      item.qty--
      // this.total -= item.price
      this.total -= this.price
      if (item.qty === 0) {
        let cart = this.cart
        cart.splice(cart.findIndex((cartItem) => {
          return cartItem.id === item.id
        }), 1)
      }
    }
  },
  filters: {
    round: function (value) {
      return Math.round(value * 100) / 100
    },
    currency: function (value, currency) {
      return `${currency} ${value}`
    }
  },
  mounted: function () {
  this.onSubmit()
},
})