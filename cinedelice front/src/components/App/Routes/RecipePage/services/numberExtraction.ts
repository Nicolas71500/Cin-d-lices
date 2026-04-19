export function extractNumber(text: string) {
    const match = text.match(/^(\d+)?(.*)$/);
    if (match) {
        const numberPart = match[1] ? parseInt(match[1], 10) : null;
        const textPart = match[2].trim();

        if (numberPart !== null && textPart) {
            return { numberPart, textPart };
        } else if (numberPart !== null) {
            return { numberPart, textPart: null };
        } else {
            return { numberPart: null, textPart };
        }
    }
}
