/**
 * 地图定位配置
 * 
 * 使用高德地图定位
 * 定位位置：白果镇人民政府（坐标：115.040678, 31.178403）
 * 
 * 坐标格式：经度,纬度（GCJ-02坐标系）
 */

export const mapLocation = {
  // 地图定位坐标（白果镇人民政府位置）
  // 坐标：经度 115.040678，纬度 31.178403
  longitude: 115.040678,  // 经度
  latitude: 31.178403,    // 纬度
  
  // 地图缩放级别（建议 16-18）
  // 16: 显示街道级别
  // 17: 显示更详细的街道
  // 18: 显示建筑物级别
  zoom: 17,
  
  // 地址信息（保持原文字不变）
  address: '湖北省麻城市白果镇白果宾馆',
  
  // 地图图片尺寸
  mapSize: {
    width: 750,
    height: 400
  },
  
  // 高德地图 API Key
  amapKey: '1c4290ac76690ae48c9315c3fc3c1fee'
}

/**
 * 获取高德地图静态图URL
 */
export const getAmapStaticMapUrl = () => {
  const { longitude, latitude, zoom, mapSize, amapKey } = mapLocation
  return `https://restapi.amap.com/v3/staticmap?location=${longitude},${latitude}&zoom=${zoom}&size=${mapSize.width}*${mapSize.height}&markers=large,0xFF0000,A:${longitude},${latitude}&labels=${encodeURIComponent(mapLocation.address)},2,0,16,0xFFFFFF,0x5288d8:${longitude},${latitude}&key=${amapKey}`
}
