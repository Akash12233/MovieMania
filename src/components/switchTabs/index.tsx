import {useState} from 'react'
import "./style.scss";

type props =  {
    data: string[];
    onTabChange: (tab:string, index:number) => void;
    
}

const SwitchTabs = (props:props) => {
    const [activeTab, setActiveTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTabs = (tab: string, index: number) =>{
        setLeft(index * 100);
        setTimeout(() =>{
             setActiveTab(index);
        }, 300);
        props.onTabChange(tab, index);

    }

  return (
    <div className='switchingTabs' >
        <div className="tabItems">
            {props.data.map((tab,index) => (
                <span 
                    key={index} 
                    className={ `tabItem ${activeTab === index ? "active" : ""}` }
                    onClick={() => activeTabs(tab,index)}>
                    {tab}
                </span>
            ))}
            <span className="movingBg" style={{left:left}}>
             
            </span>
        </div>
    </div>
  )
}

export default SwitchTabs