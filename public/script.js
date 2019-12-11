new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [
      {
        id: 1,
        title: 'Item 1',
        price: 9.99,
        available: true,
      },
      {
        id: 2,
        title: 'Item 2',
        price: 12.99,
        available: false,
      },
      {
        id: 3,
        title: 'Item 3',
        price: 5.99,
        available: true,
      },
    ],
    cart: []
  },
  methods: {
    addItem: function (index) {
      let item = this.items[index]
      this.total += item.price
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