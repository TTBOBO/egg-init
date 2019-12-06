import Taro, { Component, useState, useEffect } from '@tarojs/taro'
import { AtInput, AtTextarea, AtToast } from 'taro-ui'
import { View, Text, Picker } from '@tarojs/components'
import Validator from '~/assets/js/validator.js'
import { CForm } from '~/components'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '添加地址',
    enablePullDownRefresh: true
  }

  state = {
    rule: {
      linkMan: {
        filed: '姓名',
        type: 'string',
        required: true,
        validator: { valFun: this.valFun, errMsg: '自定义验证错误' }
      },
      phone: { filed: '手机号码', type: 'tel', required: true }
    }
  }
  valFun(value) {
    return value.length > 5
  }
  validator = null
  componentDidMount() {
    this.validator = new Validator(this.state.rule)
  }
  handleChange(type, e) {
    let obj = {}
    obj[type] = e
    this.setState({
      formData: Object.assign({}, this.state.formData, obj)
    })
  }

  render() {
    const [address, setAddress] = useState({
      linkMan: '',
      phone: '',
      isDefault: 'no',
      city: [],
      address: ''
    })

    const toastData = { isOpened: false, text: '' }
    const [toast, setToast] = useState(toastData)
    useEffect(() => {
      setTimeout(() => setToast(toastData, 1000))
    }, [])

    const handlerChange = (value, key) => {
      setAddress({
        ...address,
        [key]: key === 'address' || key === 'city' ? value.detail.value : value
      })
    }
    const onSubmit = async () => {
      try {
        let res = await this.validator.checkForm(address)
        if (res) {
          let data = await Taro.$ajaxPost('addAddress', address)
          Taro.navigateBack()
          console.log(data)
        }
      } catch (err) {
        console.log(err)
        setToast({
          text: err[0].msg,
          isOpened: true
        })
      }
    }
    return (
      <CForm onSubmit={onSubmit} loading={false} submitText='提交'>
        <AtInput
          name='value'
          title=''
          type='text'
          placeholder='姓名'
          value={address.linkMan}
          onChange={e => handlerChange(e, 'linkMan')}
        />
        <AtInput
          name='value'
          title=''
          type='text'
          placeholder='手机号码'
          value={address.phone}
          onChange={e => handlerChange(e, 'phone')}
        />
        <Picker
          mode='region'
          value={address.city}
          onChange={e => handlerChange(e, 'city')}
        >
          <AtInput
            title=''
            type='text'
            placeholder='城市'
            value={address.city.join(',')}
          />
        </Picker>
        <AtTextarea
          count={false}
          value={address.address}
          onChange={e => handlerChange(e, 'address')}
          maxLength={200}
          placeholder='详细地址'
        />
        <View className='label'>
          <View
            className={`select-icon  ${
              address.isDefault === 'is' ? 'select' : 'select-no'
            }`}
            onClick={() =>
              handlerChange(
                address.isDefault === 'is' ? 'no' : 'is',
                'isDefault'
              )
            }
          ></View>
          <Text>设为默认地址</Text>
        </View>
        <AtToast isOpened={toast.isOpened} text={toast.text}></AtToast>
      </CForm>
    )
  }
}
