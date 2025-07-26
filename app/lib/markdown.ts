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
  md.block.ruler.before('paragraph', 'start_block', (state, start, end, silent) => {
    // 获取当前行的完整内容
    const lineText = state.src.slice(state.bMarks[start], state.eMarks[start])
    const pattern = /^(.*?)<start>(.*?)<\/start>(.*)$/
    const match = pattern.exec(lineText)

    if (!match)
      return false
    if (silent)
      return true

    const [, before, content, after] = match

    // 如果前面有内容，先处理前面的部分
    if (before && before.trim()) {
      const beforeToken = state.push('paragraph_open', 'p', 1)
      beforeToken.map = [start, start + 1]

      const beforeInline = state.push('inline', '', 0)
      beforeInline.content = before.trim()
      beforeInline.map = [start, start + 1]
      beforeInline.children = []

      state.push('paragraph_close', 'p', -1)
    }

    // 处理 start 标签
    const token = state.push('start_tag', '', 0)
    token.content = (content ?? '').trim()
    token.map = [start, start + 1]

    // 如果后面有内容，处理后面的部分
    if (after && after.trim()) {
      const afterToken = state.push('paragraph_open', 'p', 1)
      afterToken.map = [start, start + 1]

      const afterInline = state.push('inline', '', 0)
      afterInline.content = after.trim()
      afterInline.map = [start, start + 1]
      afterInline.children = []

      state.push('paragraph_close', 'p', -1)
    }

    state.line = start + 1
    return true
  })

  md.renderer.rules.start_tag = (tokens: any[], idx: number) => {
    const content = tokens[idx].content
    return `<div class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;>svg]:size-3 gap-1 [&amp;>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90" variant="secondary">${content}</div>`
  }
}

export function registerThinking(md: MarkdownIt) {
  md.block.ruler.before('paragraph', 'thinking_tag', (state, start, end, silent) => {
    // 获取当前行的完整内容
    const lineText = state.src.slice(state.bMarks[start], state.eMarks[start])
    const pattern = /^(.*?)<thinking>(.*?)<\/thinking>(.*)$/
    const match = pattern.exec(lineText)

    if (!match)
      return false
    if (silent)
      return true

    const [, before, content, after] = match

    // 如果前面有内容，先处理前面的部分
    if (before && before.trim()) {
      const beforeToken = state.push('paragraph_open', 'p', 1)
      beforeToken.map = [start, start + 1]

      const beforeInline = state.push('inline', '', 0)
      beforeInline.content = before.trim()
      beforeInline.map = [start, start + 1]
      beforeInline.children = []

      state.push('paragraph_close', 'p', -1)
    }

    // 处理 start 标签
    const token = state.push('thinking_tag', '', 0)
    token.content = (content ?? '').trim()
    token.map = [start, start + 1]

    // 如果后面有内容，处理后面的部分
    if (after && after.trim()) {
      const afterToken = state.push('paragraph_open', 'p', 1)
      afterToken.map = [start, start + 1]

      const afterInline = state.push('inline', '', 0)
      afterInline.content = after.trim()
      afterInline.map = [start, start + 1]
      afterInline.children = []

      state.push('paragraph_close', 'p', -1)
    }

    state.line = start + 1
    return true
  })

  md.renderer.rules.thinking_tag = (tokens: any[], idx: number) => {
    const content = tokens[idx].content
    return `<blockquote>${content}</blockquote>`
  }
}

export function registerError(md: MarkdownIt) {
  md.block.ruler.before('paragraph', 'error_tag', (state, start, end, silent) => {
    // 获取当前行的完整内容
    const lineText = state.src.slice(state.bMarks[start], state.eMarks[start])
    const pattern = /^(.*?)<error>(.*?)<\/error>(.*)$/
    const match = pattern.exec(lineText)

    if (!match)
      return false
    if (silent)
      return true

    const [, before, content, after] = match

    // 如果前面有内容，先处理前面的部分
    if (before && before.trim()) {
      const beforeToken = state.push('paragraph_open', 'p', 1)
      beforeToken.map = [start, start + 1]

      const beforeInline = state.push('inline', '', 0)
      beforeInline.content = before.trim()
      beforeInline.map = [start, start + 1]
      beforeInline.children = []

      state.push('paragraph_close', 'p', -1)
    }

    // 处理 start 标签
    const token = state.push('error_tag', '', 0)
    token.content = (content ?? '').trim()
    token.map = [start, start + 1]

    // 如果后面有内容，处理后面的部分
    if (after && after.trim()) {
      const afterToken = state.push('paragraph_open', 'p', 1)
      afterToken.map = [start, start + 1]

      const afterInline = state.push('inline', '', 0)
      afterInline.content = after.trim()
      afterInline.map = [start, start + 1]
      afterInline.children = []

      state.push('paragraph_close', 'p', -1)
    }

    state.line = start + 1
    return true
  })

  md.renderer.rules.error_tag = (tokens: any[], idx: number) => {
    const content = tokens[idx].content
    return `<div class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;>svg]:size-3 gap-1 [&amp;>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-destructive text-white [a&amp;]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60" variant="destructive">${content}</div>`
  }
}
