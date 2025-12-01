// 腾讯云开发云函数 - 留言 API
const cloud = require('@cloudbase/node-sdk')

const app = cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = app.database()

exports.main = async (event, context) => {
  // 设置 CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  const { method, data } = event

  try {
    if (method === 'GET' || event.httpMethod === 'GET') {
      // 获取留言
      const result = await db.collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(1000)
        .get()
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          code: 0,
          data: result.data || []
        })
      }
    }

    if (method === 'POST' || event.httpMethod === 'POST') {
      // 创建留言
      const { name, content } = data || JSON.parse(event.body || '{}')

      if (!name || !content) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            code: -1,
            message: '姓名和内容不能为空'
          })
        }
      }

      const newMessage = {
        name: name.trim(),
        content: content.trim(),
        createdAt: new Date()
      }

      const result = await db.collection('messages').add(newMessage)

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          code: 0,
          data: {
            id: result.id,
            ...newMessage
          }
        })
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        code: -1,
        message: '方法不支持'
      })
    }
  } catch (error) {
    console.error('云函数错误:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        code: -1,
        message: error.message || '服务器错误'
      })
    }
  }
}

