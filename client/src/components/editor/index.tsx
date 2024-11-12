// @ts-nocheck
import React from 'react'
import styles from './index.module.scss'
import EditorJS from '@editorjs/editorjs'
import { toast } from 'react-toastify'
import "styles/editor.css"
import { CustomVarBlock } from './variables-plugin'
import { CustomVarBlockPM } from './variables-plugin pm'

interface Props {
    previousData?: any
    id?: string
    // setEditorContent?: React.Dispatch<any>
}

export const Editor = React.forwardRef((props: Props, ref: Props) => {
    // const ref = React.useRef<EditorJS>()

    const [isSaving, setIsSaving] = React.useState<boolean>(false)
    const [isMounted, setIsMounted] = React.useState<boolean>(false)
    const holderId = props.id || "editor";

    const initializeEditor = React.useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default
        const Header = (await import("@editorjs/header")).default
        const Embed = (await import("@editorjs/embed")).default
        const List = (await import("@editorjs/list")).default
        const Code = (await import("@editorjs/code")).default
        const LinkTool = (await import("@editorjs/link")).default
        const InlineCode = (await import("@editorjs/inline-code")).default

        if (!ref.current) {
            const editor = new EditorJS({
                holder: holderId,
                onReady() {
                    ref.current = editor
                    // props.setEditorContent(props.previousData)
                },
                async onChange() {
                    const savedContent = await editor.save()
                    // props.setEditorContent(savedContent)

                },
                placeholder: "Напишите здесь свой текст...",
                inlineToolbar: true,
                data: props.previousData,
                tools: {
                    header: Header,
                    linkTool: LinkTool,
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    embed: Embed,

                    // "Сумма принятия": CustomVarBlock,
                    // "Ссылка для оплаты pm": CustomVarBlockPM
                },
            })
        }
    }, [])

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true)
        }
    }, [])

    React.useEffect(() => {
        if (isMounted) {
            initializeEditor()

            return () => {
                ref.current?.destroy()
                ref.current = undefined
            }
        }
    }, [isMounted, initializeEditor])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <div id={holderId} />
        </>
    )
})
