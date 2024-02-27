export const getI18nContent = (i18nData, key) => {
  const dataLanguage = i18nData.locales.edges.find((e) => e.node.ns === 'index')
    ?.node.data
  const parsedDataLanguage = JSON.parse(dataLanguage)
  return `${parsedDataLanguage[key]}`
}
