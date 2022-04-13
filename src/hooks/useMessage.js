import { ElMessage } from 'element-plus'

export function useMessage(){
    const success = (val) =>{
        ElMessage({
            message: val,
            type: 'success',
            grouping: true,
          })
    }
    const error = (val) =>{
        ElMessage({
            message: val,
            type: 'error',
            grouping: true,
          })
    }
    return {
        success,
        error
    }
}
