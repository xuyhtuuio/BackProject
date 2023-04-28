import { ElMessage, ElMessageBox } from 'element-plus'

export default function popModal (content="默认情况", type="warning", title="") {
    return ElMessageBox.confirm(
            content,
            title,
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type,
            }
        )
}


