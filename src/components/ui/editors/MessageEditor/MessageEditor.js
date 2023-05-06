import './MessageEditor.scss'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { keyCodes } from '@ckeditor/ckeditor5-utils/src/keyboard'
import { setConversationInput } from '@store/reducers/conversationReducer/conversationActions'

// TODO: Add feature for writing code
// TODO: Add feature for upload images

const editorConfiguration = {
	placeholder: 'Write message...',
	toolbar: ['bold', 'italic', 'link'],
}

export const MessageEditor = ({buttonRef, value}) => {
	const dispatch = useDispatch()
	const fieldRef = useRef()

	return (
		<div ref={fieldRef} className={'ck-wrapper'}>
			<CKEditor editor={ClassicEditor}
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

									editor.ui.focusTracker.on('change:isFocused', (evt, data, isFocused) => {
										if (isFocused) {
											fieldRef.current.className = 'ck-wrapper ck-focused'
										} else {
											fieldRef.current.className = 'ck-wrapper'
										}
									})
									document.addEventListener('focus-editor', () => {
										editor.editing.view.focus()
									})
								}}
								onChange={(event, editor) => {
									const data = editor.getData()
									dispatch(setConversationInput(data))
								}}
								onError={() => {

								}}
			/>
		</div>
	)
}
