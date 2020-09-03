<template>
    <div class="lucrari">
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
        name: 'Lucrari',
        components: {
            Navbar,
            ScrollTop,
            Footer,
            List,
        },
        data () {
            return {
                currentPage: "lucrari",
                listName: "Lucrari",
                contentType: "lucrari",
                items: [
                    {
                    name: 'Brunch this weekend?',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                    },
                    {
                    name: 'Summer BBQ',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
                    },
                    {
                    name: 'Oui oui',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
                    },
                    {
                    name: 'Birthday gift',
                    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
                    },
                    {
                    name: 'aaca',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
                    },
                    {
                    name: 'dfghfdghd',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                    },
                    {
                    name: 'Sudfghdgf',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
                    },
                    {
                    name: 'Onvbvw',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
                    },
                    {
                    name: 'Bqwcqwc',
                    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
                    },
                    {
                    name: 'Recipe to try',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
                    },
                ],
            }
        },
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
</style>
