export const getI18nContent = (i18nData, key) => {
  const dataLanguage = i18nData.locales.edges.find((e) => e.node.ns === 'index')
    ?.node.data
  const parsedDataLanguage = JSON.parse(dataLanguage)
  return `${parsedDataLanguage[key]}`
}

export const getSimplifiedPosts = (posts) => {
  return posts.map((post) => ({
    id: post.id,
    slug: post.fields.slug,
    date: post.frontmatter.date,
    title: post.frontmatter.title,
  }))
}

export const getFormattedDate = (date, lang, showFullDate) => {
  const dateArr = date.split('-')
  if (lang === 'en') {
    if (dateArr[1].startsWith('0')) {
      dateArr[1] = dateArr[1].slice(1)
    }
    const monthIndex = parseInt(dateArr[1]) - 1
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    return showFullDate
      ? `${months[monthIndex]} ${dateArr[2]}, ${dateArr[0]}`
      : `${months[monthIndex]} ${dateArr[2]}`
  }
  return showFullDate ? date : `${dateArr[1]}-${dateArr[2]}`
}
