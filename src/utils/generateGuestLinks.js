import { supabase } from '../config/supabase'

/**
 * 批量生成宾客邀请链接
 * @param {Array} guestList - 宾客列表
 * @param {string} baseUrl - 网站基础URL
 * @returns {Promise<Array>} 生成的宾客数据
 */
export const generateGuestLinks = async (guestList, baseUrl = 'https://yoursite.com') => {
  try {
    const guests = guestList.map(guest => {
      const guestId = generateGuestId(guest.name, guest.phone)
      return {
        guest_id: guestId,
        guest_name: guest.name,
        guest_phone: guest.phone || null,
        guest_group: guest.group || null,
        guest_relation: guest.relation || null,
        invite_link: `${baseUrl}/?guest=${guestId}`,
        remark: guest.remark || null
      }
    })

    // 批量插入到数据库
    const { data, error } = await supabase
      .from('guests')
      .insert(guests)
      .select()

    if (error) {
      console.error('生成链接失败:', error)
      throw error
    }

    console.log(`✅ 成功生成 ${guests.length} 个邀请链接`)
    return data
  } catch (error) {
    console.error('批量生成失败:', error)
    throw error
  }
}

/**
 * 从 Excel 数据生成链接
 * @param {Array} excelData - Excel 解析后的数据
 * @param {string} baseUrl - 网站基础URL
 */
export const generateFromExcel = async (excelData, baseUrl) => {
  // Excel 格式：[{姓名, 电话, 分组, 关系, 备注}, ...]
  const guestList = excelData.map(row => ({
    name: row['姓名'] || row['name'],
    phone: row['电话'] || row['phone'],
    group: row['分组'] || row['group'],
    relation: row['关系'] || row['relation'],
    remark: row['备注'] || row['remark']
  }))

  return await generateGuestLinks(guestList, baseUrl)
}

/**
 * 生成宾客唯一标识符
 * 使用拼音首字母 + 随机字符串
 */
const generateGuestId = (name, phone) => {
  // 方案1: 使用姓名拼音 + 随机字符
  const randomStr = Math.random().toString(36).substring(2, 8)
  const phoneStr = phone ? phone.slice(-4) : ''
  
  // 简化处理：使用姓名 + 电话后4位或随机字符
  const namePart = name.replace(/\s+/g, '-').toLowerCase()
  const uniquePart = phoneStr || randomStr
  
  return `${namePart}-${uniquePart}`
}

/**
 * 示例使用方法
 */
export const exampleUsage = async () => {
  const myGuestList = [
    {
      name: '张三',
      phone: '13800138000',
      group: '新郎方',
      relation: '大学同学'
    },
    {
      name: '李四',
      phone: '13800138001',
      group: '新娘方',
      relation: '公司同事'
    },
    {
      name: '王五',
      phone: '13800138002',
      group: '新郎方',
      relation: '高中朋友'
    }
  ]

  try {
    const result = await generateGuestLinks(myGuestList, 'https://yoursite.com')
    console.log('生成的链接:', result)
    return result
  } catch (error) {
    console.error('生成失败:', error)
  }
}

/**
 * 更新现有宾客的链接
 */
export const updateGuestLinks = async (baseUrl = 'https://yoursite.com') => {
  try {
    // 获取所有宾客
    const { data: guests } = await supabase
      .from('guests')
      .select('id, guest_id')

    // 批量更新链接
    const updates = guests.map(guest => ({
      id: guest.id,
      invite_link: `${baseUrl}/?guest=${guest.guest_id}`
    }))

    for (const update of updates) {
      await supabase
        .from('guests')
        .update({ invite_link: update.invite_link })
        .eq('id', update.id)
    }

    console.log(`✅ 成功更新 ${updates.length} 个链接`)
  } catch (error) {
    console.error('更新链接失败:', error)
  }
}

/**
 * 导出链接列表为 JSON
 */
export const exportGuestLinksJSON = async () => {
  try {
    const { data: guests } = await supabase
      .from('guests')
      .select('guest_name, guest_phone, guest_group, invite_link')
      .order('guest_group', { ascending: true })

    const json = JSON.stringify(guests, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `宾客邀请链接_${new Date().toLocaleDateString()}.json`
    link.click()
    URL.revokeObjectURL(url)

    console.log('✅ 导出成功')
  } catch (error) {
    console.error('导出失败:', error)
  }
}
