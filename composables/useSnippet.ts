export const useSnippet = ({
    description,
    src,
    author,
}: {
    description: string;
    src: string;
    author: string;
}) => {
    const markdown = computed(() => {
        return `![${description} by ${author}](${src})`;
    });
    const html = computed(() => {
        return `<img src="${src}" alt="${description} by ${author}" />`;
    });

    return {
        markdown,
        html,
    };
};
