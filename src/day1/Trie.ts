type TrieNode = {
    [key: string]: TrieNode; // Child nodes
} & { end?: boolean }; // Ensure `end` is allowed as a boolean

export default class Trie {
    private root: TrieNode;

    constructor() {
        this.root = {}; // Root node does not need `end` initially
    }

    // Insert a word into the Trie
    insert(item: string): void {
        let node = this.root;
        for (const char of item) {
            if (!node[char]) {
                node[char] = {}; // Initialize empty child node
            }
            node = node[char];
        }
        node.end = true; // Mark the end of a valid word
    }

    // Find words that start with a given prefix
    find(partial: string): string[] {
        let node = this.root;
        for (const char of partial) {
            if (!node[char]) return [];
            node = node[char];
        }
        return this.collectWords(node, partial);
    }

    // Helper method to collect words recursively
    private collectWords(node: TrieNode, prefix: string): string[] {
        let results: string[] = [];
        if (node.end) results.push(prefix); // If `end` is true, it's a valid word

        for (const char in node) {
            if (char !== "end") {
                results.push(...this.collectWords(node[char], prefix + char));
            }
        }
        return results;
    }

    // Delete a word from the Trie
    delete(item: string): void {
        this.deleteHelper(this.root, item, 0);
    }

    private deleteHelper(node: TrieNode, word: string, index: number): boolean {
        if (index === word.length) {
            if (!node.end) return false;
            delete node.end; // Unmark the word
            return Object.keys(node).length === 0; // If no children, delete node
        }

        const char = word[index];
        if (!node[char]) return false;

        const shouldDelete = this.deleteHelper(node[char], word, index + 1);
        if (shouldDelete) {
            delete node[char];
            return Object.keys(node).length === 0 && !node.end;
        }
        return false;
    }
}
