Vue.component('demo-grid', {
    template: 
    `<table>
        <thead>
        <tr>
            <th v-for="key in columns"
            @click="sortBy(key)"
            :class="{active: sortKey == key}">
            {{key | capitalize}}
            <span class="arrow"
                :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="
            entry in data
            | filterBy filterKey
            | orderBy sortKey sortOrders[sortKey]">
            <td v-for="key in columns">
            {{entry[key]}}
            </td>
        </tr>
        </tbody>
    </table>`,
    props: {
        data: Array,
        columns: Array,
        filterKey: String
    },
    data: function () {
        var sortOrders = {}
        this.columns.forEach(function (key) {
          sortOrders[key] = 1
        })
        return {
          sortKey: '',
          sortOrders: sortOrders
        }
    },
    methods: {
        sortBy: function (key) {
            this.sortKey = key
            this.sortOrders[key] = this.sortOrders[key] * -1
        }
    }
})


// function: from type id to type name
const house_type_const = {
    0: 'Laptops',
    1: 'Monitors',
    2: 'Smartphones',
    3: 'E-readers',
    4: 'Digital Cameras',
    5: 'Portable Music Player'
}

let type_id_to_name = (type_id) => {
    return house_type_const[type_id]
}

// function: from type name to type id
const house_id_type = {
    'Laptops':0,
    'Monitors':1,
    'Smartphones':2,
    'E-readers':3,
    'Digital Cameras':4,
    'Portable Music Player':5
}

let type_name_to_id = (name) => {
    return house_id_type[name]
}


var vm = new Vue({
    el: '#demo',
    data: {
        searchQuery: '',
        gridColumns: ['Device Name', 'Device Type'],
        gridData: [
            { 
                'House Name': 'Chuck Norris',
                'House Type': type_id_to_name(1) 
            },
            { 
                'House Name': 'Bruce Lee',
                'House Type': type_id_to_name(2)
            },
            { 
                'House Name': 'Jackie Chan',
                'House Type': type_id_to_name(0) 
            },
            { 
                'House Name': 'Jet Li', 
                'House Type': type_id_to_name(1) 
            }
        ]
    }
})