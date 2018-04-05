function Event(name){
    var handlers = [];
    this.getName = function(){
        return name;
    }
    this.addHandel = function(handler){
        handlers.push(handler);
    }
    this.removeHandel = function(handler){
        for(var i= 0; i < handlers.length; i++){
            if(handlers[i] == handler){
                handlers.splice(i,1);
                break;
            }
        }
    }
    this.fire = function(eventArags){
            handlers.forEach(function(h){
                h(eventArags);
            });
    }
}

function EventAggregator() {
    var events = []
    function getEvent(eventName){
        reutnr $.grep(events,function(event){
            return event.getName() === eventName;
        })
    }
    this.publish =  function(eventName,eventArags){
        var event  = getEvent(eventName);
        if(!event){
            event = new Event(eventName);
            events.push(event);
        }
        event.fire(eventArags);
    }

    this.subscribe = function (eventName, handler) {
        var event = getEvent(eventName);

        if (!event) {
            event = new Event(eventName);
            events.push(event);
        }

        event.addHandler(handler);
    };
}

function Product(id, description) {
    this.getId = function () {
        return id;
    };
    this.getDescription = function () {
        return description;
    };
}

function Cart(eventAggregator) {
    var items = [];

    this.addItem = function (item) {
        items.push(item);
        eventAggregator.publish("itemAdded", item);
    };
}

function CartController(cart, eventAggregator) {
    eventAggregator.subscribe("itemAdded", function (eventArgs) {
        var newItem = $('<li></li>').html(eventArgs.getDescription()).attr('id-cart', eventArgs.getId()).appendTo("#cart");
    });

    eventAggregator.subscribe("productSelected", function (eventArgs) {
        cart.addItem(eventArgs.product);
    });
}

function ProductRepository() {
    var products = [new Product(1, "Star Wars Lego Ship"),
            new Product(2, "Barbie Doll"),
            new Product(3, "Remote Control Airplane")];

    this.getProducts = function () {
        return products;
    }
}
function ProductController(eventAggregator, productRepository) {
    var products = productRepository.getProducts();

    function onProductSelected() {
        var productId = $(this).attr('id');
        var product = $.grep(products, function (x) {
            return x.getId() == productId;
        })[0];
        eventAggregator.publish("productSelected", {
            product: product
        });
    }

    products.forEach(function (product) {
        var newItem = $('<li></li>').html(product.getDescription())
                                    .attr('id', product.getId())
                                    .dblclick(onProductSelected)
                                    .appendTo("#products");
    });
}


(function () {
var eventAggregator = new EventAggregator(),
cart = new Cart(eventAggregator),
cartController = new CartController(cart, eventAggregator),

//后端返回的接口数据， 产品的数据
productRepository = new ProductRepository(),

productController = new ProductController(eventAggregator, productRepository);
})();