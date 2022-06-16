import Image from 'next/image';
import React, { useState, memo } from 'react';

import { getMethod } from '../http';
import useInput from '../hooks/useInput';
import style from '../styles/player.module.scss';
import PlayerThumb from './PlayerThumb';

export default function Player() {
    const [player, setPlayer] = useInput('');
    const [playersInfo, setPlayerInfo] = useState<any[]>([]);

    const onChangePlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayer(event);
    }

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const data = await getMethod(`player/spid/${player}`);
        
        setPlayerInfo(data === '' ? [] : data);
    };

    return (
        <div className={style.playerContainer}>
            <form className={style.searchbar} onSubmit={async(e: React.SyntheticEvent) => submit(e)}>
                <input 
                    value={player} 
                    placeholder='선수이름'
                    onChange={onChangePlayer}
                    className={style.input}
                />
                <button className={style.button} type='submit'>플레이정보 얻기</button>
            </form>
            <div>
                {playersInfo.map((e: {name: string, id: string ,season: { classname: string, seasonImg: string, id: number }}, i) => (
                <div key={i}>
                    <PlayerThumb spid={e.id} name={e.name} classname={e.season.classname} id={e.season.id} seasonImg={e.season.seasonImg} />
                </div>
                ))}
            </div>
        </div>
    )
}