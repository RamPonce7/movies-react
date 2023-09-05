import { useState } from "react"

const langWords: any = {
    esp: {
        search: 'Buscar...'

    },
    eng: {
        search: 'Search...'
    }
}

export const useLang = () => {
    const [lang, setLang] = useState<'ENG' | 'ESP'>('ENG')

    const getWord = (key: string): string => {
        const translated = lang === 'ENG' ? langWords.eng[key] : langWords.esp[key]
        return translated !== undefined ? translated : key
    }

    return {
        w: getWord,
        lang,
        setLang
    }
}
