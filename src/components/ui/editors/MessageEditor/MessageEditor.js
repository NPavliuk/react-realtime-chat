import './MessageEditor.scss'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useDispatch, useSelector } from 'react-redux'
import { setConversationInput } from '@store/reducers/conversationReducer/conversationActions'
import { keyCodes } from '@ckeditor/ckeditor5-utils/src/keyboard'

const editorConfiguration = {
	placeholder: 'Write message...',
	toolbar: ['bold', 'italic', 'link']
}

// TODO: Add feature for writing code
// TODO: Add feature for upload images

export const MessageEditor = ({buttonRef, value}) => {
	const dispatch = useDispatch()


	return (
		<div>
			<CKEditor
				editor={ClassicEditor}
				config={editorConfiguration}
				data={value}
				onReady={editor => {
					editor.editing.view.document.on('keydown', (e, data) => {
						if (data.keyCode === keyCodes.enter && !data.shiftKey) {
							buttonRef.current.click()

							e.stop()
							data.preventDefault()
						}
					}, {priority: 'high'})
				}}

				onChange={(event, editor) => {
					const data = editor.getData()
					dispatch(setConversationInput(data))
				}}
			/>
		</div>
	)
}
