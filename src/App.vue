<template>
    <min-app class="bg-black-500 color-white-500 font-sans">
        <TheHeader first class="z-index-16" />
        <min-content id="app-content" class="gap-32 p-relative" scroll-y fill>
            <router-view :key="$route.fullPath" />
            <FloatingModalLeaving />
            <FloatingModalArticlePreview />
            <FloatingModalToast />
            <TheAppState />
        </min-content>
        <TheFooter last />
    </min-app>
</template>
