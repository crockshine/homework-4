import type {CreateTaskRequestBody} from "@/types";

export const getFormFields =  (event: SubmitEvent, form: HTMLFormElement) => {
    event.preventDefault();
    const _form = new FormData(form as HTMLFormElement)

    const name = _form.get('name')
    const info = _form.get('info')
    const isImportant = _form.get('isImportant')

    const formData: CreateTaskRequestBody = {
        name: name ? name.toString() : '',
        info: info ? info.toString() : '',
        isImportant: !!isImportant,
        isCompleted: false,
    }

    return formData
}