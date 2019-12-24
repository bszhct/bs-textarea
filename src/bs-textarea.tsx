/* eslint-disable react/static-property-placement */
import * as React from 'react'
import cls from 'classnames'

interface IRows {
  minRows?: number
  maxRows?: number
}

interface IProps {
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  onFocus?: (value: string) => void
  // 调整大小, 默认禁用
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline'
  // 自适应内容高度, 默认 false
  autoSize?: boolean | IRows
  // 只读, 默认 false
  readOnly?: boolean
}

interface IFilterProps {
  value?: string
  defaultValue?: string
  onCut?: () => void
  onPaste?: () => void
  onDrop?: () => void
  onKeyDown?: () => void
}

// 输入框容器
let textareaBox: HTMLDivElement
// 全局插入一个输入框, 用于获取高度变化
let textarea: HTMLTextAreaElement

// 过滤掉不需要的属性
const filterAttrs = ['onchange', 'oncut', 'onpaste', 'ondrop', 'onkeydown']
// 全局 textarea 的样式
const styleAttrs = {
  'max-height': 'none',
  'min-height': 0,
  height: 0,
  visibility: 'hidden',
  overflow: 'hidden',
  position: 'fixed',
  'z-index': -9999,
  bottom: 0,
  left: 0,
}

// 获取样式的值
function getStyle(element, attr) {
  if (element.currentStyle) {
    return element.currentStyle[attr]
  }
  return window.getComputedStyle(element, null)[attr]
}


export default class BsTextarea extends React.Component<IProps, {}> {
  static defaultProps = {
    value: '',
    defaultValue: '',
    resize: 'none',
    autoSize: {
      minRows: 3,
      maxRows: 6,
    },
    readonly: false,
  }

  readonly state = {
    currentValue: '',
  }

  minHeight = 28

  lineHeight = 18

  textarea: React.RefObject<HTMLTextAreaElement> = React.createRef()

  // 当前的多行文本输入框, 如果当前的输入框跟全局的不是同一个, 则重新插入 textarea 标签
  currentTextarea: HTMLTextAreaElement

  constructor(props) {
    super(props)
    this.state = {
      currentValue: props.defaultValue,
    }
  }

  componentDidMount() {
    const {autoSize, value} = this.props

    // 获取行高, 因为可能外部会设置行高
    this.lineHeight = Number.parseInt(getStyle(this.textarea.current, 'line-height'), 10) || 18

    // 如果 autoSize 是一个对象
    if (autoSize && autoSize as IRows) {
      if ((autoSize as IRows).minRows) {
        this.textarea.current.style.minHeight = `${((autoSize as IRows).minRows - 1) * this.lineHeight + this.minHeight}px`
      }
      if ((autoSize as IRows).maxRows) {
        this.textarea.current.style.maxHeight = `${((autoSize as IRows).maxRows - 1) * this.lineHeight + this.minHeight}px`
      }
    }

    if (!textarea) {
      this.setGlobalTextarea(value)
    }
  }

  componentWillUnmount() {
    textarea.value = ''
  }

  setGlobalTextarea(value: string) {
    const {currentValue} = this.state
    
    // 有个莫名其妙的 ts 错误, 先用 any 跳过检测
    const box = this.textarea.current.parentNode as HTMLDivElement
    const rect = box.getBoundingClientRect()
    textareaBox = box.cloneNode(true) as HTMLDivElement
    
    textarea = textareaBox.querySelector('textarea')
    this.currentTextarea = textarea
    // 设置样式
    // 如果不设置为具体宽度, 在某些场景下宽度会不一致
    textareaBox.style.width = `${rect.width}px`
    Object.entries(styleAttrs).forEach(([k, v]) => {
      textareaBox.style[k] = v
    })
    // 删除不需要监听的事件
    filterAttrs.forEach(attr => {
      textarea.removeAttribute(attr)
    })

    textarea.value = currentValue || value
    document.body.appendChild(textareaBox)
  }

  resizeInput = () => {
    this.textarea.current.style.height = 'auto'
    this.textarea.current.style.height = `${textarea.scrollHeight}px`
  }

  setInputHeight = () => {
    const {autoSize, value} = this.props

    if (autoSize) {
      // 重置全局的 textarea 标签
      if (textarea !== this.currentTextarea) {
        if (textareaBox) {
          document.body.removeChild(textareaBox)
          textareaBox = null
          textarea = null
          this.currentTextarea = null
        }

        this.setGlobalTextarea(value)
      }

      // 如果是传递了一个对象, 且当前高度 >= 最高的高度
      if (this.textarea.current.scrollHeight >= ((autoSize as IRows).maxRows * (this.lineHeight - 1)) + this.minHeight) {
        return
      }
      // 同步 value 过去, 目的是为了获取真实的高度
      textarea.value = this.textarea.current.value
      setTimeout(this.resizeInput, 0)
    }
  }

  onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const {value} = e.target
    const {onChange} = this.props

    this.setState({
      currentValue: value,
    })

    if (onChange) {
      onChange(value)
    }

    this.setInputHeight()
  }

  onBlur = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    const {value} = e.target
    const {onBlur} = this.props

    if (onBlur) {
      onBlur(value)
    }
  }

  onFocus = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    const {value} = e.target
    const {onFocus} = this.props

    if (onFocus) {
      onFocus(value)
    }
  }

  render() {
    const {
      className,
      style,
      placeholder,
      value,
      disabled,
      resize,
      autoSize,
      readOnly,
    } = this.props
    const {currentValue} = this.state
    const props: IFilterProps = {}

    if (autoSize) {
      props.onCut = this.setInputHeight
      props.onPaste = this.setInputHeight
      props.onDrop = this.setInputHeight
      props.onKeyDown = this.setInputHeight
    }

    if (value) {
      props.value = value
    } else {
      props.defaultValue = currentValue
    }

    return (
      <div 
        className={cls('bs-textarea-wrap', {
          disabled,
          [`${className}`]: !!className,
        })}
        style={style}
      >
        <textarea
          ref={this.textarea}
          className="bs-textarea"
          style={{resize}}
          placeholder={placeholder}
          disabled={disabled}
          spellCheck={false}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          readOnly={readOnly}
          {...props}
          // 初始化的时候, 先设置一行, 防止一输入文本就换行了
          rows={1}
        />
      </div>
    )
  }
}
