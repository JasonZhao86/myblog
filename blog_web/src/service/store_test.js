let store = require('store')
store.set("user", "zhaoxuan")
console.log(store.get("user"))

store.remove("user")
console.log(store.get("user"));
console.log(store.get("user", "default"));

store.set("user", {"name": "zhaoxuan", "age": 18})
console.log(store.get("user").name)

store.set("school", {"name": "w3cschool"})
store.each(function(value, key) {
    console.log(key, '-->', value)
})

store.clearAll()
console.log(store.get("user"))


store.addPlugin(require('store/plugins/expire'))
store.set("token", "token-value-string", (new Date()).getTime() + (8 * 3600 * 1000))
console.log(store.get("token"))