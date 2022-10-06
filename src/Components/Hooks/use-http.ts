import { useState, useCallback } from 'react'

type UseHttp = {
    sendRequest: any
    isLoading: boolean
    error: any
}

const useHttp = (): UseHttp => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendRequest = useCallback(async (requestConfig: any, applyData: any) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.header ? requestConfig.header : {},
                body: requestConfig ? JSON.stringify(requestConfig.body) : null
            }
            )

            if (!response.ok) {
                throw new Error('Request failed!')
            }

            const data = await response.json()
            applyData(data)
        } catch (err) {
            console.log('Something went wrong!')
        }
        setIsLoading(false)
    }, [])

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp