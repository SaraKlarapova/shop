export const handleCopyClick = (copyText: string, setCopyState: any) => {
    navigator.clipboard.writeText(copyText).then(() => {
        setCopyState("Copied!");
    });
    setTimeout(() => {
        setCopyState("None!");
    }, 1000)
};