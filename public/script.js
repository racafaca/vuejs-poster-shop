new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [
      {
        id: 1,
        title: 'Item 1'
      },
      {
        id: 2,
        title: 'Item 2'
      },
      {
        id: 3,
        title: 'Item 3'
      },
    ],
    cart: []
  },
  methods: {
    addItem: function (index) {
      this.total += 9.99
      let item = this.items[index]
      let found = false
      this.cart.forEach((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.qty++
          found = true
        }
      })
      if (found) return
      this.cart.push({
        ...item,
        qty: 1
      })
    }
  }
})