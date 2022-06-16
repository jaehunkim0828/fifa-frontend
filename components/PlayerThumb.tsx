import Image from "next/image";
import { useEffect, useState, memo } from "react";
import Select, { SingleValue } from 'react-select';

import style from '../styles/playerThumb.module.scss';
import Graph from "./Graph";
import { getMethod } from "../http";
import up from '../public/images/up.png';
import down from '../public/images/down.png';

export default memo(function PlayerThumb({spid, name, seasonImg, classname, id}: {spid: string, name: string, seasonImg: string, classname: string, id: number}) {
    const [isOpen, setModal] = useState<boolean>(false);
    const [graph, setGraph] = useState<boolean>(false);
    const [status, setStatus] = useState({
        matchCount: 0,
        assist: 0,
        block: 0,
        dribble: 0,
        dribbleSuccess: 0,
        dribbleTry: 0,
        effectiveShoot: 0,
        goal: 0,
        passSuccess: 0,
        passTry: 0,
        shoot: 0,
        tackle: 0,
    });

    const openGraph = async (value: number) => {
        const totalPlayerData = await getMethod(`rank/potential?spid=${spid}&po=${value}`);
        setGraph(!graph);
        setStatus(totalPlayerData);
    }

    const showPlayerGraph = async (value: number) => {
        const totalPlayerData = await getMethod(`rank/potential?spid=${spid}&po=${value}`);
        setGraph(true);
        setStatus(totalPlayerData);
    }

    const playerStyle = {
        transform: 'scale(1.05)'
    }

    const options = [
        { value: 50, label: 'TOTAL' },
        { value: 0, label: 'GK' },
        { value: 1, label: 'SW' },
        { value: 2, label: 'RWB' },
        { value: 3, label: 'RB' },
        { value: 4, label: 'RCB' },
        { value: 5, label: 'CB' },
        { value: 6, label: 'LCB' },
        { value: 7, label: 'LB' },
        { value: 8, label: 'LWB' },
        { value: 9, label: 'RDM' },
        { value: 10, label: 'CDM' },
        { value: 11, label: 'LDM' },
        { value: 12, label: 'RM' },
        { value: 13, label: 'RCM' },
        { value: 14, label: 'CM' },
        { value: 15, label: 'LCM' },
        { value: 16, label: 'LM' },
        { value: 17, label: 'RAM' },
        { value: 18, label: 'CAM' },
        { value: 19, label: 'LAM' },
        { value: 20, label: 'RF' },
        { value: 21, label: 'CF' },
        { value: 22, label: 'LF' },
        { value: 23, label: 'RW' },
        { value: 24, label: 'RS' },
        { value: 25, label: 'ST' },
        { value: 26, label: 'LS' },
        { value: 27, label: 'LW' },
        { value: 28, label: 'SUB' },
      ]
      

    // thumb이 open되었을때 마다 실행
    useEffect(() => {
        setModal(false);
        setGraph(false);
    }, [spid])

    // graph select bar값이 변경될때마다 실행
    // useEffect(() => {
    //     console.log(status, spid);
    // }, [status])

    return (
        <div 
            className={style.thumb}
            style={graph ? playerStyle : {}}
        >
            <div className={style.main}>
                <div>
                    <div>
                        <div className={style.info}>
                            {/* <Image src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${id}.png`} width='100px' height='100px' alt=''/> */}
                            <div>{name}</div>
                        </div>
                    </div>
                    <div className={style.season}>
                        <Image src={seasonImg} width='30' height='21' alt='none'/>
                        <div>{classname}</div>
                    </div>
                </div>
                <button className={style.btn} onClick={() => openGraph(50)}>
                    <Image src={graph ? up : down} alt='btn' width='100%' height='100%' layout="fill" />
                </button>
            </div>
            {graph && (
                <div className={style.graph}>
                    <div className={style.select}>
                        <Select
                            defaultValue={options[0]}
                            options={options}
                            onChange={(e: any) => showPlayerGraph(e.value)}
                        />
                    </div>
                    <Graph name={name} status={status}/>
                </div>
            )}
        </div>
    )
});