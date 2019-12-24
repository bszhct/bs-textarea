import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {BsTextarea} from '../src'
import '../src/index.styl'

// 如果想要测试编译之后的代码, 执行 `npm run build` 之后, 在 demo 中引入
// import BsTextarea2 from '..'

import './index.styl'


class Example extends React.Component {
  readonly state = {
    value: '',
    disabledValue: '人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。',
    blurValue: `晋太元中，武陵人捕鱼为业，缘溪行，忘路之远近。忽逢桃花林，夹岸数百步，中无杂树，芳草鲜美，落英缤纷，渔人甚异之。复前行，欲穷其林。林尽水源，便得一山，山有小口，仿佛若有光，便舍船从口入。初极狭，才通人，复行数十步，豁然开朗。土地平旷，屋舍俨然，有良田美池桑竹之属。阡陌交通，鸡犬相闻。其中往来种作，男女衣著，悉如外人。黄发垂髫，并怡然自乐。
      见渔人，乃大惊，问所从来。具答之。便要还家，设酒杀鸡作食。村中闻有此人，咸来问讯。自云先世避秦时乱，率妻子邑人来此绝境，不复出焉，遂与外人间隔。问今是何世，乃不知有汉，无论魏晋。此人一一为具言所闻，皆叹惋。余人各复延至其家，皆出酒食。停数日，辞去。
      此中人语云，不足为外人道也。既出，得其船，便扶向路，处处志之。及郡下，诣太守说如此。太守即遣人随其往，寻向所志，遂迷不复得路。南阳刘子骥，高尚士也，闻之，欣然规往，未果。寻病终。后遂无问津者。 `,
  }

  onFormChange = (value: string) => {
    this.setState({value})
  }

  onFormBlur = (value: string) => {
    this.setState({value})
  }

  render() {
    const {value, disabledValue, blurValue} = this.state

    return (
      <div className="example-bs-textarea">
        <div className="group-item">
          <div className="item-label">快速开始</div>
          <BsTextarea />
        </div>
        
        <div className="group-item">
          <div className="item-label">设置默认值</div>
          <BsTextarea defaultValue="这是一个设置了默认值的表单" />
        </div>

        <div className="group-item">
          <div className="item-label">受控</div>
          <BsTextarea value={value} onChange={this.onFormChange} />
        </div>

        <div className="group-item">
          <div className="item-label">禁用</div>
          <BsTextarea value={disabledValue} disabled />
        </div>

        <div className="group-item">
          <div className="item-label">失去焦点获取数据</div>
          <BsTextarea value={blurValue} onBlur={this.onFormBlur} autoSize={{minRows: 10, maxRows: 20}} />
        </div>

        {/* 
        <div className="group-item">
          <div className="item-label">编译之后的表单</div>
          <BsTextarea2 defaultValue={disabledValue} />
        </div> 
        */}
      </div>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('root'))
