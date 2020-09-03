<template>
    <div class="pacients">
        <Navbar :currentPage="currentPage"/>
        <div class="content">
            <List :listName="listName" :items="items" :contentType="contentType"/>
        </div>
        <ScrollTop />
        <Footer />
    </div>
</template>

<script>
    // @ is an alias to /src
    import Navbar from "../components/Navbar.vue";
    import Footer from "../components/Footer.vue";
    import ScrollTop from "../components/ScrollTop.vue";
    import List from "../components/List.vue";

    export default {
        name: 'Pacients',
        components: {
            Navbar,
            ScrollTop,
            Footer,
            List,
        },
        data () {
            return {
                currentPage: "pacients",
                listName: "Pacienti",
                contentType: "pacients",
                items: [
                    {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    name: 'Brunch this weekend?',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                    },
                    {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    name: 'Summer BBQ',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
                    },
                    {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    name: 'Oui oui',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
                    },
                    {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    name: 'Birthday gift',
                    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
                    },
                    {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    name: 'aaca',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
                    },
                    {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    name: 'dfghfdghd',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                    },
                    {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    name: 'Sudfghdgf',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
                    },
                    {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    name: 'Onvbvw',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
                    },
                    {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    name: 'Bqwcqwc',
                    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
                    },
                    {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    name: 'Recipe to try',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
                    },
                ],
                filteredList: [],
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

            }
        },
        watch: {
            name: function(){
                this.showFilteredMedics();
            },
        },
        mounted: function(){
            this.filteredList = this.items;
        }
    }
</script>

<style scoped>
    .content {
        min-height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: var(--navbar-height);
    }

    .list__wrapper {
        min-height: 100%;
        width: 70%;
        padding: var(--padding-high);
    }
    .list {
        min-height: 100%;
    }
</style>