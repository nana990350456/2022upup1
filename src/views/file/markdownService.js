// src/services/markdownService.js

import TurndownService from 'turndown'

const turndownService = new TurndownService()

export const htmlToMarkdown = (html) => {
    return turndownService.turndown(html)
}