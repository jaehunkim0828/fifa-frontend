import type { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

import { getMethod } from '../http';
import useInput from '../hooks/useInput';
import style from '../styles/Home.module.scss';
import Player from '../components/Player';

const Home: NextPage = () => {

  return (
    <div className={style.homeContainer}>
      <Player />
    </div>
  )
}

export default Home
