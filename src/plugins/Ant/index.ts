import { Button, Input, Steps, Form, Select, Row, Radio, DatePicker, Col, Checkbox, Switch, Cascader  } from 'ant-design-vue'
const ant = {
    install(Vue: any) {
        Vue.component(Button.name, Button)
        Vue.component(Input.name, Input)
        Vue.component(Steps.name, Steps)
        Vue.component(Form.name, Form)
        Vue.component(Select.name, Select)
        Vue.component(Row.name, Row)
        Vue.component(Radio.name, Radio)
        Vue.component(DatePicker.name, DatePicker)
        Vue.component(Col.name, Col)
        Vue.component(Checkbox.name, Checkbox)
        Vue.component(Switch.name, Switch)
        Vue.component(Cascader .name, Cascader )
        // 以后想引入什么就引入什么
    }
}
export default ant