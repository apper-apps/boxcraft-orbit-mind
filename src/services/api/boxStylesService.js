import boxStylesData from '@/services/mockData/boxStyles.json'

const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))

export const boxStylesService = {
  async getAll() {
    await delay()
    return [...boxStylesData]
  },

  async getById(id) {
    await delay()
    const style = boxStylesData.find(item => item.Id === id)
    if (!style) {
      throw new Error('Box style not found')
    }
    return { ...style }
  },

  async create(styleData) {
    await delay()
    const newId = Math.max(...boxStylesData.map(item => item.Id)) + 1
    const newStyle = {
      Id: newId,
      ...styleData
    }
    boxStylesData.push(newStyle)
    return { ...newStyle }
  },

  async update(id, updates) {
    await delay()
    const index = boxStylesData.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Box style not found')
    }
    boxStylesData[index] = { ...boxStylesData[index], ...updates }
    return { ...boxStylesData[index] }
  },

  async delete(id) {
    await delay()
    const index = boxStylesData.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Box style not found')
    }
    const deleted = boxStylesData.splice(index, 1)[0]
    return { ...deleted }
  }
}