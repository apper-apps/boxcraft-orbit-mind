import materialsData from '@/services/mockData/materials.json'

const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))

export const materialsService = {
  async getAll() {
    await delay()
    return [...materialsData]
  },

  async getById(id) {
    await delay()
    const material = materialsData.find(item => item.Id === id)
    if (!material) {
      throw new Error('Material not found')
    }
    return { ...material }
  },

  async create(materialData) {
    await delay()
    const newId = Math.max(...materialsData.map(item => item.Id)) + 1
    const newMaterial = {
      Id: newId,
      ...materialData
    }
    materialsData.push(newMaterial)
    return { ...newMaterial }
  },

  async update(id, updates) {
    await delay()
    const index = materialsData.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Material not found')
    }
    materialsData[index] = { ...materialsData[index], ...updates }
    return { ...materialsData[index] }
  },

  async delete(id) {
    await delay()
    const index = materialsData.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Material not found')
    }
    const deleted = materialsData.splice(index, 1)[0]
    return { ...deleted }
  }
}