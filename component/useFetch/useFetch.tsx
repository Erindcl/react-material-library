import { useEffect, useRef, useState, useCallback } from 'react'
import { isEqual } from 'lodash'
import {message} from 'antd'
import {API} from '@/api'
const useFetch= (method,params,initRes) => {
  const prevParams = useRef(null);
  const [callback,{ loading, res }] = useFetchCallback(method,initRes)
  useEffect(() => {
    if (!isEqual(prevParams.current, params)) {
      prevParams.current = params
      callback(params)
    }
  })

  return { loading, res }
}
 const useFetchCallback:any= (method,initRes) => {
  const [loading, setLoading] = useState(false)
  const [res, setRes] = useState(initRes);
  const callback = useCallback(
    params => {
      setLoading(true);
      API[method](params)
        .then(ret => {
          setLoading(false)
          setRes(ret)
        })
        .catch(err => {
          setLoading(false)
          message.error(`请求出错:${err}`);
        })
    },
    [method]
  )

  return [callback, { loading,res }]
}

export default useFetch
