var eventBus = new Vue()

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:`
         <div class="product">
            <div class="product-image">
                <img v-bind:src="image">
            </div>

            <div class="product-info">
                <h1 v-cloak>{{ title }}</h1>

                <p v-if="inStockComputed">In Stock [v-if]</p>
                <p v-else>Out of stock [v-if]</p>

                <p v-show="inStockComputed">In Stock [v-show]</p>
                <p v-show="!inStockComputed">Out of stock [v-show]</p>
                <p>Shipping: {{ shipping }}</p>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <div v-for="(variant, index) in variants"
                     :key="variant.variantId"
                     class="color-box"
                     :style="{ backgroundColor: variant.variantColor}"
                     @mousemove="updateProduct(index)">
                </div>

                <button v-on:click="addToCartEmitEvent"
                        :disabled="!inStockComputed"
                        :class="{ disabledButton: !inStockComputed}">
                Add to Cart
                </button>
                
                <product-tabs :reviews="reviews"></product-tabs>

            </div>
           
        </div>
    `,
    data() {
        return {
                brand: 'Porshe',
                product: 'Socks',
                selectedVariant: 0,
                inventory: 2,
                details: ["80% cotton", "20% polyester"],
                reviews:[],
                variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: './assets/vmSock-green.jpg',
                    variantQuantity: 0
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: './assets/vmSock-blue.jpg',
                    variantQuantity: 10
                }]
            }
        },

    methods: {
        addToCartEmitEvent: function () {
            let variant = this.variants[this.selectedVariant]
            --variant.variantQuantity
            this.$emit('add-to-cart', variant.variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStockComputed() {
            return this.variants[this.selectedVariant].variantQuantity > 0
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review', {
    template: `
      <form class="review-form" @submit.prevent="onSubmit">
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>
      
          <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
          </p>
          
          <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
          </p>
          
          <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>
          </p>
              
          <p>
            <input type="submit" value="Submit">  
          </p>    
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review= null
                this.rating = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
            }
        }
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab"
                  :class="{ activeTab: selectedTab === tab}"  
                  v-for="(tab, index) in tabs" :key="index"
                  @click="selectedTab = tab">
                  {{ tab }}
            </span>
            
            <div v-show="selectedTab === 'Reviews'">
                <p v-if="!reviews.length">There are no reviews yet</p>
                <ul v-else>
                    <li v-for="(review, index) in reviews" :key="index"> 
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>
            
            <product-review v-show="selectedTab === 'Make a Review'"></product-review>
        </div>
    `,
    data() {
        return {
            tabs:['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})

const app = new Vue({
    el: '#app',
    data: {
        premiumValue: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    },
});

