new Vue({
  el: '#app',
  data: {
    search: '',
    last_search: '',
    total: 0,
    currency: '$',
    items: [
    ],
    cart: [],
    loading: false
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
      this.total += item.price
    },
    inc: function (item) {
      item.qty++
      this.total += item.price
    },
    dec: function (item) {
      item.qty--
      this.total -= item.price
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
  }
})