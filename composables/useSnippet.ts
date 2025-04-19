interface Snippet {
    description: string;
    src: string;
    author: string;
}
export const useSnippet = ({ description, src, author }: Snippet) => {
    const data = ref({
        description,
        src,
        author,
    });
    const markdown = computed(() => {
        return `![${data.value.description} by ${data.value.author}](${data.value.src})`;
    });
    const html = computed(() => {
        return `<img data.value.src="${src}" alt="${data.value.description} by ${data.value.author}" />`;
    });

    const refresh = ({ description, author, src }: Snippet) => {
        data.value = {
            description,
            src,
            author,
        };
    };

    return {
        markdown,
        html,
        refresh,
    };
};
