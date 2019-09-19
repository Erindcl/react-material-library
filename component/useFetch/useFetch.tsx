import { useState, useEffect, useCallback } from 'react';
import { message as Message } from 'antd'
import { API } from '@/api'

function useFetch(method, params, initRes) {
    const [loading, setLoading] = useState(false);
    const [retData, setRetData] = useState(initRes);
    const callback = useCallback((params) => {
        setLoading(true);
        API[method](params).then((ret) => {
            const { success, data, message } = ret;
            if (success) {
                setRetData(data);
            } else {
                Message.error(message);
            }
            setLoading(false);
        }).catch((err) => {
            setLoading(false)
            Message.error('请求出错：', err);
        })
    },
        [method]);
    useEffect(() => {
        callback(params);
    }, [params])

    return { loading, retData }
}

export default useFetch
