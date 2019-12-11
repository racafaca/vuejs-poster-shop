new Vue({
  el: '#app',
  data: {
    search: '',
    total: 0,
    currency: '$',
    items: [
      { id: 1, title: 'Item 1', price: 9.99, available: true, },
      { id: 2, title: 'Item 2', price: 12.99, available: false, },
      { id: 3, title: 'Item 3', price: 5.99, available: true, },
    ],
    cart: []
  },
  methods: {
    onSubmit: function () {
      console.log(this.$http)
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