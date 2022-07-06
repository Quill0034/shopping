import { useEffect, useState } from "react"

export function useLocalStorage<Q>(key: string, initialValue: Q | (() => Q)) {
    const [value, setValue] = useState<Q>(() => {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)

        if (typeof initialValue === "function") {
            return (initialValue as () => Q ) ()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    
    return [value, setValue] as [typeof value, typeof setValue]
}