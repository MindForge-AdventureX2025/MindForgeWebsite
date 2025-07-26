import type MarkdownIt from 'markdown-it'

export function registerHashTag(md: MarkdownIt) {
  md.renderer.rules.hashtag = (tokens: any[], idx: number) => {
    const tag = tokens[idx].content.replace('#', '')
    return `<span class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;>svg]:size-3 gap-1 [&amp;>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-primary text-primary-foreground [a&amp;]:hover:bg-primary/90">
              ${tag}
            </span>`
  }

  md.inline.ruler.after('link', 'hashtag', (state, silent) => {
    // 匹配 # 开头的标签（非标题）

    // eslint-disable-next-line unicorn/escape-case, regexp/no-unused-capturing-group, regexp/prefer-w, regexp/use-ignore-case
    const pattern = /^#([a-zA-Z0-9_\-\u4e00-\u9fa5]+)/
    const match = pattern.exec(state.src.slice(state.pos))

    if (!match)
      return false
    if (silent)
      return true

    // 创建自定义 token
    const token = state.push('hashtag', '', 0)
    token.content = match[0] // 保存原始文本如 "#some-thing"
    token.markup = '#'

    // 移动解析位置
    state.pos += match[0].length
    return true
  })
}

export function registerStart(md: MarkdownIt) {
  md.renderer.rules.start_tag = (tokens: any[], idx: number) => {
    const content = tokens[idx].content
    return `<div class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;>svg]:size-3 gap-1 [&amp;>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90" variant="secondary">${content}</div>`
  }
}

export function registerThinking(md: MarkdownIt) {
  md.renderer.rules.thinking_tag = (tokens: any[], idx: number) => {
    const content = tokens[idx].content
    return `<blockquote>${content}</blockquote>`
  }
}

export function registerError(md: MarkdownIt) {
  md.renderer.rules.error_tag = (tokens: any[], idx: number) => {
    const content = tokens[idx].content
    return `<div class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;>svg]:size-3 gap-1 [&amp;>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-destructive text-white [a&amp;]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60" variant="destructive">${content}</div>`
  }
}

export function formatXmlTags(originalText: string, tags: string[]): string {
  let result = originalText

  for (const tag of tags) {
    // 创建正则表达式来匹配标签
    // 匹配同一行的开始和结束标签
    const inlineRegex = new RegExp(`(<${tag}>)(.*?)(<\/${tag}>)`, 'gs')

    result = result.replace(inlineRegex, (match, openTag, content, closeTag) => {
      // 检查内容是否包含换行符
      if (content.includes('\n')) {
        // 如果内容本身包含换行，保持原样
        return match
      }

      // 检查开始标签前后是否已经有换行符
      const beforeMatch = result.substring(0, result.indexOf(match))
      const afterMatch = result.substring(result.indexOf(match) + match.length)

      const hasNewlineBefore = beforeMatch.endsWith('\n') || beforeMatch === ''
      const hasNewlineAfter = afterMatch.startsWith('\n') || afterMatch === ''

      // 如果标签前后都已经有换行符，说明已经格式化过了
      if (hasNewlineBefore && hasNewlineAfter) {
        return match
      }

      // 格式化为多行
      return `\n${openTag}\n${content}\n${closeTag}\n`
    })
  }

  // 清理多余的换行符
  result = result.replace(/\n{3,}/g, '\n\n')

  // 如果开头有换行符，去掉
  if (result.startsWith('\n')) {
    result = result.substring(1)
  }

  // 如果结尾有换行符，去掉
  if (result.endsWith('\n')) {
    result = result.substring(0, result.length - 1)
  }

  return result
}
