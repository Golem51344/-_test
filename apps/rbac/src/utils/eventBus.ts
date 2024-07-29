/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-20 09:08:32
 * @LastEditTime: 2023-11-23 17:22:50
 * @LastEditors: wsy
 */
import mitt from 'mitt';

interface MittTypes {
  [key: PropertyKey]: any
  'global-search-toggle'?: 'menu' | 'tab'
}

export default mitt<MittTypes>();
