import { useState } from 'react'



export const useConfigApp = () => {


    const [typeTheme, setTypeTheme] = useState<'D' | 'L'>('D')
    const [loading, setLoading] = useState(true)

    const toggleTheme = () => {
        typeTheme === 'D' ?
            setTypeTheme('L') :
            setTypeTheme('D')
    }




    return { toggleTheme, typeTheme, loading, setLoading }
}
