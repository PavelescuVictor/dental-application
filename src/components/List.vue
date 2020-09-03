<template>
    <div class="list__wrapper">
        <v-card class="list">
            <v-toolbar>
                <v-toolbar-title>{{ listName }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <router-link :to="{ name: addPageRedirect }">
                    <v-btn icon>
                        <font-awesome-icon :icon="['fas', 'plus-circle']" />
                    </v-btn>
                </router-link>
                <v-btn icon @click="showSearchBar">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-toolbar>
            <v-toolbar v-if="searchBarShowed === true">
                <v-text-field
                    v-model="name"
                    label="Nume"
                    @keyup.enter="showFilteredMedics"
                ></v-text-field>
            </v-toolbar>
            <v-list three-line>
                <template v-for="(item, index) in filteredList">
                    <v-divider v-if="index > 0" :key="index"></v-divider>
                    <v-list-item :key="item.name">
                    <v-list-item-content>
                        <v-list-item-title v-html="item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-card>
    </div>
</template>
<script>
export default {
    name: "List",
    props: ['listName', 'items', 'contentType'],
    data () {
        return {
            searchBarShowed: false,
            filteredList: [],
            name: '',
            addPageRedirect: '',
        }
    },
    methods: {
        showSearchBar(){
            this.searchBarShowed = !this.searchBarShowed;
        },
        
        showFilteredMedics(){
            this.filteredList = [];
            this.items.forEach(item => {
                console.log(item.name);
                console.log(this.name);
                if(item.name.includes(this.name)) this.filteredList.push(item);
            });

        },
    },
    watch: {
        name: function(){
            this.showFilteredMedics();
        },
    },
    mounted: function(){
        this.filteredList = this.items;
        if(this.contentType === "lucrari") this.addPageRedirect = "adaugare-lucrare";
        else if(this.contentType === "doctors") this.addPageRedirect = "adaugare-doctor";
        else if(this.contentType === "pacients") this.addPageRedirect = "adaugare-pacient";
    }
}
</script>
<style scoped>
    .list__wrapper {
        min-height: 100%;
        width: 70%;
        padding: var(--padding-high);
    }
    .list {
        min-height: 100%;
    }
</style>